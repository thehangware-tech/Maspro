import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
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

export default function DeleteAccount() {
  const [confirmText, setConfirmText] = useState("");
  const clearProfile = useUserStore((s) => s.clearProfile);

  const handleDelete = () => {
    if (confirmText !== "DELETE") {
      Alert.alert("Error", "Please type DELETE exactly to confirm.");
      return;
    }

    // Perform deletion logic here
    clearProfile();
    router.replace("/auth");
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
        <Text style={styles.headerTitle}>Delete Account</Text>
        <View style={{ width: 30 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.warningBox}>
            <Text style={{ fontSize: 32, marginBottom: 12 }}>⚠️</Text>
            <Text style={styles.warningTitle}>This action is permanent!</Text>
            <Text style={styles.warningDesc}>
              Deleting your account will permanently erase all your personal
              information, order history, saved addresses, and wishlist. You
              will lose access to any pending orders.
            </Text>
          </View>

          <View style={styles.confirmSection}>
            <Text style={styles.label}>Type "DELETE" to confirm</Text>
            <TextInput
              style={styles.input}
              value={confirmText}
              onChangeText={setConfirmText}
              placeholder="DELETE"
              autoCapitalize="characters"
              autoCorrect={false}
            />
          </View>

          <View style={{ flex: 1 }} />

          <Pressable
            style={[
              styles.deleteBtn,
              confirmText !== "DELETE" && { opacity: 0.5 },
            ]}
            onPress={handleDelete}
            disabled={confirmText !== "DELETE"}
          >
            <Text style={styles.deleteTxt}>Permanently Delete Account</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
  content: { padding: 20, flex: 1 },
  warningBox: {
    backgroundColor: "#FEF2F2",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FEE2E2",
    alignItems: "center",
    marginBottom: 32,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#991B1B",
    marginBottom: 8,
  },
  warningDesc: {
    fontSize: 14,
    color: "#7F1D1D",
    textAlign: "center",
    lineHeight: 20,
  },
  confirmSection: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "700", color: "#374151", marginBottom: 8 },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#111827",
  },
  deleteBtn: {
    backgroundColor: "#EF4444",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  deleteTxt: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
