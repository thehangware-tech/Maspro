import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  StatusBar,
  Pressable,
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

export default function NotificationsSettings() {
  const [prefs, setPrefs] = useState({
    orders: true,
    promotions: false,
    priceDrops: true,
    stock: true,
  });

  const togglePref = (key: keyof typeof prefs) => {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  };

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
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Push Notifications</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <View style={{ flex: 1, paddingRight: 16 }}>
              <Text style={styles.label}>Order Updates</Text>
              <Text style={styles.desc}>
                Get real-time updates on your order status and tracking.
              </Text>
            </View>
            <Switch
              value={prefs.orders}
              onValueChange={() => togglePref("orders")}
              trackColor={{ false: "#E5E7EB", true: "#0EA5E9" }}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={{ flex: 1, paddingRight: 16 }}>
              <Text style={styles.label}>Promotions & Offers</Text>
              <Text style={styles.desc}>
                Receive exclusive deals, coupons, and flash sale alerts.
              </Text>
            </View>
            <Switch
              value={prefs.promotions}
              onValueChange={() => togglePref("promotions")}
              trackColor={{ false: "#E5E7EB", true: "#0EA5E9" }}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={{ flex: 1, paddingRight: 16 }}>
              <Text style={styles.label}>Price Drops</Text>
              <Text style={styles.desc}>
                We'll let you know when items in your wishlist go on sale.
              </Text>
            </View>
            <Switch
              value={prefs.priceDrops}
              onValueChange={() => togglePref("priceDrops")}
              trackColor={{ false: "#E5E7EB", true: "#0EA5E9" }}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={{ flex: 1, paddingRight: 16 }}>
              <Text style={styles.label}>Back in Stock</Text>
              <Text style={styles.desc}>
                Alerts for items you requested to be notified about.
              </Text>
            </View>
            <Switch
              value={prefs.stock}
              onValueChange={() => togglePref("stock")}
              trackColor={{ false: "#E5E7EB", true: "#0EA5E9" }}
            />
          </View>
        </View>

        <Text style={styles.note}>
          Changes are saved automatically. You may also need to check your
          device settings to ensure MASPRO has notification permissions enabled.
        </Text>
      </View>
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
  content: { padding: 20 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
    paddingLeft: 4,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  row: { flexDirection: "row", alignItems: "center", padding: 16 },
  divider: { height: 1, backgroundColor: "#F3F4F6", marginHorizontal: 16 },
  label: { fontSize: 16, fontWeight: "600", color: "#111827", marginBottom: 4 },
  desc: { fontSize: 13, color: "#6B7280", lineHeight: 18 },
  note: {
    marginTop: 24,
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    paddingHorizontal: 16,
    lineHeight: 20,
  },
});
