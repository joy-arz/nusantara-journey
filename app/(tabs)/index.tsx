import React, { useState, useMemo } from "react";
import {
  View, Text, StyleSheet, ScrollView, Pressable,
  Dimensions, Platform, Modal
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue, useAnimatedStyle, withSpring, withTiming, interpolate,
  withRepeat, withSequence
} from "react-native-reanimated";
import { Colors } from "@/constants/colors";
import { Image } from "expo-image";

import * as Location from "expo-location";
import { TAB_BAR_HEIGHT, WEB_TOP_INSET, WEB_BOTTOM_INSET } from "@/constants/layout";
import { useNearbyPlaces } from "@/hooks/useNearbyPlaces";
import { Place, FOOD_STANDS } from "@/constants/places-data";

const { width } = Dimensions.get("window");

const KINGDOMS = [
  { id: 1, name: "Majapahit", period: "1293–1527 CE", location: "East Java", color: "#C4622D", icon: "crown" },
  { id: 2, name: "Sriwijaya", period: "650–1377 CE", location: "South Sumatra", color: "#D4A843", icon: "anchor" },
  { id: 3, name: "Mataram Kuno", period: "717–1006 CE", location: "Central Java", color: "#2D5A3D", icon: "temple-buddhist" },
];

const INDONESIA_STATS = [
  { icon: "island" as any, value: "17,000+", label: "Islands" },
  { icon: "account-group" as any, value: "300+", label: "Ethnic Groups" },
  { icon: "translate" as any, value: "700+", label: "Languages" },
  { icon: "earth" as any, value: "10", label: "UNESCO Heritage" },
  { icon: "crown" as any, value: "10", label: "Kingdoms" },
  { icon: "book-open-variant" as any, value: "55+", label: "Folklore" },
];

