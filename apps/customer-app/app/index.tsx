import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function Splash() {
  const logoScale = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          useNativeDriver: true,
          speed: 5,
          bounciness: 8,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(taglineY, {
          toValue: 0,
          useNativeDriver: true,
          speed: 8,
          bounciness: 4,
        }),
      ]),
    ]).start();

    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <LinearGradient
        colors={["#CC5500", "#0EA5E9", "#38BDF8"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Decorative circles */}
      <View style={styles.circleTopRight} />
      <View style={styles.circleBottomLeft} />

      {/* Content */}
      <View style={styles.center}>
        {/* Logo */}
        <Animated.View
          style={[
            styles.logoWrap,
            { opacity: logoOpacity, transform: [{ scale: logoScale }] },
          ]}
        >
          <View style={styles.logoCircle}>
            <Text style={styles.logoLetter}>M</Text>
          </View>
          <Text style={styles.logoText}>MASPRO</Text>
          <Text style={styles.logoSub}>SPORTS INDIA</Text>
        </Animated.View>

        {/* Tagline */}
        <Animated.View
          style={{
            opacity: taglineOpacity,
            transform: [{ translateY: taglineY }],
          }}
        >
          <Text style={styles.tagline}>"Your Game. Our Gear."</Text>
          <Text style={styles.taglineSub}>
            Quality sports products{"\n"}for everyone.
          </Text>
        </Animated.View>
      </View>

      {/* Bottom indicator */}
      <Animated.View style={[styles.bottom, { opacity: taglineOpacity }]}>
        <View style={styles.dotsRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0EA5E9" },
  circleTopRight: {
    position: "absolute",
    top: -80,
    right: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  circleBottomLeft: {
    position: "absolute",
    bottom: -100,
    left: -60,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  logoWrap: { alignItems: "center", marginBottom: 48 },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  logoLetter: {
    color: "#fff",
    fontSize: 56,
    fontWeight: "900",
    fontStyle: "italic",
  },
  logoText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 6,
    marginBottom: 4,
  },
  logoSub: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 4,
  },
  tagline: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },
  taglineSub: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
  },
  bottom: { paddingBottom: 60, alignItems: "center" },
  dotsRow: { flexDirection: "row", gap: 8 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.35)",
  },
  dotActive: { width: 24, backgroundColor: "#FFFFFF" },
});
