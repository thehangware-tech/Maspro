import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Svg, { Path, Circle } from "react-native-svg";
import { useFilterStore } from "../../src/store/filterStore";

const BackIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18l-6-6 6-6"
      stroke="#111827"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const ChevronRight = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 18l6-6-6-6"
      stroke="#9CA3AF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const SearchIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="8" stroke="#9CA3AF" strokeWidth="2" />
    <Path
      d="M21 21l-4.35-4.35"
      stroke="#9CA3AF"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

const CATS = [
  {
    id: "cricket",
    name: "Cricket",
    icon: "🏏",
    count: 120,
    sub: "Bats, Balls, Gloves, Pads, Helmets, Accessories",
  },
  {
    id: "football",
    name: "Football",
    icon: "⚽",
    count: 85,
    sub: "Boots, Jerseys, Balls, Shin Guards",
  },
  {
    id: "badminton",
    name: "Badminton",
    icon: "🏸",
    count: 63,
    sub: "Rackets, Shuttles, Shoes, Kits",
  },
  {
    id: "basketball",
    name: "Basketball",
    icon: "🏀",
    count: 47,
    sub: "Balls, Shoes, Jerseys, Boards",
  },
  {
    id: "volleyball",
    name: "Volleyball",
    icon: "🏐",
    count: 38,
    sub: "Balls, Nets, Knee Pads, Shoes",
  },
  {
    id: "tennis",
    name: "Tennis",
    icon: "🎾",
    count: 55,
    sub: "Rackets, Balls, Strings, Bags",
  },
  {
    id: "swimming",
    name: "Swimming",
    icon: "🏊",
    count: 42,
    sub: "Goggles, Swimwear, Caps, Fins",
  },
  {
    id: "running",
    name: "Running",
    icon: "🏃",
    count: 91,
    sub: "Shoes, Tracks, Socks, Watches",
  },
  {
    id: "fitness",
    name: "Fitness",
    icon: "🏋️",
    count: 114,
    sub: "Weights, Bands, Yoga, Supplements",
  },
  {
    id: "sportswear",
    name: "Sportswear",
    icon: "👕",
    count: 200,
    sub: "Jerseys, Shorts, Jackets, Caps",
  },
  {
    id: "accessories",
    name: "Accessories",
    icon: "🎒",
    count: 76,
    sub: "Bags, Bottles, Towels, Socks",
  },
];

export default function Categories() {
  const setCategory = useFilterStore((s) => s.setCategory);

  const handleCategoryPress = (catId: string, catName: string) => {
    setCategory(catId);
    router.push({ pathname: "/product-list", params: { name: catName } });
  };

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <BackIcon />
        </Pressable>
        <Text style={styles.headerTitle}>Categories</Text>
        <Pressable style={styles.searchBtn}>
          <SearchIcon />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, gap: 10, paddingBottom: 24 }}
      >
        {CATS.map((cat) => (
          <Pressable
            key={cat.id}
            style={styles.catRow}
            onPress={() => handleCategoryPress(cat.id, cat.name)}
          >
            {/* Icon */}
            <View style={styles.catIconWrap}>
              <Text style={{ fontSize: 36 }}>{cat.icon}</Text>
            </View>
            {/* Info */}
            <View style={{ flex: 1, paddingHorizontal: 14 }}>
              <Text style={styles.catName}>{cat.name}</Text>
              <Text style={styles.catSub} numberOfLines={1}>
                {cat.sub}
              </Text>
              <Text style={styles.catCount}>{cat.count}+ Products</Text>
            </View>
            <ChevronRight />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backBtn: { padding: 4, marginRight: 8 },
  headerTitle: { flex: 1, fontSize: 18, fontWeight: "700", color: "#111827" },
  searchBtn: {
    width: 36,
    height: 36,
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  catRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  catIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: "#E0F2FE",
    alignItems: "center",
    justifyContent: "center",
  },
  catName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 3,
  },
  catSub: { fontSize: 11, color: "#6B7280", marginBottom: 4 },
  catCount: { fontSize: 12, fontWeight: "700", color: "#0EA5E9" },
});