const CREATURES = [
  {
    name: "Garuda",
    type: "Divine Eagle",
    desc: "The sacred mount of Vishnu, national symbol of Indonesia. A colossal eagle-man deity representing loyalty, courage, and the solar principle.",
    kingdom: "All of Nusantara",
    imageUrl: "https://images.unsplash.com/photo-1760355714419-ced046db2c99?w=640&q=80",
    icon: "bird",
  },
  {
    name: "Nyai Roro Kidul",
    type: "Sea Queen",
    desc: "The mystical queen of the Southern Sea, often associated with the color green. Said to be the spiritual consort of every Sultan of Yogyakarta, commanding the storms and waves of the Indian Ocean.",
    kingdom: "Mataram Islam",
    imageUrl: "https://images.unsplash.com/photo-1601058497548-f247dfe349d6?w=640&q=80",
    icon: "waves",
  },
  {
    name: "Barong",
    type: "Lion Spirit",
    desc: "The protector deity of Bali, a lion-like spirit who battles the witch Rangda in the eternal struggle between good and evil.",
    kingdom: "Bali",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=640&q=80",
    icon: "shield-star",
  },
  {
    name: "Kuntilanak",
    type: "Spirit of Childbirth",
    desc: "A wandering spirit of Indonesian folklore — the ghost of a woman who died during childbirth, said to inhabit old trees and appear at crossroads at dusk.",
    kingdom: "Java & Sumatra",
    imageUrl: "https://images.unsplash.com/photo-1707371773021-d39017b761f0?w=640&q=80",
    icon: "ghost",
  },
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function PlaceDetailModal({ place, onClose }: { place: Place; onClose: () => void }) {
  const typeColor = place.type === 'museum' ? Colors.jade : place.type === 'umkm' ? Colors.gold : place.type === 'food' ? Colors.primaryLight : Colors.primary;
  const typeLabel = place.type === 'museum' ? 'Museum' : place.type === 'umkm' ? 'UMKM Artisan' : place.type === 'food' ? 'Traditional Food' : 'Heritage Site';
  const typeIcon: any = place.type === 'museum' ? 'library' : place.type === 'umkm' ? 'hammer' : place.type === 'food' ? 'restaurant' : 'trail-sign';

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
                <Ionicons name={typeIcon} size={48} color={typeColor} />
              </View>
            )}
            <View style={styles.modalBody}>
              <View style={[styles.modalTypeBadge, { backgroundColor: typeColor + "20" }]}>
                <Text style={[styles.modalTypeText, { color: typeColor }]}>{typeLabel}</Text>
              </View>
              <Text style={styles.modalTitle}>{place.name}</Text>
              <View style={styles.modalMetaRow}>
                <MaterialCommunityIcons name="crown" size={13} color={Colors.accent} />
                <Text style={styles.modalMetaText}>{place.kingdom}</Text>
              </View>
              <Text style={styles.modalDescription}>{place.description}</Text>

              {(place.entryFee || place.openHours) && (
                <View style={styles.modalInfoRow}>
                  {place.entryFee && (
                    <View style={styles.modalInfoItem}>
                      <Ionicons name="ticket" size={15} color={Colors.accent} />
                      <View>
                        <Text style={styles.modalInfoLabel}>Entry</Text>
                        <Text style={styles.modalInfoValue}>{place.entryFee}</Text>
                      </View>
                    </View>
                  )}
                  {place.openHours && (
                    <View style={styles.modalInfoItem}>
                      <Ionicons name="time" size={15} color={Colors.accent} />
                      <View>
                        <Text style={styles.modalInfoLabel}>Hours</Text>
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
                  router.push({ pathname: "/guide", params: { initialMessage: `Tell me about ${place.name} and its cultural significance in Indonesia` } });
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

function CreatureModal({ creature, onClose }: { creature: typeof CREATURES[0]; onClose: () => void }) {
  return (
    <Modal visible animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalSheet}>
          <View style={styles.modalHandle} />
          <ScrollView showsVerticalScrollIndicator={false}>
            {creature.imageUrl ? (
              <Image source={{ uri: creature.imageUrl }} style={styles.modalImage} contentFit="cover" />
            ) : (
              <View style={[styles.modalImage, styles.modalImageFallback, { backgroundColor: Colors.bark }]}>
                <MaterialCommunityIcons name={creature.icon as any} size={48} color={Colors.accent + "80"} />
              </View>
            )}
            <View style={styles.modalBody}>
              <View style={[styles.modalTypeBadge, { backgroundColor: Colors.accent + "22" }]}>
                <Text style={[styles.modalTypeText, { color: Colors.accent }]}>{creature.type}</Text>
              </View>
              <Text style={styles.modalTitle}>{creature.name}</Text>
              <View style={styles.modalMetaRow}>
                <MaterialCommunityIcons name="crown" size={13} color={Colors.textMuted} />
                <Text style={styles.modalMetaText}>{creature.kingdom}</Text>
              </View>
              <Text style={styles.modalDescription}>{creature.desc}</Text>
              <Pressable
                style={styles.modalAskBtn}
                onPress={() => {
                  onClose();
                  router.push({ pathname: "/guide", params: { initialMessage: `Tell me everything about ${creature.name} in Indonesian mythology and folklore` } });
                }}
              >
                <Ionicons name="chatbubble-ellipses" size={16} color={Colors.text} />
                <Text style={styles.modalAskBtnText}>Learn more from Arjuna</Text>
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

function KingdomCard({ kingdom }: { kingdom: typeof KINGDOMS[0] }) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      style={[styles.kingdomCard, animStyle, { backgroundColor: kingdom.color + "22", borderColor: kingdom.color + "60", borderWidth: 1 }]}
      onPressIn={() => { scale.value = withSpring(0.97); }}
      onPressOut={() => { scale.value = withSpring(1); }}
      onPress={() => router.push("/map")}
    >
      <View style={styles.kingdomCardContent}>
        <View style={[styles.kingdomCardIcon, { backgroundColor: "rgba(255,255,255,0.1)" }]}>
          <MaterialCommunityIcons name={kingdom.icon as any} size={28} color={kingdom.color} />
        </View>
        <Text style={[styles.kingdomName, { color: kingdom.color }]}>{kingdom.name}</Text>
        <Text style={styles.kingdomPeriod}>{kingdom.period}</Text>
        <View style={styles.kingdomLocation}>
          <Ionicons name="location" size={12} color={Colors.textMuted} />
          <Text style={styles.kingdomLocationText}>{kingdom.location}</Text>
        </View>
      </View>
    </AnimatedPressable>
  );
}

function CreatureCard({ creature, onPress }: { creature: typeof CREATURES[0]; onPress: () => void }) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      style={[styles.creatureCard, animStyle]}
      onPressIn={() => { scale.value = withSpring(0.95); }}
      onPressOut={() => { scale.value = withSpring(1); }}
      onPress={onPress}
    >
      <View style={[StyleSheet.absoluteFill, { backgroundColor: Colors.bark, alignItems: "center", justifyContent: "center" }]}>
        <MaterialCommunityIcons name={creature.icon as any} size={48} color={Colors.accent + "80"} />
      </View>
      {creature.imageUrl && (
        <Image source={{ uri: creature.imageUrl }} style={StyleSheet.absoluteFill} contentFit="cover" />
      )}
      <LinearGradient
        colors={['transparent', Colors.overlay]}
        style={[StyleSheet.absoluteFill, { borderRadius: 14 }]}
      />
      <View style={styles.creatureOverlay}>
        <View style={[styles.creatureTypeBadge]}>
          <Text style={styles.creatureTypeBadgeText}>{creature.type}</Text>
        </View>
        <Text style={styles.creatureNameOverlay}>{creature.name}</Text>
      </View>
    </AnimatedPressable>
  );
}

function PlaceCard({ place, userCoords, onPress }: {
  place: Place;
  userCoords: { latitude: number; longitude: number } | null;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const distance = useMemo(() => {
    if (!userCoords) return null;
    const R = 6371;
    const toRad = (v: number) => (v * Math.PI) / 180;
    const dLat = toRad(place.lat - userCoords.latitude);
    const dLng = toRad(place.lng - userCoords.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(userCoords.latitude)) * Math.cos(toRad(place.lat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  }, [place, userCoords]);

  const typeColor = place.type === 'museum' ? Colors.jade : place.type === 'umkm' ? Colors.gold : place.type === 'food' ? Colors.primaryLight : Colors.primary;
  const typeLabel = place.type === 'museum' ? 'MUSEUM' : place.type === 'umkm' ? 'UMKM' : place.type === 'food' ? 'FOOD' : 'HERITAGE';
  const typeIcon: any = place.type === 'museum' ? 'library' : place.type === 'umkm' ? 'hammer' : place.type === 'food' ? 'restaurant' : 'trail-sign';

  return (
    <AnimatedPressable
      style={[styles.placeCard, animStyle]}
      onPressIn={() => { scale.value = withSpring(0.95); }}
      onPressOut={() => { scale.value = withSpring(1); }}
      onPress={onPress}
    >
      <View style={[StyleSheet.absoluteFill, { backgroundColor: typeColor + "25", alignItems: 'center', justifyContent: 'center' }]}>
        <Ionicons name={typeIcon} size={28} color={typeColor} />
      </View>
      {place.imageUrl && (
        <Image source={{ uri: place.imageUrl }} style={StyleSheet.absoluteFill} contentFit="cover" />
      )}
      <LinearGradient
        colors={['transparent', Colors.overlay]}
        style={[StyleSheet.absoluteFill, { borderRadius: 14 }]}
      />
      <View style={[styles.placeTypeBadge, { backgroundColor: typeColor }]}>
        <Text style={styles.placeTypeBadgeText}>{typeLabel}</Text>
      </View>
      <View style={styles.placeOverlay}>
        <Text style={styles.placeNameOverlay} numberOfLines={1}>{place.name}</Text>
        {distance && (
          <View style={styles.distanceBadge}>
            <Ionicons name="navigate" size={9} color={Colors.text} />
            <Text style={styles.distanceText}>{distance} km</Text>
          </View>
        )}
      </View>
    </AnimatedPressable>
  );
}

function FoodCard({ place, onPress }: { place: Place; onPress: () => void }) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      style={[styles.foodCard, animStyle]}
      onPressIn={() => { scale.value = withSpring(0.96); }}
      onPressOut={() => { scale.value = withSpring(1); }}
      onPress={onPress}
    >
      <View style={[styles.foodCardImage, { backgroundColor: Colors.primaryLight + "25", alignItems: 'center', justifyContent: 'center' }]}>
        <Ionicons name="restaurant" size={28} color={Colors.primaryLight} />
      </View>
      {place.imageUrl && (
        <Image source={{ uri: place.imageUrl }} style={[styles.foodCardImage, { position: 'absolute', top: 0, left: 0, right: 0 }]} contentFit="cover" />
      )}
      <View style={styles.foodCardBody}>
        <Text style={styles.foodCardName} numberOfLines={1}>{place.name}</Text>
        {place.specialty && place.specialty.length > 0 && (
          <Text style={styles.foodCardSpecialty} numberOfLines={1}>{place.specialty[0]}</Text>
        )}
        <View style={styles.foodCardFooter}>
          <Ionicons name="location" size={10} color={Colors.textMuted} />
          <Text style={styles.foodCardRegion} numberOfLines={1}>{place.kingdom}</Text>
        </View>
      </View>
    </AnimatedPressable>
  );
}

function LocationDiscoverySection() {
  const { kingdom, nearbyHeritageSites, nearbyMuseums, nearbyUMKM, userCoords, regionName, isLoading, permissionDenied, isOutsideIndonesia } = useNearbyPlaces();
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const pulse = useSharedValue(1);

  React.useEffect(() => {
    if (isLoading) {
      pulse.value = withRepeat(
        withSequence(withTiming(0.6, { duration: 800 }), withTiming(1, { duration: 800 })),
        -1, true
      );
    } else {
      pulse.value = 1;
    }
  }, [isLoading]);

  const skeletonStyle = useAnimatedStyle(() => ({ opacity: pulse.value }));

  if (isLoading) {
    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Where You Are</Text>
        </View>
        <Animated.View style={[styles.discoverySkeleton, skeletonStyle]}>
          <Ionicons name="locate" size={32} color={Colors.textMuted} />
          <Text style={styles.skeletonText}>Locating your kingdom...</Text>
        </Animated.View>
      </View>
    );
  }

  if (permissionDenied) {
    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Discovery</Text>
        </View>
        <View style={styles.softCard}>
          <Ionicons name="location-outline" size={32} color={Colors.accent} />
          <Text style={styles.softCardText}>Enable location to discover your kingdom and nearby heritage sites</Text>
          <Pressable style={styles.softCardButton} onPress={() => Location.requestForegroundPermissionsAsync()}>
            <Text style={styles.softCardButtonText}>Enable Location</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (isOutsideIndonesia) {
    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Plan Your Journey</Text>
        </View>
        <View style={styles.softCard}>
          <Text style={styles.softCardTitle}>Nusantara Awaits</Text>
          <Text style={styles.softCardText}>You are currently outside Indonesia. Explore these top destinations:</Text>
          <View style={styles.destList}>
            {['Yogyakarta (Mataram)', 'Bali (Majapahit Heritage)', 'Sumatra (Sriwijaya)'].map((dest, i) => (
              <View key={i} style={styles.destItem}>
                <Ionicons name="airplane" size={14} color={Colors.accent} />
                <Text style={styles.destItemText}>{dest}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Where You Are</Text>
        <Text style={styles.regionTag}>{regionName || 'Indonesia'}</Text>
      </View>

      {kingdom && (
        <Pressable style={styles.kingdomBanner} onPress={() => router.push("/map")}>
          <View style={[styles.kingdomBannerContent, { backgroundColor: Colors.surface, borderWidth: 1, borderColor: kingdom.color + "30", flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16 }]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.kingdomBannerPeriod, { color: kingdom.color }]}>{kingdom.period}</Text>
              <Text style={styles.kingdomBannerName}>{kingdom.name}</Text>
              <Text style={styles.kingdomBannerDesc} numberOfLines={1}>{kingdom.description}</Text>
            </View>
            <MaterialCommunityIcons name="crown" size={40} color={kingdom.color + "40"} />
          </View>
        </Pressable>
      )}

      <View style={styles.discoveryRow}>
        <Text style={styles.discoveryRowLabel}>Heritage Sites Nearby</Text>
        <Pressable onPress={() => router.push("/map")}><Text style={styles.sectionMore}>See Map</Text></Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
        {nearbyHeritageSites.map(site => (
          <PlaceCard key={site.id} place={site} userCoords={userCoords} onPress={() => setSelectedPlace(site)} />
        ))}
      </ScrollView>

      <View style={styles.discoveryRow}>
        <Text style={styles.discoveryRowLabel}>Nearby Museums</Text>
        <Pressable onPress={() => router.push("/guide")}><Text style={styles.sectionMore}>Ask Arjuna</Text></Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
        {nearbyMuseums.map(museum => (
          <PlaceCard key={museum.id} place={museum} userCoords={userCoords} onPress={() => setSelectedPlace(museum)} />
        ))}
      </ScrollView>

      <View style={styles.discoveryRow}>
        <Text style={styles.discoveryRowLabel}>UMKM Artisans</Text>
        <Pressable onPress={() => router.push("/marketplace")}><Text style={styles.sectionMore}>Shop Now</Text></Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
        {nearbyUMKM.map(umkm => (
          <PlaceCard key={umkm.id} place={umkm} userCoords={userCoords} onPress={() => setSelectedPlace(umkm)} />
        ))}
      </ScrollView>

      {selectedPlace && <PlaceDetailModal place={selectedPlace} onClose={() => setSelectedPlace(null)} />}
    </View>
  );
}

export default function DiscoverScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCreature, setSelectedCreature] = useState<typeof CREATURES[0] | null>(null);
  const [selectedFood, setSelectedFood] = useState<Place | null>(null);

  const topPadding = Platform.OS === "web" ? WEB_TOP_INSET : insets.top;
  const contentBottomPadding = Platform.OS === "web" ? TAB_BAR_HEIGHT + WEB_BOTTOM_INSET : TAB_BAR_HEIGHT + insets.bottom;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: contentBottomPadding }}
      >
        {/* Hero Section */}
        <View style={styles.hero}>
          <LinearGradient colors={[Colors.background, Colors.bark, Colors.barkLight]} style={StyleSheet.absoluteFill} />
          <View style={styles.batikPattern}>
            <View style={styles.batikDiamondRow}>
              {[...Array(3)].map((_, i) => <View key={i} style={styles.batikDiamond} />)}
            </View>
            <View style={styles.batikDiamondRow}>
              {[...Array(3)].map((_, i) => <View key={i + 3} style={styles.batikDiamond} />)}
            </View>
          </View>
          <View style={[styles.heroContent, { paddingTop: topPadding + 20 }]}>
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
                { value: "55+", label: "Folklore" },
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

        {/* Nusantara Stats Strip */}
        <View style={styles.statsStrip}>
          <Text style={styles.statsSectionLabel}>About Nusantara</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsScroll}>
            {INDONESIA_STATS.map((stat, i) => (
              <View key={i} style={styles.statCard}>
                <MaterialCommunityIcons name={stat.icon} size={22} color={Colors.accent} />
                <Text style={styles.statCardValue}>{stat.value}</Text>
                <Text style={styles.statCardLabel}>{stat.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          {[
            { icon: "map", label: "Map", route: "/map", color: Colors.terracotta },
            { icon: "chatbubbles", label: "Ask Guide", route: "/guide", color: Colors.accent },
            { icon: "book", label: "Stories", route: "/stories", color: Colors.primary },
            { icon: "bag", label: "Shop", route: "/marketplace", color: Colors.forest },
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

        {/* Discovery Section */}
        <LocationDiscoverySection />

        {/* Featured Kingdoms */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Kingdoms</Text>
            <Pressable onPress={() => router.push("/map")}>
              <Text style={styles.sectionMore}>See all</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            {KINGDOMS.map((k) => <KingdomCard key={k.id} kingdom={k} />)}
          </ScrollView>
        </View>

        {/* Mythology Section — Image Cards with Popups */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mythology</Text>
            <Pressable onPress={() => router.push("/guide")}>
              <Text style={styles.sectionMore}>Ask Guide</Text>
            </Pressable>
          </View>
          <View style={styles.creaturesGrid}>
            {CREATURES.map((c, i) => (
              <CreatureCard key={i} creature={c} onPress={() => setSelectedCreature(c)} />
            ))}
          </View>
        </View>

        {/* Street Food & Traditional Markets */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Street Food & Markets</Text>
            <Pressable onPress={() => router.push("/map")}>
              <Text style={styles.sectionMore}>See all</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            {FOOD_STANDS.map((food) => (
              <FoodCard key={food.id} place={food} onPress={() => setSelectedFood(food)} />
            ))}
          </ScrollView>
        </View>

        {/* Folklore Banner */}
        <Pressable
          style={({ pressed }) => [
            styles.folkloreBanner,
            pressed && { transform: [{ scale: 0.97 }] },
          ]}
          onPress={() => router.push("/stories")}
        >
          <LinearGradient colors={[Colors.bark, Colors.barkLight]} style={StyleSheet.absoluteFill} />
          <View style={styles.folkloreBannerContent}>
            <View style={styles.folkloreBannerLeft}>
              <Text style={styles.folkloreBannerLabel}>CERITA RAKYAT</Text>
              <Text style={styles.folkloreBannerTitle}>55 Indonesian{"\n"}Folklore Stories</Text>
              <Text style={styles.folkloreBannerSubtitle}>From Malin Kundang to Roro Jonggrang — complete English narratives</Text>
              <View style={styles.folkloreBannerButton}>
                <Text style={styles.folkloreBannerButtonText}>Read Stories</Text>
                <Ionicons name="arrow-forward" size={14} color={Colors.accent} />
              </View>
            </View>
            <View style={styles.folkloreBannerRight}>
              <MaterialCommunityIcons name="book-open-page-variant" size={52} color={Colors.accent} style={{ opacity: 0.8 }} />
            </View>
          </View>
        </Pressable>

        {/* AI Guide Banner */}
        <Pressable
          style={({ pressed }) => [
            styles.guideBanner,
            pressed && { transform: [{ scale: 0.97 }] },
            { backgroundColor: Colors.forestDeep, borderWidth: 1, borderColor: Colors.forest + "80" }
          ]}
          onPress={() => router.push("/guide")}
        >
          <View style={styles.guideBannerContent}>
            <View style={styles.guideBannerLeft}>
              <Text style={styles.guideBannerTitle}>Meet Arjuna</Text>
              <Text style={styles.guideBannerSubtitle}>Your AI cultural guide to Indonesian heritage, history, and tourism</Text>
              <View style={styles.guideBannerButton}>
                <Text style={styles.guideBannerButtonText}>Start Conversation</Text>
                <Ionicons name="arrow-forward" size={14} color={Colors.primary} />
              </View>
            </View>
            <View style={styles.guideBannerRight}>
              <View style={styles.guideBannerIcon}>
                <Ionicons name="telescope" size={32} color={Colors.accent} />
              </View>
            </View>
          </View>
        </Pressable>

        {/* UMKM Highlight */}
        <View style={[styles.section, { paddingBottom: 24 }]}>
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
                style={({ pressed }) => [styles.umkmCard, pressed && { transform: [{ scale: 0.97 }] }, { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.gold + "30" }]}
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

      {selectedCreature && <CreatureModal creature={selectedCreature} onClose={() => setSelectedCreature(null)} />}
      {selectedFood && <PlaceDetailModal place={selectedFood} onClose={() => setSelectedFood(null)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },

  hero: { height: 360, overflow: "hidden", justifyContent: "flex-end", backgroundColor: Colors.background },
  batikPattern: { ...StyleSheet.absoluteFillObject, paddingTop: 20, gap: 20 },
  batikDiamondRow: { flexDirection: "row", justifyContent: "space-evenly", width: "100%" },
  batikDiamond: { width: 80, height: 80, borderWidth: 2, borderColor: Colors.gold, transform: [{ rotate: "45deg" }], opacity: 0.06 },
  heroContent: { padding: 24, paddingBottom: 32 },
  heroTag: { backgroundColor: Colors.primary + "33", paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, borderWidth: 1, borderColor: Colors.primary + "55", alignSelf: "flex-start", marginBottom: 12 },
  heroTagText: { color: Colors.primaryLight, fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1 },
  heroTitle: { fontSize: 40, fontFamily: "Inter_700Bold", color: Colors.text, lineHeight: 46, marginBottom: 10 },
  heroSubtitle: { fontSize: 14, color: Colors.textSecondary, fontFamily: "Inter_400Regular", lineHeight: 20, marginBottom: 20 },
  heroStats: { flexDirection: "row", gap: 24 },
  heroStat: { alignItems: "center" },
  heroStatValue: { fontSize: 22, fontFamily: "Inter_700Bold", color: Colors.accent },
  heroStatLabel: { fontSize: 11, color: Colors.textMuted, fontFamily: "Inter_500Medium" },

  statsStrip: { backgroundColor: Colors.backgroundSecondary, paddingTop: 16, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: Colors.border },
  statsSectionLabel: { fontSize: 11, color: Colors.textMuted, fontFamily: "Inter_600SemiBold", textTransform: 'uppercase', letterSpacing: 1, paddingHorizontal: 20, marginBottom: 10 },
  statsScroll: { paddingHorizontal: 16, gap: 8 },
  statCard: { backgroundColor: Colors.surface, borderRadius: 12, padding: 12, alignItems: 'center', gap: 4, minWidth: 80, borderWidth: 1, borderColor: Colors.border },
  statCardValue: { fontSize: 16, fontFamily: "Inter_700Bold", color: Colors.text },
  statCardLabel: { fontSize: 10, fontFamily: "Inter_500Medium", color: Colors.textMuted },

  quickActions: { flexDirection: "row", padding: 16, gap: 8, backgroundColor: Colors.backgroundSecondary, borderBottomWidth: 1, borderColor: Colors.border },
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
  kingdomCardContent: { padding: 16, height: 160, justifyContent: "flex-end" },
  kingdomCardIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center", marginBottom: 8 },
  kingdomName: { fontSize: 15, fontFamily: "Inter_700Bold", color: Colors.text, marginBottom: 2 },
  kingdomPeriod: { fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "Inter_500Medium", marginBottom: 6 },
  kingdomLocation: { flexDirection: "row", alignItems: "center", gap: 3 },
  kingdomLocationText: { fontSize: 10, color: "rgba(255,255,255,0.6)", fontFamily: "Inter_400Regular" },

  creaturesGrid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 16, gap: 10 },
  creatureCard: { width: (width - 42) / 2, height: 150, borderRadius: 14, overflow: 'hidden', backgroundColor: Colors.surface },
  creatureOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 10 },
  creatureTypeBadge: { backgroundColor: Colors.accent + "33", paddingHorizontal: 7, paddingVertical: 2, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 4 },
  creatureTypeBadgeText: { fontSize: 9, color: Colors.accent, fontFamily: "Inter_600SemiBold" },
  creatureNameOverlay: { fontSize: 15, fontFamily: "Inter_700Bold", color: Colors.text },

  placeCard: { width: 180, height: 160, borderRadius: 14, overflow: 'hidden', backgroundColor: Colors.surface },
  placeTypeBadge: { position: 'absolute', top: 8, right: 8, paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6 },
  placeTypeBadgeText: { fontSize: 9, fontFamily: "Inter_700Bold", color: Colors.text },
  placeOverlay: { position: 'absolute', bottom: 8, left: 8, right: 8 },
  placeNameOverlay: { fontSize: 13, fontFamily: "Inter_700Bold", color: Colors.text, marginBottom: 4 },
  distanceBadge: { flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: Colors.overlay, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, alignSelf: 'flex-start' },
  distanceText: { fontSize: 10, color: Colors.text, fontFamily: "Inter_600SemiBold" },

  foodCard: { width: 150, backgroundColor: Colors.surface, borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: Colors.border },
  foodCardImage: { width: '100%', height: 100 },
  foodCardBody: { padding: 10 },
  foodCardName: { fontSize: 13, fontFamily: "Inter_700Bold", color: Colors.text, marginBottom: 2 },
  foodCardSpecialty: { fontSize: 11, color: Colors.primaryLight, fontFamily: "Inter_500Medium", marginBottom: 4 },
  foodCardFooter: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  foodCardRegion: { fontSize: 10, color: Colors.textMuted, fontFamily: "Inter_400Regular" },

  folkloreBanner: { marginHorizontal: 20, marginTop: 24, borderRadius: 18, overflow: 'hidden', borderWidth: 1, borderColor: Colors.accent + "40" },
  folkloreBannerContent: { flexDirection: 'row', padding: 20, alignItems: 'center' },
  folkloreBannerLeft: { flex: 1 },
  folkloreBannerLabel: { fontSize: 10, color: Colors.accent, fontFamily: "Inter_600SemiBold", letterSpacing: 1.5, marginBottom: 6 },
  folkloreBannerTitle: { fontSize: 20, fontFamily: "Inter_700Bold", color: Colors.text, lineHeight: 26, marginBottom: 8 },
  folkloreBannerSubtitle: { fontSize: 12, color: Colors.textSecondary, fontFamily: "Inter_400Regular", lineHeight: 18, marginBottom: 14 },
  folkloreBannerButton: { flexDirection: "row", alignItems: "center", gap: 6 },
  folkloreBannerButtonText: { fontSize: 13, color: Colors.accent, fontFamily: "Inter_600SemiBold" },
  folkloreBannerRight: { marginLeft: 16 },

  guideBanner: { marginHorizontal: 20, marginTop: 24, borderRadius: 18, overflow: "hidden" },
  guideBannerContent: { flexDirection: "row", padding: 20, alignItems: "center" },
  guideBannerLeft: { flex: 1 },
  guideBannerTitle: { fontSize: 20, fontFamily: "Inter_700Bold", color: Colors.text, marginBottom: 6 },
  guideBannerSubtitle: { fontSize: 13, color: Colors.textSecondary, fontFamily: "Inter_400Regular", lineHeight: 18, marginBottom: 14 },
  guideBannerButton: { flexDirection: "row", alignItems: "center", gap: 6 },
  guideBannerButtonText: { fontSize: 13, color: Colors.primary, fontFamily: "Inter_600SemiBold" },
  guideBannerRight: { marginLeft: 12 },
  guideBannerIcon: { width: 64, height: 64, borderRadius: 32, backgroundColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center" },

  umkmCards: { flexDirection: "row", paddingHorizontal: 20, gap: 10 },
  umkmCard: { flex: 1, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: Colors.border, alignItems: "center" },
  umkmIconBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.accent + "20", alignItems: "center", justifyContent: "center", marginBottom: 8 },
  umkmName: { fontSize: 12, fontFamily: "Inter_600SemiBold", color: Colors.text, textAlign: "center", marginBottom: 4 },
  umkmLocation: { flexDirection: "row", alignItems: "center", gap: 3 },
  umkmLocationText: { fontSize: 10, color: Colors.textMuted, fontFamily: "Inter_400Regular", textAlign: "center" },

  discoverySkeleton: { marginHorizontal: 20, height: 140, backgroundColor: Colors.surface, borderRadius: 18, borderWidth: 1, borderColor: Colors.border, alignItems: "center", justifyContent: "center", gap: 12 },
  skeletonText: { color: Colors.textMuted, fontFamily: "Inter_500Medium", fontSize: 14 },
  softCard: { marginHorizontal: 20, padding: 24, backgroundColor: Colors.surface, borderRadius: 18, borderWidth: 1, borderColor: Colors.border, alignItems: "center", gap: 12 },
  softCardTitle: { fontSize: 18, fontFamily: "Inter_700Bold", color: Colors.text, textAlign: "center" },
  softCardText: { fontSize: 14, color: Colors.textSecondary, textAlign: "center", lineHeight: 20 },
  softCardButton: { backgroundColor: Colors.primary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginTop: 8 },
  softCardButtonText: { color: Colors.text, fontFamily: "Inter_600SemiBold", fontSize: 14 },
  destList: { width: "100%", gap: 8, marginTop: 8 },
  destItem: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: Colors.background, padding: 12, borderRadius: 10 },
  destItemText: { color: Colors.text, fontFamily: "Inter_500Medium" },
  regionTag: { fontSize: 12, color: Colors.accent, fontFamily: "Inter_600SemiBold", backgroundColor: Colors.accent + "22", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  kingdomBanner: { marginHorizontal: 20, borderRadius: 16, overflow: "hidden", marginBottom: 20 },
  kingdomBannerContent: { flex: 1 },
  kingdomBannerPeriod: { fontSize: 10, color: "rgba(255,255,255,0.7)", fontFamily: "Inter_600SemiBold", textTransform: "uppercase" },
  kingdomBannerName: { fontSize: 24, fontFamily: "Inter_700Bold", color: Colors.text, marginVertical: 4 },
  kingdomBannerDesc: { fontSize: 12, color: "rgba(255,255,255,0.9)", fontFamily: "Inter_400Regular" },
  discoveryRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, marginTop: 20, marginBottom: 12 },
  discoveryRowLabel: { fontSize: 14, fontFamily: "Inter_600SemiBold", color: Colors.textSecondary },

  modalOverlay: { flex: 1, backgroundColor: Colors.overlay, justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: Colors.backgroundSecondary, borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '85%', overflow: 'hidden' },
  modalHandle: { width: 40, height: 4, backgroundColor: Colors.border, borderRadius: 2, alignSelf: 'center', marginTop: 12, marginBottom: 4 },
  modalImage: { width: '100%', height: 220 },
  modalImageFallback: { width: '100%', height: 160, alignItems: 'center', justifyContent: 'center' },
  modalBody: { padding: 20 },
  modalTypeBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 8 },
  modalTypeText: { fontSize: 11, fontFamily: "Inter_600SemiBold" },
  modalTitle: { fontSize: 22, fontFamily: "Inter_700Bold", color: Colors.text, marginBottom: 6 },
  modalMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  modalMetaText: { fontSize: 13, color: Colors.accent, fontFamily: "Inter_500Medium" },
  modalDescription: { fontSize: 14, color: Colors.textSecondary, fontFamily: "Inter_400Regular", lineHeight: 22, marginBottom: 16 },
  modalInfoRow: { flexDirection: 'row', gap: 16, marginBottom: 16, flexWrap: 'wrap' },
  modalInfoItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  modalInfoLabel: { fontSize: 11, color: Colors.textMuted, fontFamily: "Inter_500Medium" },
  modalInfoValue: { fontSize: 13, color: Colors.text, fontFamily: "Inter_600SemiBold" },
  modalSection: { marginBottom: 16 },
  modalSectionTitle: { fontSize: 12, color: Colors.textMuted, fontFamily: "Inter_600SemiBold", textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  modalTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  modalTag: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, borderWidth: 1 },
  modalTagText: { fontSize: 12, fontFamily: "Inter_500Medium" },
  modalAskBtn: { backgroundColor: Colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 14, marginTop: 8, marginBottom: 20 },
  modalAskBtnText: { color: Colors.text, fontSize: 15, fontFamily: "Inter_600SemiBold" },
  modalCloseBtn: { position: 'absolute', top: 12, right: 16, backgroundColor: Colors.surface + 'CC', borderRadius: 20, width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
});
