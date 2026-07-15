import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  StatusBar,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import Svg, { Path, Circle, Line } from "react-native-svg";
import { useQuery } from "@tanstack/react-query";
import { CategoryService } from "../../src/services/CategoryService";
import { ProductService } from "../../src/services/ProductService";
import { useFilterStore } from "../../src/store/filterStore";
import { useWishlistStore } from "../../src/store/wishlistStore";
import { useCartStore } from "../../src/store/cartStore";
import { Product } from "../../src/types";
import { BANNERS } from "../../src/data/mockData";

const { width } = Dimensions.get("window");
const CARD_W = (width - 48) / 2;

const SearchIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="8" stroke="#9CA3AF" strokeWidth="2" />
    <Line
      x1="21"
      y1="21"
      x2="16.65"
      y2="16.65"
      stroke="#9CA3AF"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);
const BellIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
      stroke="#374151"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M13.73 21a2 2 0 0 1-3.46 0"
      stroke="#374151"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);
const CartIcon2 = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Circle cx="9" cy="21" r="1" stroke="#374151" strokeWidth="2" />
    <Circle cx="20" cy="21" r="1" stroke="#374151" strokeWidth="2" />
    <Path
      d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
      stroke="#374151"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);
const StarIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 24 24" fill="#F59E0B">
    <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </Svg>
);
const HeartIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      stroke="#D1D5DB"
      strokeWidth="2"
    />
  </Svg>
);

