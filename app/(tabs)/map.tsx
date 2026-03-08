import React, { useState, useMemo } from "react";
import {
  View, Text, StyleSheet, ScrollView, Pressable,
  Dimensions, Platform
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { Colors } from "@/constants/colors";
import { router } from "expo-router";
import { useGame } from "@/context/GameContext";
import { NusantaraMapView as MapView, NusantaraMarker as Marker, NusantaraCircle as Circle, NusantaraCallout as Callout } from "@/components/MapWrapper";
import { HERITAGE_SITES, MUSEUMS, UMKM_ARTISANS, KINGDOM_CENTROIDS, Place } from "@/constants/places-data";

const { width, height: SCREEN_HEIGHT } = Dimensions.get("window");

const KINGDOMS = [
  {
    id: 1, name: "Sriwijaya", period: "650–1377 CE", location: "Palembang, South Sumatra",
    religion: "Buddhist", type: "Maritime Empire",
    color: "#D4A843", accent: "#F0C870",
    description: "The greatest maritime empire of Southeast Asia. Controlled the Malacca Strait and became the center of Buddhist learning in Asia.",
    highlights: ["Palembang city center", "Bukit Seguntang", "Karang Berahi inscription"],
    products: ["Gold jewelry", "Spices", "Buddhist manuscripts"],
    icon: "ship-wheel",
  },
  {
    id: 2, name: "Mataram Kuno", period: "717–1006 CE", location: "Central Java",
    religion: "Hindu-Buddhist", type: "Agricultural Kingdom",
    color: "#5B8A6E", accent: "#7AAA8E",
    description: "Built the magnificent Borobudur and Prambanan temples. A kingdom that masterfully blended Hindu and Buddhist traditions.",
    highlights: ["Borobudur Temple", "Prambanan Temple", "Dieng Plateau"],
    products: ["Stone carvings", "Bronze statues", "Temple offerings"],
    icon: "temple-buddhist",
  },
  {
    id: 3, name: "Singhasari", period: "1222–1292 CE", location: "Malang, East Java",
    religion: "Hindu-Buddhist", type: "Military Kingdom",
    color: "#8B4513", accent: "#A0522D",
    description: "Founded by the legendary Ken Arok, rose from humble origins to become a major power. Known for its fierce warriors and spiritual power.",
    highlights: ["Candi Singhasari", "Candi Kidal", "Candi Jago"],
    products: ["Bronze weapons", "Royal insignia", "Traditional masks"],
    icon: "sword",
  },
  {
    id: 4, name: "Majapahit", period: "1293–1527 CE", location: "Trowulan, East Java",
    religion: "Hindu-Buddhist", type: "Imperial Empire",
    color: "#C4622D", accent: "#E07840",
    description: "The greatest Hindu-Buddhist empire in Indonesian history, unifying the entire Nusantara archipelago.",
    highlights: ["Trowulan ruins", "Candi Brahu", "Museum Trowulan"],
    products: ["Keris daggers", "Gold ornaments", "Wayang puppets"],
    icon: "crown",
  },
  {
    id: 5, name: "Demak Sultanate", period: "1475–1554 CE", location: "Demak, Central Java",
    religion: "Islamic", type: "Islamic Sultanate",
    color: "#2D5A3D", accent: "#3D7A52",
    description: "The first Islamic sultanate in Java, founded with the help of Wali Songo (Nine Saints).",
    highlights: ["Masjid Agung Demak", "Makam Sunan Kalijaga", "Museum Islam Demak"],
    products: ["Islamic textiles", "Prayer items", "Traditional batik"],
    icon: "mosque",
  },
  {
    id: 6, name: "Mataram Islam", period: "1586–1755 CE", location: "Yogyakarta, Central Java",
    religion: "Islamic", type: "Islamic Kingdom",
    color: "#4A3020", accent: "#6A4030",
    description: "The last major Javanese kingdom before Dutch colonization. Created the definitive Javanese court culture.",
    highlights: ["Keraton Yogyakarta", "Keraton Surakarta", "Imogiri Royal Cemetery"],
    products: ["Royal batik", "Gamelan instruments", "Court jewelry"],
    icon: "castle",
  },
  {
    id: 7, name: "Kediri", period: "1045–1222 CE", location: "Kediri, East Java",
    religion: "Hindu", type: "Literary Kingdom",
    color: "#8B6914", accent: "#B08930",
    description: "Known as the golden age of Javanese literature. King Jayabaya's prophecies about Indonesia's future were created here.",
    highlights: ["Candi Tegowangi", "Candi Surowono", "Museum Airlangga"],
    products: ["Lontar manuscripts", "Literary crafts", "Traditional textiles"],
    icon: "book",
  },
  {
    id: 8, name: "Kahuripan", period: "1006–1045 CE", location: "East Java",
    religion: "Hindu-Buddhist", type: "United Kingdom",
    color: "#4A6741", accent: "#5A8751",
    description: "Founded by the legendary King Airlangga after the great Wringin Sapta civil war.",
    highlights: ["Candi Belahan", "Candi Jolotundo", "Petirtaan Jolotundo"],
    products: ["Limestone carvings", "Bronze ornaments"],
    icon: "infinity",
  },
  {
    id: 9, name: "Medang Kemulan", period: "850–1006 CE", location: "East Java",
    religion: "Hindu-Buddhist", type: "River Kingdom",
    color: "#5C3D1A", accent: "#7C5D3A",
    description: "A continuation of the Mataram tradition in East Java. Built along the Brantas River valley.",
    highlights: ["Candi Gunung Gangsir", "Candi Pari", "Brantas River sites"],
    products: ["Bronze artifacts", "Traditional textiles"],
    icon: "water",
  },
  {
    id: 10, name: "Pajang", period: "1549–1587 CE", location: "Kartasura, Central Java",
    religion: "Islamic", type: "Transitional Kingdom",
    color: "#3D5C3A", accent: "#5D7C5A",
    description: "A brief but important transitional kingdom between Demak and Mataram Islam.",
    highlights: ["Kartasura Palace ruins", "Laweyan batik village"],
    products: ["Early Islamic batik", "Court textiles"],
    icon: "flag",
  },
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type FilterType = 'All' | 'Museum' | 'UMKM' | 'Heritage' | 'Kingdoms';

function KingdomItem({ kingdom, isSelected, onPress }: {
  kingdom: typeof KINGDOMS[0];
  isSelected: boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      style={[
        styles.kingdomItem, 
        animStyle, 
        { 
          backgroundColor: Colors.surface,
          borderWidth: 1,
          borderColor: isSelected ? kingdom.color + "60" : Colors.border,
          borderRadius: 14,
          marginBottom: 10,
        }
      ]}
      onPressIn={() => { scale.value = withSpring(0.97); }}
      onPressOut={() => { scale.value = withSpring(1); }}
      onPress={onPress}
    >
      <View style={[styles.kingdomItemDot, { backgroundColor: kingdom.color }]} />
      <View style={styles.kingdomItemContent}>
        <View style={styles.kingdomItemHeader}>
          <Text style={styles.kingdomItemName}>{kingdom.name}</Text>
          <View style={[styles.kingdomItemTag, { backgroundColor: kingdom.color + "22" }]}>
            <Text style={[styles.kingdomItemTagText, { color: kingdom.accent }]}>{kingdom.type}</Text>
          </View>
        </View>
        <Text style={styles.kingdomItemPeriod}>{kingdom.period}</Text>
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

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const [selectedKingdom, setSelectedKingdom] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const { gainXP } = useGame();

  const handleSelectKingdom = (id: number) => {
    if (selectedKingdom !== id) {
      gainXP(10, "kingdom_explore");
    }
    setSelectedKingdom(selectedKingdom === id ? null : id);
  };

  const filters: FilterType[] = ['All', 'Museum', 'UMKM', 'Heritage', 'Kingdoms'];

  const filteredPlaces = useMemo(() => {
    let places: Place[] = [];
    if (activeFilter === 'All' || activeFilter === 'Museum') places = [...places, ...MUSEUMS];
    if (activeFilter === 'All' || activeFilter === 'UMKM') places = [...places, ...UMKM_ARTISANS];
    if (activeFilter === 'All' || activeFilter === 'Heritage') places = [...places, ...HERITAGE_SITES];
    return places;
  }, [activeFilter]);

  const topPadding = Platform.OS === "web" ? 67 : insets.top;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPadding + 12 }]}>
        <Text style={styles.headerTitle}>Map</Text>
        <Text style={styles.headerSubtitle}>Explore Nusantara</Text>
      </View>

      {/* Filter Pills */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {filters.map(filter => (
            <Pressable
              key={filter}
              style={[styles.filterPill, activeFilter === filter && styles.filterPillActive]}
              onPress={() => {
                setActiveFilter(filter);
                setSelectedPlace(null);
              }}
            >
              <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Map View */}
      <View style={styles.mapWrapper}>
        {Platform.OS === 'web' ? (
          <View style={styles.webFallback}>
            <Ionicons name="map-outline" size={48} color={Colors.textMuted} />
            <Text style={styles.webFallbackText}>Open in Expo Go to view live map</Text>
          </View>
        ) : (
          <MapView
            style={StyleSheet.absoluteFill}
            initialRegion={{
              latitude: -5,
              longitude: 117,
              latitudeDelta: 12,
              longitudeDelta: 12,
            }}
            userInterfaceStyle="dark"
          >
            {filteredPlaces.map(place => (
              <Marker
                key={place.id}
                coordinate={{ latitude: place.lat, longitude: place.lng }}
                onPress={() => setSelectedPlace(place)}
                pinColor={
                  place.type === 'museum' ? '#4A90D9' :
                  place.type === 'umkm' ? Colors.gold :
                  Colors.primary
                }
              >
                <Callout tooltip>
                  <View style={styles.callout}>
                    <Ionicons 
                      name={place.type === 'museum' ? 'library' : place.type === 'umkm' ? 'bag' : 'business'} 
                      size={14} 
                      color="#FFF" 
                    />
                    <Text style={styles.calloutText}>{place.name}</Text>
                  </View>
                </Callout>
              </Marker>
            ))}

            {(activeFilter === 'All' || activeFilter === 'Kingdoms') && KINGDOM_CENTROIDS.map((k, i) => (
              <React.Fragment key={i}>
                <Circle
                  center={{ latitude: k.lat, longitude: k.lng }}
                  radius={80000}
                  strokeColor={k.color}
                  fillColor={k.color + "18"}
                />
                <Marker
                  coordinate={{ latitude: k.lat, longitude: k.lng }}
                  title={k.name}
                  description={k.period}
                >
                  <View style={[styles.kingdomMarker, { backgroundColor: k.color }]}>
                    <MaterialCommunityIcons name="crown" size={12} color="#FFF" />
                  </View>
                </Marker>
              </React.Fragment>
            ))}
          </MapView>
        )}
      </View>

      {/* Selected Place Card */}
      {selectedPlace && (
        <View style={styles.selectedPlaceOverlay}>
          <View style={styles.placeCard}>
            <View style={styles.placeCardHeader}>
              <View style={styles.placeCardInfo}>
                <Text style={styles.placeCardName}>{selectedPlace.name}</Text>
                <Text style={styles.placeCardType}>{selectedPlace.type.toUpperCase()} · {selectedPlace.kingdom}</Text>
              </View>
              <Pressable onPress={() => setSelectedPlace(null)}>
                <Ionicons name="close-circle" size={24} color={Colors.textMuted} />
              </Pressable>
            </View>
            <Text style={styles.placeCardDesc} numberOfLines={2}>{selectedPlace.description}</Text>
            <Pressable 
              style={styles.placeCardAction}
              onPress={() => router.push({
                pathname: "/guide",
                params: { initialMessage: `Tell me about ${selectedPlace.name}` }
              })}
            >
              <Text style={styles.placeCardActionText}>Learn more</Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* Kingdoms List Section */}
      <ScrollView 
        style={styles.scroll} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {(activeFilter === 'All' || activeFilter === 'Kingdoms') && (
          <View style={styles.kingdomsSection}>
            <Text style={styles.sectionTitle}>Kingdoms History</Text>
            {KINGDOMS.map(k => (
              <View key={k.id}>
                <KingdomItem
                  kingdom={k}
                  isSelected={selectedKingdom === k.id}
                  onPress={() => handleSelectKingdom(k.id)}
                />
                {selectedKingdom === k.id && <KingdomDetail kingdom={k} />}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerTitle: { fontSize: 28, fontFamily: "Inter_700Bold", color: Colors.text },
  headerSubtitle: { fontSize: 14, color: Colors.accent, fontFamily: "Inter_500Medium" },
  filterContainer: { paddingBottom: 16 },
  filterScroll: { paddingHorizontal: 20, gap: 8 },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: { fontSize: 13, fontFamily: "Inter_600SemiBold", color: Colors.textSecondary },
  filterTextActive: { color: "#FFF" },
  mapWrapper: {
    height: SCREEN_HEIGHT * 0.42,
    width: '100%',
    backgroundColor: Colors.backgroundSecondary,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  webFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  webFallbackText: {
    color: Colors.textMuted,
    fontFamily: "Inter_500Medium",
    fontSize: 16,
  },
  callout: {
    backgroundColor: Colors.surface,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  calloutText: {
    color: Colors.text,
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  kingdomMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 100 },
  kingdomsSection: { marginTop: 8 },
  sectionTitle: { fontSize: 18, fontFamily: "Inter_700Bold", color: Colors.text, marginBottom: 16 },
  kingdomItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  kingdomItemDot: { width: 10, height: 10, borderRadius: 5, marginRight: 12, flexShrink: 0 },
  kingdomItemContent: { flex: 1 },
  kingdomItemHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 3 },
  kingdomItemName: { fontSize: 16, fontFamily: "Inter_700Bold", color: Colors.text },
  kingdomItemTag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  kingdomItemTagText: { fontSize: 10, fontFamily: "Inter_600SemiBold" },
  kingdomItemPeriod: { fontSize: 12, color: Colors.textMuted, fontFamily: "Inter_500Medium" },
  detailCard: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: -4,
  },
  detailDescription: { fontSize: 14, color: Colors.textSecondary, fontFamily: "Inter_400Regular", lineHeight: 20, marginBottom: 16 },
  detailSection: { marginBottom: 14 },
  detailSectionTitle: { fontSize: 12, color: Colors.textMuted, fontFamily: "Inter_600SemiBold", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 },
  detailListItem: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 5 },
  detailBullet: { width: 6, height: 6, borderRadius: 3, flexShrink: 0 },
  detailListText: { fontSize: 13, color: Colors.text, fontFamily: "Inter_400Regular" },
  productTags: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  productTag: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, borderWidth: 1 },
  productTagText: { fontSize: 12, fontFamily: "Inter_500Medium" },
  guideButton: {
    flexDirection: "row", alignItems: "center", gap: 8,
    paddingVertical: 10, paddingHorizontal: 14,
    borderRadius: 10, borderWidth: 1,
    marginTop: 4,
  },
  guideButtonText: { fontSize: 13, fontFamily: "Inter_600SemiBold" },
  selectedPlaceOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    zIndex: 10,
  },
  placeCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.accent + "30",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  placeCardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  placeCardInfo: { flex: 1 },
  placeCardName: { fontSize: 18, fontFamily: "Inter_700Bold", color: Colors.text },
  placeCardType: { fontSize: 11, color: Colors.accent, fontFamily: "Inter_600SemiBold", marginTop: 2 },
  placeCardDesc: { fontSize: 13, color: Colors.textSecondary, fontFamily: "Inter_400Regular", lineHeight: 18, marginBottom: 12 },
  placeCardAction: {
    backgroundColor: Colors.primary + "20",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary + "40",
  },
  placeCardActionText: { color: Colors.primaryLight, fontSize: 14, fontFamily: "Inter_600SemiBold" },
});
