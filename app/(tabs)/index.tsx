import React, { useRef } from "react";
import {
  View, Text, StyleSheet, ScrollView, Pressable,
  Dimensions, Platform, ImageBackground
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue, useAnimatedStyle, withSpring, withTiming, interpolate
} from "react-native-reanimated";
import { Colors } from "@/constants/colors";

const { width, height } = Dimensions.get("window");

const KINGDOMS = [
  { id: 1, name: "Majapahit", period: "1293–1527 CE", location: "East Java", color: "#C4622D", icon: "crown" },
  { id: 2, name: "Sriwijaya", period: "650–1377 CE", location: "South Sumatra", color: "#D4A843", icon: "anchor" },
  { id: 3, name: "Borobudur Era", period: "717–1006 CE", location: "Central Java", color: "#2D5A3D", icon: "temple-buddhist" },
];

const CREATURES = [
  { name: "Garuda", type: "Divine Eagle", desc: "Sacred mount of Vishnu", emoji: "🦅" },
  { name: "Nyai Roro Kidul", type: "Sea Queen", desc: "Ruler of the Southern Sea", emoji: "🌊" },
  { name: "Barong", type: "Lion Spirit", desc: "Protector of Bali", emoji: "🦁" },
  { name: "Kuntilanak", type: "Spirit", desc: "Wandering forest spirit", emoji: "👻" },
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function KingdomCard({ kingdom }: { kingdom: typeof KINGDOMS[0] }) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      style={[styles.kingdomCard, animStyle]}
      onPressIn={() => { scale.value = withSpring(0.96); }}
      onPressOut={() => { scale.value = withSpring(1); }}
      onPress={() => router.push("/kingdoms")}
    >
      <LinearGradient
        colors={[kingdom.color + "CC", kingdom.color + "55"]}
        style={styles.kingdomCardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.kingdomCardIcon}>
          <MaterialCommunityIcons name={kingdom.icon as any} size={28} color="#FFF" />
        </View>
        <Text style={styles.kingdomName}>{kingdom.name}</Text>
        <Text style={styles.kingdomPeriod}>{kingdom.period}</Text>
        <View style={styles.kingdomLocation}>
          <Ionicons name="location" size={12} color="rgba(255,255,255,0.7)" />
          <Text style={styles.kingdomLocationText}>{kingdom.location}</Text>
        </View>
      </LinearGradient>
    </AnimatedPressable>
  );
}

function CreatureCard({ creature }: { creature: typeof CREATURES[0] }) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      style={[styles.creatureCard, animStyle]}
      onPressIn={() => { scale.value = withSpring(0.95); }}
      onPressOut={() => { scale.value = withSpring(1); }}
      onPress={() => router.push("/guide")}
    >
      <View style={styles.creatureEmoji}>
        <Text style={{ fontSize: 32 }}>{creature.emoji}</Text>
      </View>
      <Text style={styles.creatureName}>{creature.name}</Text>
      <Text style={styles.creatureType}>{creature.type}</Text>
      <Text style={styles.creatureDesc} numberOfLines={2}>{creature.desc}</Text>
    </AnimatedPressable>
  );
}