const ProductCard = ({ item }: { item: Product }) => {
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(item.id));

  return (
    <Pressable
      style={styles.productCard}
      onPress={() =>
        router.push({ pathname: "/product/[id]", params: { id: item.id } })
      }
    >
      <View style={[styles.productImgBox, { backgroundColor: item.bg }]}>
        <Text style={{ fontSize: 60 }}>{item.emoji}</Text>
        <View style={styles.discBadge}>
          <Text style={styles.discBadgeText}>{item.discount}% OFF</Text>
        </View>
        <Pressable
          style={styles.wishBtn}
          onPress={(e) => {
            e.stopPropagation();
            toggleWishlist(item.id);
          }}
        >
          {isInWishlist ? (
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="#EF4444">
              <Path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                stroke="#EF4444"
                strokeWidth="2"
              />
            </Svg>
          ) : (
            <HeartIcon />
          )}
        </Pressable>
      </View>
      <View style={{ padding: 10 }}>
        <Text style={styles.prodBrand}>{item.brand}</Text>
        <Text style={styles.prodName} numberOfLines={2}>
          {item.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 3,
            marginBottom: 6,
          }}
        >
          <StarIcon />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Text style={styles.price}>₹{item.price.toLocaleString()}</Text>
          <Text style={styles.origPrice}>
            ₹{item.original.toLocaleString()}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default function Home() {
  const [bannerIdx, setBannerIdx] = useState(0);
  const setSearchQuery = useFilterStore((s) => s.setSearchQuery);
  const setCategory = useFilterStore((s) => s.setCategory);
  const cartItemsCount = useCartStore((s) => s.getTotalItems());

  const [localSearch, setLocalSearch] = useState("");

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoryService.getCategories(),
  });

  const { data: popularProducts = [] } = useQuery({
    queryKey: ["products", "popular"],
    queryFn: () => ProductService.getProducts({ sort: "Popular" }),
  });

  const handleSearch = () => {
    if (localSearch.trim()) {
      setSearchQuery(localSearch);
      router.push("/product-list");
    }
  };

  const handleCategoryPress = (catId: string, catName: string) => {
    setCategory(catId);
    router.push({ pathname: "/product-list", params: { name: catName } });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#F8FAFC" }}
      edges={["top"]}
    >
      <StatusBar barStyle="dark-content" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
            <Svg width={12} height={12} viewBox="0 0 24 24" fill="none">
              <Path
                d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                stroke="#0EA5E9"
                strokeWidth="2"
              />
              <Circle cx="12" cy="10" r="3" stroke="#0EA5E9" strokeWidth="2" />
            </Svg>
            <Text style={{ fontSize: 11, color: "#374151", fontWeight: "600" }}>
              Bangalore, Karnataka ▾
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Text
            style={{
              color: "#0EA5E9",
              fontSize: 18,
              fontWeight: "900",
              fontStyle: "italic",
            }}
          >
            M
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "900",
              color: "#0284C7",
              letterSpacing: 2,
            }}
          >
            MASPRO
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Pressable style={styles.iconBtn}>
            <BellIcon />
          </Pressable>
          <Pressable
            style={styles.iconBtn}
            onPress={() => router.push("/(tabs)/cart")}
          >
            <CartIcon2 />
            {cartItemsCount > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: -2,
                  right: -2,
                  backgroundColor: "#EF4444",
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 9, fontWeight: "800" }}>
                  {cartItemsCount}
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Search */}
        <View style={{ padding: 16 }}>
          <View style={styles.searchBox}>
            <SearchIcon />
            <TextInput
              style={{ flex: 1, fontSize: 14, color: "#111827" }}
              placeholder="Search for products, brands..."
              placeholderTextColor="#9CA3AF"
              value={localSearch}
              onChangeText={setLocalSearch}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
          </View>
        </View>

        {/* Banner */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) =>
            setBannerIdx(
              Math.round(e.nativeEvent.contentOffset.x / (width - 32)),
            )
          }
          style={{ marginHorizontal: 16, borderRadius: 20, overflow: "hidden" }}
        >
          {BANNERS.map((b) => (
            <LinearGradient key={b.id} colors={b.colors} style={styles.banner}>
              <View style={{ flex: 1 }}>
                <Text style={styles.bannerTitle}>{b.title}</Text>
                <Text style={styles.bannerSub}>{b.sub}</Text>
                <Pressable
                  style={styles.bannerBtn}
                  onPress={() =>
                    handleCategoryPress(b.linkParams.cat, "Category")
                  }
                >
                  <Text style={styles.bannerBtnText}>{b.cta}</Text>
                </Pressable>
              </View>
              <Text style={{ fontSize: 72 }}>{b.emoji}</Text>
            </LinearGradient>
          ))}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 6,
            marginTop: 10,
          }}
        >
          {BANNERS.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === bannerIdx && styles.dotActive]}
            />
          ))}
        </View>

        {/* Quick Links */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 14 }}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
        >
          {["Best Sellers", "New Arrivals", "Offers", "Premium"].map((q) => (
            <Pressable key={q} style={styles.quickChip}>
              <Text
                style={{ fontSize: 12, fontWeight: "600", color: "#374151" }}
              >
                {q}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Categories */}
        <View style={{ marginTop: 24 }}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Categories</Text>
            <Pressable onPress={() => router.push("/(tabs)/categories")}>
              <Text style={styles.viewAll}>View All</Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          >
            {categories.map((c) => (
              <Pressable
                key={c.id}
                style={styles.catCard}
                onPress={() => handleCategoryPress(c.id, c.name)}
              >
                <View style={styles.catIconBox}>
                  <Text style={{ fontSize: 28 }}>{c.icon}</Text>
                </View>
                <Text style={styles.catName}>{c.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Popular Products */}
        <View style={{ marginTop: 24 }}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Products</Text>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/product-list",
                  params: { sort: "Popular" },
                })
              }
            >
              <Text style={styles.viewAll}>View All</Text>
            </Pressable>
          </View>
          <View style={styles.grid}>
            {popularProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} item={p} />
            ))}
          </View>
        </View>

        {/* Flash Sale */}
        <View style={{ marginTop: 24, marginHorizontal: 16 }}>
          <LinearGradient
            colors={["#7C3AED", "#9333EA"]}
            style={styles.flashBanner}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "800" }}>
                ⚡ FLASH SALE
              </Text>
              <Text
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                Ends in 02:34:15
              </Text>
            </View>
            <Pressable
              style={styles.flashBtn}
              onPress={() =>
                router.push({
                  pathname: "/product-list",
                  params: { sort: "Price: Low → High" },
                })
              }
            >
              <Text
                style={{ color: "#7C3AED", fontSize: 12, fontWeight: "700" }}
              >
                Shop Now
              </Text>
            </Pressable>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  iconBtn: { padding: 4 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  banner: {
    width: width - 32,
    height: 155,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    overflow: "hidden",
  },
  bannerTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 22,
    marginBottom: 5,
  },
  bannerSub: { color: "rgba(255,255,255,0.8)", fontSize: 11, marginBottom: 12 },
  bannerBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 7,
    alignSelf: "flex-start",
  },
  bannerBtnText: { color: "#0EA5E9", fontSize: 12, fontWeight: "700" },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#D1D5DB" },
  dotActive: { width: 18, backgroundColor: "#0EA5E9" },
  quickChip: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#111827" },
  viewAll: { fontSize: 13, fontWeight: "600", color: "#0EA5E9" },
  catCard: {
    width: 86,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  catIconBox: {
    width: 44,
    height: 44,
    backgroundColor: "#E0F2FE",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  catName: {
    fontSize: 10,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 12,
  },
  productCard: {
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
  productImgBox: {
    height: 135,
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
  discBadgeText: { color: "#fff", fontSize: 9, fontWeight: "800" },
  wishBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    width: 26,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  prodBrand: {
    fontSize: 10,
    fontWeight: "700",
    color: "#0EA5E9",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  prodName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
    lineHeight: 16,
    marginBottom: 4,
  },
  rating: { fontSize: 11, fontWeight: "700", color: "#374151" },
  price: { fontSize: 14, fontWeight: "800", color: "#111827" },
  origPrice: {
    fontSize: 11,
    color: "#6B7280",
    textDecorationLine: "line-through",
  },
  flashBanner: {
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  flashBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
});
