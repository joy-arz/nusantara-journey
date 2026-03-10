import React, { useState } from "react";
import {
  View, Text, StyleSheet, FlatList, Pressable,
  TextInput, Dimensions, Platform, ScrollView, Modal
} from "react-native";
import { Image } from "expo-image";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { TAB_BAR_HEIGHT, WEB_TOP_INSET, WEB_BOTTOM_INSET } from "@/constants/layout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { Colors } from "@/constants/colors";
import { useCart } from "@/context/CartContext";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { useGame } from "@/context/GameContext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

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
  imageUrl?: string;
}

const CATEGORIES = [
  { id: "all", label: "All", icon: "grid" },
  { id: "batik", label: "Batik", icon: "shirt" },
  { id: "keris", label: "Keris", icon: "sparkles" },
  { id: "crafts", label: "Crafts", icon: "cube" },
  { id: "jewelry", label: "Jewelry", icon: "diamond" },
  { id: "textiles", label: "Textiles", icon: "layers" },
  { id: "instruments", label: "Music", icon: "musical-notes" },
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function ProductCard({ product }: { product: Product }) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const { addItem } = useCart();
  const { gainXP } = useGame();

  const handleAdd = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      origin: product.origin,
    });
    gainXP(5, "marketplace_browse");
  };

  const formatPrice = (p: number) => {
    if (p >= 1000000) return `Rp ${(p / 1000000).toFixed(1)}M`;
    if (p >= 1000) return `Rp ${(p / 1000).toFixed(0)}K`;
    return `Rp ${p}`;
  };

  return (
    <AnimatedPressable
      style={[styles.card, animStyle]}
      onPressIn={() => { scale.value = withSpring(0.97); }}
      onPressOut={() => { scale.value = withSpring(1); }}
      onPress={() => router.push({ pathname: "/product/[id]", params: { id: product.id } })}
    >
      <View style={styles.cardImage}>
        {product.imageUrl ? (
          <Image
            source={{ uri: product.imageUrl }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            transition={200}
          />
        ) : null}
        {!product.imageUrl && (
          <View style={[StyleSheet.absoluteFill, { backgroundColor: Colors.bark + "30", alignItems: 'center', justifyContent: 'center' }]}>
            <MaterialCommunityIcons 
              name={
                product.category === "batik" ? "palette" :
                product.category === "keris" ? "sword" :
                product.category === "jewelry" ? "diamond-stone" :
                product.category === "instruments" ? "music" :
                product.category === "textiles" ? "hanger" : "hammer-wrench"
              } 
              size={48} 
              color={Colors.accent + "40"} 
            />
          </View>
        )}
        <View style={styles.cardStockBadge}>
          <Text style={styles.cardStockText}>{product.inStock} left</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardName} numberOfLines={2}>{product.name}</Text>
        <View style={styles.cardOrigin}>
          <Ionicons name="location" size={10} color={Colors.textMuted} />
          <Text style={styles.cardOriginText} numberOfLines={1}>{product.origin}</Text>
        </View>
        <View style={styles.cardRating}>
          <Ionicons name="star" size={11} color={Colors.accent} />
          <Text style={styles.cardRatingText}>{product.rating?.toFixed(1)}</Text>
          <Text style={styles.cardReviews}>({product.reviewCount})</Text>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>{formatPrice(product.price)}</Text>
          <Pressable
            style={({ pressed }) => [styles.addBtn, pressed && { opacity: 0.8 }]}
            onPress={handleAdd}
            accessibilityLabel="Add to cart"
            accessibilityRole="button"
          >
            <Ionicons name="add" size={16} color={Colors.text} />
          </Pressable>
        </View>
      </View>
    </AnimatedPressable>
  );
}

