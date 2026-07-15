import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const SPORTS = [
  { id: "cricket", label: "Cricket", icon: "🏏" },
  { id: "football", label: "Football", icon: "⚽" },
  { id: "badminton", label: "Badminton", icon: "🏸" },
  { id: "basketball", label: "Basketball", icon: "🏀" },
  { id: "tennis", label: "Tennis", icon: "🎾" },
  { id: "volleyball", label: "Volleyball", icon: "🏐" },
  { id: "running", label: "Running", icon: "🏃" },
  { id: "fitness", label: "Fitness", icon: "🏋️" },
  { id: "swimming", label: "Swimming", icon: "🏊" },
];

export default function SelectSports() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const proceed = () => router.replace("/auth");

  return (
    <SafeAreaView style={styles.root} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Sport</Text>
        <Text style={styles.subtitle}>Select a sport to explore products</Text>
      </View>

      {/* Grid */}
      <ScrollView
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      >
        {SPORTS.map((sport) => {
          const isSelected = selected.includes(sport.id);
          return (
            <Pressable
              key={sport.id}
              style={[styles.card, isSelected && styles.cardSelected]}
              onPress={() => toggle(sport.id)}
            >
              <Text style={styles.cardIcon}>{sport.icon}</Text>
              <Text
                style={[
                  styles.cardLabel,
                  isSelected && styles.cardLabelSelected,
                ]}
              >
                {sport.label}
              </Text>
              {isSelected && (
                <View style={styles.checkBadge}>
                  <Text style={styles.checkMark}>✓</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>

      {/* View All Sports */}
      <Pressable style={styles.viewAll}>
        <Text style={styles.viewAllText}>View All Sports</Text>
      </Pressable>

      {/* Continue */}
      <View style={styles.footer}>
        <Pressable
          style={[
            styles.continueBtn,
            selected.length === 0 && styles.continueBtnDisabled,
          ]}
          onPress={proceed}
        >
          <Text style={styles.continueBtnText}>
            {selected.length === 0
              ? "Continue"
              : `Continue with ${selected.length} sport${selected.length > 1 ? "s" : ""}`}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F8FAFC" },
  header: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 8 },
  title: { fontSize: 26, fontWeight: "800", color: "#111827", marginBottom: 6 },
  subtitle: { fontSize: 14, color: "#6B7280" },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
  },
  card: {
    width: "30%",
    aspectRatio: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    position: "relative",
  },
  cardSelected: {
    borderColor: "#0EA5E9",
    backgroundColor: "#1D212E",
  },
  cardIcon: { fontSize: 36, marginBottom: 6 },
  cardLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
  },
  cardLabelSelected: { color: "#0EA5E9" },
  checkBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#0EA5E9",
    alignItems: "center",
    justifyContent: "center",
  },
  checkMark: { color: "#fff", fontSize: 10, fontWeight: "800" },

  viewAll: { alignSelf: "center", paddingVertical: 10, marginBottom: 4 },
  viewAllText: { color: "#0EA5E9", fontSize: 14, fontWeight: "600" },

  footer: { paddingHorizontal: 24, paddingBottom: 24, paddingTop: 8 },
  continueBtn: {
    backgroundColor: "#0EA5E9",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#0EA5E9",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  continueBtnDisabled: { backgroundColor: "#93C5FD", shadowOpacity: 0 },
  continueBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
