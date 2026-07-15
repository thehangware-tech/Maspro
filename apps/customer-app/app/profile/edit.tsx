import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Svg, { Path } from "react-native-svg";
import { useUserStore } from "../../src/store/userStore";
import * as ImagePicker from "expo-image-picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "../../src/services/UserService";

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

const SPORTS = [
  "cricket",
  "football",
  "badminton",
  "basketball",
  "tennis",
  "running",
  "swimming",
  "fitness",
];

export default function EditProfile() {
  const profile = useUserStore((s) => s.profile);
  const updateStoreProfile = useUserStore((s) => s.updateProfile);
  const queryClient = useQueryClient();

  const [name, setName] = useState(profile?.name || "");
  const [email, setEmail] = useState(profile?.email || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [dob, setDob] = useState(profile?.dob || "");
  const [gender, setGender] = useState(profile?.gender || "Male");
  const [sports, setSports] = useState<string[]>(profile?.favoriteSports || []);
  const [avatar, setAvatar] = useState(profile?.avatar || "");

  // Address (Assuming we just edit the first/default address for simplicity in this screen)
  const defaultAddr =
    profile?.addresses?.find((a) => a.isDefault) || profile?.addresses?.[0];
  const [street, setStreet] = useState(defaultAddr?.street || "");
  const [city, setCity] = useState(defaultAddr?.city || "");
  const [state, setState] = useState(defaultAddr?.state || "");
  const [zipCode, setZipCode] = useState(defaultAddr?.zipCode || "");

  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const toggleSport = (s: string) => {
    setSports((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  };

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!profile) return;

      // Upload avatar first if changed and starts with file://
      let finalAvatar = profile.avatar;
      if (avatar && avatar !== profile.avatar) {
        finalAvatar = await UserService.uploadAvatar(profile.id, avatar);
      }

      const addresses = profile.addresses ? [...profile.addresses] : [];
      if (defaultAddr) {
        const idx = addresses.findIndex((a) => a.id === defaultAddr.id);
        if (idx !== -1) {
          addresses[idx] = { ...addresses[idx], street, city, state, zipCode };
        }
      }

      const updates = {
        name,
        email,
        phone,
        dob,
        gender,
        favoriteSports: sports,
        avatar: finalAvatar,
        addresses,
      };
      return UserService.updateProfile(profile.id, updates);
    },
    onSuccess: (updatedProfile) => {
      if (updatedProfile) {
        updateStoreProfile(updatedProfile);
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        Alert.alert("Success", "Profile updated successfully!", [
          { text: "OK", onPress: () => router.back() },
        ]);
      }
    },
    onError: () => {
      Alert.alert("Error", "Failed to update profile. Please try again.");
    },
  });

  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert("Validation Error", "Name and Email are required.");
      return;
    }

    if (phone !== profile?.phone && !showOtpField) {
      // Mock OTP Flow
      Alert.alert(
        "Phone Number Changed",
        "An OTP has been sent to your new number.",
        [{ text: "OK", onPress: () => setShowOtpField(true) }],
      );
      return;
    }

    if (showOtpField && otp !== "1234") {
      Alert.alert("Error", "Invalid OTP. Please enter 1234.");
      return;
    }

    updateMutation.mutate();
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
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Avatar Upload */}
        <View style={styles.avatarSection}>
          <Pressable style={styles.avatarWrap} onPress={pickImage}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={{ fontSize: 40 }}>👤</Text>
              </View>
            )}
            <View style={styles.cameraIconWrap}>
              <Text style={{ fontSize: 14 }}>📷</Text>
            </View>
          </Pressable>
        </View>

        {/* Basic Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter mobile number"
              keyboardType="phone-pad"
            />
          </View>

          {showOtpField && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Enter OTP (use 1234)</Text>
              <TextInput
                style={styles.input}
                value={otp}
                onChangeText={setOtp}
                placeholder="OTP"
                keyboardType="number-pad"
                maxLength={4}
              />
            </View>
          )}

          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Date of Birth</Text>
              <TextInput
                style={styles.input}
                value={dob}
                onChangeText={setDob}
                placeholder="DD-MM-YYYY"
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Gender</Text>
              <View style={{ flexDirection: "row", gap: 8, marginTop: 4 }}>
                <Pressable
                  style={[
                    styles.genderBtn,
                    gender === "Male" && styles.genderBtnActive,
                  ]}
                  onPress={() => setGender("Male")}
                >
                  <Text
                    style={[
                      styles.genderTxt,
                      gender === "Male" && styles.genderTxtActive,
                    ]}
                  >
                    Male
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.genderBtn,
                    gender === "Female" && styles.genderBtnActive,
                  ]}
                  onPress={() => setGender("Female")}
                >
                  <Text
                    style={[
                      styles.genderTxt,
                      gender === "Female" && styles.genderTxtActive,
                    ]}
                  >
                    Female
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        {/* Sports */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferred Sports</Text>
          <View style={styles.sportsWrap}>
            {SPORTS.map((s) => {
              const isActive = sports.includes(s);
              return (
                <Pressable
                  key={s}
                  style={[styles.sportChip, isActive && styles.sportChipActive]}
                  onPress={() => toggleSport(s)}
                >
                  <Text
                    style={[
                      styles.sportChipTxt,
                      isActive && styles.sportChipTxtActive,
                    ]}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Default Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Primary Address</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Street / Building</Text>
            <TextInput
              style={styles.input}
              value={street}
              onChangeText={setStreet}
              placeholder="Street address"
            />
          </View>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>City</Text>
              <TextInput
                style={styles.input}
                value={city}
                onChangeText={setCity}
                placeholder="City"
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>State</Text>
              <TextInput
                style={styles.input}
                value={state}
                onChangeText={setState}
                placeholder="State"
              />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pincode</Text>
            <TextInput
              style={styles.input}
              value={zipCode}
              onChangeText={setZipCode}
              placeholder="Zipcode"
              keyboardType="number-pad"
            />
          </View>
        </View>

        <Pressable
          style={[styles.saveBtn, updateMutation.isPending && { opacity: 0.7 }]}
          onPress={handleSave}
          disabled={updateMutation.isPending}
        >
          {updateMutation.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveTxt}>Save Changes</Text>
          )}
        </Pressable>
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
    textAlign: "center",
  },
  content: { padding: 16, paddingBottom: 40 },
  avatarSection: { alignItems: "center", marginVertical: 20 },
  avatarWrap: { position: "relative" },
  avatarImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: "#DBEAFE",
  },
  avatarPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#1D212E",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#DBEAFE",
  },
  cameraIconWrap: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    backgroundColor: "#0EA5E9",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  section: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: "600", color: "#4B5563", marginBottom: 6 },
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#111827",
  },
  genderBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  genderBtnActive: { backgroundColor: "#1D212E", borderColor: "#0EA5E9" },
  genderTxt: { fontSize: 14, fontWeight: "600", color: "#4B5563" },
  genderTxtActive: { color: "#0EA5E9" },
  sportsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  sportChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  sportChipActive: { backgroundColor: "#0EA5E9", borderColor: "#0EA5E9" },
  sportChipTxt: { fontSize: 13, fontWeight: "600", color: "#4B5563" },
  sportChipTxtActive: { color: "#fff" },
  saveBtn: {
    backgroundColor: "#0EA5E9",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#0EA5E9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveTxt: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
