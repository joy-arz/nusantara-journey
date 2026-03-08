import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  View, Text, StyleSheet, FlatList, Pressable,
  TextInput, Platform, KeyboardAvoidingView
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence
} from "react-native-reanimated";
import { Colors } from "@/constants/colors";
import { apiRequest, getApiUrl } from "@/lib/query-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetch } from "expo/fetch";

interface Conversation {
  id: number;
  title: string;
  createdAt: string;
}

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  conversationId: number;
}

const SUGGESTIONS = [
  "Tell me about Majapahit Empire",
  "What is the legend of Nyai Roro Kidul?",
  "Explain batik making traditions",
  "What happened to Borobudur?",
  "Tell me about Keris daggers",
  "Who were the Wali Songo?",
];

function TypingDots() {
  const dot1 = useSharedValue(0.3);
  const dot2 = useSharedValue(0.3);
  const dot3 = useSharedValue(0.3);

  useEffect(() => {
    const animate = (sv: typeof dot1, delay: number) => {
      sv.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0.3, { duration: 400 })
        ),
        -1,
        false
      );
    };
    animate(dot1, 0);
    setTimeout(() => animate(dot2, 200), 200);
    setTimeout(() => animate(dot3, 400), 400);
  }, []);

  const s1 = useAnimatedStyle(() => ({ opacity: dot1.value }));
  const s2 = useAnimatedStyle(() => ({ opacity: dot2.value }));
  const s3 = useAnimatedStyle(() => ({ opacity: dot3.value }));

  return (
    <View style={typingStyles.container}>
      <Animated.View style={[typingStyles.dot, s1]} />
      <Animated.View style={[typingStyles.dot, s2]} />
      <Animated.View style={[typingStyles.dot, s3]} />
    </View>
  );
}

const typingStyles = StyleSheet.create({
  container: { flexDirection: "row", gap: 4, padding: 4 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: Colors.textMuted },
});

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <View style={[bubbleStyles.wrapper, isUser ? bubbleStyles.wrapperUser : bubbleStyles.wrapperAssistant]}>
      {!isUser && (
        <View style={bubbleStyles.avatar}>
          <Text style={{ fontSize: 16 }}>🏛️</Text>
        </View>
      )}
      <View style={[bubbleStyles.bubble, isUser ? bubbleStyles.bubbleUser : bubbleStyles.bubbleAssistant]}>
        <Text style={[bubbleStyles.text, isUser ? bubbleStyles.textUser : bubbleStyles.textAssistant]}>
          {message.content}
        </Text>
      </View>
    </View>
  );
}

const bubbleStyles = StyleSheet.create({
  wrapper: { flexDirection: "row", marginHorizontal: 16, marginVertical: 4, alignItems: "flex-end", gap: 8 },
  wrapperUser: { justifyContent: "flex-end" },
  wrapperAssistant: { justifyContent: "flex-start" },
  avatar: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: Colors.surface,
    borderWidth: 1, borderColor: Colors.border,
    alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  bubble: { maxWidth: "78%", borderRadius: 18, padding: 12 },
  bubbleUser: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  bubbleAssistant: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderBottomLeftRadius: 4,
  },
  text: { fontSize: 14, lineHeight: 20, fontFamily: "Inter_400Regular" },
  textUser: { color: "#FFF" },
  textAssistant: { color: Colors.text },
});

