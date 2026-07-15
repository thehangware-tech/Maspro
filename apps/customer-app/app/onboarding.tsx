import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
  Pressable,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path, Circle, Rect } from "react-native-svg";

const { width } = Dimensions.get("window");

const PAGES = [
  {
    title: "Top Quality\nSports Gear",
    subtitle:
      "Explore a wide range of products\nfor every sport and every player.",
    icon: "🏏",
    bg: ["#EFF6FF", "#DBEAFE"],
    accent: "#0EA5E9",
  },
  {
    title: "Wholesale\nPrices",
    subtitle:
      "Get the best deals on bulk orders.\nSave more when you buy more.",
    icon: "💰",
    bg: ["#F0FDF4", "#DCFCE7"],
    accent: "#16A34A",
  },
  {
    title: "Fast & Reliable\nDelivery",
    subtitle: "Order today, receive tomorrow.\nTracked shipping across India.",
    icon: "🚚",
    bg: ["#FFF7ED", "#FED7AA"],
    accent: "#EA580C",
  },
];

export default function Onboarding() {
  const [page, setPage] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const goNext = () => {
    if (page < PAGES.length - 1) {
      const next = page + 1;
      scrollRef.current?.scrollTo({ x: next * width, animated: true });
      setPage(next);
    } else {
      router.replace("/select-sports");
    }
  };

  const skip = () => router.replace("/select-sports");

  const onScroll = (e: any) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.x / width);
    setPage(newPage);
  };

  const current = PAGES[page];

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Skip */}
      <Pressable style={styles.skipBtn} onPress={skip}>
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>

      {/* Slides */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        scrollEventThrottle={16}
      >
        {PAGES.map((p, i) => (
          <LinearGradient
            key={i}
            colors={p.bg as [string, string]}
            style={styles.slide}
          >
            {/* Illustration area */}
            <View style={styles.illustrationBox}>
              <Text style={styles.illustrationIcon}>{p.icon}</Text>
              {/* Decorative ring */}
              <View style={[styles.ring, { borderColor: p.accent + "30" }]} />
              <View
                style={[styles.ringInner, { borderColor: p.accent + "20" }]}
              />
            </View>

            {/* Text */}
            <View style={styles.textBox}>
              <Text style={[styles.title, { color: p.accent }]}>{p.title}</Text>
              <Text style={styles.subtitle}>{p.subtitle}</Text>
            </View>
          </LinearGradient>
        ))}
      </ScrollView>

      {/* Bottom controls */}
      <View style={styles.bottom}>
        {/* Dots */}
        <View style={styles.dotsRow}>
          {PAGES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === page && { backgroundColor: "#0EA5E9", width: 24 },
              ]}
            />
          ))}
        </View>

        {/* Buttons */}
        <Pressable style={styles.nextBtn} onPress={goNext}>
          <Text style={styles.nextText}>
            {page === PAGES.length - 1 ? "Get Started" : "Next"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FFFFFF" },
  skipBtn: {
    position: "absolute",
    top: 52,
    right: 24,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "rgba(0,0,0,0.07)",
    borderRadius: 20,
  },
  skipText: { color: "#374151", fontSize: 13, fontWeight: "600" },

  slide: {
    width,
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 40,
  },
  illustrationBox: {
    width: 240,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    position: "relative",
  },
  illustrationIcon: { fontSize: 100, zIndex: 2 },
  ring: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1.5,
  },
  ringInner: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
  },
  textBox: { alignItems: "center", paddingHorizontal: 32 },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 36,
    marginBottom: 14,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
  },

  bottom: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    backgroundColor: "#FFFFFF",
    paddingTop: 24,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginBottom: 24,
  },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#D1D5DB" },

  nextBtn: {
    backgroundColor: "#0EA5E9",
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: "center",
    shadowColor: "#0EA5E9",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  nextText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
