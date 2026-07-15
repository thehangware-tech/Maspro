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

const FAQS = [
  {
    q: "How do I track my order?",
    a: "Go to the 'My Orders' section in your account, select the order you want to track, and click on 'Track Order'.",
  },
  {
    q: "What is the return policy?",
    a: "You can return most items within 7 days of delivery. Go to your orders and select 'Return Item' to initiate the process.",
  },
  {
    q: "How do I cancel my order?",
    a: "Orders can only be cancelled before they are shipped. Go to 'My Orders' and select 'Cancel Order'.",
  },
  {
    q: "When will I receive my refund?",
    a: "Refunds are processed within 5-7 business days after the returned item reaches our warehouse.",
  },
];

export default function Help() {
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
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 20 }}>
        <View>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <View style={styles.card}>
            <Pressable style={styles.row}>
              <Text style={{ fontSize: 24, marginRight: 12 }}>📞</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>Call Customer Care</Text>
                <Text style={styles.rowSub}>
                  1800-123-4567 (Mon-Sat, 9AM-6PM)
                </Text>
              </View>
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.row}>
              <Text style={{ fontSize: 24, marginRight: 12 }}>✉️</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>Email Support</Text>
                <Text style={styles.rowSub}>support@maspro.in</Text>
              </View>
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.row}>
              <Text style={{ fontSize: 24, marginRight: 12 }}>💬</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>Live Chat</Text>
                <Text style={styles.rowSub}>Typical reply time: 5 mins</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <View style={styles.card}>
            {FAQS.map((faq, index) => (
              <React.Fragment key={index}>
                <Pressable style={[styles.row, { paddingVertical: 16 }]}>
                  <Text style={[styles.rowTitle, { flex: 1 }]}>{faq.q}</Text>
                  <ChevronIcon />
                </Pressable>
                {index < FAQS.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            ))}
          </View>
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
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
    paddingLeft: 4,
  },
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
  row: { flexDirection: "row", alignItems: "center", padding: 16 },
  rowTitle: { fontSize: 15, fontWeight: "600", color: "#111827" },
  rowSub: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  divider: { height: 1, backgroundColor: "#F3F4F6", marginHorizontal: 16 },
});
