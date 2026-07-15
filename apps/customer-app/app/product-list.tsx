import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
  StatusBar,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import Svg, { Path, Circle, Line } from "react-native-svg";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { ProductService } from "../src/services/ProductService";
import { useFilterStore, SortOption } from "../src/store/filterStore";
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
const SearchIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="8" stroke="#6B7280" strokeWidth="2" />
    <Line
      x1="21"
      y1="21"
      x2="16.65"
      y2="16.65"
      stroke="#6B7280"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);
const FilterIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"
      stroke="#6B7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const Star = () => (
  <Svg width={11} height={11} viewBox="0 0 24 24" fill="#F59E0B">
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

const SORTS: SortOption[] = [
  "Popular",
  "Price: Low → High",
  "Price: High → Low",
  "Newest",
  "Rating",
];

export default function ProductList() {
  const { name = "Products" } = useLocalSearchParams<{ name: string }>();

  const category = useFilterStore((s) => s.category);
  const subCategory = useFilterStore((s) => s.subCategory);
  const setSubCategory = useFilterStore((s) => s.setSubCategory);
  const searchQuery = useFilterStore((s) => s.searchQuery);
  const sort = useFilterStore((s) => s.sort);
  const setSort = useFilterStore((s) => s.setSort);

  const [sortOpen, setSortOpen] = useState(false);

  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist);

  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products", { category, subCategory, searchQuery, sort }],
    queryFn: () =>
      ProductService.getProducts({ category, subCategory, searchQuery, sort }),
    placeholderData: keepPreviousData,
  });

  // Fetch all products for the category to extract all possible subcategories for the tabs
  const { data: categoryProducts = [] } = useQuery({
    queryKey: ["products", { category }],
    queryFn: () => ProductService.getProducts({ category }),
  });

  // Extract unique subcategories from unfiltered category products for the horizontal filter chips
  const dynamicFilters = [
    "All",
    ...Array.from(new Set(categoryProducts.map((p) => p.subCategory))),
  ].filter(Boolean);

  const handleSubCategory = (sub: string) => {
    if (sub === "All") setSubCategory(null);
    else setSubCategory(sub);
  };

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
        <Text style={styles.headerTitle}>{name}</Text>
        <Pressable style={styles.iconBtn}>
          <SearchIcon />
        </Pressable>
        <Pressable style={styles.iconBtn}>
          <FilterIcon />
        </Pressable>
      </View>

      {/* Sub-category filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersBar}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          gap: 8,
          alignItems: "center",
        }}
      >
        {dynamicFilters.map((f) => {
          const isActive = subCategory === f || (f === "All" && !subCategory);
          return (
            <Pressable
              key={f}
              style={[styles.filterChip, isActive && styles.filterChipActive]}
              onPress={() => handleSubCategory(f)}
            >
              <Text
                style={[styles.filterTxt, isActive && styles.filterTxtActive]}
              >
                {f}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Sort + Results Count */}
      <View style={styles.sortRow}>
        <Text style={styles.resultCount}>{products.length} Products</Text>
        <Pressable
          style={styles.sortBtn}
          onPress={() => setSortOpen((s) => !s)}
        >
          <Text style={styles.sortTxt}>⇅ {sort}</Text>
        </Pressable>
      </View>

      {/* Sort Dropdown */}
      {sortOpen && (
        <View style={styles.sortDropdown}>
          {SORTS.map((s) => (
            <Pressable
              key={s}
              style={styles.sortOption}
              onPress={() => {
                setSort(s);
                setSortOpen(false);
              }}
            >
              <Text
                style={[
                  styles.sortOptionTxt,
                  sort === s && { color: "#0EA5E9", fontWeight: "700" },
                ]}
              >
                {s}
              </Text>
              {sort === s && <Text style={{ color: "#0EA5E9" }}>✓</Text>}
            </Pressable>
          ))}
        </View>
      )}

      {/* Loading/Error/Empty States */}
      {isLoading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0EA5E9" />
        </View>
      )}

      {isError && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#DC2626",
              fontWeight: "600",
              marginBottom: 12,
            }}
          >
            Failed to load products
          </Text>
          <Pressable style={styles.sortBtn} onPress={() => refetch()}>
            <Text style={styles.sortTxt}>Try Again</Text>
          </Pressable>
        </View>
      )}

      {!isLoading && !isError && products.length === 0 && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
          }}
        >
          <Text style={{ fontSize: 48, marginBottom: 12 }}>🔍</Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#111827",
              marginBottom: 8,
            }}
          >
            No products found
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#6B7280",
              textAlign: "center",
              marginBottom: 24,
            }}
          >
            Try adjusting your filters or search query.
          </Text>
          <Pressable
            style={[styles.sortBtn, { backgroundColor: "#F3F4F6" }]}
            onPress={() => {
              setSubCategory(null);
            }}
          >
            <Text style={[styles.sortTxt, { color: "#374151" }]}>
              Clear Filters
            </Text>
          </Pressable>
        </View>
      )}

      {/* Product Grid */}
      {!isLoading && !isError && products.length > 0 && (
        <FlatList
          data={products}
          style={{ flex: 1 }}
          keyExtractor={(p) => p.id}
          numColumns={2}
          contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
          columnWrapperStyle={{ gap: 12, marginBottom: 12 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: p }) => (
            <Pressable
              style={styles.prodCard}
              onPress={() =>
                router.push({ pathname: "/product/[id]", params: { id: p.id } })
              }
            >
              <View style={[styles.prodImg, { backgroundColor: p.bg }]}>
                <Text style={{ fontSize: 56 }}>{p.emoji}</Text>
                <View style={styles.discBadge}>
                  <Text style={styles.discBadgeTxt}>{p.discount}% OFF</Text>
                </View>
                <Pressable
                  style={styles.wishBtn}
                  onPress={(e) => {
                    e.stopPropagation();
                    toggleWishlist(p.id);
                  }}
                >
                  {isInWishlist(p.id) ? (
                    <Svg
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="#EF4444"
                    >
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
          )}
        />
      )}
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
  headerTitle: { flex: 1, fontSize: 17, fontWeight: "700", color: "#111827" },
  iconBtn: {
    width: 36,
    height: 36,
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  filtersBar: {
    flexGrow: 0,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
  },
  filterChipActive: { backgroundColor: "#0EA5E9" },
  filterTxt: { fontSize: 12, fontWeight: "600", color: "#6B7280" },
  filterTxtActive: { color: "#fff" },
  sortRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  resultCount: { fontSize: 13, color: "#6B7280", fontWeight: "500" },
  sortBtn: {
    backgroundColor: "#1D212E",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sortTxt: { color: "#0EA5E9", fontSize: 12, fontWeight: "700" },
  sortDropdown: {
    position: "absolute",
    top: 160,
    right: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 8,
    zIndex: 100,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 12,
    minWidth: 180,
  },
  sortOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  sortOptionTxt: { fontSize: 13, color: "#374151", fontWeight: "500" },
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
