import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  View, Text, StyleSheet, ScrollView, Pressable,
  Dimensions, Platform, Modal
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from "react-native-reanimated";
import { Colors } from "@/constants/colors";
import { router } from "expo-router";
import { useGame } from "@/context/GameContext";
import { Image } from "expo-image";
import { NusantaraMapView as MapView, NusantaraMarker as Marker, NusantaraCircle as Circle, NusantaraCallout as Callout } from "@/components/MapWrapper";
import { HERITAGE_SITES, MUSEUMS, UMKM_ARTISANS, FOOD_STANDS, KINGDOM_CENTROIDS, Place } from "@/constants/places-data";
import { TAB_BAR_HEIGHT, WEB_TOP_INSET, WEB_BOTTOM_INSET } from "@/constants/layout";
import * as Location from "expo-location";

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
    color: Colors.primary, accent: Colors.primaryLight,
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
    id: 10, name: "Pajang", period: "1568–1586 CE", location: "Kartasura, Central Java",
    religion: "Islamic", type: "Transitional Kingdom",
    color: "#3D5C3A", accent: "#5D7C5A",
    description: "A brief but important transitional kingdom between Demak and Mataram Islam.",
    highlights: ["Kartasura Palace ruins", "Laweyan batik village"],
    products: ["Early Islamic batik", "Court textiles"],
    icon: "flag",
  },
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type FilterType = 'All' | 'Museum' | 'UMKM' | 'Heritage' | 'Kingdoms' | 'Food';

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

