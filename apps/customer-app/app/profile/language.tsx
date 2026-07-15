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

const LANGUAGES = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", native: "മലയാളം" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
];

export default function Language() {
  const [selected, setSelected] = useState("en");

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
        <Text style={styles.headerTitle}>Select Language</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        {LANGUAGES.map((lang) => (
          <Pressable
            key={lang.code}
            style={[
              styles.langCard,
              selected === lang.code && styles.langCardActive,
            ]}
            onPress={() => setSelected(lang.code)}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.nativeText,
                  selected === lang.code && { color: "#0EA5E9" },
                ]}
              >
                {lang.native}
              </Text>
              <Text style={styles.engText}>{lang.name}</Text>
            </View>
            <View
              style={[
                styles.radio,
                selected === lang.code && styles.radioActive,
              ]}
            >
              {selected === lang.code && <View style={styles.radioDot} />}
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.saveBtn} onPress={() => router.back()}>
          <Text style={styles.saveTxt}>Save Preferences</Text>
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
  langCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  langCardActive: { borderColor: "#0EA5E9", backgroundColor: "#1D212E" },
  nativeText: { fontSize: 16, fontWeight: "700", color: "#111827" },
  engText: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  radioActive: { borderColor: "#0EA5E9" },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#0EA5E9",
  },
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
