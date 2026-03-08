import React, { useState } from "react";
import {
  View, Text, StyleSheet, ScrollView, Pressable,
  Dimensions, Platform
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from "react-native-reanimated";
import { Colors } from "@/constants/colors";
import { router } from "expo-router";
import { useGame } from "@/context/GameContext";

const { width } = Dimensions.get("window");

const KINGDOMS = [
  {
    id: 1, name: "Sriwijaya", period: "650–1377 CE", location: "Palembang, South Sumatra",
    religion: "Buddhist", type: "Maritime Empire",
    color: "#D4A843", accent: "#F0C870",
    description: "The greatest maritime empire of Southeast Asia. Controlled the Malacca Strait and became the center of Buddhist learning in Asia. At its peak, Sriwijaya's influence stretched from the Malay Peninsula to the Philippines.",
    highlights: ["Palembang city center", "Bukit Seguntang", "Karang Berahi inscription"],
    products: ["Gold jewelry", "Spices", "Buddhist manuscripts"],
    icon: "ship-wheel",
  },
  {
    id: 2, name: "Mataram Kuno", period: "717–1006 CE", location: "Central Java",
    religion: "Hindu-Buddhist", type: "Agricultural Kingdom",
    color: "#5B8A6E", accent: "#7AAA8E",
    description: "Built the magnificent Borobudur and Prambanan temples. A kingdom that masterfully blended Hindu and Buddhist traditions. Its architectural achievements remain UNESCO World Heritage Sites today.",
    highlights: ["Borobudur Temple", "Prambanan Temple", "Dieng Plateau"],
    products: ["Stone carvings", "Bronze statues", "Temple offerings"],
    icon: "temple-buddhist",
  },
  {
    id: 3, name: "Singhasari", period: "1222–1292 CE", location: "Malang, East Java",
    religion: "Hindu-Buddhist", type: "Military Kingdom",
    color: "#8B4513", accent: "#A0522D",
    description: "Founded by the legendary Ken Arok, rose from humble origins to become a major power. Known for its fierce warriors and spiritual power. The kingdom sent expeditions to Sumatra and challenged Chinese dominance in the region.",
    highlights: ["Candi Singhasari", "Candi Kidal", "Candi Jago"],
    products: ["Bronze weapons", "Royal insignia", "Traditional masks"],
    icon: "sword",
  },
  {
    id: 4, name: "Majapahit", period: "1293–1527 CE", location: "Trowulan, East Java",
    religion: "Hindu-Buddhist", type: "Imperial Empire",
    color: "#C4622D", accent: "#E07840",
    description: "The greatest Hindu-Buddhist empire in Indonesian history, unifying the entire Nusantara archipelago. Under Gajah Mada and Hayam Wuruk, Majapahit reached its golden age, controlling territories across modern Indonesia, Malaysia, and the Philippines.",
    highlights: ["Trowulan ruins", "Candi Brahu", "Museum Trowulan", "Siti Inggil"],
    products: ["Keris daggers", "Gold ornaments", "Wayang puppets"],
    icon: "crown",
  },
  {
    id: 5, name: "Demak Sultanate", period: "1475–1554 CE", location: "Demak, Central Java",
    religion: "Islamic", type: "Islamic Sultanate",
    color: "#2D5A3D", accent: "#3D7A52",
    description: "The first Islamic sultanate in Java, founded with the help of Wali Songo (Nine Saints). Demak spread Islam across Java peacefully through culture and trade. The Great Mosque of Demak stands as a symbol of Java's Islamic transformation.",
    highlights: ["Masjid Agung Demak", "Makam Sunan Kalijaga", "Museum Islam Demak"],
    products: ["Islamic textiles", "Prayer items", "Traditional batik"],
    icon: "mosque",
  },
  {
    id: 6, name: "Mataram Islam", period: "1586–1755 CE", location: "Yogyakarta, Central Java",
    religion: "Islamic", type: "Islamic Kingdom",
    color: "#4A3020", accent: "#6A4030",
    description: "The last major Javanese kingdom before Dutch colonization. Its legacy lives on in the Keraton Yogyakarta and Keraton Surakarta. The kingdom created the definitive Javanese court culture — batik, gamelan, wayang, and Javanese language formalities.",
    highlights: ["Keraton Yogyakarta", "Keraton Surakarta", "Imogiri Royal Cemetery"],
    products: ["Royal batik", "Gamelan instruments", "Court jewelry"],
    icon: "castle",
  },
  {
    id: 7, name: "Kediri", period: "1045–1222 CE", location: "Kediri, East Java",
    religion: "Hindu", type: "Literary Kingdom",
    color: "#8B6914", accent: "#B08930",
    description: "Known as the golden age of Javanese literature. The Kakawin Bharatayuddha and other great literary works were created here. King Jayabaya's prophecies about Indonesia's future are still studied and debated today.",
    highlights: ["Candi Tegowangi", "Candi Surowono", "Museum Airlangga"],
    products: ["Lontar manuscripts", "Literary crafts", "Traditional textiles"],
    icon: "book",
  },
  {
    id: 8, name: "Kahuripan", period: "1006–1045 CE", location: "East Java",
    religion: "Hindu-Buddhist", type: "United Kingdom",
    color: "#4A6741", accent: "#5A8751",
    description: "Founded by the legendary King Airlangga after the great Wringin Sapta civil war. Airlangga united the fragmented kingdoms of East Java and created peace. At the end of his reign, he voluntarily divided his kingdom to prevent future conflict.",
    highlights: ["Candi Belahan", "Candi Jolotundo", "Petirtaan Jolotundo"],
    products: ["Limestone carvings", "Bronze ornaments"],
    icon: "infinity",
  },
  {
    id: 9, name: "Medang Kemulan", period: "850–1006 CE", location: "East Java",
    religion: "Hindu-Buddhist", type: "River Kingdom",
    color: "#5C3D1A", accent: "#7C5D3A",
    description: "A continuation of the Mataram tradition in East Java. Built along the Brantas River valley. Known for the Calonarang dance tradition depicting the battle between good and evil forces, still performed in Bali today.",
    highlights: ["Candi Gunung Gangsir", "Candi Pari", "Brantas River sites"],
    products: ["Bronze artifacts", "Traditional textiles"],
    icon: "water",
  },
  {
    id: 10, name: "Pajang", period: "1549–1587 CE", location: "Kartasura, Central Java",
    religion: "Islamic", type: "Transitional Kingdom",
    color: "#3D5C3A", accent: "#5D7C5A",
    description: "A brief but important transitional kingdom between Demak and Mataram Islam. Founded by Jaka Tingkir (Sultan Hadiwijaya), it represented the synthesis of Hindu Javanese court culture with Islamic values that would define later Javanese society.",
    highlights: ["Kartasura Palace ruins", "Laweyan batik village"],
    products: ["Early Islamic batik", "Court textiles"],
    icon: "flag",
  },
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function KingdomItem({ kingdom, isSelected, onPress }: {
  kingdom: typeof KINGDOMS[0];
  isSelected: boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      style={[styles.kingdomItem, animStyle, isSelected && styles.kingdomItemSelected]}
      onPressIn={() => { scale.value = withSpring(0.97); }}
      onPressOut={() => { scale.value = withSpring(1); }}
      onPress={onPress}
    >
      <LinearGradient
        colors={isSelected ? [kingdom.color + "30", kingdom.color + "10"] : ["transparent", "transparent"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
      <View style={[styles.kingdomItemDot, { backgroundColor: kingdom.color }]} />
      <View style={styles.kingdomItemContent}>
        <View style={styles.kingdomItemHeader}>
          <Text style={styles.kingdomItemName}>{kingdom.name}</Text>
          <View style={[styles.kingdomItemTag, { backgroundColor: kingdom.color + "22" }]}>
            <Text style={[styles.kingdomItemTagText, { color: kingdom.accent }]}>{kingdom.type}</Text>
          </View>
        </View>
        <Text style={styles.kingdomItemPeriod}>{kingdom.period}</Text>
        <View style={styles.kingdomItemMeta}>
          <Ionicons name="location" size={11} color={Colors.textMuted} />
          <Text style={styles.kingdomItemLocation}>{kingdom.location}</Text>
          <View style={styles.kingdomItemDivider} />
          <Ionicons name="sunny" size={11} color={Colors.textMuted} />
          <Text style={styles.kingdomItemReligion}>{kingdom.religion}</Text>
        </View>
      </View>
      <Ionicons
        name={isSelected ? "chevron-down" : "chevron-forward"}
        size={16}
        color={isSelected ? kingdom.color : Colors.textMuted}
      />
    </AnimatedPressable>
  );
}

function KingdomDetail({ kingdom }: { kingdom: typeof KINGDOMS[0] }) {
  return (
    <View style={styles.detailCard}>
      <LinearGradient
        colors={[kingdom.color + "18", "transparent"]}
        style={styles.detailGradient}
      />
      <Text style={styles.detailDescription}>{kingdom.description}</Text>

      <View style={styles.detailSection}>
        <Text style={styles.detailSectionTitle}>Heritage Sites</Text>
        {kingdom.highlights.map((h, i) => (
          <View key={i} style={styles.detailListItem}>
            <View style={[styles.detailBullet, { backgroundColor: kingdom.color }]} />
            <Text style={styles.detailListText}>{h}</Text>
          </View>
        ))}
      </View>

      <View style={styles.detailSection}>
        <Text style={styles.detailSectionTitle}>Traditional Products</Text>
        <View style={styles.productTags}>
          {kingdom.products.map((p, i) => (
            <View key={i} style={[styles.productTag, { borderColor: kingdom.color + "50" }]}>
              <Text style={[styles.productTagText, { color: kingdom.accent }]}>{p}</Text>
            </View>
          ))}
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [styles.guideButton, { borderColor: kingdom.color, opacity: pressed ? 0.8 : 1 }]}
        onPress={() => router.push("/guide")}
      >
        <Ionicons name="chatbubble-ellipses" size={16} color={kingdom.color} />
        <Text style={[styles.guideButtonText, { color: kingdom.color }]}>Ask Arjuna about {kingdom.name}</Text>
      </Pressable>
    </View>
  );
}

export default function KingdomsScreen() {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<number | null>(null);
  const { gainXP } = useGame();

  const handleSelect = (id: number) => {
    if (selected !== id) {
      gainXP(10, "kingdom_explore");
    }
    setSelected(selected === id ? null : id);
  };

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : 0;

  return (
    <View style={[styles.container, { paddingBottom: bottomPadding }]}>
      <View style={[styles.header, { paddingTop: topPadding + 12 }]}>
        <LinearGradient colors={["#1A0A00", Colors.backgroundSecondary]} style={StyleSheet.absoluteFill} />
        <Text style={styles.headerTitle}>Indonesian Kingdoms</Text>
        <Text style={styles.headerSubtitle}>7th – 17th Century CE</Text>
        <View style={styles.timeline}>
          <View style={styles.timelineBar} />
          {KINGDOMS.slice(0, 5).map((k, i) => (
            <View key={k.id} style={[styles.timelineDot, { backgroundColor: k.color, left: `${i * 22}%` as any }]} />
          ))}
        </View>
      </View>
      <ScrollView
        style={styles.scroll}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120, paddingTop: 8 }}
      >
        {KINGDOMS.map(k => (
          <View key={k.id}>
            <KingdomItem
              kingdom={k}
              isSelected={selected === k.id}
              onPress={() => handleSelect(k.id)}
            />
            {selected === k.id && <KingdomDetail kingdom={k} />}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    overflow: "hidden",
  },
  headerTitle: { fontSize: 28, fontFamily: "Inter_700Bold", color: Colors.text, marginBottom: 4 },
  headerSubtitle: { fontSize: 14, color: Colors.accent, fontFamily: "Inter_500Medium", marginBottom: 16 },
  timeline: { height: 20, position: "relative", marginBottom: 4 },
  timelineBar: {
    position: "absolute", top: 9, left: 0, right: 0,
    height: 2, backgroundColor: Colors.border,
  },
  timelineDot: {
    position: "absolute", top: 4,
    width: 12, height: 12, borderRadius: 6,
    borderWidth: 2, borderColor: Colors.background,
  },
  scroll: { flex: 1 },
  kingdomItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    overflow: "hidden",
  },
  kingdomItemSelected: { borderBottomWidth: 0 },
  kingdomItemDot: { width: 10, height: 10, borderRadius: 5, marginRight: 12, flexShrink: 0 },
  kingdomItemContent: { flex: 1 },
  kingdomItemHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 3 },
  kingdomItemName: { fontSize: 16, fontFamily: "Inter_700Bold", color: Colors.text },
  kingdomItemTag: {
    paddingHorizontal: 8, paddingVertical: 2,
    borderRadius: 10,
  },
  kingdomItemTagText: { fontSize: 10, fontFamily: "Inter_600SemiBold" },
  kingdomItemPeriod: { fontSize: 12, color: Colors.textMuted, fontFamily: "Inter_500Medium", marginBottom: 5 },
  kingdomItemMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  kingdomItemLocation: { fontSize: 11, color: Colors.textMuted, fontFamily: "Inter_400Regular" },
  kingdomItemDivider: { width: 1, height: 10, backgroundColor: Colors.border, marginHorizontal: 4 },
  kingdomItemReligion: { fontSize: 11, color: Colors.textMuted, fontFamily: "Inter_400Regular" },
  detailCard: {
    marginHorizontal: 20,
    marginBottom: 8,
    padding: 16,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
  },
  detailGradient: { ...StyleSheet.absoluteFillObject },
  detailDescription: { fontSize: 14, color: Colors.textSecondary, fontFamily: "Inter_400Regular", lineHeight: 20, marginBottom: 16 },
  detailSection: { marginBottom: 14 },
  detailSectionTitle: { fontSize: 12, color: Colors.textMuted, fontFamily: "Inter_600SemiBold", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 },
  detailListItem: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 5 },
  detailBullet: { width: 6, height: 6, borderRadius: 3, flexShrink: 0 },
  detailListText: { fontSize: 13, color: Colors.text, fontFamily: "Inter_400Regular" },
  productTags: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  productTag: {
    paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 20, borderWidth: 1,
  },
  productTagText: { fontSize: 12, fontFamily: "Inter_500Medium" },
  guideButton: {
    flexDirection: "row", alignItems: "center", gap: 8,
    paddingVertical: 10, paddingHorizontal: 14,
    borderRadius: 10, borderWidth: 1,
    marginTop: 4,
  },
  guideButtonText: { fontSize: 13, fontFamily: "Inter_600SemiBold" },
});
