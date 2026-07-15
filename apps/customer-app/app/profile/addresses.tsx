import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Svg, { Path } from "react-native-svg";
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
const PlusIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 5v14m-7-7h14"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default function Addresses() {
  const profile = useUserStore((s) => s.profile);
  const deleteAddress = useUserStore((s) => s.deleteAddress);
  const setProfile = useUserStore((s) => s.setProfile);

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteAddress(id),
        },
      ],
    );
  };

  const handleSetDefault = (id: string) => {
    if (!profile) return;
    const updated = profile.addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    setProfile({ ...profile, addresses: updated });
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
        <Text style={styles.headerTitle}>Saved Addresses</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        {profile?.addresses?.map((addr) => (
          <View
            key={addr.id}
            style={[styles.card, addr.isDefault && styles.defaultCard]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.typeTag}>
                <Text style={styles.typeTxt}>{addr.type}</Text>
              </View>
              {addr.isDefault && (
                <Text style={styles.defaultTxt}>✓ Default</Text>
              )}
            </View>
            <Text style={styles.name}>{addr.name}</Text>
            <Text style={styles.addressTxt}>{addr.street}</Text>
            <Text style={styles.addressTxt}>
              {addr.city}, {addr.state} {addr.pincode}
            </Text>
            <Text style={styles.phoneTxt}>Phone: {addr.phone}</Text>

            <View style={styles.actions}>
              {!addr.isDefault && (
                <Pressable
                  style={styles.actionBtn}
                  onPress={() => handleSetDefault(addr.id)}
                >
                  <Text style={styles.actionTxt}>Set as Default</Text>
                </Pressable>
              )}
              <Pressable
                style={[
                  styles.actionBtn,
                  { borderColor: "#FEE2E2", backgroundColor: "#FEF2F2" },
                ]}
                onPress={() => handleDelete(addr.id)}
              >
                <Text style={[styles.actionTxt, { color: "#EF4444" }]}>
                  Delete
                </Text>
              </Pressable>
            </View>
          </View>
        ))}

        {(!profile?.addresses || profile.addresses.length === 0) && (
          <View style={styles.empty}>
            <Text style={{ fontSize: 40, marginBottom: 12 }}>📍</Text>
            <Text style={styles.emptyTitle}>No saved addresses</Text>
            <Text style={styles.emptySub}>
              Add an address to speed up your checkout process.
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={styles.addBtn}
          onPress={() => router.push("/profile/add-address")}
        >
          <PlusIcon />
          <Text style={styles.addTxt}>Add New Address</Text>
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
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  defaultCard: { borderColor: "#BFDBFE", backgroundColor: "#1D212E" },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  typeTag: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeTxt: {
    fontSize: 11,
    fontWeight: "700",
    color: "#4B5563",
    textTransform: "uppercase",
  },
  defaultTxt: { fontSize: 12, fontWeight: "700", color: "#0EA5E9" },
  name: { fontSize: 16, fontWeight: "700", color: "#111827", marginBottom: 4 },
  addressTxt: { fontSize: 14, color: "#4B5563", lineHeight: 20 },
  phoneTxt: { fontSize: 14, color: "#4B5563", marginTop: 8, fontWeight: "500" },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#FFFFFF",
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: "center",
  },
  actionTxt: { fontSize: 13, fontWeight: "600", color: "#374151" },
  footer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#FFFFFF",
  },
  addBtn: {
    flexDirection: "row",
    backgroundColor: "#0EA5E9",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  addTxt: { color: "#fff", fontSize: 16, fontWeight: "700" },
  empty: { alignItems: "center", padding: 40, marginTop: 40 },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
});
