import React, { useState, useMemo, useEffect } from "react";
import {
  View, Text, StyleSheet, ScrollView, Pressable,
  Dimensions, Platform, Modal
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/colors";
import { useGame } from "@/context/GameContext";
import { useAuth } from "@/context/AuthContext";
import { getDailyQuests, Quest } from "@/constants/quests";
import { TRIVIA_QUESTIONS, TriviaQuestion } from "@/constants/trivia";
import { INVENTORY_ITEMS, RARITY_COLORS } from "@/constants/inventory-items";
import { TAB_BAR_HEIGHT, WEB_TOP_INSET, WEB_BOTTOM_INSET } from "@/constants/layout";
import { router } from "expo-router";
import { Image } from "expo-image";
import { NusantaraMapView as MapView, NusantaraMarker as Marker, NusantaraCircle as Circle } from "@/components/MapWrapper";
import { KINGDOM_CENTROIDS } from "@/constants/places-data";
import * as Location from "expo-location";

const { width } = Dimensions.get("window");

function TriviaModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { recordBattle, gainXP } = useGame();
  const [step, setStep] = useState<"start" | "quiz" | "result">("start");
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const startQuiz = () => {
    const shuffled = [...TRIVIA_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setStep("quiz");
  };

  const handleAnswer = (option: string) => {
    if (selectedOption) return;
    setSelectedOption(option);
    const correct = option === questions[currentIndex].answer;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        const finalScore = score + (correct ? 1 : 0);
        setStep("result");
        recordBattle(finalScore >= 3);
        gainXP(finalScore * 5 + (finalScore === 5 ? 25 : 0), "trivia_battle");
      }
    }, 1500);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Cultural Battle</Text>
            <Pressable onPress={onClose}>
              <Ionicons name="close" size={24} color={Colors.text} />
            </Pressable>
          </View>

          {step === "start" && (
            <View style={styles.triviaStart}>
              <MaterialCommunityIcons name="sword-cross" size={64} color={Colors.accent} />
              <Text style={styles.triviaText}>Test your knowledge of Nusantara! Answer 5 questions correctly to earn XP and wins.</Text>
              <Pressable style={styles.primaryBtn} onPress={startQuiz}>
                <Text style={styles.primaryBtnText}>Start Battle</Text>
              </Pressable>
            </View>
          )}

          {step === "quiz" && questions[currentIndex] && (
            <View style={styles.quizContent}>
              <Text style={styles.quizProgress}>Question {currentIndex + 1} of 5</Text>
              <Text style={styles.quizQuestion}>{questions[currentIndex].question}</Text>
              <View style={styles.optionsGrid}>
                {questions[currentIndex].options.map((option, i) => {
                  const isSelected = selectedOption === option;
                  const isAnswer = option === questions[currentIndex].answer;
                  const showResult = selectedOption !== null;
                  return (
                    <Pressable
                      key={i}
                      style={[
                        styles.optionBtn,
                        isSelected && styles.optionSelected,
                        showResult && isAnswer && styles.optionCorrect,
                        showResult && isSelected && !isAnswer && styles.optionWrong
                      ]}
                      onPress={() => handleAnswer(option)}
                    >
                      <Text style={[styles.optionText, (isSelected || (showResult && isAnswer)) && { color: Colors.text }]}>{option}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          )}

          {step === "result" && (
            <View style={styles.triviaStart}>
              <Ionicons name={score >= 3 ? "trophy" : "alert-circle"} size={64} color={score >= 3 ? Colors.accent : Colors.textMuted} />
              <Text style={styles.resultTitle}>{score >= 3 ? "Victory!" : "Defeat"}</Text>
              <Text style={styles.triviaText}>You answered {score} out of 5 questions correctly.</Text>
              <Text style={styles.xpGained}>+{score * 5 + (score === 5 ? 25 : 0)} XP Earned</Text>
              <Pressable style={styles.primaryBtn} onPress={onClose}>
                <Text style={styles.primaryBtnText}>Return to Profile</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

function JourneyMapView() {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    if (Platform.OS === 'web') return;
    let headingSub: any = null;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      const loc = await Location.getCurrentPositionAsync({});
      setUserLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      headingSub = await Location.watchHeadingAsync((h) => {
        setHeading(h.trueHeading ?? h.magHeading ?? 0);
      });
    })();
    return () => { if (headingSub) headingSub.remove(); };
  }, []);

  if (Platform.OS === 'web') {
    return (
      <View style={styles.journeyMapFallback}>
        <Ionicons name="map-outline" size={36} color={Colors.textMuted} />
        <Text style={styles.journeyMapFallbackText}>Open in Expo Go to see live map</Text>
      </View>
    );
  }

  return (
    <View style={styles.journeyMapContainer}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{ latitude: -4, longitude: 117, latitudeDelta: 18, longitudeDelta: 18 }}
        userInterfaceStyle="dark"
        showsUserLocation={false}
        zoomEnabled
        scrollEnabled
        pitchEnabled={false}
      >
        {KINGDOM_CENTROIDS.map((k, i) => (
          <React.Fragment key={i}>
            <Circle
              center={{ latitude: k.lat, longitude: k.lng }}
              radius={100000}
              strokeColor={k.color}
              fillColor={k.color + "18"}
            />
            <Marker coordinate={{ latitude: k.lat, longitude: k.lng }}>
              <View style={[styles.journeyKingdomMarker, { backgroundColor: k.color }]}>
                <MaterialCommunityIcons name="crown" size={10} color={Colors.text} />
              </View>
            </Marker>
          </React.Fragment>
        ))}

        {userLocation && (
          <Marker coordinate={userLocation} anchor={{ x: 0.5, y: 0.5 }}>
            <View style={styles.userLocationContainer}>
              <View style={styles.userLocationGlow} />
              <View style={styles.userLocationDot} />
              <View style={[styles.userLocationArrow, { transform: [{ rotate: `${heading}deg` }] }]}>
                <Ionicons name="navigate" size={10} color={Colors.gold} />
              </View>
            </View>
          </Marker>
        )}
      </MapView>
    </View>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { level, xp, title, inventory, completedQuestIds, battleWins, battleTotal, gainXP, completeQuest, addToInventory } = useGame();
  const { user, signInWithGoogle, signOut } = useAuth();
  const [showBattle, setShowBattle] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const dailyQuests = useMemo(() => getDailyQuests(), []);

  const topPadding = Platform.OS === "web" ? WEB_TOP_INSET : insets.top;
  const contentBottomPadding = Platform.OS === "web" ? TAB_BAR_HEIGHT + WEB_BOTTOM_INSET : TAB_BAR_HEIGHT + insets.bottom;

  const xpNext = useMemo(() => {
    if (level === 1) return 100;
    if (level === 2) return 250;
    if (level === 3) return 500;
    if (level === 4) return 900;
    if (level < 10) return 900 + (level - 4) * 500;
    return 900 + (5 * 500) + (level - 9) * 1000;
  }, [level]);

  const progress = (xp / xpNext) * 100;

  const handleClaimQuest = (quest: Quest) => {
    completeQuest(quest.id, quest.xpReward);
    addToInventory(quest.itemRewardId);
  };

  const ITEM_SIZE = (width - 40 - 16) / 3;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: contentBottomPadding }}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: topPadding + 20 }]}>
          <LinearGradient colors={["#1A0A00", Colors.backgroundSecondary]} style={StyleSheet.absoluteFill} />
          <View style={styles.headerTop}>
            {user ? (
              <>
                <View style={styles.avatarContainer}>
                  {user.avatarUrl ? (
                    <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
                  ) : (
                    <View style={[styles.avatar, styles.avatarPlaceholder]}>
                      <Ionicons name="person" size={30} color={Colors.textMuted} />
                    </View>
                  )}
                  <View style={styles.avatarLevelBadge}>
                    <Text style={styles.avatarLevelText}>{level}</Text>
                  </View>
                </View>
                <View style={styles.headerInfo}>
                  <Text style={styles.userName}>{user.displayName || "Nusantara Explorer"}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                  <Text style={styles.userTitle}>{title}</Text>
                </View>
              </>
            ) : (
              <>
                <Pressable style={styles.googleLoginBtn} onPress={signInWithGoogle} accessibilityLabel="Sign in with Google" accessibilityRole="button">
                  <MaterialCommunityIcons name="google" size={20} color={Colors.text} />
                  <Text style={styles.googleLoginText}>Continue with Google</Text>
                </Pressable>
                <View style={styles.headerInfo}>
                  <Text style={styles.userTitlePlaceholder}>{title}</Text>
                </View>
              </>
            )}
            <Pressable style={styles.settingsBtn} onPress={() => setShowSettings(true)}>
              <Ionicons name="settings-outline" size={22} color={Colors.text} />
            </Pressable>
          </View>

          <View style={styles.xpSection}>
            <View style={styles.xpHeader}>
              <Text style={styles.xpLabel}>Experience Points</Text>
              <Text style={styles.xpValue}>{xp} / {xpNext} XP</Text>
            </View>
            <View style={styles.xpBar}>
              <View style={[styles.xpFill, { width: `${progress}%`, backgroundColor: Colors.gold }]} />
            </View>
          </View>
        </View>

        {/* Daily Quests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Quests</Text>
          {dailyQuests.map((quest) => {
            const isDone = completedQuestIds.includes(quest.id);
            return (
              <View key={quest.id} style={[styles.questCard, isDone && styles.questCardDone]}>
                <View style={styles.questIcon}>
                  <Ionicons name={quest.icon as any} size={24} color={isDone ? Colors.textMuted : Colors.accent} />
                </View>
                <View style={styles.questInfo}>
                  <Text style={[styles.questTitle, isDone && styles.textMuted]}>{quest.title}</Text>
                  <Text style={styles.questReward}>{quest.xpReward} XP + Item</Text>
                </View>
                <Pressable
                  style={[styles.questBtn, isDone && styles.questBtnDone]}
                  onPress={() => !isDone && handleClaimQuest(quest)}
                  disabled={isDone}
                >
                  <Text style={styles.questBtnText}>{isDone ? "Done" : "Claim"}</Text>
                </Pressable>
              </View>
            );
          })}
        </View>

        {/* Cultural Battle */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cultural Battle</Text>
          <Pressable
            style={({ pressed }) => [
              styles.battleCard,
              pressed && { transform: [{ scale: 0.97 }] },
              { backgroundColor: Colors.forestDeep, borderWidth: 1, borderColor: Colors.forest + "80" }
            ]}
            onPress={() => setShowBattle(true)}
          >
            <View style={styles.battleContent}>
              <View>
                <Text style={styles.battleTitle}>Trivia Arena</Text>
                <Text style={styles.battleStats}>{battleWins} Wins / {battleTotal} Total</Text>
              </View>
              <View style={styles.battleBtn}>
                <Text style={styles.battleBtnText}>Enter</Text>
                <Ionicons name="chevron-forward" size={16} color={Colors.text} />
              </View>
            </View>
          </Pressable>
        </View>

        {/* Journey Map */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Journey Map</Text>
          <Text style={styles.sectionSubtitle}>Your location among the ancient kingdoms of Nusantara</Text>
          <JourneyMapView />
        </View>

        {/* My Collection — 3 columns */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Collection</Text>
          <View style={styles.inventoryGrid}>
            {INVENTORY_ITEMS.map((item) => {
              const owned = inventory.find(i => i.id === item.id);
              return (
                <View key={item.id} style={[styles.itemCard, { width: ITEM_SIZE }, !owned && styles.itemLocked]}>
                  <View style={[styles.itemIconContainer, { borderColor: owned ? RARITY_COLORS[item.rarity] : Colors.border }]}>
                    <MaterialCommunityIcons
                      name={item.icon as any}
                      size={22}
                      color={owned ? RARITY_COLORS[item.rarity] : Colors.textMuted}
                    />
                    {owned && owned.count > 1 && (
                      <View style={styles.itemCount}>
                        <Text style={styles.itemCountText}>{owned.count}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                  <Text style={[styles.itemRarity, { color: owned ? RARITY_COLORS[item.rarity] : Colors.textMuted }]}>{item.rarity}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <TriviaModal visible={showBattle} onClose={() => setShowBattle(false)} />

      {/* Settings Modal */}
      <Modal visible={showSettings} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Settings</Text>
              <Pressable onPress={() => setShowSettings(false)}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </Pressable>
            </View>
            <ScrollView style={styles.settingsScroll}>
              <View style={styles.settingItem}>
                <Text style={styles.settingText}>Language</Text>
                <Text style={styles.settingValue}>English</Text>
              </View>
              <View style={styles.settingItem}>
                <Text style={styles.settingText}>Notifications</Text>
                <Ionicons name="toggle" size={32} color={Colors.primary} />
              </View>
              <View style={styles.settingDivider} />
              {user && (
                <Pressable style={styles.settingItem} onPress={signOut} accessibilityLabel="Sign out" accessibilityRole="button">
                  <Text style={[styles.settingText, { color: Colors.error }]}>Sign Out</Text>
                  <Ionicons name="log-out-outline" size={24} color={Colors.error} />
                </Pressable>
              )}
              <View style={styles.settingItem}>
                <Text style={styles.settingText}>PIDI DIGDAYA 2026</Text>
                <Ionicons name="medal" size={24} color={Colors.accent} />
              </View>
              <Pressable style={styles.settingItem} onPress={() => {}}>
                <Text style={styles.settingText}>GitHub Repository</Text>
                <Ionicons name="logo-github" size={24} color={Colors.text} />
              </Pressable>
              <View style={styles.versionInfo}>
                <Text style={styles.versionText}>Nusantara Journey v1.0.0</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { padding: 20, paddingBottom: 30 },
  headerTop: { flexDirection: "row", alignItems: "center", gap: 15, marginBottom: 25 },
  headerInfo: { flex: 1 },
  userName: { fontSize: 20, fontFamily: "Inter_700Bold", color: Colors.text },
  userEmail: { fontSize: 12, color: Colors.textMuted, fontFamily: "Inter_400Regular", marginBottom: 2 },
  userTitle: { fontSize: 14, color: Colors.accent, fontFamily: "Inter_500Medium" },
  userTitlePlaceholder: { fontSize: 14, color: Colors.accent, fontFamily: "Inter_500Medium" },
  avatarContainer: { position: "relative" },
  avatar: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: Colors.accent },
  avatarPlaceholder: { backgroundColor: Colors.surface, alignItems: "center", justifyContent: "center" },
  avatarLevelBadge: {
    position: "absolute", bottom: -5, right: -5,
    backgroundColor: Colors.primary, width: 24, height: 24, borderRadius: 12,
    alignItems: "center", justifyContent: "center",
    borderWidth: 1.5, borderColor: Colors.accent,
  },
  avatarLevelText: { fontSize: 12, fontFamily: "Inter_700Bold", color: Colors.text },
  googleLoginBtn: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "transparent", borderWidth: 1, borderColor: Colors.border,
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 25, gap: 10,
  },
  googleLoginText: { fontSize: 14, fontFamily: "Inter_600SemiBold", color: Colors.text },
  settingsBtn: { padding: 8 },
  xpSection: { gap: 10 },
  xpHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  xpLabel: { fontSize: 12, color: Colors.textMuted, fontFamily: "Inter_600SemiBold" },
  xpValue: { fontSize: 13, color: Colors.text, fontFamily: "Inter_700Bold" },
  xpBar: { height: 8, backgroundColor: Colors.surface, borderRadius: 4, overflow: "hidden" },
  xpFill: { height: "100%", borderRadius: 4 },
  section: { paddingHorizontal: 20, marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontFamily: "Inter_700Bold", color: Colors.text, marginBottom: 4 },
  sectionSubtitle: { fontSize: 12, color: Colors.textMuted, fontFamily: "Inter_400Regular", marginBottom: 14 },
  questCard: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: Colors.surface, borderRadius: 16,
    padding: 16, marginBottom: 12, borderWidth: 1, borderColor: Colors.border,
  },
  questCardDone: { opacity: 0.6 },
  questIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.background, alignItems: "center", justifyContent: "center", marginRight: 15 },
  questInfo: { flex: 1 },
  questTitle: { fontSize: 15, fontFamily: "Inter_600SemiBold", color: Colors.text, marginBottom: 2 },
  questReward: { fontSize: 12, color: Colors.accent, fontFamily: "Inter_500Medium" },
  questBtn: { backgroundColor: Colors.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  questBtnDone: { backgroundColor: Colors.border },
  questBtnText: { fontSize: 13, fontFamily: "Inter_700Bold", color: Colors.text },
  battleCard: { borderRadius: 16, overflow: "hidden", height: 80 },
  battleContent: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20 },
  battleTitle: { fontSize: 18, fontFamily: "Inter_700Bold", color: Colors.text },
  battleStats: { fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: "Inter_500Medium" },
  battleBtn: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.2)", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15, gap: 4 },
  battleBtnText: { fontSize: 13, fontFamily: "Inter_700Bold", color: Colors.text },
  journeyMapContainer: {
    height: 240, borderRadius: 16, overflow: 'hidden',
    borderWidth: 1, borderColor: Colors.border,
  },
  journeyMapFallback: {
    height: 160, borderRadius: 16,
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center', gap: 10,
  },
  journeyMapFallbackText: { fontSize: 13, color: Colors.textMuted, fontFamily: "Inter_500Medium" },
  journeyKingdomMarker: {
    width: 18, height: 18, borderRadius: 9,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: Colors.text,
  },
  userLocationContainer: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  userLocationGlow: {
    position: 'absolute', width: 28, height: 28, borderRadius: 14,
    backgroundColor: Colors.gold, opacity: 0.25,
  },
  userLocationDot: {
    width: 12, height: 12, borderRadius: 6,
    backgroundColor: Colors.gold, borderWidth: 2, borderColor: Colors.text,
  },
  userLocationArrow: { position: 'absolute', top: 0 },
  inventoryGrid: {
    flexDirection: "row", flexWrap: "wrap",
    gap: 8,
  },
  itemCard: { alignItems: "center", marginBottom: 8, paddingHorizontal: 2 },
  itemLocked: { opacity: 0.4 },
  itemIconContainer: {
    width: 54, height: 54, borderRadius: 13,
    backgroundColor: Colors.surface,
    alignItems: "center", justifyContent: "center",
    borderWidth: 2, marginBottom: 6,
    position: "relative",
  },
  itemCount: { position: "absolute", top: -4, right: -4, backgroundColor: Colors.primary, width: 16, height: 16, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  itemCountText: { fontSize: 9, color: Colors.text, fontFamily: "Inter_700Bold" },
  itemName: { fontSize: 9, fontFamily: "Inter_600SemiBold", color: Colors.text, textAlign: "center" },
  itemRarity: { fontSize: 8, fontFamily: "Inter_700Bold", marginTop: 2 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", padding: 20 },
  modalContent: { backgroundColor: Colors.backgroundSecondary, borderRadius: 24, overflow: "hidden", maxHeight: "80%" },
  modalHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 20, borderBottomWidth: 1, borderColor: Colors.border },
  modalTitle: { fontSize: 18, fontFamily: "Inter_700Bold", color: Colors.text },
  triviaStart: { padding: 40, alignItems: "center", gap: 20 },
  triviaText: { fontSize: 15, color: Colors.textSecondary, textAlign: "center", lineHeight: 22 },
  primaryBtn: { backgroundColor: Colors.primary, paddingHorizontal: 30, paddingVertical: 15, borderRadius: 30 },
  primaryBtnText: { fontSize: 16, fontFamily: "Inter_700Bold", color: Colors.text },
  quizContent: { padding: 20, gap: 20 },
  quizProgress: { fontSize: 12, color: Colors.accent, fontFamily: "Inter_600SemiBold", textTransform: "uppercase" },
  quizQuestion: { fontSize: 18, fontFamily: "Inter_700Bold", color: Colors.text, lineHeight: 26 },
  optionsGrid: { gap: 10 },
  optionBtn: { backgroundColor: Colors.surface, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: Colors.border },
  optionSelected: { borderColor: Colors.accent },
  optionCorrect: { backgroundColor: Colors.success, borderColor: Colors.success },
  optionWrong: { backgroundColor: Colors.error, borderColor: Colors.error },
  optionText: { fontSize: 15, color: Colors.text, fontFamily: "Inter_500Medium" },
  resultTitle: { fontSize: 24, fontFamily: "Inter_700Bold", color: Colors.text },
  xpGained: { fontSize: 18, color: Colors.accent, fontFamily: "Inter_700Bold" },
  settingsScroll: { padding: 10 },
  settingItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 15, borderBottomWidth: 1, borderColor: Colors.border },
  settingText: { fontSize: 16, color: Colors.text, fontFamily: "Inter_500Medium" },
  settingValue: { fontSize: 14, color: Colors.textMuted },
  settingDivider: { height: 20 },
  versionInfo: { padding: 30, alignItems: "center" },
  versionText: { fontSize: 12, color: Colors.textMuted },
  textMuted: { color: Colors.textMuted },
});
