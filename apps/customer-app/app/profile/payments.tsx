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
const PlusIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 5v14m-7-7h14"
      stroke="#0EA5E9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default function Payments() {
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
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <Text style={styles.sectionTitle}>Saved Cards</Text>
        <View style={styles.cardItem}>
          <Text style={{ fontSize: 24, marginRight: 12 }}>💳</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>HDFC Bank Credit Card</Text>
            <Text style={styles.cardSub}>**** **** **** 4321</Text>
          </View>
          <Pressable>
            <Text style={styles.deleteTxt}>Remove</Text>
          </Pressable>
        </View>
        <View style={styles.cardItem}>
          <Text style={{ fontSize: 24, marginRight: 12 }}>💳</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>SBI Debit Card</Text>
            <Text style={styles.cardSub}>**** **** **** 9876</Text>
          </View>
          <Pressable>
            <Text style={styles.deleteTxt}>Remove</Text>
          </Pressable>
        </View>

        <Pressable style={styles.addBtn}>
          <PlusIcon />
          <Text style={styles.addTxt}>Add New Card</Text>
        </Pressable>

        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>UPI IDs</Text>
        <View style={styles.cardItem}>
          <Text style={{ fontSize: 24, marginRight: 12 }}>📲</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Google Pay</Text>
            <Text style={styles.cardSub}>rohitkumar@okaxis</Text>
          </View>
          <Pressable>
            <Text style={styles.deleteTxt}>Remove</Text>
          </Pressable>
        </View>

        <Pressable style={styles.addBtn}>
          <PlusIcon />
          <Text style={styles.addTxt}>Add New UPI ID</Text>
        </Pressable>
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
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: { fontSize: 15, fontWeight: "600", color: "#111827" },
  cardSub: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  deleteTxt: { fontSize: 13, fontWeight: "600", color: "#EF4444" },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    backgroundColor: "#1D212E",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#BFDBFE",
    borderStyle: "dashed",
  },
  addTxt: { fontSize: 14, fontWeight: "700", color: "#0EA5E9" },
});
