import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Svg, { Path, Rect } from "react-native-svg";

const { width } = Dimensions.get("window");

const GoogleIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <Path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <Path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <Path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </Svg>
);

const AppleIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="#FFFFFF">
    <Path d="M17.05 16.32c-.05 1.39 1.18 2.33 1.25 2.38-.9 1.32-1.87 2.62-3.23 2.65-1.33.02-2.18-.89-3.48-.89-1.28 0-2.22.87-3.46.91-1.31.05-2.43-1.4-3.35-2.73-1.89-2.72-3.32-7.66-1.39-11.02.96-1.67 2.67-2.74 4.54-2.76 1.31-.02 2.53.88 3.32.88.78 0 2.27-1.1 3.86-.94 1.63.17 2.76.84 3.45 1.87-.69.45-2.49 1.5-2.51 3.55zm-2.72-9.67c.72-.88 1.2-2.11 1.07-3.32-1.04.04-2.32.71-3.05 1.58-.65.78-1.22 2.03-1.07 3.22 1.16.09 2.32-.6 3.05-1.48z" />
  </Svg>
);

const PhoneIcon = () => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <Path d="M12 18h.01" />
  </Svg>
);

export default function Auth() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        speed: 8,
        bounciness: 4,
      }),
    ]).start();
  }, []);

  const handlePhone = () => router.push("/phone-auth");
  const handleSkip = () => router.replace("/(tabs)");

  const AuthBtn = ({ icon, label, onPress, primary = false }: any) => {
    const scale = useRef(new Animated.Value(1)).current;
    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable
          style={[styles.authBtn, primary && styles.authBtnPrimary]}
          onPressIn={() =>
            Animated.spring(scale, {
              toValue: 0.97,
              useNativeDriver: true,
              speed: 50,
            }).start()
          }
          onPressOut={() =>
            Animated.spring(scale, {
              toValue: 1,
              useNativeDriver: true,
              speed: 50,
            }).start()
          }
          onPress={onPress}
        >
          <View style={styles.authBtnIcon}>{icon}</View>
          <Text
            style={[styles.authBtnLabel, primary && styles.authBtnLabelPrimary]}
          >
            {label}
          </Text>
          <View style={{ width: 28 }} />
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />

      {/* Top branding area */}
      <View style={styles.topArea}>
        {/* Blue badge */}
        <View style={styles.logoBadge}>
          <Text style={styles.logoLetter}>M</Text>
        </View>
        <Text style={styles.brandName}>MASPRO</Text>
        <Text style={styles.brandSub}>SPORTS INDIA</Text>
      </View>

      {/* Bottom card */}
      <Animated.View
        style={[
          styles.card,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Text style={styles.headline}>Welcome Back!</Text>
        <Text style={styles.subline}>Sign in to continue shopping</Text>

        <View style={styles.divRow}>
          <View style={styles.divLine} />
          <Text style={styles.divLabel}>SIGN IN WITH</Text>
          <View style={styles.divLine} />
        </View>

        <View style={styles.btnStack}>
          <AuthBtn icon={<GoogleIcon />} label="Continue with Google" />
          <AuthBtn icon={<AppleIcon />} label="Continue with Apple" />
          <AuthBtn
            icon={<PhoneIcon />}
            label="Continue with Phone"
            onPress={handlePhone}
            primary
          />
        </View>

        <View style={styles.termsRow}>
          <Text style={styles.termsText}>By continuing, you agree to our </Text>
          <Pressable>
            <Text style={styles.termsLink}>Terms</Text>
          </Pressable>
          <Text style={styles.termsText}> & </Text>
          <Pressable>
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Pressable>
        </View>

        <Pressable style={styles.skipRow} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip for now →</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F8FAFC" },
  topArea: { flex: 1, alignItems: "center", justifyContent: "center" },
  logoBadge: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: "#0EA5E9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#0EA5E9",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  logoLetter: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "900",
    fontStyle: "italic",
  },
  brandName: {
    color: "#0284C7",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 4,
  },
  brandSub: {
    color: "#38BDF8",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 4,
    marginTop: 2,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: Platform.OS === "ios" ? 40 : 32,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 16,
  },
  headline: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },
  subline: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 24,
  },

  divRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  divLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E5E7EB",
  },
  divLabel: {
    color: "#6B7280",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
  },

  btnStack: { gap: 12 },
  authBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  authBtnPrimary: { backgroundColor: "#0EA5E9", borderColor: "#0EA5E9" },
  authBtnIcon: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  authBtnLabel: {
    flex: 1,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  authBtnLabelPrimary: { color: "#fff" },

  termsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  termsText: { color: "#6B7280", fontSize: 11.5 },
  termsLink: { color: "#0EA5E9", fontSize: 11.5, fontWeight: "600" },

  skipRow: { alignItems: "center", marginTop: 14 },
  skipText: { color: "#6B7280", fontSize: 13, fontWeight: "500" },
});