export default function GuideScreen() {
  const insets = useSafeAreaInsets();
  const qc = useQueryClient();
  const [activeConvId, setActiveConvId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const listRef = useRef<FlatList>(null);

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 + 16 : insets.bottom + 16;

  const { data: conversations = [] } = useQuery<Conversation[]>({
    queryKey: ["/api/conversations"],
  });

  const createConv = useMutation({
    mutationFn: async (title: string) => {
      const res = await apiRequest("POST", "/api/conversations", { title });
      return res.json();
    },
    onSuccess: (conv: Conversation) => {
      qc.invalidateQueries({ queryKey: ["/api/conversations"] });
      setActiveConvId(conv.id);
      setMessages([]);
    },
  });

  const loadConversation = async (id: number) => {
    try {
      const res = await apiRequest("GET", `/api/conversations/${id}`);
      const data = await res.json();
      setMessages(data.messages || []);
      setActiveConvId(id);
      setShowSidebar(false);
    } catch (e) {}
  };

  const sendMessage = async () => {
    if (!input.trim() || isStreaming) return;
    const text = input.trim();
    setInput("");

    let convId = activeConvId;
    if (!convId) {
      const res = await apiRequest("POST", "/api/conversations", { title: text.slice(0, 40) });
      const conv = await res.json();
      convId = conv.id;
      setActiveConvId(convId);
      qc.invalidateQueries({ queryKey: ["/api/conversations"] });
    }

    const userMsg: Message = { id: Date.now(), role: "user", content: text, conversationId: convId! };
    setMessages(prev => [...prev, userMsg]);

    setIsStreaming(true);
    const assistantMsg: Message = { id: Date.now() + 1, role: "assistant", content: "", conversationId: convId! };
    setMessages(prev => [...prev, assistantMsg]);

    try {
      const baseUrl = getApiUrl();
      const url = new URL(`/api/conversations/${convId}/messages`, baseUrl);
      const response = await fetch(url.toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });

      const reader = response.body?.getReader();
      if (!reader) return;

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const event = JSON.parse(line.slice(6));
            if (event.content) {
              setMessages(prev => prev.map(m =>
                m.id === assistantMsg.id ? { ...m, content: m.content + event.content } : m
              ));
            }
            if (event.done) {
              qc.invalidateQueries({ queryKey: ["/api/conversations"] });
            }
          } catch {}
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsStreaming(false);
    }
  };

  const newChat = () => {
    setActiveConvId(null);
    setMessages([]);
    setShowSidebar(false);
  };

  const renderMessage = useCallback(({ item }: { item: Message }) => (
    <MessageBubble message={item} />
  ), []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPadding + 12 }]}>
        <Pressable style={styles.headerBtn} onPress={() => setShowSidebar(!showSidebar)}>
          <Ionicons name="menu" size={22} color={Colors.text} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Arjuna</Text>
          <Text style={styles.headerSub}>Indonesian Culture Guide</Text>
        </View>
        <Pressable style={styles.headerBtn} onPress={newChat}>
          <Ionicons name="add" size={22} color={Colors.primary} />
        </Pressable>
      </View>

      {/* Sidebar */}
      {showSidebar && (
        <View style={styles.sidebar}>
          <Text style={styles.sidebarTitle}>Conversations</Text>
          {conversations.length === 0 ? (
            <Text style={styles.sidebarEmpty}>No conversations yet</Text>
          ) : (
            conversations.map((c: Conversation) => (
              <Pressable
                key={c.id}
                style={[styles.sidebarItem, activeConvId === c.id && styles.sidebarItemActive]}
                onPress={() => loadConversation(c.id)}
              >
                <Ionicons name="chatbubble" size={14} color={activeConvId === c.id ? Colors.primary : Colors.textMuted} />
                <Text style={[styles.sidebarItemText, activeConvId === c.id && styles.sidebarItemTextActive]} numberOfLines={1}>
                  {c.title}
                </Text>
              </Pressable>
            ))
          )}
        </View>
      )}

      {/* Messages */}
      {messages.length === 0 && !showSidebar ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🏛️</Text>
          <Text style={styles.emptyTitle}>Ask Arjuna</Text>
          <Text style={styles.emptySubtitle}>Your AI guide to Indonesian kingdoms, mythology, and culture</Text>
          <View style={styles.suggestions}>
            {SUGGESTIONS.map((s, i) => (
              <Pressable
                key={i}
                style={({ pressed }) => [styles.suggestion, pressed && { opacity: 0.7 }]}
                onPress={() => { setInput(s); }}
              >
                <Text style={styles.suggestionText}>{s}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      ) : !showSidebar && (
        <FlatList
          ref={listRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingTop: 12, paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
          inverted
          ListHeaderComponent={isStreaming && messages.at(-1)?.content === "" ? (
            <View style={bubbleStyles.wrapper}>
              <View style={bubbleStyles.avatar}><Text style={{ fontSize: 16 }}>🏛️</Text></View>
              <View style={[bubbleStyles.bubble, bubbleStyles.bubbleAssistant]}>
                <TypingDots />
              </View>
            </View>
          ) : null}
          style={styles.messages}
        />
      )}

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        <View style={[styles.inputBar, { paddingBottom: bottomPadding }]}>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Ask about Indonesian heritage..."
              placeholderTextColor={Colors.textMuted}
              multiline
              maxLength={500}
              returnKeyType="send"
              onSubmitEditing={sendMessage}
              blurOnSubmit={false}
            />
            <Pressable
              style={[styles.sendBtn, (!input.trim() || isStreaming) && styles.sendBtnDisabled]}
              onPress={sendMessage}
              disabled={!input.trim() || isStreaming}
            >
              <Ionicons name="arrow-up" size={18} color="#FFF" />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 16, paddingBottom: 12,
    borderBottomWidth: 1, borderColor: Colors.border,
    backgroundColor: Colors.backgroundSecondary,
  },
  headerBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  headerCenter: { flex: 1, alignItems: "center" },
  headerTitle: { fontSize: 16, fontFamily: "Inter_700Bold", color: Colors.text },
  headerSub: { fontSize: 11, color: Colors.textMuted, fontFamily: "Inter_400Regular" },
  messages: { flex: 1 },
  emptyState: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  emptyIcon: { fontSize: 52, marginBottom: 16 },
  emptyTitle: { fontSize: 22, fontFamily: "Inter_700Bold", color: Colors.text, marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: Colors.textMuted, textAlign: "center", fontFamily: "Inter_400Regular", marginBottom: 24, lineHeight: 20 },
  suggestions: { width: "100%", gap: 8 },
  suggestion: {
    backgroundColor: Colors.surface,
    borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12,
    borderWidth: 1, borderColor: Colors.border,
  },
  suggestionText: { fontSize: 13, color: Colors.textSecondary, fontFamily: "Inter_400Regular" },
  inputBar: {
    paddingHorizontal: 16, paddingTop: 10,
    backgroundColor: Colors.backgroundSecondary,
    borderTopWidth: 1, borderColor: Colors.border,
  },
  inputWrap: {
    flexDirection: "row", alignItems: "flex-end",
    backgroundColor: Colors.surface,
    borderRadius: 22, borderWidth: 1, borderColor: Colors.border,
    paddingLeft: 16, paddingRight: 6, paddingVertical: 6,
    gap: 8,
  },
  input: {
    flex: 1, fontSize: 14, color: Colors.text,
    fontFamily: "Inter_400Regular", maxHeight: 100,
    paddingVertical: 6,
  },
  sendBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: "center", justifyContent: "center",
  },
  sendBtnDisabled: { backgroundColor: Colors.border },
  sidebar: {
    position: "absolute", top: 0, left: 0, bottom: 0, width: 260,
    backgroundColor: Colors.backgroundSecondary,
    borderRightWidth: 1, borderColor: Colors.border,
    zIndex: 100, paddingTop: 120, paddingHorizontal: 16,
  },
  sidebarTitle: { fontSize: 13, fontFamily: "Inter_700Bold", color: Colors.textMuted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 },
  sidebarEmpty: { fontSize: 13, color: Colors.textMuted, fontFamily: "Inter_400Regular" },
  sidebarItem: {
    flexDirection: "row", alignItems: "center", gap: 10,
    paddingVertical: 10, paddingHorizontal: 10, borderRadius: 8, marginBottom: 4,
  },
  sidebarItemActive: { backgroundColor: Colors.primary + "20" },
  sidebarItemText: { flex: 1, fontSize: 13, color: Colors.textSecondary, fontFamily: "Inter_400Regular" },
  sidebarItemTextActive: { color: Colors.primary, fontFamily: "Inter_500Medium" },
});
