import React, { useRef, useState } from "react";
import {
  View as TwView,
  Text as TwText,
  Pressable as TwPressable,
  TextInput as TwTextInput,
  SafeAreaView as TwSafeAreaView,
} from "../src/tw";
import Svg, { Path } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "../src/services/UserService";
import { useUserStore } from "../src/store/userStore";
import { ActivityIndicator, Alert } from "react-native";

// Arrow Left
const ArrowLeft = () => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#111827"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M19 12H5M12 19l-7-7 7-7" />
  </Svg>
);

export default function OTP() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const phone = (params.phone as string) || "+91 98765 43210";
  const setProfile = useUserStore((s) => s.setProfile);

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<Array<any>>([]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const loginMutation = useMutation({
    mutationFn: (phoneNumber: string) =>
      UserService.loginWithPhone(phoneNumber),
    onSuccess: (profile) => {
      setProfile(profile);
      router.replace("/(tabs)");
    },
    onError: (error) => {
      Alert.alert("Login Failed", "Failed to log in. Please try again.");
    },
  });

  const handleVerify = () => {
    if (code.join("").length < 6) {
      Alert.alert("Error", "Please enter a valid 6-digit OTP.");
      return;
    }
    loginMutation.mutate(phone);
  };

  return (
    <TwSafeAreaView className="flex-1 bg-[#F8FAFC]">
      <StatusBar style="light" />

      <TwView className="flex-1 px-6 pt-4">
        {/* Back Button */}
        <TwPressable
          onPress={() => router.back()}
          className="w-10 h-10 justify-center mb-8"
        >
          <ArrowLeft />
        </TwPressable>

        <TwView className="items-center mt-6">
          <TwText className="text-gray-900 text-3xl font-bold mb-3">
            Verify OTP
          </TwText>
          <TwText className="text-gray-500 text-base mb-1">
            Enter the 6-digit code sent to
          </TwText>
          <TwText className="text-gray-900 text-base font-bold mb-10">
            {phone}
          </TwText>

          {/* OTP Input Squares */}
          <TwView className="flex-row justify-between w-full mb-10 px-2">
            {code.map((digit, index) => (
              <TwView
                key={index}
                className={`w-12 h-14 rounded-xl items-center justify-center bg-[#FFFFFF] border ${
                  digit !== "" ? "border-[#0EA5E9]" : "border-gray-200"
                }`}
              >
                <TwTextInput
                  ref={(ref: any) => (inputs.current[index] = ref)}
                  className="text-gray-900 text-xl font-bold text-center w-full h-full"
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text: string) => handleChange(text, index)}
                  onKeyPress={(e: any) => handleKeyPress(e, index)}
                  selectionColor="#0EA5E9"
                />
              </TwView>
            ))}
          </TwView>

          {/* Resend Timer */}
          <TwView className="flex-row mb-12">
            <TwText className="text-gray-500 text-sm">Resend OTP in </TwText>
            <TwText className="text-[#0EA5E9] text-sm font-bold">00:25</TwText>
          </TwView>

          {/* Action Button */}
          <TwPressable
            className="w-full bg-[#0EA5E9] h-14 rounded-xl items-center justify-center mb-8 flex-row"
            onPress={handleVerify}
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <TwText className="text-gray-900 font-bold text-base">
                Verify & Login
              </TwText>
            )}
          </TwPressable>
        </TwView>
      </TwView>
    </TwSafeAreaView>
  );
}
