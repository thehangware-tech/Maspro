import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import Svg, { Path } from "react-native-svg";
import { useQuery } from "@tanstack/react-query";
import { OrderService } from "../src/services/OrderService";

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
const CheckIcon = () => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 6L9 17l-5-5"
      stroke="#fff"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const TRACKING_STEPS = ["Processing", "Packed", "Shipped", "Delivered"];

export default function TrackOrder() {
  const { id } = useLocalSearchParams();

  const { data: order, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: () => OrderService.getOrderById(id as string),
    enabled: !!id,
    refetchInterval: 60000,
  });

  if (isLoading || !order) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#F8FAFC",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#0EA5E9" />
      </SafeAreaView>
    );
  }

  const currentStepIndex = TRACKING_STEPS.indexOf(order.status);
  // If cancelled or returned, we handle differently, but for standard flow:
  const isCancelled = order.status === "Cancelled";

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
        <Text style={styles.headerTitle}>Track Order</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, gap: 16 }}
      >
        {/* Order Summary */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.orderId}>{order.id}</Text>
            <Text style={styles.orderTotal}>
              ₹{order.total.toLocaleString()}
            </Text>
          </View>
          <Text style={styles.orderDate}>
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </Text>
          {order.estimatedDelivery && (
            <Text style={styles.estDelivery}>
              Estimated Delivery:{" "}
              <Text style={{ color: "#16A34A", fontWeight: "700" }}>
                {new Date(order.estimatedDelivery).toLocaleDateString()}
              </Text>
            </Text>
          )}
        </View>

        {/* Courier Details */}
        {order.awbNumber && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Shipping Details</Text>
            <View style={styles.courierBox}>
              <View>
                <Text style={styles.courierLabel}>Courier Partner</Text>
                <Text style={styles.courierValue}>
                  {order.courierName || "Standard Delivery"}
                </Text>
              </View>
              <View>
                <Text style={styles.courierLabel}>Tracking Number (AWB)</Text>
                <Text style={styles.courierValue}>{order.awbNumber}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Tracking Timeline */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Tracking Timeline</Text>
          <View style={{ marginTop: 12 }}>
            {isCancelled ? (
              <View style={styles.stepRow}>
                <View
                  style={[styles.stepDot, { backgroundColor: "#EF4444" }]}
                />
                <View style={{ paddingLeft: 16 }}>
                  <Text
                    style={[
                      styles.stepText,
                      { color: "#EF4444", fontWeight: "700" },
                    ]}
                  >
                    Cancelled
                  </Text>
                  <Text style={styles.stepDate}>
                    {new Date(
                      order.statusHistory[order.statusHistory.length - 1]
                        .timestamp,
                    ).toLocaleString()}
                  </Text>
                </View>
              </View>
            ) : (
              TRACKING_STEPS.map((step, index) => {
                const historyEntry = order.statusHistory.find(
                  (h) => h.status === step,
                );
                const isCompleted = !!historyEntry;
                const isCurrent = currentStepIndex === index;
                const isPast = currentStepIndex > index;

                return (
                  <View key={step} style={styles.stepRow}>
                    {/* Vertical Line */}
                    {index < TRACKING_STEPS.length - 1 && (
                      <View
                        style={[
                          styles.stepLine,
                          isPast || isCurrent
                            ? { backgroundColor: "#0EA5E9" }
                            : {},
                        ]}
                      />
                    )}

                    {/* Dot */}
                    <View
                      style={[
                        styles.stepDot,
                        isCompleted
                          ? { backgroundColor: "#0EA5E9", borderWidth: 0 }
                          : {},
                      ]}
                    >
                      {isCompleted && <CheckIcon />}
                    </View>

                    {/* Text */}
                    <View
                      style={{ paddingLeft: 16, paddingBottom: 24, flex: 1 }}
                    >
                      <Text
                        style={[
                          styles.stepText,
                          isCompleted
                            ? { color: "#111827", fontWeight: "700" }
                            : {},
                        ]}
                      >
                        {step}
                      </Text>
                      {historyEntry && (
                        <Text style={styles.stepDate}>
                          {new Date(historyEntry.timestamp).toLocaleString()}
                        </Text>
                      )}
                      {historyEntry?.message && (
                        <Text style={styles.stepMessage}>
                          {historyEntry.message}
                        </Text>
                      )}
                    </View>
                  </View>
                );
              })
            )}
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
    marginLeft: 12,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  orderId: { fontSize: 16, fontWeight: "800", color: "#111827" },
  orderTotal: { fontSize: 16, fontWeight: "700", color: "#0EA5E9" },
  orderDate: { fontSize: 13, color: "#6B7280" },
  estDelivery: { fontSize: 13, color: "#374151", marginTop: 8 },
  sectionTitle: { fontSize: 15, fontWeight: "700", color: "#111827" },
  courierBox: {
    marginTop: 12,
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 10,
    gap: 12,
  },
  courierLabel: {
    fontSize: 11,
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  courierValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginTop: 2,
  },
  stepRow: { flexDirection: "row" },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  stepLine: {
    position: "absolute",
    left: 11,
    top: 24,
    bottom: -4,
    width: 2,
    backgroundColor: "#E5E7EB",
    zIndex: 1,
  },
  stepText: { fontSize: 15, fontWeight: "500", color: "#6B7280" },
  stepDate: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  stepMessage: {
    fontSize: 13,
    color: "#4B5563",
    marginTop: 4,
    backgroundColor: "#F3F4F6",
    padding: 8,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
});
