import React, { useState } from "react";
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
import { router, useLocalSearchParams } from "expo-router";
import Svg, { Path, Circle, Line } from "react-native-svg";
import { useQuery } from "@tanstack/react-query";
import { ProductService } from "../../src/services/ProductService";
import { useCartStore } from "../../src/store/cartStore";
import { useWishlistStore } from "../../src/store/wishlistStore";
import { useRecentlyViewedStore } from "../../src/store/recentlyViewedStore";

const { width } = Dimensions.get("window");
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
const HeartIcon = ({ f }: { f: boolean }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill={f ? "#EF4444" : "none"}>
    <Path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      stroke={f ? "#EF4444" : "#111827"}
      strokeWidth="2"
    />
  </Svg>
);
const Star = () => (
  <Svg width={13} height={13} viewBox="0 0 24 24" fill="#F59E0B">
    <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </Svg>
);
const MinusIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Line
      x1="5"
      y1="12"
      x2="19"
      y2="12"
      stroke="#0EA5E9"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </Svg>
);
const PlusIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Line
      x1="12"
      y1="5"
      x2="12"
      y2="19"
      stroke="#0EA5E9"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <Line
      x1="5"
      y1="12"
      x2="19"
      y2="12"
      stroke="#0EA5E9"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </Svg>
);

