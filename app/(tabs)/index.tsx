import React, { useRef, useMemo } from "react";
import {
  View, Text, StyleSheet, ScrollView, Pressable,
  Dimensions, Platform, ImageBackground, ActivityIndicator
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

import * as Location from "expo-location";
import { TAB_BAR_HEIGHT, WEB_TOP_INSET, WEB_BOTTOM_INSET } from "@/constants/layout";
import { useNearbyPlaces } from "@/hooks/useNearbyPlaces";
import { Place } from "@/constants/places-data";

const { width, height } = Dimensions.get("window");

const KINGDOMS = [
  { id: 1, name: "Majapahit", period: "1293–1527 CE", location: "East Java", color: "#C4622D", icon: "crown" },
  { id: 2, name: "Sriwijaya", period: "650–1377 CE", location: "South Sumatra", color: "#D4A843", icon: "anchor" },
  { id: 3, name: "Borobudur Era", period: "717–1006 CE", location: "Central Java", color: "#2D5A3D", icon: "temple-buddhist" },
];

const CREATURES = [
  { name: "Garuda", type: "Divine Eagle", desc: "Sacred mount of Vishnu", icon: "bird" },
  { name: "Nyai Roro Kidul", type: "Sea Queen", desc: "Ruler of the Southern Sea", icon: "waves" },
  { name: "Barong", type: "Lion Spirit", desc: "Protector of Bali", icon: "shield-star" },
  { name: "Kuntilanak", type: "Spirit", desc: "Wandering forest spirit", icon: "ghost" },
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function KingdomCard({ kingdom }: { kingdom: typeof KINGDOMS[0] }) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      style={[
        styles.kingdomCard, 
        animStyle,
        {
          backgroundColor: kingdom.color + "22",
          borderColor: kingdom.color + "60",
          borderWidth: 1,
        }
      ]}
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
      <View style={styles.creatureIcon}>
        <MaterialCommunityIcons name={creature.icon as any} size={32} color={Colors.accent} />
      </View>
      <Text style={styles.creatureName}>{creature.name}</Text>
      <Text style={styles.creatureType}>{creature.type}</Text>
      <Text style={styles.creatureDesc} numberOfLines={2}>{creature.desc}</Text>
    </AnimatedPressable>
  );
}

function PlaceCard({ place, userCoords }: { place: Place, userCoords: { latitude: number, longitude: number } | null }) {
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

  const handlePress = () => {
    router.push({
      pathname: "/guide",
      params: { 
        initialMessage: `Tell me about ${place.name} and its connection to ${place.kingdom}`
      }
    });
  };

  return (
    <AnimatedPressable
      style={[styles.placeCard, animStyle]}
      onPressIn={() => { scale.value = withSpring(0.95); }}
      onPressOut={() => { scale.value = withSpring(1); }}
      onPress={handlePress}
    >
      <View style={styles.placeCardHeader}>
        <View style={styles.placeIconBox}>
          <Ionicons 
            name={place.type === 'heritage' ? "trail-sign" : place.type === 'museum' ? "library" : "hammer"} 
            size={20} 
            color={Colors.accent} 
          />
        </View>
        {distance && (
          <View style={styles.distanceBadge}>
            <Ionicons name="navigate" size={10} color={Colors.text} />
            <Text style={styles.distanceText}>{distance} km</Text>
          </View>
        )}
      </View>
      <Text style={styles.placeName} numberOfLines={1}>{place.name}</Text>
      <Text style={styles.placeDesc} numberOfLines={1}>{place.description}</Text>
    </AnimatedPressable>
  );
}