export default function DiscoverScreen() {
  const insets = useSafeAreaInsets();

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : 0;

  return (
    <View style={[styles.container, { paddingBottom: bottomPadding }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scroll}
        contentContainerStyle={{ paddingTop: topPadding, paddingBottom: 120 }}
      >
        {/* Hero Section */}
        <View style={styles.hero}>
          <LinearGradient
            colors={["#1A0A00", Colors.bark, "#2D1A0A"]}
            style={StyleSheet.absoluteFill}
          />
          <View style={[styles.batikPattern]}>
            {[...Array(6)].map((_, i) => (
              <View key={i} style={[styles.batikDiamond, {
                left: (i % 3) * 120 + 20,
                top: Math.floor(i / 3) * 80 + 10,
                opacity: 0.06,
              }]} />
            ))}
          </View>
          <View style={styles.heroContent}>
            <View style={styles.heroTag}>
              <Text style={styles.heroTagText}>PIDI 2026 · Heritage Tourism</Text>
            </View>
            <Text style={styles.heroTitle}>Nusantara{"\n"}Journey</Text>
            <Text style={styles.heroSubtitle}>
              Explore 1000 years of Indonesian kingdoms, mythology, and living culture
            </Text>
            <View style={styles.heroStats}>
              {[
                { value: "10", label: "Kingdoms" },
                { value: "22+", label: "Creatures" },
                { value: "1000+", label: "Years" },
              ].map((stat, i) => (
                <View key={i} style={styles.heroStat}>
                  <Text style={styles.heroStatValue}>{stat.value}</Text>
                  <Text style={styles.heroStatLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          {[
            { icon: "map", label: "Kingdoms", route: "/kingdoms", color: Colors.terracotta },
            { icon: "chatbubbles", label: "Ask Guide", route: "/guide", color: Colors.accent },
            { icon: "bag", label: "Shop UMKM", route: "/marketplace", color: Colors.forest },
            { icon: "person", label: "My Journey", route: "/profile", color: Colors.jade },
          ].map((action, i) => (
            <Pressable
              key={i}
              style={({ pressed }) => [styles.quickAction, pressed && styles.quickActionPressed]}
              onPress={() => router.push(action.route as any)}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: action.color + "25" }]}>
                <Ionicons name={action.icon as any} size={22} color={action.color} />
              </View>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Featured Kingdoms */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Kingdoms</Text>
            <Pressable onPress={() => router.push("/kingdoms")}>
              <Text style={styles.sectionMore}>See all</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            {KINGDOMS.map((k) => <KingdomCard key={k.id} kingdom={k} />)}
          </ScrollView>
        </View>

        {/* Mythology Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mythology</Text>
            <Pressable onPress={() => router.push("/guide")}>
              <Text style={styles.sectionMore}>Ask Guide</Text>
            </Pressable>
          </View>
          <View style={styles.creaturesGrid}>
            {CREATURES.map((c, i) => <CreatureCard key={i} creature={c} />)}
          </View>
        </View>

        {/* AI Guide Banner */}
        <Pressable
          style={({ pressed }) => [styles.guideBanner, pressed && { opacity: 0.9 }]}
          onPress={() => router.push("/guide")}
        >
          <LinearGradient
            colors={[Colors.forestDeep, Colors.forest]}
            style={styles.guideBannerGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.guideBannerLeft}>
              <Text style={styles.guideBannerTitle}>Meet Arjuna</Text>
              <Text style={styles.guideBannerSubtitle}>Your AI cultural guide to Indonesian heritage, history, and tourism</Text>
              <View style={styles.guideBannerButton}>
                <Text style={styles.guideBannerButtonText}>Start Conversation</Text>
                <Ionicons name="arrow-forward" size={14} color={Colors.primary} />
              </View>
            </View>
            <View style={styles.guideBannerRight}>
              <Text style={{ fontSize: 56 }}>🏛️</Text>
            </View>
          </LinearGradient>
        </Pressable>

        {/* UMKM Highlight */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Support Local UMKM</Text>
            <Pressable onPress={() => router.push("/marketplace")}>
              <Text style={styles.sectionMore}>Browse</Text>
            </Pressable>
          </View>
          <View style={styles.umkmCards}>
            {[
              { name: "Batik Craftsmen", location: "Solo & Yogyakarta", icon: "shirt" },
              { name: "Keris Forgers", location: "Madura, East Java", icon: "hammer" },
              { name: "Silver Artisans", location: "Kotagede, Yogyakarta", icon: "diamond" },
            ].map((u, i) => (
              <Pressable
                key={i}
                style={({ pressed }) => [styles.umkmCard, pressed && { opacity: 0.8 }]}
                onPress={() => router.push("/marketplace")}
              >
                <View style={styles.umkmIconBox}>
                  <Ionicons name={u.icon as any} size={20} color={Colors.accent} />
                </View>
                <Text style={styles.umkmName}>{u.name}</Text>
                <View style={styles.umkmLocation}>
                  <Ionicons name="location" size={10} color={Colors.textMuted} />
                  <Text style={styles.umkmLocationText}>{u.location}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  hero: {
    height: 360,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  batikPattern: { ...StyleSheet.absoluteFillObject },
  batikDiamond: {
    position: "absolute",
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: Colors.gold,
    transform: [{ rotate: "45deg" }],
  },
  heroContent: { padding: 24, paddingBottom: 32 },
  heroTag: {
    backgroundColor: Colors.primary + "33",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary + "55",
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  heroTagText: { color: Colors.primaryLight, fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1 },
  heroTitle: { fontSize: 48, fontFamily: "Inter_700Bold", color: Colors.text, lineHeight: 52, marginBottom: 10 },
  heroSubtitle: { fontSize: 14, color: Colors.textSecondary, fontFamily: "Inter_400Regular", lineHeight: 20, marginBottom: 20 },
  heroStats: { flexDirection: "row", gap: 24 },
  heroStat: { alignItems: "center" },
  heroStatValue: { fontSize: 22, fontFamily: "Inter_700Bold", color: Colors.accent },
  heroStatLabel: { fontSize: 11, color: Colors.textMuted, fontFamily: "Inter_500Medium" },
  quickActions: {
    flexDirection: "row",
    padding: 16,
    gap: 8,
    backgroundColor: Colors.backgroundSecondary,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  quickAction: { flex: 1, alignItems: "center", gap: 6, paddingVertical: 8 },
  quickActionPressed: { opacity: 0.7 },
  quickActionIcon: { width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  quickActionLabel: { fontSize: 11, color: Colors.textSecondary, fontFamily: "Inter_500Medium" },
  section: { paddingTop: 24 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontFamily: "Inter_700Bold", color: Colors.text },
  sectionMore: { fontSize: 13, color: Colors.primary, fontFamily: "Inter_600SemiBold" },
  horizontalScroll: { paddingHorizontal: 20, gap: 12 },
  kingdomCard: { width: 160, borderRadius: 16, overflow: "hidden" },
  kingdomCardGradient: { padding: 16, height: 160, justifyContent: "flex-end" },
  kingdomCardIcon: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center", justifyContent: "center",
    marginBottom: 8,
  },
  kingdomName: { fontSize: 15, fontFamily: "Inter_700Bold", color: "#FFF", marginBottom: 2 },
  kingdomPeriod: { fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "Inter_500Medium", marginBottom: 6 },
  kingdomLocation: { flexDirection: "row", alignItems: "center", gap: 3 },
  kingdomLocationText: { fontSize: 10, color: "rgba(255,255,255,0.6)", fontFamily: "Inter_400Regular" },
  creaturesGrid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 16, gap: 10 },
  creatureCard: {
    width: (width - 52) / 2,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  creatureEmoji: { marginBottom: 8 },
  creatureName: { fontSize: 15, fontFamily: "Inter_700Bold", color: Colors.text, marginBottom: 2 },
  creatureType: { fontSize: 11, color: Colors.primary, fontFamily: "Inter_600SemiBold", marginBottom: 4 },
  creatureDesc: { fontSize: 12, color: Colors.textMuted, fontFamily: "Inter_400Regular", lineHeight: 16 },
  guideBanner: { marginHorizontal: 20, marginTop: 24, borderRadius: 18, overflow: "hidden" },
  guideBannerGradient: { flexDirection: "row", padding: 20, alignItems: "center" },
  guideBannerLeft: { flex: 1 },
  guideBannerTitle: { fontSize: 20, fontFamily: "Inter_700Bold", color: Colors.text, marginBottom: 6 },
  guideBannerSubtitle: { fontSize: 13, color: Colors.textSecondary, fontFamily: "Inter_400Regular", lineHeight: 18, marginBottom: 14 },
  guideBannerButton: { flexDirection: "row", alignItems: "center", gap: 6 },
  guideBannerButtonText: { fontSize: 13, color: Colors.primary, fontFamily: "Inter_600SemiBold" },
  guideBannerRight: { marginLeft: 12 },
  umkmCards: { flexDirection: "row", paddingHorizontal: 20, gap: 10 },
  umkmCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
  },
  umkmIconBox: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.accent + "20",
    alignItems: "center", justifyContent: "center",
    marginBottom: 8,
  },
  umkmName: { fontSize: 12, fontFamily: "Inter_600SemiBold", color: Colors.text, textAlign: "center", marginBottom: 4 },
  umkmLocation: { flexDirection: "row", alignItems: "center", gap: 3 },
  umkmLocationText: { fontSize: 10, color: Colors.textMuted, fontFamily: "Inter_400Regular", textAlign: "center" },
});
