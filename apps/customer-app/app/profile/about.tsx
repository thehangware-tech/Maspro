import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Svg, { Path } from "react-native-svg";

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
const ChevronIcon = () => (
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

export default function About() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#F8FAFC" }}
      edges={["top"]}
    >
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={{ padding: 4 }}>
          <BackIcon />
        </Pressable>
        <Text style={styles.headerTitle}>About MASPRO</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 20 }}>
        <View style={styles.logoBox}>
          <Text
            style={{
              color: "#0EA5E9",
              fontSize: 36,
              fontWeight: "900",
              fontStyle: "italic",
            }}
          >
            M
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "900",
              color: "#0284C7",
              letterSpacing: 2,
              marginTop: 4,
            }}
          >
            MASPRO
          </Text>
          <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 8 }}>
            Version 1.0.0 (Build 42)
          </Text>
        </View>

        <View style={styles.card}>
          <Pressable style={styles.row}>
            <Text style={styles.rowTitle}>Terms of Service</Text>
            <ChevronIcon />
          </Pressable>
          <View style={styles.divider} />
          <Pressable style={styles.row}>
            <Text style={styles.rowTitle}>Privacy Policy</Text>
            <ChevronIcon />
          </Pressable>
          <View style={styles.divider} />
          <Pressable style={styles.row}>
            <Text style={styles.rowTitle}>Return & Refund Policy</Text>
            <ChevronIcon />
          </Pressable>
          <View style={styles.divider} />
          <Pressable style={styles.row}>
            <Text style={styles.rowTitle}>Open Source Libraries</Text>
            <ChevronIcon />
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={{ fontSize: 12, color: "#6B7280", textAlign: "center" }}>
            © 2026 MASPRO Sports Pvt. Ltd.
            {"\n"}All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  logoBox: { alignItems: "center", paddingVertical: 30 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  rowTitle: { fontSize: 15, fontWeight: "600", color: "#111827" },
  divider: { height: 1, backgroundColor: "#F3F4F6", marginHorizontal: 16 },
  footer: { marginTop: 40, alignItems: "center" },
});
