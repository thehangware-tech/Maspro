import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Svg, { Path, Circle, Line } from "react-native-svg";
import { useQuery } from "@tanstack/react-query";
import { ProductService } from "../src/services/ProductService";
import { useWishlistStore } from "../src/store/wishlistStore";

const { width } = Dimensions.get("window");
const CARD_W = (width - 48) / 2;

const BackIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18l-6-6 6-6"
      stroke="#111827"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);
const HeartIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="#EF4444">
    <Path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      stroke="#EF4444"
      strokeWidth="2"
    />
  </Svg>
);
const Star = () => (
  <Svg width={11} height={11} viewBox="0 0 24 24" fill="#F59E0B">
    <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </Svg>
);

export default function Wishlist() {
  const wishlistItems = useWishlistStore((s) => s.productIds) || [];
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);

  const { data: products = [] } = useQuery({
    queryKey: ["wishlist-products", wishlistItems],
    queryFn: () => ProductService.getProductsByIds(wishlistItems),
    enabled: wishlistItems.length > 0,
  });

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#F8FAFC" }}
      edges={["top"]}
    >
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <BackIcon />
        </Pressable>
        <Text style={styles.headerTitle}>My Wishlist</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 12,
          paddingBottom: 24,
        }}
      >
        {wishlistItems.length === 0 ? (
          <View style={{ width: "100%", alignItems: "center", padding: 40 }}>
            <Text style={{ fontSize: 40, marginBottom: 12 }}>❤️</Text>
            <Text style={{ fontSize: 16, color: "#6B7280", fontWeight: "500" }}>
              Your wishlist is empty.
            </Text>
          </View>
        ) : (
          products.map((p) => (
            <Pressable
              key={p.id}
              style={styles.prodCard}
              onPress={() =>
                router.push({ pathname: "/product/[id]", params: { id: p.id } })
              }
            >
              <View style={[styles.prodImg, { backgroundColor: p.bg }]}>
                <Text style={{ fontSize: 56 }}>{p.emoji}</Text>
                {p.discount > 0 && (
                  <View style={styles.discBadge}>
                    <Text style={styles.discBadgeTxt}>{p.discount}% OFF</Text>
                  </View>
                )}
                <Pressable
                  style={styles.wishBtn}
                  onPress={(e) => {
                    e.stopPropagation();
                    toggleWishlist(p.id);
                  }}
                >
                  <HeartIcon />
                </Pressable>
                {!p.inStock && (
                  <View style={styles.outOfStock}>
                    <Text style={styles.outOfStockTxt}>Out of Stock</Text>
                  </View>
                )}
              </View>
              <View style={{ padding: 10 }}>
                <Text style={styles.prodBrand}>{p.brand}</Text>
                <Text style={styles.prodName} numberOfLines={2}>
                  {p.name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 3,
                    marginBottom: 6,
                  }}
                >
                  <Star />
                  <Text style={styles.prodRating}>{p.rating}</Text>
                  <Text style={styles.prodReviews}>({p.reviews})</Text>
                </View>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  <Text style={styles.prodPrice}>
                    ₹{p.price.toLocaleString()}
                  </Text>
                  <Text style={styles.prodOrig}>
                    ₹{p.original.toLocaleString()}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    gap: 8,
  },
  backBtn: { padding: 4 },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  prodCard: {
    width: CARD_W,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 4,
  },
  prodImg: {
    height: 130,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  discBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#22C55E",
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  discBadgeTxt: { color: "#fff", fontSize: 8, fontWeight: "800" },
  wishBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    width: 26,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  outOfStock: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 4,
    alignItems: "center",
  },
  outOfStockTxt: { color: "#fff", fontSize: 9, fontWeight: "700" },
  prodBrand: {
    fontSize: 9,
    fontWeight: "700",
    color: "#0EA5E9",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  prodName: {
    fontSize: 11,
    fontWeight: "600",
    color: "#111827",
    lineHeight: 15,
    marginBottom: 4,
  },
  prodRating: { fontSize: 10, fontWeight: "700", color: "#374151" },
  prodReviews: { fontSize: 9, color: "#6B7280" },
  prodPrice: { fontSize: 13, fontWeight: "800", color: "#111827" },
  prodOrig: {
    fontSize: 10,
    color: "#6B7280",
    textDecorationLine: "line-through",
  },
});