export default function MarketplaceScreen() {
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [showCart, setShowCart] = useState(false);
  const { items, totalItems, totalPrice, updateQuantity } = useCart();

  const topPadding = Platform.OS === "web" ? WEB_TOP_INSET : insets.top;
  const bottomPadding = Platform.OS === "web" ? WEB_BOTTOM_INSET : 0;
  const contentBottomPadding = Platform.OS === "web" ? TAB_BAR_HEIGHT + WEB_BOTTOM_INSET : TAB_BAR_HEIGHT + insets.bottom;

  const { data: products = [], isLoading, isError, refetch } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.origin.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatPrice = (p: number) => {
    if (p >= 1000000) return `Rp ${(p / 1000000).toFixed(1)}M`;
    if (p >= 1000) return `Rp ${(p / 1000).toFixed(0)}K`;
    return `Rp ${p}`;
  };

  return (
    <View style={[styles.container, { paddingBottom: bottomPadding }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPadding + 12 }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>UMKM Marketplace</Text>
            <Text style={styles.headerSub}>Support local Indonesian artisans</Text>
          </View>
          <Pressable
            style={({ pressed }) => [styles.cartBtn, pressed && { opacity: 0.8 }]}
            onPress={() => setShowCart(!showCart)}
            accessibilityLabel={totalItems > 0 ? `Cart, ${totalItems} items` : "Open cart"}
            accessibilityRole="button"
          >
            <Ionicons name="bag" size={22} color={Colors.text} />
            {totalItems > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{totalItems}</Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* Search */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={16} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="Search products, origins..."
            placeholderTextColor={Colors.textMuted}
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={16} color={Colors.textMuted} />
            </Pressable>
          )}
        </View>

        {/* Categories */}
        <ScrollView
          horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.categories, { paddingHorizontal: 16 }]}
        >
          {CATEGORIES.map(cat => (
            <Pressable
              key={cat.id}
              style={[styles.catChip, activeCategory === cat.id && styles.catChipActive]}
              onPress={() => setActiveCategory(cat.id)}
            >
              <Ionicons
                name={cat.icon as any}
                size={13}
                color={activeCategory === cat.id ? Colors.text : Colors.textMuted}
              />
              <Text style={[styles.catChipText, activeCategory === cat.id && styles.catChipTextActive]}>
                {cat.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Cart Sheet Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCart}
        onRequestClose={() => setShowCart(false)}
      >
        <Pressable 
          style={styles.modalBackdrop} 
          onPress={() => setShowCart(false)}
        >
          <View style={styles.modalBackdrop} />
        </Pressable>
        <View style={styles.cartSheet}>
          <View style={styles.cartSheetHeader}>
            <Text style={styles.cartSheetTitle}>Cart ({totalItems})</Text>
            <Pressable onPress={() => setShowCart(false)}>
              <Ionicons name="close" size={22} color={Colors.text} />
            </Pressable>
          </View>
          {items.length === 0 ? (
            <View style={styles.cartEmpty}>
              <Ionicons name="bag-outline" size={40} color={Colors.textMuted} />
              <Text style={styles.cartEmptyText}>Your cart is empty</Text>
            </View>
          ) : (
            <ScrollView style={{ flex: 1 }}>
              {items.map(item => (
                <View key={item.id} style={styles.cartItem}>
                  <View style={styles.cartItemInfo}>
                    <Text style={styles.cartItemName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.cartItemPrice}>{formatPrice(item.price)}</Text>
                  </View>
                  <View style={styles.cartItemQty}>
                    <Pressable style={styles.qtyBtn} onPress={() => updateQuantity(item.productId, item.quantity - 1)}>
                      <Ionicons name="remove" size={14} color={Colors.text} />
                    </Pressable>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <Pressable style={styles.qtyBtn} onPress={() => updateQuantity(item.productId, item.quantity + 1)}>
                      <Ionicons name="add" size={14} color={Colors.text} />
                    </Pressable>
                  </View>
                </View>
              ))}
              <View style={styles.cartTotal}>
                <Text style={styles.cartTotalLabel}>Total</Text>
                <Text style={styles.cartTotalValue}>{formatPrice(totalPrice)}</Text>
              </View>
              <Pressable
                style={styles.checkoutBtn}
                onPress={() => { setShowCart(false); }}
                accessibilityLabel="Checkout"
                accessibilityRole="button"
              >
                <View style={styles.checkoutBtnContent}>
                  <Text style={styles.checkoutBtnText}>Checkout</Text>
                  <Ionicons name="arrow-forward" size={16} color={Colors.text} />
                </View>
              </Pressable>
            </ScrollView>
          )}
        </View>
      </Modal>

      {/* Products Grid */}
      {isError ? (
        <View style={styles.empty}>
          <Ionicons name="cloud-offline" size={40} color={Colors.textMuted} />
          <Text style={styles.loadingText}>Could not load products. Check your connection.</Text>
          <Pressable
            style={({ pressed }) => [styles.catChip, styles.catChipActive, { marginTop: 12, opacity: pressed ? 0.8 : 1 }]}
            onPress={() => refetch()}
            accessibilityLabel="Retry loading products"
            accessibilityRole="button"
          >
            <Text style={styles.catChipTextActive}>Retry</Text>
          </Pressable>
        </View>
      ) : isLoading ? (
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Loading artisan products...</Text>
        </View>
      ) : filteredProducts.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="search" size={40} color={Colors.textMuted} />
          <Text style={styles.emptyText}>No products found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.backgroundSecondary,
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  headerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 },
  headerTitle: { fontSize: 22, fontFamily: "Inter_700Bold", color: Colors.text },
  headerSub: { fontSize: 12, color: Colors.textMuted, fontFamily: "Inter_400Regular", marginTop: 2 },
  cartBtn: { position: "relative", padding: 4 },
  cartBadge: {
    position: "absolute", top: 0, right: 0,
    width: 18, height: 18, borderRadius: 9,
    backgroundColor: Colors.primary,
    alignItems: "center", justifyContent: "center",
  },
  cartBadgeText: { fontSize: 10, color: Colors.text, fontFamily: "Inter_700Bold" },
  searchBar: {
    flexDirection: "row", alignItems: "center", gap: 8,
    backgroundColor: Colors.surface,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10,
    borderWidth: 1, borderColor: Colors.border,
    marginBottom: 12,
  },
  searchInput: { flex: 1, fontSize: 14, color: Colors.text, fontFamily: "Inter_400Regular" },
  categories: { gap: 8, paddingBottom: 4 },
  catChip: {
    flexDirection: "row", alignItems: "center", gap: 5,
    paddingHorizontal: 16, paddingVertical: 7,
    borderRadius: 20, borderWidth: 1, borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  catChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  catChipText: { fontSize: 12, color: Colors.textMuted, fontFamily: "Inter_500Medium" },
  catChipTextActive: { color: Colors.text },
  grid: { padding: 16 },
  row: { gap: 12, marginBottom: 12 },
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.terracotta + "30",
  },
  cardImage: {
    height: 120, alignItems: "center", justifyContent: "center",
    position: "relative",
  },
  cardEmoji: { fontSize: 40 },
  cardStockBadge: {
    position: "absolute", bottom: 8, right: 8,
    backgroundColor: Colors.backgroundSecondary + "CC",
    paddingHorizontal: 7, paddingVertical: 3,
    borderRadius: 8,
  },
  cardStockText: { fontSize: 10, color: Colors.textMuted, fontFamily: "Inter_500Medium" },
  cardBody: { padding: 12 },
  cardName: { fontSize: 13, fontFamily: "Inter_600SemiBold", color: Colors.text, marginBottom: 5, lineHeight: 18 },
  cardOrigin: { flexDirection: "row", alignItems: "center", gap: 3, marginBottom: 5 },
  cardOriginText: { fontSize: 11, color: Colors.textMuted, fontFamily: "Inter_400Regular", flex: 1 },
  cardRating: { flexDirection: "row", alignItems: "center", gap: 3, marginBottom: 8 },
  cardRatingText: { fontSize: 12, color: Colors.accent, fontFamily: "Inter_600SemiBold" },
  cardReviews: { fontSize: 11, color: Colors.textMuted, fontFamily: "Inter_400Regular" },
  cardFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  cardPrice: { fontSize: 14, fontFamily: "Inter_700Bold", color: Colors.primary },
  addBtn: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: "center", justifyContent: "center",
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlay,
  },
  cartSheet: {
    position: "absolute", bottom: 0, right: 0, left: 0, height: "80%",
    backgroundColor: Colors.backgroundSecondary,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    borderTopWidth: 1, borderColor: Colors.border,
    paddingTop: 12,
  },
  cartSheetHeader: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: 20, paddingVertical: 16,
    borderBottomWidth: 1, borderColor: Colors.border,
  },
  cartSheetTitle: { fontSize: 18, fontFamily: "Inter_700Bold", color: Colors.text },
  cartEmpty: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  cartEmptyText: { fontSize: 14, color: Colors.textMuted, fontFamily: "Inter_400Regular" },
  cartItem: {
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 20, paddingVertical: 12,
    borderBottomWidth: 1, borderColor: Colors.border,
  },
  cartItemInfo: { flex: 1 },
  cartItemName: { fontSize: 13, fontFamily: "Inter_500Medium", color: Colors.text, marginBottom: 3 },
  cartItemPrice: { fontSize: 12, color: Colors.primary, fontFamily: "Inter_600SemiBold" },
  cartItemQty: { flexDirection: "row", alignItems: "center", gap: 10 },
  qtyBtn: {
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: Colors.surface,
    borderWidth: 1, borderColor: Colors.border,
    alignItems: "center", justifyContent: "center",
  },
  qtyText: { fontSize: 14, color: Colors.text, fontFamily: "Inter_600SemiBold", minWidth: 16, textAlign: "center" },
  cartTotal: {
    flexDirection: "row", justifyContent: "space-between",
    paddingHorizontal: 20, paddingVertical: 16,
    borderTopWidth: 1, borderColor: Colors.border,
  },
  cartTotalLabel: { fontSize: 14, fontFamily: "Inter_600SemiBold", color: Colors.textMuted },
  cartTotalValue: { fontSize: 18, fontFamily: "Inter_700Bold", color: Colors.text },
  checkoutBtn: { 
    marginHorizontal: 20, 
    marginTop: 8, 
    borderRadius: 14, 
    overflow: "hidden",
    backgroundColor: Colors.primary,
  },
  checkoutBtnContent: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 8, paddingVertical: 16,
  },
  checkoutBtnText: { fontSize: 16, fontFamily: "Inter_700Bold", color: Colors.text },
  loading: { flex: 1, alignItems: "center", justifyContent: "center" },
  loadingText: { fontSize: 14, color: Colors.textMuted, fontFamily: "Inter_400Regular" },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  emptyText: { fontSize: 14, color: Colors.textMuted, fontFamily: "Inter_400Regular" },
});
