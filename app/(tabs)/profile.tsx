import React, { useState } from "react";
import {
  View, Text, StyleSheet, ScrollView, Pressable, Switch, Platform
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/colors";
import { useCart } from "@/context/CartContext";

const ACHIEVEMENTS = [
  { id: 1, name: "Kingdom Scholar", desc: "Learned about 5 kingdoms", icon: "school", earned: true, color: Colors.accent },
  { id: 2, name: "Mythology Seeker", desc: "Discovered 10 creatures", icon: "eye", earned: true, color: Colors.primary },
  { id: 3, name: "Culture Guardian", desc: "Supported 3 UMKM", icon: "shield", earned: false, color: Colors.forest },
  { id: 4, name: "Arjuna's Student", desc: "Asked 20 questions", icon: "chatbubble", earned: false, color: Colors.jade },
  { id: 5, name: "Heritage Explorer", desc: "Visited all kingdoms", icon: "map", earned: false, color: Colors.accent },
  { id: 6, name: "Nusantara Master", desc: "Completed all quests", icon: "crown", earned: false, color: Colors.primary },
];

const IMPACT_STATS = [
  { value: "3", label: "UMKM Supported", icon: "bag", color: Colors.primary },
  { value: "7", label: "Sites Explored", icon: "map", color: Colors.accent },
  { value: "12", label: "AI Chats", icon: "chatbubble", color: Colors.forest },
  { value: "2", label: "Kingdoms Mastered", icon: "crown", color: Colors.jade },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [language, setLanguage] = useState<"en" | "id">("en");
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const { totalItems } = useCart();

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : 0;

  const earnedCount = ACHIEVEMENTS.filter(a => a.earned).length;

  return (
    <View style={[styles.container, { paddingBottom: bottomPadding }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingTop: topPadding, paddingBottom: 120 }}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <LinearGradient
            colors={["#1A0A00", Colors.bark, "#2D1A0A"]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.batikAccent} />
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <LinearGradient
                colors={[Colors.primary, Colors.terracottaDark]}
                style={StyleSheet.absoluteFill}
              />
              <Text style={styles.avatarText}>N</Text>
            </View>
            <View style={styles.profileText}>
              <Text style={styles.profileName}>Nusantara Explorer</Text>
              <Text style={styles.profileLevel}>Level 3 · Heritage Seeker</Text>
              <View style={styles.profileBadge}>
                <Ionicons name="location" size={12} color={Colors.accent} />
                <Text style={styles.profileBadgeText}>Indonesia Journey</Text>
              </View>
            </View>
          </View>
          <View style={styles.xpBar}>
            <View style={styles.xpBarTrack}>
              <View style={[styles.xpBarFill, { width: "62%" }]}>
                <LinearGradient
                  colors={[Colors.primary, Colors.accent]}
                  style={StyleSheet.absoluteFill}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                />
              </View>
            </View>
            <Text style={styles.xpText}>620 / 1000 XP</Text>
          </View>
        </View>

        {/* Impact Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Impact</Text>
          <View style={styles.statsGrid}>
            {IMPACT_STATS.map((stat, i) => (
              <View key={i} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + "20" }]}>
                  <Ionicons name={stat.icon as any} size={18} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <Text style={styles.sectionCount}>{earnedCount}/{ACHIEVEMENTS.length}</Text>
          </View>
          <View style={styles.achievementsGrid}>
            {ACHIEVEMENTS.map(achievement => (
              <View
                key={achievement.id}
                style={[styles.achievementCard, !achievement.earned && styles.achievementCardLocked]}
              >
                <View style={[styles.achievementIcon, {
                  backgroundColor: achievement.earned ? achievement.color + "25" : Colors.border + "50"
                }]}>
                  <Ionicons
                    name={achievement.icon as any}
                    size={22}
                    color={achievement.earned ? achievement.color : Colors.textMuted}
                  />
                  {!achievement.earned && (
                    <View style={styles.lockOverlay}>
                      <Ionicons name="lock-closed" size={12} color={Colors.textMuted} />
                    </View>
                  )}
                </View>
                <Text style={[styles.achievementName, !achievement.earned && styles.achievementNameLocked]}>
                  {achievement.name}
                </Text>
                <Text style={styles.achievementDesc} numberOfLines={2}>{achievement.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Economic Impact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Economic Impact</Text>
          <View style={styles.impactCard}>
            <LinearGradient
              colors={[Colors.forestDeep, Colors.forest + "80"]}
              style={styles.impactCardGrad}
            />
            <View style={styles.impactCardContent}>
              <Text style={styles.impactTitle}>You're making a difference!</Text>
              <Text style={styles.impactDesc}>
                By exploring Indonesian heritage and supporting UMKM, you're contributing to local economic growth and cultural preservation.
              </Text>
              <View style={styles.impactMetrics}>
                {[
                  { label: "Artisans supported", value: "3 families" },
                  { label: "Cultural sites learned", value: "7 locations" },
                  { label: "Heritage knowledge", value: "Level 3" },
                ].map((m, i) => (
                  <View key={i} style={styles.impactMetric}>
                    <View style={styles.impactDot} />
                    <Text style={styles.impactMetricLabel}>{m.label}:</Text>
                    <Text style={styles.impactMetricValue}>{m.value}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsCard}>
            {/* Language Toggle */}
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: Colors.accent + "20" }]}>
                  <Ionicons name="globe" size={18} color={Colors.accent} />
                </View>
                <View>
                  <Text style={styles.settingLabel}>Language</Text>
                  <Text style={styles.settingDesc}>App display language</Text>
                </View>
              </View>
              <View style={styles.languageToggle}>
                <Pressable
                  style={[styles.langBtn, language === "en" && styles.langBtnActive]}
                  onPress={() => setLanguage("en")}
                >
                  <Text style={[styles.langBtnText, language === "en" && styles.langBtnTextActive]}>EN</Text>
                </Pressable>
                <Pressable
                  style={[styles.langBtn, language === "id" && styles.langBtnActive]}
                  onPress={() => setLanguage("id")}
                >
                  <Text style={[styles.langBtnText, language === "id" && styles.langBtnTextActive]}>ID</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.settingDivider} />

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: Colors.primary + "20" }]}>
                  <Ionicons name="notifications" size={18} color={Colors.primary} />
                </View>
                <View>
                  <Text style={styles.settingLabel}>Notifications</Text>
                  <Text style={styles.settingDesc}>Heritage updates & deals</Text>
                </View>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: Colors.border, true: Colors.primary }}
                thumbColor={notifications ? Colors.text : Colors.textMuted}
              />
            </View>

            <View style={styles.settingDivider} />

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: Colors.jade + "20" }]}>
                  <Ionicons name="moon" size={18} color={Colors.jade} />
                </View>
                <View>
                  <Text style={styles.settingLabel}>Dark Mode</Text>
                  <Text style={styles.settingDesc}>Cultural night aesthetic</Text>
                </View>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: Colors.border, true: Colors.jade }}
                thumbColor={darkMode ? Colors.text : Colors.textMuted}
              />
            </View>
          </View>
        </View>

        {/* PIDI Info */}
        <View style={[styles.section, styles.pidiSection]}>
          <LinearGradient
            colors={[Colors.primary + "20", Colors.accent + "10"]}
            style={styles.pidiCard}
          >
            <View style={styles.pidiHeader}>
              <Ionicons name="trophy" size={20} color={Colors.accent} />
              <Text style={styles.pidiTitle}>PIDI DIGDAYA 2026</Text>
            </View>
            <Text style={styles.pidiDesc}>
              Nusantara Journey supports Indonesia's digital economy by connecting cultural heritage tourism with local UMKM artisans through AI-powered storytelling.
            </Text>
            <View style={styles.pidiTags}>
              {["Digitalisasi Pariwisata", "Ekonomi Kreatif", "UMKM Digital"].map((tag, i) => (
                <View key={i} style={styles.pidiTag}>
                  <Text style={styles.pidiTagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  profileHeader: { padding: 24, paddingBottom: 20, overflow: "hidden" },
  batikAccent: {
    position: "absolute", top: -30, right: -30,
    width: 120, height: 120,
    borderWidth: 2, borderColor: Colors.accent + "15",
    transform: [{ rotate: "45deg" }],
  },
  profileInfo: { flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 20 },
  avatar: {
    width: 64, height: 64, borderRadius: 32,
    overflow: "hidden", alignItems: "center", justifyContent: "center",
    borderWidth: 2, borderColor: Colors.primary,
  },
  avatarText: { fontSize: 28, fontFamily: "Inter_700Bold", color: "#FFF", zIndex: 1 },
  profileText: { flex: 1 },
  profileName: { fontSize: 20, fontFamily: "Inter_700Bold", color: Colors.text, marginBottom: 3 },
  profileLevel: { fontSize: 13, color: Colors.accent, fontFamily: "Inter_500Medium", marginBottom: 6 },
  profileBadge: { flexDirection: "row", alignItems: "center", gap: 5 },
  profileBadgeText: { fontSize: 12, color: Colors.textMuted, fontFamily: "Inter_400Regular" },
  xpBar: { gap: 6 },
  xpBarTrack: { height: 6, backgroundColor: Colors.border, borderRadius: 3, overflow: "hidden" },
  xpBarFill: { height: "100%", borderRadius: 3, overflow: "hidden" },
  xpText: { fontSize: 11, color: Colors.textMuted, fontFamily: "Inter_500Medium" },
  section: { paddingHorizontal: 20, paddingTop: 24 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontFamily: "Inter_700Bold", color: Colors.text, marginBottom: 14 },
  sectionCount: { fontSize: 13, color: Colors.textMuted, fontFamily: "Inter_500Medium" },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  statCard: {
    flex: 1, minWidth: "45%",
    backgroundColor: Colors.surface,
    borderRadius: 14, padding: 14,
    borderWidth: 1, borderColor: Colors.border,
    alignItems: "center", gap: 6,
  },
  statIcon: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  statValue: { fontSize: 24, fontFamily: "Inter_700Bold", color: Colors.text },
  statLabel: { fontSize: 11, color: Colors.textMuted, fontFamily: "Inter_500Medium", textAlign: "center" },
  achievementsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  achievementCard: {
    width: "30%", flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 14, padding: 12,
    borderWidth: 1, borderColor: Colors.border,
    alignItems: "center", gap: 6,
    minWidth: 90,
  },
  achievementCardLocked: { opacity: 0.6 },
  achievementIcon: {
    width: 44, height: 44, borderRadius: 22,
    alignItems: "center", justifyContent: "center",
    position: "relative",
  },
  lockOverlay: {
    position: "absolute", bottom: -2, right: -2,
    width: 18, height: 18, borderRadius: 9,
    backgroundColor: Colors.border,
    alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: Colors.backgroundSecondary,
  },
  achievementName: { fontSize: 11, fontFamily: "Inter_600SemiBold", color: Colors.text, textAlign: "center" },
  achievementNameLocked: { color: Colors.textMuted },
  achievementDesc: { fontSize: 10, color: Colors.textMuted, fontFamily: "Inter_400Regular", textAlign: "center", lineHeight: 14 },
  impactCard: { borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: Colors.forest + "50" },
  impactCardGrad: { ...StyleSheet.absoluteFillObject },
  impactCardContent: { padding: 18 },
  impactTitle: { fontSize: 16, fontFamily: "Inter_700Bold", color: Colors.text, marginBottom: 8 },
  impactDesc: { fontSize: 13, color: Colors.textSecondary, fontFamily: "Inter_400Regular", lineHeight: 18, marginBottom: 14 },
  impactMetrics: { gap: 6 },
  impactMetric: { flexDirection: "row", alignItems: "center", gap: 8 },
  impactDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.forest },
  impactMetricLabel: { fontSize: 12, color: Colors.textMuted, fontFamily: "Inter_500Medium" },
  impactMetricValue: { fontSize: 12, color: Colors.forestLight, fontFamily: "Inter_600SemiBold" },
  settingsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16, borderWidth: 1, borderColor: Colors.border,
    overflow: "hidden",
  },
  settingItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16 },
  settingLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  settingIcon: { width: 38, height: 38, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  settingLabel: { fontSize: 14, fontFamily: "Inter_600SemiBold", color: Colors.text, marginBottom: 2 },
  settingDesc: { fontSize: 11, color: Colors.textMuted, fontFamily: "Inter_400Regular" },
  settingDivider: { height: 1, backgroundColor: Colors.border, marginHorizontal: 16 },
  languageToggle: { flexDirection: "row", gap: 4 },
  langBtn: {
    paddingHorizontal: 14, paddingVertical: 6,
    borderRadius: 8, borderWidth: 1, borderColor: Colors.border,
  },
  langBtnActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  langBtnText: { fontSize: 12, color: Colors.textMuted, fontFamily: "Inter_600SemiBold" },
  langBtnTextActive: { color: "#FFF" },
  pidiSection: { paddingBottom: 16 },
  pidiCard: { borderRadius: 16, padding: 18, borderWidth: 1, borderColor: Colors.primary + "30" },
  pidiHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  pidiTitle: { fontSize: 16, fontFamily: "Inter_700Bold", color: Colors.accent },
  pidiDesc: { fontSize: 13, color: Colors.textSecondary, fontFamily: "Inter_400Regular", lineHeight: 18, marginBottom: 14 },
  pidiTags: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  pidiTag: {
    paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 20, borderWidth: 1, borderColor: Colors.primary + "50",
    backgroundColor: Colors.primary + "15",
  },
  pidiTagText: { fontSize: 11, color: Colors.primaryLight, fontFamily: "Inter_500Medium" },
});