// Replaced hardcoded products and related with React Query

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [qty, setQty] = useState(1);
  const [sel, setSel] = useState<string | null>(null);
  const [col, setCol] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQuantity);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist);
  const addRecentlyViewed = useRecentlyViewedStore((s) => s.addProduct);

  const { data: p } = useQuery({
    queryKey: ["product", id],
    queryFn: () => ProductService.getProductById(id as string),
  });

  const { data: related = [] } = useQuery({
    queryKey: ["related", p?.categoryId],
    queryFn: () =>
      p ? ProductService.getRelatedProducts(p) : Promise.resolve([]),
    enabled: !!p,
  });

  // Effect to add to recently viewed and set default size
  React.useEffect(() => {
    if (p) {
      addRecentlyViewed(p);
      if (p.sizes?.length) setSel(p.sizes[0]);
    }
  }, [p]);

  if (!p) {
    return (
      <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
        <View style={{ height: 310, backgroundColor: "#E5E7EB" }} />
        <View style={styles.card}>
          <View
            style={{
              height: 16,
              width: 80,
              backgroundColor: "#E5E7EB",
              borderRadius: 4,
              marginBottom: 8,
            }}
          />
          <View
            style={{
              height: 28,
              width: 200,
              backgroundColor: "#E5E7EB",
              borderRadius: 4,
              marginBottom: 12,
            }}
          />
          <View
            style={{
              height: 30,
              width: 150,
              backgroundColor: "#E5E7EB",
              borderRadius: 4,
            }}
          />
        </View>
      </View>
    );
  }

  const wish = isInWishlist(p.id);
  const inCartItem = items.find(
    (i) =>
      i.product.id === p.id &&
      (i.size === sel || (!i.size && !sel)) &&
      (i.color === (p.colors ? p.colors[col] : undefined) ||
        (!i.color && !p.colors)),
  );

  const handleCart = () => {
    if (p.sizes?.length && !sel) {
      setSizeError(true);
      return;
    }
    setSizeError(false);

    if (inCartItem) {
      updateQty(inCartItem.id, inCartItem.quantity + qty);
    } else {
      const color = p.colors ? p.colors[col] : undefined;
      const size = sel || undefined;
      addItem(p, qty, size, color);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <StatusBar barStyle="dark-content" />

      {/* Image */}
      <View style={{ height: 310, backgroundColor: p.bg }}>
        <SafeAreaView edges={["top"]} style={styles.imgTopBar}>
          <Pressable style={styles.circleBtn} onPress={() => router.back()}>
            <BackIcon />
          </Pressable>
          <Pressable
            style={styles.circleBtn}
            onPress={() => toggleWishlist(p.id)}
          >
            <HeartIcon f={wish} />
          </Pressable>
        </SafeAreaView>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 110 }}>{p.emoji}</Text>
        </View>
        <View style={styles.imgDots}>
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              style={[styles.imgDot, i === imgIdx && styles.imgDotActive]}
            />
          ))}
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.brand}>{p.brand}</Text>
          <Text style={styles.name}>{p.name}</Text>

          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((i) => (
              <View
                key={i}
                style={{ opacity: i <= Math.floor(p.rating) ? 1 : 0.3 }}
              >
                <Star />
              </View>
            ))}
            <Text style={styles.ratingNum}>{p.rating}</Text>
            <Text style={styles.reviewTxt}>
              ({p.reviews.toLocaleString()} reviews) •{" "}
              {Math.floor(Math.random() * 500) + 50}+ sold
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{p.price.toLocaleString()}</Text>
            <Text style={styles.origPrice}>₹{p.original.toLocaleString()}</Text>
            <View style={styles.discPill}>
              <Text style={styles.discPillTxt}>{p.discount}% OFF</Text>
            </View>
          </View>

          <View style={styles.div} />

          {p.sizes && p.sizes.length > 0 && (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 10,
                }}
              >
                <Text style={styles.secLabel}>Select Size</Text>
                {sizeError && (
                  <Text
                    style={{
                      color: "#EF4444",
                      fontSize: 12,
                      fontWeight: "600",
                    }}
                  >
                    * Please select a size
                  </Text>
                )}
              </View>
              <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
                {p.sizes.map((s: string) => (
                  <Pressable
                    key={s}
                    style={[
                      styles.sizeChip,
                      sel === s && styles.sizeChipSel,
                      sizeError && !sel && { borderColor: "#EF4444" },
                    ]}
                    onPress={() => {
                      setSel(s);
                      setSizeError(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.sizeTxt,
                        sel === s && { color: "#0EA5E9" },
                      ]}
                    >
                      {s}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </>
          )}

          {p.colors && p.colors.length > 0 && (
            <>
              <Text style={[styles.secLabel, { marginTop: 16 }]}>Colors</Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                {p.colors.map((c: string, i: number) => (
                  <Pressable
                    key={i}
                    style={[
                      styles.colorDot,
                      { backgroundColor: c },
                      col === i && styles.colorDotSel,
                    ]}
                    onPress={() => setCol(i)}
                  />
                ))}
              </View>
            </>
          )}

          {p.inStock && p.stockCount !== undefined && p.stockCount < 5 && (
            <View style={{ marginTop: 12 }}>
              <Text
                style={{ color: "#DC2626", fontSize: 13, fontWeight: "700" }}
              >
                Only {p.stockCount} left in stock!
              </Text>
            </View>
          )}

          <Text style={[styles.secLabel, { marginTop: 16 }]}>Quantity</Text>
          <View style={styles.qtyRow}>
            <Pressable
              style={styles.qtyBtn}
              onPress={() => setQty((q) => Math.max(1, q - 1))}
            >
              <MinusIcon />
            </Pressable>
            <Text style={styles.qtyNum}>{qty}</Text>
            <Pressable
              style={styles.qtyBtn}
              onPress={() => setQty((q) => q + 1)}
            >
              <PlusIcon />
            </Pressable>
          </View>

          <View style={styles.div} />

          <Text style={styles.secLabel}>Description</Text>
          <Text style={styles.desc}>{p.description}</Text>

          <Text style={[styles.secLabel, { marginTop: 16 }]}>
            Specifications
          </Text>
          <View style={styles.specsBox}>
            <View style={[styles.specRow, { backgroundColor: "#F8FAFC" }]}>
              <Text style={styles.specLabel}>Category</Text>
              <Text style={styles.specVal}>{p.categoryId}</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Sub Category</Text>
              <Text style={styles.specVal}>{p.subCategory}</Text>
            </View>
            <View style={[styles.specRow, { backgroundColor: "#F8FAFC" }]}>
              <Text style={styles.specLabel}>Stock</Text>
              <Text style={styles.specVal}>
                {p.inStock ? "Available" : "Out of Stock"}
              </Text>
            </View>
          </View>

          <View style={styles.div} />

          <Text style={styles.secLabel}>Related Products</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
          >
            {related.map((rp) => (
              <Pressable
                key={rp.id}
                style={styles.relCard}
                onPress={() =>
                  router.push({
                    pathname: "/product/[id]",
                    params: { id: rp.id },
                  })
                }
              >
                <View style={[styles.relImg, { backgroundColor: rp.bg }]}>
                  <Text style={{ fontSize: 34 }}>{rp.emoji}</Text>
                  <View style={styles.relDisc}>
                    <Text
                      style={{ color: "#fff", fontSize: 8, fontWeight: "800" }}
                    >
                      {rp.discount}%
                    </Text>
                  </View>
                </View>
                <View style={{ padding: 8 }}>
                  <Text style={styles.relName} numberOfLines={2}>
                    {rp.name}
                  </Text>
                  <Text style={styles.relPrice}>
                    ₹{rp.price.toLocaleString()}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Action Bar */}
      <View style={styles.actionBar}>
        {p.inStock ? (
          <>
            {inCartItem ? (
              <View style={styles.inCartControl}>
                <Pressable
                  style={styles.qtyBtn}
                  onPress={() =>
                    updateQty(inCartItem.id, inCartItem.quantity - 1)
                  }
                >
                  <MinusIcon />
                </Pressable>
                <Text style={styles.qtyNum}>{inCartItem.quantity}</Text>
                <Pressable
                  style={styles.qtyBtn}
                  onPress={() =>
                    updateQty(inCartItem.id, inCartItem.quantity + 1)
                  }
                >
                  <PlusIcon />
                </Pressable>
              </View>
            ) : (
              <Pressable
                style={[
                  styles.addCartBtn,
                  added && {
                    backgroundColor: "#DCFCE7",
                    borderColor: "#22C55E",
                  },
                ]}
                onPress={handleCart}
              >
                <Text
                  style={[styles.addCartTxt, added && { color: "#166534" }]}
                >
                  {added ? "✓ Added to Cart" : "🛒  Add to Cart"}
                </Text>
              </Pressable>
            )}
            <Pressable
              style={styles.buyBtn}
              onPress={() => router.push("/checkout")}
            >
              <Text style={styles.buyTxt}>Buy Now</Text>
            </Pressable>
          </>
        ) : (
          <Pressable style={styles.notifyBtn}>
            <Text style={styles.notifyTxt}>🔔 Notify me when available</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imgTopBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  imgDots: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  imgDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  imgDotActive: { width: 18, backgroundColor: "#0EA5E9" },
  card: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    marginTop: -16,
  },
  brand: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0EA5E9",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  name: { fontSize: 18, fontWeight: "800", color: "#111827", lineHeight: 26 },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 10,
    marginBottom: 12,
  },
  ratingNum: { fontSize: 13, fontWeight: "700", color: "#374151" },
  reviewTxt: { fontSize: 12, color: "#6B7280" },
  priceRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  price: { fontSize: 26, fontWeight: "900", color: "#111827" },
  origPrice: {
    fontSize: 15,
    color: "#6B7280",
    textDecorationLine: "line-through",
  },
  discPill: {
    backgroundColor: "#DCFCE7",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  discPillTxt: { color: "#166534", fontSize: 11, fontWeight: "800" },
  div: { height: 1, backgroundColor: "#F3F4F6", marginVertical: 16 },
  secLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },
  sizeChip: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  sizeChipSel: { backgroundColor: "#1D212E", borderColor: "#0EA5E9" },
  sizeTxt: { fontSize: 12, fontWeight: "700", color: "#374151" },
  colorDot: { width: 30, height: 30, borderRadius: 15 },
  colorDotSel: { borderWidth: 3, borderColor: "#0EA5E9" },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    borderRadius: 12,
  },
  qtyBtn: { paddingHorizontal: 14, paddingVertical: 10 },
  qtyNum: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    paddingHorizontal: 10,
  },
  desc: { fontSize: 13, color: "#6B7280", lineHeight: 20 },
  specsBox: {
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  specRow: { flexDirection: "row", padding: 10 },
  specLabel: { width: 110, fontSize: 12, fontWeight: "600", color: "#6B7280" },
  specVal: { flex: 1, fontSize: 12, fontWeight: "600", color: "#111827" },
  relCard: {
    width: 120,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  relImg: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  relDisc: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "#22C55E",
    borderRadius: 5,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  relName: {
    fontSize: 10,
    fontWeight: "600",
    color: "#111827",
    lineHeight: 14,
  },
  relPrice: { fontSize: 11, fontWeight: "800", color: "#0EA5E9", marginTop: 4 },
  actionBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#FFFFFF",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 10,
  },
  addCartBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1D212E",
    borderRadius: 14,
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: "#BFDBFE",
  },
  addCartTxt: { color: "#0EA5E9", fontSize: 14, fontWeight: "700" },
  inCartControl: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F3F4F6",
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    paddingHorizontal: 10,
  },
  buyBtn: {
    flex: 1,
    backgroundColor: "#0EA5E9",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  buyTxt: { color: "#fff", fontSize: 14, fontWeight: "700" },
  notifyBtn: {
    flex: 1,
    backgroundColor: "#374151",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  notifyTxt: { color: "#fff", fontSize: 14, fontWeight: "700" },
});
