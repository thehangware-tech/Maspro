import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function OrderSuccess() {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 4,
        bounciness: 12,
      }),
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(slideUp, {
          toValue: 0,
          useNativeDriver: true,
          speed: 8,
          bounciness: 4,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#F8FAFC" }}
      edges={["top", "bottom"]}
    >
      <StatusBar barStyle="dark-content" />

      <View style={styles.root}>
        {/* Success Animation */}
        <Animated.View
          style={[styles.successCircle, { transform: [{ scale }] }]}
        >
          <LinearGradient
            colors={["#22C55E", "#16A34A"]}
            style={styles.successGrad}
          >
            <Text style={styles.checkMark}>✓</Text>
          </LinearGradient>
          {/* Pulse rings */}
          <Animated.View style={[styles.ring1, { transform: [{ scale }] }]} />
          <Animated.View style={[styles.ring2, { transform: [{ scale }] }]} />
        </Animated.View>

        {/* Text */}
        <Animated.View
          style={[
            styles.textBlock,
            { opacity, transform: [{ translateY: slideUp }] },
          ]}
        >
          <Text style={styles.title}>Order Placed{"\n"}Successfully!</Text>
          <Text style={styles.subtitle}>
            Your order has been placed successfully.{"\n"}You will receive
            updates on your phone.
          </Text>

          {/* Order Info */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Order ID</Text>
              <Text style={styles.infoVal}>#MASPRO2345</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Estimated Delivery</Text>
              <Text style={[styles.infoVal, { color: "#22C55E" }]}>
                2 – 4 Business Days
              </Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Payment</Text>
              <Text style={styles.infoVal}>UPI</Text>
            </View>
          </View>

          {/* Contact */}
          <Text style={styles.contactTxt}>For queries, call us at</Text>
          <Text style={styles.contactNum}>+91 98765 43210</Text>
        </Animated.View>
      </View>

      {/* Action Buttons */}
      <Animated.View style={[styles.footer, { opacity }]}>
        <Pressable
          style={styles.trackBtn}
          onPress={() => router.replace("/(tabs)/orders")}
        >
          <Text style={styles.trackTxt}>View Order Details</Text>
        </Pressable>
        <Pressable
          style={styles.shopBtn}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={styles.shopTxt}>Continue Shopping</Text>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  successCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 32,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  successGrad: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  checkMark: { color: "#fff", fontSize: 52, fontWeight: "900", lineHeight: 60 },
  ring1: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "#DCFCE7",
    zIndex: -1,
  },
  ring2: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 1.5,
    borderColor: "#F0FDF4",
    zIndex: -2,
  },
  textBlock: { alignItems: "center", width: "100%" },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
    lineHeight: 36,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  infoCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  infoLabel: { fontSize: 13, color: "#6B7280" },
  infoVal: { fontSize: 13, fontWeight: "700", color: "#111827" },
  infoDivider: { height: 1, backgroundColor: "#F3F4F6" },
  contactTxt: { fontSize: 13, color: "#6B7280" },
  contactNum: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0EA5E9",
    marginTop: 2,
  },
  footer: { paddingHorizontal: 16, paddingBottom: 24, gap: 10 },
  trackBtn: {
    backgroundColor: "#0EA5E9",
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#0EA5E9",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  trackTxt: { color: "#fff", fontSize: 15, fontWeight: "700" },
  shopBtn: {
    backgroundColor: "#1D212E",
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#BFDBFE",
  },
  shopTxt: { color: "#0EA5E9", fontSize: 15, fontWeight: "700" },
});
