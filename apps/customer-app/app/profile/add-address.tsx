import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  StatusBar,
  ScrollView,
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

export default function AddAddress() {
  const profile = useUserStore((s) => s.profile);
  const setProfile = useUserStore((s) => s.setProfile);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    type: "Home" as "Home" | "Work" | "Other",
  });

  const handleSave = () => {
    if (
      !form.name ||
      !form.phone ||
      !form.street ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!profile) return;

    const newAddress = {
      id: Math.random().toString(36).substring(7),
      ...form,
      isDefault: profile.addresses.length === 0,
    };

    setProfile({
      ...profile,
      addresses: [...profile.addresses, newAddress],
    });

    router.back();
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
        <Text style={styles.headerTitle}>Add New Address</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={form.name}
            onChangeText={(t) => setForm((f) => ({ ...f, name: t }))}
            placeholder="Receiver's name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={form.phone}
            onChangeText={(t) => setForm((f) => ({ ...f, phone: t }))}
            placeholder="10-digit mobile number"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Street Address / Area</Text>
          <TextInput
            style={styles.input}
            value={form.street}
            onChangeText={(t) => setForm((f) => ({ ...f, street: t }))}
            placeholder="House No, Building, Street"
            multiline
            numberOfLines={2}
          />
        </View>

        <View style={{ flexDirection: "row", gap: 12 }}>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>Pincode</Text>
            <TextInput
              style={styles.input}
              value={form.pincode}
              onChangeText={(t) => setForm((f) => ({ ...f, pincode: t }))}
              placeholder="6 digits"
              keyboardType="number-pad"
              maxLength={6}
            />
          </View>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              value={form.city}
              onChangeText={(t) => setForm((f) => ({ ...f, city: t }))}
              placeholder="City"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>State</Text>
          <TextInput
            style={styles.input}
            value={form.state}
            onChangeText={(t) => setForm((f) => ({ ...f, state: t }))}
            placeholder="State"
          />
        </View>

        <Text style={styles.label}>Address Type</Text>
        <View style={styles.typeRow}>
          {["Home", "Work", "Other"].map((type) => (
            <Pressable
              key={type}
              style={[
                styles.typeChip,
                form.type === type && styles.typeChipActive,
              ]}
              onPress={() => setForm((f) => ({ ...f, type: type as any }))}
            >
              <Text
                style={[
                  styles.typeTxt,
                  form.type === type && styles.typeTxtActive,
                ]}
              >
                {type}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveTxt}>Save Address</Text>
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
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 13, fontWeight: "600", color: "#374151", marginBottom: 8 },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#111827",
  },
  typeRow: { flexDirection: "row", gap: 12, marginTop: 8, marginBottom: 40 },
  typeChip: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  typeChipActive: { backgroundColor: "#1D212E", borderColor: "#0EA5E9" },
  typeTxt: { fontSize: 14, fontWeight: "600", color: "#4B5563" },
  typeTxtActive: { color: "#0EA5E9" },
  footer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#FFFFFF",
  },
  saveBtn: {
    backgroundColor: "#0EA5E9",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  saveTxt: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
