import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Svg, { Path } from "react-native-svg";
import { useMutation } from "@tanstack/react-query";
import { OrderService } from "../src/services/OrderService";
import { useCartStore, getCartTotals } from "../src/store/cartStore";
import { useUserStore } from "../src/store/userStore";

const BackIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18l-6-6 6-6"
      stroke="#111827"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);
const CheckIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 6L9 17l-5-5"
      stroke="#0EA5E9"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI", sub: "Pay via UPI apps", icon: "📲" },
  {
    id: "card",
    label: "Credit / Debit Card",
    sub: "Visa, Mastercard, RuPay",
    icon: "💳",
  },
  {
    id: "netbanking",
    label: "Net Banking",
    sub: "All major banks",
    icon: "🏦",
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    sub: "Pay when you receive",
    icon: "💵",
  },
];

export default function Checkout() {
  const [step, setStep] = useState<0 | 1 | 2>(0); // 0: Address, 1: Payment, 2: Review
  const [payment, setPayment] = useState("upi");
  const [instructions, setInstructions] = useState("");

  const [pincodeStatus, setPincodeStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [pincodeMessage, setPincodeMessage] = useState("");
  const [idempotencyKey, setIdempotencyKey] = useState("");

  const cartItems = useCartStore((s) => s.items);
  const appliedCoupon = useCartStore((s) => s.appliedCoupon);
  const { subtotal, discount, shipping, tax, total } = getCartTotals(
    cartItems,
    appliedCoupon,
  );
  const clearCart = useCartStore((s) => s.clearCart);

  const profile = useUserStore((s) => s.profile);
  const address =
    profile?.addresses?.find((a) => a.isDefault) || profile?.addresses?.[0];

  useEffect(() => {
    // Generate idempotency key on mount
    setIdempotencyKey(
      `idemp_${Date.now().toString(36)}_${Math.random().toString(36).substring(2)}`,
    );
  }, []);

  const placeOrderMutation = useMutation({
    mutationFn: () =>
      OrderService.placeOrder({
        items: cartItems,
        addressId: address ? address.id : "1",
        paymentMethod: payment,
        idempotencyKey,
      }),
    onSuccess: (newOrder) => {
      clearCart();
      router.replace("/order-success");
    },
    onError: (err) => {
      alert("Payment failed or order could not be placed. Please try again.");
    },
  });

  const validatePincode = async () => {
    if (!address) {
      setPincodeStatus("error");
      setPincodeMessage("Please select an address first.");
      return;
    }
    setPincodeStatus("loading");
    try {
      const res = await OrderService.validatePincode(address.zipCode);
      if (res.serviceable) {
        setPincodeStatus("success");
        setPincodeMessage(
          `✓ Delivery available. Est. ${res.estimatedDays} days.`,
        );
      } else {
        setPincodeStatus("error");
        setPincodeMessage("✗ Not serviceable to this pincode.");
      }
    } catch (e) {
      setPincodeStatus("error");
      setPincodeMessage("Failed to validate pincode.");
    }
  };

  const handleNext = () => {
    if (step === 0) {
      if (!address) return alert("Please select an address");
      if (pincodeStatus !== "success") {
        validatePincode();
        return; // require them to wait/try again
      }
      setStep(1);
    } else if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (cartItems.length === 0) return;
      placeOrderMutation.mutate();
    }
  };

  const renderAddressStep = () => (
    <>
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <Pressable>
            <Text style={styles.changeBtn}>Change</Text>
          </Pressable>
        </View>
        {address ? (
          <View style={styles.addressBox}>
            <Text style={styles.addrName}>{profile?.name}</Text>
            <Text style={styles.addrText}>{address.street}</Text>
            <Text style={styles.addrText}>
              {address.city}, {address.state} – {address.zipCode}
            </Text>
            <Text style={styles.addrPhone}>{profile?.phone}</Text>
            <View style={styles.homeTag}>
              <Text style={styles.homeTagTxt}>
                {address.type === "home" ? "🏠 Home" : "🏢 Office"}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.addressBox}>
            <Text style={styles.addrText}>No default address selected.</Text>
          </View>
        )}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Check Serviceability</Text>
        <Pressable
          style={styles.pincodeBtn}
          onPress={validatePincode}
          disabled={pincodeStatus === "loading"}
        >
          <Text style={styles.pincodeBtnTxt}>
            {pincodeStatus === "loading"
              ? "Checking..."
              : "Check Delivery Availability"}
          </Text>
        </Pressable>
        {pincodeMessage ? (
          <Text
            style={[
              styles.pincodeMsg,
              { color: pincodeStatus === "success" ? "#16A34A" : "#DC2626" },
            ]}
          >
            {pincodeMessage}
          </Text>
        ) : null}
      </View>
    </>
  );

  const renderPaymentStep = () => (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>Payment Method</Text>
      <View style={{ gap: 8, marginTop: 8 }}>
        {PAYMENT_METHODS.map((m) => (
          <Pressable
            key={m.id}
            style={[styles.payRow, payment === m.id && styles.payRowActive]}
            onPress={() => setPayment(m.id)}
          >
            <Text style={{ fontSize: 22, width: 32 }}>{m.icon}</Text>
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <Text style={styles.payLabel}>{m.label}</Text>
              <Text style={styles.paySub}>{m.sub}</Text>
            </View>
            <View
              style={[styles.radio, payment === m.id && styles.radioActive]}
            >
              {payment === m.id && <View style={styles.radioDot} />}
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );

  const renderReviewStep = () => (
    <>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Delivery Instructions</Text>
        <TextInput
          style={styles.instructInput}
          placeholder="E.g. Leave at door, call before delivery..."
          placeholderTextColor="#9CA3AF"
          value={instructions}
          onChangeText={setInstructions}
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>
          Order Summary ({cartItems.length} items)
        </Text>
        {cartItems.map((item, i) => (
          <View key={item.id} style={styles.orderItem}>
            <View style={styles.orderItemEmoji}>
              <Text style={{ fontSize: 26 }}>{item.product.emoji}</Text>
            </View>
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <Text style={styles.orderItemName} numberOfLines={2}>
                {item.product.name}
              </Text>
              <Text style={styles.orderItemQty}>Qty: {item.quantity}</Text>
            </View>
            <Text style={styles.orderItemPrice}>
              ₹{(item.product.price * item.quantity).toLocaleString()}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Price Details</Text>
        <View style={{ gap: 10, marginTop: 10 }}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Total MRP</Text>
            <Text style={styles.priceVal}>₹{subtotal.toLocaleString()}</Text>
          </View>
          {discount > 0 ? (
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Discount</Text>
              <Text style={[styles.priceVal, { color: "#22C55E" }]}>
                -₹{discount.toLocaleString()}
              </Text>
            </View>
          ) : null}
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>GST (18%)</Text>
            <Text style={styles.priceVal}>₹{tax.toLocaleString()}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Shipping</Text>
            <Text
              style={[
                styles.priceVal,
                shipping === 0 ? { color: "#22C55E" } : null,
              ]}
            >
              {shipping === 0 ? "FREE" : `₹${shipping}`}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalVal}>₹{total.toLocaleString()}</Text>
          </View>
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#F8FAFC" }}
      edges={["top"]}
    >
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            if (step > 0) setStep((s) => (s - 1) as any);
            else router.back();
          }}
        >
          <BackIcon />
        </Pressable>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Progress Steps */}
      <View style={styles.stepsRow}>
        {["Address", "Payment", "Review"].map((s, i) => (
          <View key={s} style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={[styles.stepCircle, step >= i && styles.stepCircleActive]}
            >
              {step > i ? (
                <CheckIcon />
              ) : (
                <Text style={[styles.stepNum, step >= i && { color: "#fff" }]}>
                  {i + 1}
                </Text>
              )}
            </View>
            <Text style={[styles.stepLabel, step >= i && { color: "#0EA5E9" }]}>
              {s}
            </Text>
            {i < 2 && (
              <View
                style={[
                  styles.stepLine,
                  step > i && { backgroundColor: "#0EA5E9" },
                ]}
              />
            )}
          </View>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 120 }}
      >
        {step === 0 && renderAddressStep()}
        {step === 1 && renderPaymentStep()}
        {step === 2 && renderReviewStep()}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={{ fontSize: 12, color: "#6B7280" }}>Total Payable</Text>
          <Text style={{ fontSize: 20, fontWeight: "900", color: "#111827" }}>
            ₹{total.toLocaleString()}
          </Text>
        </View>
        <Pressable
          style={[
            styles.placeOrderBtn,
            ((step === 0 && pincodeStatus !== "success") ||
              placeOrderMutation.isPending) && { opacity: 0.5 },
          ]}
          onPress={handleNext}
          disabled={placeOrderMutation.isPending}
        >
          {placeOrderMutation.isPending ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.placeOrderTxt}>
              {step < 2 ? "Continue" : "Place Order"}
            </Text>
          )}
        </Pressable>
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
    marginLeft: 12,
  },
  stepsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  stepCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  stepCircleActive: { backgroundColor: "#0EA5E9" },
  stepNum: { fontSize: 12, fontWeight: "700", color: "#6B7280" },
  stepLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6B7280",
    marginRight: 6,
  },
  stepLine: {
    width: 24,
    height: 2,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 4,
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 15, fontWeight: "700", color: "#111827" },
  changeBtn: { color: "#0EA5E9", fontSize: 13, fontWeight: "600" },
  addressBox: { gap: 3 },
  addrName: { fontSize: 14, fontWeight: "700", color: "#111827" },
  addrText: { fontSize: 13, color: "#6B7280", lineHeight: 20 },
  addrPhone: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  homeTag: {
    backgroundColor: "#1D212E",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  homeTagTxt: { fontSize: 11, fontWeight: "600", color: "#0EA5E9" },
  pincodeBtn: {
    marginTop: 12,
    backgroundColor: "#1D212E",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  pincodeBtnTxt: { color: "#0EA5E9", fontWeight: "600", fontSize: 14 },
  pincodeMsg: { marginTop: 8, fontSize: 13, fontWeight: "500" },
  instructInput: {
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    padding: 12,
    fontSize: 13,
    color: "#111827",
    marginTop: 10,
    minHeight: 70,
    textAlignVertical: "top",
  },
  payRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    backgroundColor: "#F9FAFB",
  },
  payRowActive: { borderColor: "#0EA5E9", backgroundColor: "#1D212E" },
  payLabel: { fontSize: 14, fontWeight: "600", color: "#111827" },
  paySub: { fontSize: 11, color: "#6B7280", marginTop: 1 },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  radioActive: { borderColor: "#0EA5E9" },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#0EA5E9",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceLabel: { fontSize: 13, color: "#6B7280" },
  priceVal: { fontSize: 13, fontWeight: "600", color: "#111827" },
  divider: { height: 1, backgroundColor: "#F3F4F6", marginVertical: 10 },
  totalLabel: { fontSize: 15, fontWeight: "700", color: "#111827" },
  totalVal: { fontSize: 16, fontWeight: "800", color: "#111827" },
  orderItem: { flexDirection: "row", alignItems: "center", paddingTop: 12 },
  orderItemEmoji: {
    width: 44,
    height: 44,
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  orderItemName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
    lineHeight: 16,
  },
  orderItemQty: { fontSize: 11, color: "#6B7280", marginTop: 2 },
  orderItemPrice: { fontSize: 13, fontWeight: "700", color: "#111827" },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#FFFFFF",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 8,
  },
  placeOrderBtn: {
    backgroundColor: "#0EA5E9",
    borderRadius: 14,
    paddingHorizontal: 28,
    paddingVertical: 14,
    shadowColor: "#0EA5E9",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  placeOrderTxt: { color: "#fff", fontSize: 15, fontWeight: "700" },
});
