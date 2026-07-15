import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
  RefreshControl,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Svg, { Path, Circle } from "react-native-svg";
import { useUserStore } from "../../src/store/userStore";
import { useWishlistStore } from "../../src/store/wishlistStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { OrderService } from "../../src/services/OrderService";
import { UserService } from "../../src/services/UserService";

const BellIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
      stroke="#374151"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M13.73 21a2 2 0 0 1-3.46 0"
      stroke="#374151"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);
const SettingsIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="3" stroke="#374151" strokeWidth="2" />
    <Path
      d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
      stroke="#374151"
      strokeWidth="2"
    />
  </Svg>
);
const ChevronRight = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 18l6-6-6-6"
      stroke="#9CA3AF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MENU = [
  {
    icon: "📦",
    label: "My Orders",
    sub: "Track your orders",
    onPress: () => router.push("/orders"),
  },
  {
    icon: "❤️",
    label: "Wishlist",
    sub: "Your saved items",
    onPress: () => router.push("/wishlist"),
  },
  {
    icon: "📍",
    label: "Saved Addresses",
    sub: "Manage delivery addresses",
    onPress: () => router.push("/profile/addresses"),
  },
  {
    icon: "💳",
    label: "Payment Methods",
    sub: "Cards & UPI",
    onPress: () => router.push("/profile/payments"),
  },
  {
    icon: "🔔",
    label: "Notifications",
    sub: "Manage preferences",
    onPress: () => router.push("/profile/notifications"),
  },
  {
    icon: "🛡️",
    label: "Privacy Settings",
    sub: "Data & Security",
    onPress: () => {},
  },
  {
    icon: "🌐",
    label: "Language",
    sub: "English",
    onPress: () => router.push("/profile/language"),
  },
  {
    icon: "❓",
    label: "Help & Support",
    sub: "FAQs & Contact us",
    onPress: () => router.push("/profile/help"),
  },
  {
    icon: "ℹ️",
    label: "About",
    sub: "Version 1.0.0",
    onPress: () => router.push("/profile/about"),
  },
];

export default function Account() {
  const profile = useUserStore((s) => s.profile);
  const setProfile = useUserStore((s) => s.setProfile);
  const clearProfile = useUserStore((s) => s.clearProfile);
  const wishlistItems = useWishlistStore((s) => s.productIds) || [];

  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const { data: orders = [] } = useQuery({
    queryKey: ["orders", profile?.id],
    queryFn: () => OrderService.getOrders(profile?.id || "user_demo"),
  });

  const { data: serverProfile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["profile", profile?.id],
    queryFn: async () => {
      const data = await UserService.getProfile(profile?.id || "guest");
      setProfile(data); // Sync local state
      return data;
    },
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["profile"] }),
      queryClient.invalidateQueries({ queryKey: ["orders"] }),
    ]);
    setRefreshing(false);
  }, [queryClient]);

  const handleLogout = () => {
    clearProfile();
    router.replace("/auth");
  };

  const displayProfile = serverProfile || profile;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#F8FAFC" }}
      edges={["top"]}
    >
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Pressable style={styles.iconBtn}>
            <BellIcon />
          </Pressable>
          <Pressable style={styles.iconBtn}>
            <SettingsIcon />
          </Pressable>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#0EA5E9"
          />
        }
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              {displayProfile?.avatar ? (
                <Image
                  source={{ uri: displayProfile.avatar }}
                  style={{ width: 80, height: 80, borderRadius: 40 }}
                />
              ) : (
                <Text style={{ fontSize: 40 }}>👤</Text>
              )}
            </View>
            <Pressable
              style={styles.editAvatarBtn}
              onPress={() => router.push("/profile/edit")}
            >
              <Text style={{ fontSize: 14 }}>✏️</Text>
            </Pressable>
          </View>

          {isProfileLoading && !serverProfile ? (
            <ActivityIndicator
              size="small"
              color="#0EA5E9"
              style={{ marginVertical: 10 }}
            />
          ) : (
            <>
              <Text style={styles.userName}>
                {displayProfile?.name || "Guest"}
              </Text>
              <Text style={styles.userPhone}>
                {displayProfile?.phone || "No phone"}
              </Text>
              <Text style={styles.userEmail}>
                {displayProfile?.email || "No email"}
              </Text>
              {displayProfile?.memberSince && (
                <Text style={styles.memberSince}>
                  Member since{" "}
                  {new Date(displayProfile.memberSince).getFullYear()}
                </Text>
              )}
            </>
          )}

          <Pressable
            style={styles.editProfileBtn}
            onPress={() => router.push("/profile/edit")}
          >
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </Pressable>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNum}>{orders?.length || 0}</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>{wishlistItems?.length || 0}</Text>
            <Text style={styles.statLabel}>Wishlist</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>
              {displayProfile?.addresses?.length || 0}
            </Text>
            <Text style={styles.statLabel}>Addresses</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={{ paddingHorizontal: 16, marginTop: 16, gap: 8 }}>
          {MENU.map((item, i) => (
            <Pressable key={i} style={styles.menuItem} onPress={item.onPress}>
              <View style={styles.menuIconBox}>
                <Text style={{ fontSize: 20 }}>{item.icon}</Text>
              </View>
              <View style={{ flex: 1, paddingLeft: 14 }}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuSub}>{item.sub}</Text>
              </View>
              <ChevronRight />
            </Pressable>
          ))}

          {/* Logout */}
          <Pressable
            style={[styles.menuItem, styles.logoutItem]}
            onPress={handleLogout}
          >
            <View style={[styles.menuIconBox, { backgroundColor: "#FEE2E2" }]}>
              <Text style={{ fontSize: 20 }}>🚪</Text>
            </View>
            <Text
              style={[
                styles.menuLabel,
                { color: "#EF4444", paddingLeft: 14, flex: 1 },
              ]}
            >
              Logout
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#111827" },
  iconBtn: { padding: 4 },
  profileCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 4,
  },
  avatarWrap: { position: "relative", marginBottom: 14 },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: "#1D212E",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#DBEAFE",
    overflow: "hidden",
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    backgroundColor: "#0EA5E9",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  userName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 4,
  },
  userPhone: { fontSize: 13, color: "#6B7280", marginBottom: 2 },
  userEmail: { fontSize: 13, color: "#6B7280", marginBottom: 4 },
  memberSince: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 16,
    fontWeight: "500",
  },
  editProfileBtn: {
    backgroundColor: "#1D212E",
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  editProfileText: { color: "#0EA5E9", fontSize: 13, fontWeight: "700" },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  statItem: { flex: 1, alignItems: "center" },
  statNum: { fontSize: 22, fontWeight: "800", color: "#0EA5E9" },
  statLabel: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 2,
    fontWeight: "500",
  },
  statDivider: { width: 1, backgroundColor: "#E5E7EB" },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutItem: { marginTop: 8 },
  menuIconBox: {
    width: 44,
    height: 44,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  menuSub: { fontSize: 11, color: "#6B7280" },
});