function LocationDiscoverySection() {
  const { 
    kingdom, 
    nearbyHeritageSites, 
    nearbyMuseums, 
    nearbyUMKM, 
    userCoords, 
    regionName, 
    isLoading, 
    permissionDenied, 
    isOutsideIndonesia 
  } = useNearbyPlaces();

  const pulse = useSharedValue(1);

  React.useEffect(() => {
    if (isLoading) {
      pulse.value = withRepeat(
        withSequence(
          withTiming(0.6, { duration: 800 }),
          withTiming(1, { duration: 800 })
        ),
        -1,
        true
      );
    } else {
      pulse.value = 1;
    }
  }, [isLoading]);

  const skeletonStyle = useAnimatedStyle(() => ({
    opacity: pulse.value
  }));

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
          <Text style={styles.softCardText}>You are currently outside Indonesia. Explore these top destination regions:</Text>
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
          <View
            style={[
              styles.kingdomBannerContent,
              { 
                backgroundColor: Colors.surface,
                borderWidth: 1,
                borderColor: kingdom.color + "30",
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16,
                borderRadius: 16,
              }
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text style={[styles.kingdomBannerPeriod, { color: kingdom.color }]}>{kingdom.period}</Text>
              <Text style={styles.kingdomBannerName}>{kingdom.name}</Text>
              <Text style={styles.kingdomBannerDesc} numberOfLines={1}>{kingdom.description}</Text>
            </View>
            <MaterialCommunityIcons name="crown" size={40} color={kingdom.color + "40"} />
          </View>
        </Pressable>
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
        {nearbyHeritageSites.map(site => (
          <PlaceCard key={site.id} place={site} userCoords={userCoords} />
        ))}
      </ScrollView>

      <View style={styles.discoveryRow}>
        <Text style={styles.discoveryRowLabel}>Nearby Museums</Text>
        <Pressable onPress={() => router.push("/guide")}>
          <Text style={styles.askArjuna}>Ask Arjuna</Text>
        </Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
        {nearbyMuseums.map(museum => (
          <PlaceCard key={museum.id} place={museum} userCoords={userCoords} />
        ))}
      </ScrollView>

      <View style={styles.discoveryRow}>
        <Text style={styles.discoveryRowLabel}>UMKM Artisans</Text>
        <Pressable onPress={() => router.push("/marketplace")}>
          <Text style={styles.askArjuna}>Visit Shop</Text>
        </Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
        {nearbyUMKM.map(umkm => (
          <PlaceCard key={umkm.id} place={umkm} userCoords={userCoords} />
        ))}
      </ScrollView>
    </View>
  );
}

export default function DiscoverScreen() {
  const insets = useSafeAreaInsets();

  const topPadding = Platform.OS === "web" ? WEB_TOP_INSET : insets.top;
  const bottomPadding = Platform.OS === "web" ? WEB_BOTTOM_INSET : 0;
  const contentBottomPadding = Platform.OS === "web" ? TAB_BAR_HEIGHT + WEB_BOTTOM_INSET : TAB_BAR_HEIGHT + insets.bottom;

  return (
    <View style={[styles.container, { paddingBottom: bottomPadding }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: contentBottomPadding }}
      >
        {/* Hero Section */}
        <View style={styles.hero}>
          <LinearGradient
            colors={["#1A0A00", Colors.bark, "#2D1A0A"]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.batikPattern}>
            <View style={styles.batikDiamondRow}>
              {[...Array(3)].map((_, i) => (
                <View key={i} style={styles.batikDiamond} />
              ))}
            </View>
            <View style={styles.batikDiamondRow}>
              {[...Array(3)].map((_, i) => (
                <View key={i + 3} style={styles.batikDiamond} />
              ))}
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

        {/* Discovery Section */}
        <LocationDiscoverySection />

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          {[
            { icon: "map", label: "Map", route: "/map", color: Colors.terracotta },
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
            <Pressable onPress={() => router.push("/map")}>
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
          style={({ pressed }) => [
            styles.guideBanner, 
            pressed && { transform: [{ scale: 0.97 }] },
            {
              backgroundColor: Colors.forestDeep,
              borderWidth: 1,
              borderColor: Colors.forest + "80",
            }
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
                style={({ pressed }) => [
                  styles.umkmCard, 
                  pressed && { transform: [{ scale: 0.97 }] },
                  {
                    backgroundColor: Colors.surface,
                    borderWidth: 1,
                    borderColor: Colors.gold + "30",
                  }
                ]}
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
    backgroundColor: "#1A0A00",
  },
  batikPattern: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: 20,
    gap: 20,
  },
  batikDiamondRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  batikDiamond: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: Colors.gold,
    transform: [{ rotate: "45deg" }],
    opacity: 0.06,
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
  heroTitle: { fontSize: 40, fontFamily: "Inter_700Bold", color: Colors.text, lineHeight: 46, marginBottom: 10 },
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
  kingdomCardContent: { padding: 16, height: 160, justifyContent: "flex-end" },
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
    width: (width - 42) / 2,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.accent + "30",
  },
  creatureIcon: { marginBottom: 8 },
  creatureName: { fontSize: 15, fontFamily: "Inter_700Bold", color: Colors.text, marginBottom: 2 },
  creatureType: { fontSize: 11, color: Colors.primary, fontFamily: "Inter_600SemiBold", marginBottom: 4 },
  creatureDesc: { fontSize: 12, color: Colors.textMuted, fontFamily: "Inter_400Regular", lineHeight: 16 },
  guideBanner: { marginHorizontal: 20, marginTop: 24, borderRadius: 18, overflow: "hidden" },
  guideBannerContent: { flexDirection: "row", padding: 20, alignItems: "center" },
  guideBannerLeft: { flex: 1 },
  guideBannerTitle: { fontSize: 20, fontFamily: "Inter_700Bold", color: Colors.text, marginBottom: 6 },
  guideBannerSubtitle: { fontSize: 13, color: Colors.textSecondary, fontFamily: "Inter_400Regular", lineHeight: 18, marginBottom: 14 },
  guideBannerButton: { flexDirection: "row", alignItems: "center", gap: 6 },
  guideBannerButtonText: { fontSize: 13, color: Colors.primary, fontFamily: "Inter_600SemiBold" },
  guideBannerRight: { marginLeft: 12 },
  guideBannerIcon: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center", justifyContent: "center",
  },
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
  
  // Discovery Styles
  discoverySkeleton: {
    marginHorizontal: 20,
    height: 140,
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    gap: 12
  },
  skeletonText: { color: Colors.textMuted, fontFamily: "Inter_500Medium", fontSize: 14 },
  softCard: {
    marginHorizontal: 20,
    padding: 24,
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    gap: 12
  },
  softCardTitle: { fontSize: 18, fontFamily: "Inter_700Bold", color: Colors.text, textAlign: "center" },
  softCardText: { fontSize: 14, color: Colors.textSecondary, textAlign: "center", lineHeight: 20 },
  softCardButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 8
  },
  softCardButtonText: { color: "#FFF", fontFamily: "Inter_600SemiBold", fontSize: 14 },
  destList: { width: "100%", gap: 8, marginTop: 8 },
  destItem: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: Colors.background, padding: 12, borderRadius: 10 },
  destItemText: { color: Colors.text, fontFamily: "Inter_500Medium" },
  regionTag: { fontSize: 12, color: Colors.accent, fontFamily: "Inter_600SemiBold", backgroundColor: Colors.accent + "22", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  kingdomBanner: { marginHorizontal: 20, borderRadius: 16, overflow: "hidden", marginBottom: 20 },
  kingdomBannerGradient: { padding: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  kingdomBannerContent: { flex: 1 },
  kingdomBannerPeriod: { fontSize: 10, color: "rgba(255,255,255,0.7)", fontFamily: "Inter_600SemiBold", textTransform: "uppercase" },
  kingdomBannerName: { fontSize: 24, fontFamily: "Inter_700Bold", color: "#FFF", marginVertical: 4 },
  kingdomBannerDesc: { fontSize: 12, color: "rgba(255,255,255,0.9)", fontFamily: "Inter_400Regular" },
  placeCard: { width: 180, backgroundColor: Colors.surface, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: Colors.border },
  placeCardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 },
  placeIconBox: { width: 36, height: 36, borderRadius: 10, backgroundColor: Colors.accent + "20", alignItems: "center", justifyContent: "center" },
  distanceBadge: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: Colors.background, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  distanceText: { fontSize: 10, color: Colors.textSecondary, fontFamily: "Inter_600SemiBold" },
  placeName: { fontSize: 14, fontFamily: "Inter_700Bold", color: Colors.text, marginBottom: 4 },
  placeDesc: { fontSize: 11, color: Colors.textMuted, fontFamily: "Inter_400Regular" },
  discoveryRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, marginTop: 20, marginBottom: 12 },
  discoveryRowLabel: { fontSize: 14, fontFamily: "Inter_600SemiBold", color: Colors.textSecondary },
  askArjuna: { fontSize: 12, color: Colors.accent, fontFamily: "Inter_600SemiBold" },
});

