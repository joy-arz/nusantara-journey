import React from "react";
import {
  View, Text, StyleSheet, ScrollView, Pressable, Platform
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/colors";
import { useCart } from "@/context/CartContext";
import * as Haptics from "expo-haptics";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  origin: string;
  rating: number;
  reviewCount: number;
  inStock: number;
}

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const { addItem } = useCart();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
  });

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 + 16 : insets.bottom + 16;

  const formatPrice = (p: number) => {
    if (p >= 1000000) return `Rp ${(p / 1000000).toFixed(1)}M`;
    if (p >= 1000) return `Rp ${(p / 1000).toFixed(0)}K`;
    return `Rp ${p}`;
  };

  const categoryEmoji: Record<string, string> = {
    batik: "🎨", keris: "⚔️", jewelry: "💎",
    instruments: "🎵", textiles: "🧵", crafts: "🏺",
  };

  if (isLoading || !product) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const handleAdd = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      origin: product.origin,
    });
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomPadding + 80 }}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <LinearGradient
            colors={[Colors.bark, Colors.barkLight]}
            style={StyleSheet.absoluteFill}
          />
          <View style={[styles.heroBg, { top: topPadding + 60 }]}>
            {[...Array(4)].map((_, i) => (
              <View key={i} style={[styles.batikCircle, {
                width: 80 + i * 40,
                height: 80 + i * 40,
                opacity: 0.05 - i * 0.01,
              }]} />
            ))}
          </View>
          <Pressable
            style={[styles.backBtn, { top: topPadding + 12 }]}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={20} color={Colors.text} />
          </Pressable>
          <Text style={styles.heroEmoji}>
            {categoryEmoji[product.category] || "🏺"}
          </Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryTagText}>{product.category.toUpperCase()}</Text>
          </View>

          <Text style={styles.productName}>{product.name}</Text>

          <View style={styles.metaRow}>
            <View style={styles.ratingBox}>
              <Ionicons name="star" size={14} color={Colors.accent} />
              <Text style={styles.ratingText}>{product.rating?.toFixed(1)}</Text>
              <Text style={styles.reviewCount}>({product.reviewCount} reviews)</Text>
            </View>
            <View style={styles.stockBox}>
              <Ionicons name="cube" size={14} color={product.inStock > 5 ? Colors.success : Colors.warning} />
              <Text style={[styles.stockText, { color: product.inStock > 5 ? Colors.success : Colors.warning }]}>
                {product.inStock} in stock
              </Text>
            </View>
          </View>

          <View style={styles.originRow}>
            <View style={styles.originBox}>
              <Ionicons name="location" size={16} color={Colors.primary} />
              <Text style={styles.originText}>{product.origin}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>About This Product</Text>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Cultural Significance</Text>
          <View style={styles.culturalPoints}>
            {[
              "Handcrafted by master artisans following generations-old traditions",
              "Each piece carries the unique character of its regional origin",
              "Purchasing directly supports UMKM families and cultural preservation",
              "Authentic certification from regional artisan cooperatives",
            ].map((point, i) => (
              <View key={i} style={styles.culturalPoint}>
                <View style={styles.culturalDot} />
                <Text style={styles.culturalText}>{point}</Text>
              </View>
            ))}
          </View>

          <Pressable
            style={({ pressed }) => [styles.guideLink, pressed && { opacity: 0.8 }]}
            onPress={() => router.push("/guide")}
          >
            <Ionicons name="chatbubble-ellipses" size={16} color={Colors.accent} />
            <Text style={styles.guideLinkText}>Learn more from Arjuna about {product.category} tradition</Text>
            <Ionicons name="arrow-forward" size={14} color={Colors.accent} />
          </Pressable>
        </View>
      </ScrollView>

      {/* Buy Bar */}
      <View style={[styles.buyBar, { paddingBottom: bottomPadding }]}>
        <View style={styles.priceBox}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
        </View>
        <Pressable
          style={({ pressed }) => [styles.addToCartBtn, pressed && { opacity: 0.9 }]}
          onPress={handleAdd}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.terracottaDark]}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          />
          <Ionicons name="bag-add" size={18} color="#FFF" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  loading: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: Colors.background },
  loadingText: { fontSize: 14, color: Colors.textMuted, fontFamily: "Inter_400Regular" },
  hero: {
    height: 280, alignItems: "center", justifyContent: "center",
    overflow: "hidden",
  },
  heroBg: { position: "absolute", alignItems: "center", justifyContent: "center" },
  batikCircle: {
    position: "absolute",
    borderWidth: 2, borderColor: Colors.gold,
    borderRadius: 200,
  },
  backBtn: {
    position: "absolute", left: 16,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.overlay,
    alignItems: "center", justifyContent: "center",
    zIndex: 10,
  },
  heroEmoji: { fontSize: 80 },
  content: { padding: 20 },
  categoryTag: {
    alignSelf: "flex-start",
    backgroundColor: Colors.primary + "20",
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 8, borderWidth: 1, borderColor: Colors.primary + "40",
    marginBottom: 12,
  },
  categoryTagText: { fontSize: 11, color: Colors.primary, fontFamily: "Inter_700Bold", letterSpacing: 1 },
  productName: { fontSize: 24, fontFamily: "Inter_700Bold", color: Colors.text, marginBottom: 14, lineHeight: 30 },
  metaRow: { flexDirection: "row", gap: 16, marginBottom: 12, alignItems: "center" },
  ratingBox: { flexDirection: "row", alignItems: "center", gap: 5 },
  ratingText: { fontSize: 14, color: Colors.accent, fontFamily: "Inter_700Bold" },
  reviewCount: { fontSize: 12, color: Colors.textMuted, fontFamily: "Inter_400Regular" },
  stockBox: { flexDirection: "row", alignItems: "center", gap: 5 },
  stockText: { fontSize: 12, fontFamily: "Inter_500Medium" },
  originRow: { marginBottom: 16 },
  originBox: { flexDirection: "row", alignItems: "center", gap: 6 },
  originText: { fontSize: 14, color: Colors.textSecondary, fontFamily: "Inter_500Medium" },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 20 },
  sectionTitle: { fontSize: 16, fontFamily: "Inter_700Bold", color: Colors.text, marginBottom: 12 },
  description: { fontSize: 14, color: Colors.textSecondary, fontFamily: "Inter_400Regular", lineHeight: 22 },
  culturalPoints: { gap: 10 },
  culturalPoint: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
  culturalDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.primary, marginTop: 7, flexShrink: 0 },
  culturalText: { flex: 1, fontSize: 13, color: Colors.textSecondary, fontFamily: "Inter_400Regular", lineHeight: 19 },
  guideLink: {
    flexDirection: "row", alignItems: "center", gap: 8,
    backgroundColor: Colors.accent + "15",
    padding: 14, borderRadius: 12,
    borderWidth: 1, borderColor: Colors.accent + "30",
    marginTop: 16,
  },
  guideLinkText: { flex: 1, fontSize: 13, color: Colors.accent, fontFamily: "Inter_500Medium" },
  buyBar: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    flexDirection: "row", alignItems: "center", gap: 14,
    paddingHorizontal: 20, paddingTop: 16,
    backgroundColor: Colors.backgroundSecondary,
    borderTopWidth: 1, borderColor: Colors.border,
  },
  priceBox: { flex: 1 },
  priceLabel: { fontSize: 11, color: Colors.textMuted, fontFamily: "Inter_500Medium", marginBottom: 2 },
  price: { fontSize: 22, fontFamily: "Inter_700Bold", color: Colors.primary },
  addToCartBtn: {
    flex: 2, height: 50, borderRadius: 14,
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 8, overflow: "hidden",
  },
  addToCartText: { fontSize: 16, fontFamily: "Inter_700Bold", color: "#FFF" },
});
