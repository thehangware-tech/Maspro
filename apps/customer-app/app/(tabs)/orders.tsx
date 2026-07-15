import React, { useState } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { OrderService } from "../../src/services/OrderService";
import { useUserStore } from "../../src/store/userStore";

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
const SkeletonLoader = () => (
  <View style={styles.orderCard}>
    <View
      style={{
        height: 20,
        width: 100,
        backgroundColor: "#E5E7EB",
        borderRadius: 4,
        marginBottom: 8,
      }}
    />
    <View
      style={{
        height: 14,
        width: 60,
        backgroundColor: "#E5E7EB",
        borderRadius: 4,
        marginBottom: 12,
      }}
    />
    <View style={styles.orderDivider} />
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View
        style={{
          height: 48,
          width: 48,
          backgroundColor: "#E5E7EB",
          borderRadius: 10,
        }}
      />
      <View style={{ marginLeft: 10 }}>
        <View
          style={{
            height: 16,
            width: 120,
            backgroundColor: "#E5E7EB",
            borderRadius: 4,
            marginBottom: 6,
          }}
        />
        <View
          style={{
            height: 12,
            width: 40,
            backgroundColor: "#E5E7EB",
            borderRadius: 4,
          }}
        />
      </View>
    </View>
  </View>
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

const TABS = [
  "All",
  "Processing",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  Delivered: { bg: "#D1FAE5", text: "#065F46" },
  Processing: { bg: "#DBEAFE", text: "#CC5500" },
  Packed: { bg: "#FEF3C7", text: "#92400E" },
  Shipped: { bg: "#EDE9FE", text: "#4C1D95" },
  Cancelled: { bg: "#FEE2E2", text: "#991B1B" },
};

// Replaced mock orders with query

export default function Orders() {
  const [activeTab, setActiveTab] = useState("All");
  const profile = useUserStore((s) => s.profile);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", profile?.id],
    queryFn: () => OrderService.getOrders(profile?.id || "1"),
    staleTime: 30000,
    refetchInterval: 60000,
    refetchOnMount: true,
  });

  const filtered =
    activeTab === "All" ? orders : orders.filter((o) => o.status === activeTab);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#F8FAFC" }}
      edges={["top"]}
    >
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <BackIcon />
        </Pressable>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsBar}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 14,
          gap: 8,
          alignItems: "center",
        }}
      >
        {TABS.map((t) => (
          <Pressable
            key={t}
            style={[styles.tab, activeTab === t && styles.tabActive]}
            onPress={() => setActiveTab(t)}
          >
            <Text
              style={[styles.tabText, activeTab === t && styles.tabTextActive]}
            >
              {t}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Orders List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 24 }}
      >
        {isLoading && (
          <>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </>
        )}

        {!isLoading && filtered.length === 0 && (
          <View style={styles.empty}>
            <Text style={{ fontSize: 48, marginBottom: 12 }}>📦</Text>
            <Text style={styles.emptyTitle}>No orders yet</Text>
            <Text style={styles.emptySubtitle}>
              Orders in this category will appear here
            </Text>
            <Pressable style={styles.shopBtn} onPress={() => router.push("/")}>
              <Text style={styles.shopBtnText}>Start Shopping</Text>
            </Pressable>
          </View>
        )}

        {!isLoading &&
          filtered.map((order) => {
            const sc = STATUS_COLORS[order.status] || {
              bg: "#F3F4F6",
              text: "#6B7280",
            };
            return (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <View>
                    <Text style={styles.orderId}>{order.id}</Text>
                    <Text style={styles.orderDate}>
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </Text>
                  </View>
                  <View
                    style={[styles.statusBadge, { backgroundColor: sc.bg }]}
                  >
                    <Text style={[styles.statusText, { color: sc.text }]}>
                      {order.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.orderDivider} />

                {/* Items */}
                {order.items.map((item, i) => (
                  <View key={item.id} style={styles.itemRow}>
                    <View style={styles.itemEmoji}>
                      <Text style={{ fontSize: 28 }}>{item.product.emoji}</Text>
                    </View>
                    <View style={{ flex: 1, paddingLeft: 10 }}>
                      <Text style={styles.itemName} numberOfLines={2}>
                        {item.product.name}
                      </Text>
                      <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
                    </View>
                    <Text style={styles.itemPrice}>
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </Text>
                  </View>
                ))}

                <View style={styles.orderDivider} />

                {/* Footer */}
                <View style={styles.orderFooter}>
                  <View>
                    <Text style={styles.footerLabel}>
                      {order.items.length} item
                      {order.items.length > 1 ? "s" : ""}
                    </Text>
                    <Text style={styles.orderTotal}>
                      ₹{order.total.toLocaleString()}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", gap: 8 }}>
                    <Pressable
                      style={styles.trackBtn}
                      onPress={() => router.push(`/track-order?id=${order.id}`)}
                    >
                      <Text style={styles.trackBtnText}>Track</Text>
                    </Pressable>
                    <Pressable style={styles.invoiceBtn}>
                      <Text style={styles.invoiceBtnText}>Invoice</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          })}
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
    marginLeft: 12,
  },
  tabsBar: {
    flexGrow: 0,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
  },
  tabActive: { backgroundColor: "#0EA5E9" },
  tabText: { fontSize: 12, fontWeight: "600", color: "#6B7280" },
  tabTextActive: { color: "#fff" },
  orderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  orderId: { fontSize: 14, fontWeight: "800", color: "#111827" },
  orderDate: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  statusBadge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  statusText: { fontSize: 11, fontWeight: "700" },
  orderDivider: { height: 1, backgroundColor: "#F3F4F6", marginVertical: 12 },
  itemRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  itemEmoji: {
    width: 48,
    height: 48,
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  itemName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
    lineHeight: 16,
  },
  itemQty: { fontSize: 11, color: "#6B7280", marginTop: 2 },
  itemPrice: { fontSize: 13, fontWeight: "700", color: "#111827" },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerLabel: { fontSize: 11, color: "#6B7280" },
  orderTotal: { fontSize: 16, fontWeight: "800", color: "#111827" },
  trackBtn: {
    backgroundColor: "#E0F2FE",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  trackBtnText: { color: "#0EA5E9", fontSize: 12, fontWeight: "700" },
  invoiceBtn: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  invoiceBtnText: { color: "#374151", fontSize: 12, fontWeight: "600" },
  empty: { alignItems: "center", paddingTop: 60 },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 24,
    textAlign: "center",
  },
  shopBtn: {
    backgroundColor: "#0EA5E9",
    borderRadius: 14,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  shopBtnText: { color: "#fff", fontSize: 14, fontWeight: "700" },
});