function PlaceRow({ place, onPress }: { place: Place; onPress: () => void }) {
  const typeColor = place.type === 'museum' ? Colors.jade : place.type === 'umkm' ? Colors.gold : place.type === 'food' ? Colors.primaryLight : Colors.primary;
  const typeIcon: any = place.type === 'museum' ? 'library' : place.type === 'umkm' ? 'hammer' : place.type === 'food' ? 'restaurant' : 'trail-sign';

  return (
    <Pressable
      style={({ pressed }) => [styles.placeRow, pressed && { opacity: 0.7 }]}
      onPress={onPress}
    >
      <View style={[styles.placeRowIcon, { backgroundColor: typeColor + "20" }]}>
        <Ionicons name={typeIcon} size={18} color={typeColor} />
      </View>
      <View style={styles.placeRowContent}>
        <Text style={styles.placeRowName} numberOfLines={1}>{place.name}</Text>
        <Text style={styles.placeRowDesc} numberOfLines={1}>{place.description}</Text>
      </View>
      <View style={styles.placeRowMeta}>
        {place.entryFee && <Text style={styles.placeRowFee}>{place.entryFee}</Text>}
        {place.whatToBuy && !place.entryFee && (
          <View style={[styles.placeRowBadge, { backgroundColor: typeColor + "20" }]}>
            <Text style={[styles.placeRowBadgeText, { color: typeColor }]} numberOfLines={1}>{place.whatToBuy}</Text>
          </View>
        )}
        {place.specialty && !place.entryFee && !place.whatToBuy && (
          <View style={[styles.placeRowBadge, { backgroundColor: typeColor + "20" }]}>
            <Text style={[styles.placeRowBadgeText, { color: typeColor }]} numberOfLines={1}>{place.specialty[0]}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

function PlaceDetailModal({ place, onClose }: { place: Place; onClose: () => void }) {
  const typeColor = place.type === 'museum' ? Colors.jade : place.type === 'umkm' ? Colors.gold : place.type === 'food' ? Colors.primaryLight : Colors.primary;
  const typeLabel = place.type === 'museum' ? 'Museum' : place.type === 'umkm' ? 'UMKM Artisan' : place.type === 'food' ? 'Traditional Food' : 'Heritage Site';

  return (
    <Modal visible animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalSheet}>
          <View style={styles.modalHandle} />
          <ScrollView showsVerticalScrollIndicator={false}>
            {place.imageUrl ? (
              <Image source={{ uri: place.imageUrl }} style={styles.modalImage} contentFit="cover" />
            ) : (
              <View style={[styles.modalImageFallback, { backgroundColor: typeColor + "20" }]}>
                <Ionicons name={place.type === 'museum' ? 'library' : place.type === 'umkm' ? 'hammer' : place.type === 'food' ? 'restaurant' : 'trail-sign'} size={48} color={typeColor} />
              </View>
            )}
            <View style={styles.modalBody}>
              <View style={[styles.modalTypeBadge, { backgroundColor: typeColor + "20" }]}>
                <Text style={[styles.modalTypeText, { color: typeColor }]}>{typeLabel}</Text>
              </View>
              <Text style={styles.modalTitle}>{place.name}</Text>
              <View style={styles.modalKingdomRow}>
                <MaterialCommunityIcons name="crown" size={14} color={Colors.accent} />
                <Text style={styles.modalKingdom}>{place.kingdom}</Text>
              </View>
              <Text style={styles.modalDescription}>{place.description}</Text>

              {(place.entryFee || place.openHours) && (
                <View style={styles.modalInfoGrid}>
                  {place.entryFee && (
                    <View style={styles.modalInfoItem}>
                      <Ionicons name="ticket" size={16} color={Colors.accent} />
                      <View>
                        <Text style={styles.modalInfoLabel}>Entry Fee</Text>
                        <Text style={styles.modalInfoValue}>{place.entryFee}</Text>
                      </View>
                    </View>
                  )}
                  {place.openHours && (
                    <View style={styles.modalInfoItem}>
                      <Ionicons name="time" size={16} color={Colors.accent} />
                      <View>
                        <Text style={styles.modalInfoLabel}>Open Hours</Text>
                        <Text style={styles.modalInfoValue}>{place.openHours}</Text>
                      </View>
                    </View>
                  )}
                </View>
              )}

              {place.specialty && place.specialty.length > 0 && (
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>{place.type === 'food' ? 'Signature Dishes' : 'Specialties'}</Text>
                  <View style={styles.modalTags}>
                    {place.specialty.map((s, i) => (
                      <View key={i} style={[styles.modalTag, { borderColor: typeColor + "50" }]}>
                        <Text style={[styles.modalTagText, { color: typeColor }]}>{s}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {place.whatToBuy && (
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>What to Buy</Text>
                  <Text style={styles.modalInfoValue}>{place.whatToBuy}</Text>
                </View>
              )}

              <Pressable
                style={styles.modalAskBtn}
                onPress={() => {
                  onClose();
                  router.push({ pathname: "/guide", params: { initialMessage: `Tell me about ${place.name} and its cultural significance` } });
                }}
              >
                <Ionicons name="chatbubble-ellipses" size={16} color={Colors.text} />
                <Text style={styles.modalAskBtnText}>Ask Arjuna about this place</Text>
              </Pressable>
            </View>
          </ScrollView>
          <Pressable style={styles.modalCloseBtn} onPress={onClose}>
            <Ionicons name="close" size={22} color={Colors.text} />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const [selectedKingdom, setSelectedKingdom] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [detailPlace, setDetailPlace] = useState<Place | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const headingRaw = useRef(0);
  const headingSV = useSharedValue(0);
  const { gainXP } = useGame();

  const headingStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${headingSV.value}deg` }],
  }));

  const topPadding = Platform.OS === "web" ? WEB_TOP_INSET : insets.top;
  const bottomPadding = Platform.OS === "web" ? TAB_BAR_HEIGHT + WEB_BOTTOM_INSET : TAB_BAR_HEIGHT + insets.bottom;

  useEffect(() => {
    if (Platform.OS === 'web') return;
    let headingSub: { remove?: () => void } | null = null;
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;
        const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        setUserLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
        // watchHeadingAsync is unreliable on Android and can cause force closes - iOS only
        if (Platform.OS === 'ios') {
          headingSub = await Location.watchHeadingAsync(
            (h) => {
              const raw = h.trueHeading ?? h.magHeading ?? 0;
              let delta = raw - (headingRaw.current % 360);
              if (delta > 180) delta -= 360;
              if (delta < -180) delta += 360;
              headingRaw.current += delta;
              headingSV.value = withTiming(headingRaw.current, { duration: 200 });
            },
            () => {} // errorHandler - suppress to avoid unhandled rejection
          );
        }
      } catch (_) {
        // Location/heading errors should not crash the app
      }
    })();
    return () => {
      try {
        if (headingSub?.remove) headingSub.remove();
      } catch (_) {
        // Known bug: remove() can crash on some RN versions
      }
    };
  }, []);

  const handleSelectKingdom = (id: number) => {
    if (selectedKingdom !== id) gainXP(10, "kingdom_explore");
    setSelectedKingdom(selectedKingdom === id ? null : id);
  };

  const filters: FilterType[] = ['All', 'Kingdoms', 'Museum', 'UMKM', 'Heritage', 'Food'];

  const filteredPlaces = useMemo(() => {
    let places: Place[] = [];
    if (activeFilter === 'All' || activeFilter === 'Museum') places = [...places, ...MUSEUMS];
    if (activeFilter === 'All' || activeFilter === 'UMKM') places = [...places, ...UMKM_ARTISANS];
    if (activeFilter === 'All' || activeFilter === 'Heritage') places = [...places, ...HERITAGE_SITES];
    if (activeFilter === 'All' || activeFilter === 'Food') places = [...places, ...FOOD_STANDS];
    return places;
  }, [activeFilter]);

  const panelPlaces = useMemo(() => {
    if (activeFilter === 'Museum') return MUSEUMS;
    if (activeFilter === 'UMKM') return UMKM_ARTISANS;
    if (activeFilter === 'Heritage') return HERITAGE_SITES;
    if (activeFilter === 'Food') return FOOD_STANDS;
    return [];
  }, [activeFilter]);

  const showKingdoms = activeFilter === 'All' || activeFilter === 'Kingdoms';
  const panelTitle = (() => {
    if (selectedPlace) {
      const t = selectedPlace.type;
      return t === 'museum' ? 'Museum' : t === 'umkm' ? 'UMKM Artisan' : t === 'food' ? 'Traditional Food' : 'Heritage Site';
    }
    if (activeFilter === 'Museum') return 'Nearby Museums';
    if (activeFilter === 'UMKM') return 'Artisan Districts';
    if (activeFilter === 'Heritage') return 'Heritage Sites';
    if (activeFilter === 'Food') return 'Traditional Food';
    if (activeFilter === 'Kingdoms') return 'Kingdoms History';
    return 'Explore Nusantara';
  })();

  const filterPillColor = (f: FilterType) => {
    if (f !== activeFilter) return Colors.surface;
    if (f === 'Museum') return Colors.jade;
    if (f === 'UMKM') return Colors.gold;
    if (f === 'Heritage') return Colors.primary;
    if (f === 'Food') return Colors.primaryLight;
    return Colors.terracotta;
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <View style={styles.webFallback}>
          <Ionicons name="map-outline" size={48} color={Colors.textMuted} />
          <Text style={styles.webFallbackText}>Open in Expo Go to view live map</Text>
        </View>
      ) : (
        <MapView
          style={StyleSheet.absoluteFill}
          initialRegion={{ latitude: -5, longitude: 117, latitudeDelta: 12, longitudeDelta: 12 }}
          userInterfaceStyle="dark"
          showsUserLocation={false}
        >
          {filteredPlaces.map(place => (
            <Marker
              key={place.id}
              coordinate={{ latitude: place.lat, longitude: place.lng }}
              onPress={() => setSelectedPlace(place)}
              pinColor={
                place.type === 'museum' ? Colors.jade :
                place.type === 'umkm' ? Colors.gold :
                place.type === 'food' ? Colors.primaryLight :
                Colors.primary
              }
            >
              <Callout tooltip>
                <View style={styles.callout}>
                  <Ionicons name={place.type === 'museum' ? 'library' : place.type === 'umkm' ? 'hammer' : place.type === 'food' ? 'restaurant' : 'business'} size={14} color={Colors.text} />
                  <Text style={styles.calloutText}>{place.name}</Text>
                </View>
              </Callout>
            </Marker>
          ))}

          {(activeFilter === 'All' || activeFilter === 'Kingdoms') && KINGDOM_CENTROIDS.map((k, i) => (
            <React.Fragment key={i}>
              <Circle center={{ latitude: k.lat, longitude: k.lng }} radius={80000} strokeColor={k.color} fillColor={k.color + "18"} />
              <Marker coordinate={{ latitude: k.lat, longitude: k.lng }} title={k.name} description={k.period}>
                <View style={[styles.kingdomMarker, { backgroundColor: k.color }]}>
                  <MaterialCommunityIcons name="crown" size={12} color={Colors.text} />
                </View>
              </Marker>
            </React.Fragment>
          ))}

          {userLocation && (
            <Marker coordinate={userLocation} anchor={{ x: 0.5, y: 0.5 }}>
              <View style={styles.userLocationContainer}>
                <View style={styles.userLocationGlow} />
                <Animated.View style={[styles.userLocationArrowRing, headingStyle]}>
                  <View style={styles.userLocationArrowHead} />
                </Animated.View>
                <View style={styles.userLocationDot} />
              </View>
            </Marker>
          )}
        </MapView>
      )}

      {/* Floating Header */}
      <View style={[styles.floatingHeader, { paddingTop: topPadding + 8 }]}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Map</Text>
            <Text style={styles.headerSubtitle}>Explore Nusantara</Text>
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {filters.map(filter => (
            <Pressable
              key={filter}
              style={[
                styles.filterPill,
                {
                  backgroundColor: activeFilter === filter ? filterPillColor(filter) : Colors.surface + 'EE',
                  borderColor: activeFilter === filter ? filterPillColor(filter) : Colors.border,
                }
              ]}
              onPress={() => { setActiveFilter(filter); setSelectedPlace(null); }}
            >
              <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Bottom Panel */}
      <View style={[styles.bottomPanel, { paddingBottom: bottomPadding + 8 }]}>
        <View style={styles.panelHandle} />
        <Text style={styles.panelTitle}>{panelTitle}</Text>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.panelScroll}>
          {/* Selected place card at top of panel */}
          {selectedPlace && (
            <View style={styles.selectedCard}>
              <View style={styles.selectedCardHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.selectedCardName}>{selectedPlace.name}</Text>
                  <Text style={styles.selectedCardType}>{selectedPlace.type.toUpperCase()} · {selectedPlace.kingdom}</Text>
                </View>
                <Pressable onPress={() => setSelectedPlace(null)}>
                  <Ionicons name="close-circle" size={22} color={Colors.textMuted} />
                </Pressable>
              </View>
              <Text style={styles.selectedCardDesc} numberOfLines={2}>{selectedPlace.description}</Text>
              <Pressable style={styles.selectedCardBtn} onPress={() => setDetailPlace(selectedPlace)}>
                <Text style={styles.selectedCardBtnText}>View Full Info</Text>
              </Pressable>
            </View>
          )}

          {showKingdoms ? (
            <View style={styles.kingdomsList}>
              {KINGDOMS.map(k => (
                <View key={k.id}>
                  <KingdomItem kingdom={k} isSelected={selectedKingdom === k.id} onPress={() => handleSelectKingdom(k.id)} />
                  {selectedKingdom === k.id && <KingdomDetail kingdom={k} />}
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.placesList}>
              {panelPlaces.map(place => (
                <PlaceRow key={place.id} place={place} onPress={() => setDetailPlace(place)} />
              ))}
            </View>
          )}
        </ScrollView>
      </View>

      {detailPlace && <PlaceDetailModal place={detailPlace} onClose={() => setDetailPlace(null)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  webFallback: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, backgroundColor: Colors.backgroundSecondary },
  webFallbackText: { color: Colors.textMuted, fontFamily: "Inter_500Medium", fontSize: 16 },

  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: Colors.background + 'D8',
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border + '40',
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  headerTitle: { fontSize: 26, fontFamily: "Inter_700Bold", color: Colors.text },
  headerSubtitle: { fontSize: 12, color: Colors.accent, fontFamily: "Inter_500Medium" },
  filterScroll: { gap: 8 },
  filterPill: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: 20, borderWidth: 1,
  },
  filterText: { fontSize: 13, fontFamily: "Inter_600SemiBold", color: Colors.textSecondary },
  filterTextActive: { color: Colors.text },

  bottomPanel: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    maxHeight: SCREEN_HEIGHT * 0.52,
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderColor: Colors.border + '60',
    zIndex: 10,
    paddingTop: 12,
  },
  panelHandle: {
    width: 40, height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  panelTitle: {
    fontSize: 16, fontFamily: "Inter_700Bold", color: Colors.text,
    paddingHorizontal: 20, marginBottom: 10,
  },
  panelScroll: { flex: 1, paddingHorizontal: 16 },

  selectedCard: {
    backgroundColor: Colors.background,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.accent + '30',
  },
  selectedCardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  selectedCardName: { fontSize: 15, fontFamily: "Inter_700Bold", color: Colors.text },
  selectedCardType: { fontSize: 10, color: Colors.accent, fontFamily: "Inter_600SemiBold" },
  selectedCardDesc: { fontSize: 12, color: Colors.textMuted, fontFamily: "Inter_400Regular", marginBottom: 10 },
  selectedCardBtn: {
    backgroundColor: Colors.primary + '20', paddingVertical: 8,
    borderRadius: 8, alignItems: 'center',
    borderWidth: 1, borderColor: Colors.primary + '40',
  },
  selectedCardBtnText: { color: Colors.primaryLight, fontSize: 13, fontFamily: "Inter_600SemiBold" },

  kingdomsList: { paddingBottom: 20 },
  placesList: { paddingBottom: 20 },

  placeRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 12, paddingHorizontal: 4,
    borderBottomWidth: 1, borderBottomColor: Colors.border + '60',
  },
  placeRowIcon: {
    width: 40, height: 40, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
    marginRight: 12, flexShrink: 0,
  },
  placeRowContent: { flex: 1, marginRight: 8 },
  placeRowName: { fontSize: 14, fontFamily: "Inter_700Bold", color: Colors.text, marginBottom: 2 },
  placeRowDesc: { fontSize: 11, color: Colors.textMuted, fontFamily: "Inter_400Regular" },
  placeRowMeta: { alignItems: 'flex-end' },
  placeRowFee: { fontSize: 11, color: Colors.accent, fontFamily: "Inter_600SemiBold" },
  placeRowBadge: { paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6, maxWidth: 80 },
  placeRowBadgeText: { fontSize: 9, fontFamily: "Inter_600SemiBold" },

  callout: {
    backgroundColor: Colors.surface, padding: 8, borderRadius: 8,
    borderWidth: 1, borderColor: Colors.border, flexDirection: 'row', alignItems: 'center', gap: 6,
  },
  calloutText: { color: Colors.text, fontSize: 12, fontFamily: "Inter_600SemiBold" },
  kingdomMarker: {
    width: 20, height: 20, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: Colors.text,
  },

  userLocationContainer: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  userLocationGlow: {
    position: 'absolute',
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: Colors.gold,
    opacity: 0.18,
  },
  userLocationArrowRing: {
    position: 'absolute',
    width: 40, height: 40,
    alignItems: 'center',
  },
  userLocationArrowHead: {
    width: 0, height: 0,
    borderLeftWidth: 7, borderRightWidth: 7, borderBottomWidth: 14,
    borderLeftColor: 'transparent', borderRightColor: 'transparent',
    borderBottomColor: Colors.gold,
    top: -2,
  },
  userLocationDot: {
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: Colors.gold,
    borderWidth: 3, borderColor: Colors.text,
    zIndex: 2,
  },

  kingdomItem: {
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 16, paddingVertical: 14,
  },
  kingdomItemDot: { width: 10, height: 10, borderRadius: 5, marginRight: 12, flexShrink: 0 },
  kingdomItemContent: { flex: 1 },
  kingdomItemHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 3 },
  kingdomItemName: { fontSize: 16, fontFamily: "Inter_700Bold", color: Colors.text },
  kingdomItemTag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  kingdomItemTagText: { fontSize: 10, fontFamily: "Inter_600SemiBold" },
  kingdomItemPeriod: { fontSize: 12, color: Colors.textMuted, fontFamily: "Inter_500Medium" },
  detailCard: {
    marginBottom: 16, padding: 16,
    backgroundColor: Colors.background,
    borderRadius: 14, borderWidth: 1, borderColor: Colors.border, marginTop: -4,
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
    borderRadius: 10, borderWidth: 1, marginTop: 4,
  },
  guideButtonText: { fontSize: 13, fontFamily: "Inter_600SemiBold" },

  modalOverlay: { flex: 1, backgroundColor: Colors.overlay, justifyContent: 'flex-end' },
  modalSheet: {
    backgroundColor: Colors.backgroundSecondary,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    maxHeight: SCREEN_HEIGHT * 0.85,
    overflow: 'hidden',
  },
  modalHandle: { width: 40, height: 4, backgroundColor: Colors.border, borderRadius: 2, alignSelf: 'center', marginTop: 12, marginBottom: 4 },
  modalImage: { width: '100%', height: 220 },
  modalImageFallback: { width: '100%', height: 160, alignItems: 'center', justifyContent: 'center' },
  modalBody: { padding: 20 },
  modalTypeBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 8 },
  modalTypeText: { fontSize: 11, fontFamily: "Inter_600SemiBold" },
  modalTitle: { fontSize: 22, fontFamily: "Inter_700Bold", color: Colors.text, marginBottom: 6 },
  modalKingdomRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 14 },
  modalKingdom: { fontSize: 13, color: Colors.accent, fontFamily: "Inter_500Medium" },
  modalDescription: { fontSize: 14, color: Colors.textSecondary, fontFamily: "Inter_400Regular", lineHeight: 22, marginBottom: 16 },
  modalInfoGrid: { flexDirection: 'row', gap: 16, marginBottom: 16, flexWrap: 'wrap' },
  modalInfoItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, flex: 1, minWidth: 130 },
  modalInfoLabel: { fontSize: 11, color: Colors.textMuted, fontFamily: "Inter_500Medium" },
  modalInfoValue: { fontSize: 14, color: Colors.text, fontFamily: "Inter_600SemiBold" },
  modalSection: { marginBottom: 16 },
  modalSectionTitle: { fontSize: 12, color: Colors.textMuted, fontFamily: "Inter_600SemiBold", textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  modalTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  modalTag: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, borderWidth: 1 },
  modalTagText: { fontSize: 12, fontFamily: "Inter_500Medium" },
  modalAskBtn: {
    backgroundColor: Colors.primary, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 14, borderRadius: 14, marginTop: 8, marginBottom: 20,
  },
  modalAskBtnText: { color: Colors.text, fontSize: 15, fontFamily: "Inter_600SemiBold" },
  modalCloseBtn: {
    position: 'absolute', top: 12, right: 16,
    backgroundColor: Colors.surface + 'CC',
    borderRadius: 20, width: 36, height: 36,
    alignItems: 'center', justifyContent: 'center',
  },
});
