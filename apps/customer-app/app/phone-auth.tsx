import React from "react";
import {
  View as TwView,
  Text as TwText,
  Pressable as TwPressable,
  TextInput as TwTextInput,
  SafeAreaView as TwSafeAreaView,
} from "../src/tw";
import Svg, { Path, Circle, Polyline, Rect } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

// Phone Call Icon (Orange)
const PhoneCallIcon = () => (
  <Svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#0EA5E9"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </Svg>
);

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

// Chevron Down
const ChevronDown = () => (
  <Svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9CA3AF"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Polyline points="6 9 12 15 18 9"></Polyline>
  </Svg>
);

// Shield Check
const ShieldCheck = () => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#0EA5E9"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <Path d="M9 12l2 2 4-4" />
  </Svg>
);

export default function PhoneAuth() {
  const router = useRouter();
  const [phone, setPhone] = React.useState("");

  return (
    <TwSafeAreaView className="flex-1 bg-[#F8FAFC]">
      <StatusBar style="light" />

      <TwView className="flex-1 px-6 pt-4 pb-12">
        {/* Back Button */}
        <TwPressable
          onPress={() => router.back()}
          className="w-10 h-10 justify-center mb-8"
        >
          <ArrowLeft />
        </TwPressable>

        {/* Top Section */}
        <TwView className="items-center">
          {/* Logo Mockup */}
          <TwView className="flex-row items-center mb-10">
            <TwView className="relative w-8 h-8 justify-center items-center mr-2">
              <TwText className="text-[#0EA5E9] font-bold text-3xl italic">
                M
              </TwText>
              <TwView className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-[#0EA5E9] rounded-full" />
            </TwView>
            <TwView className="flex-col justify-center mt-1">
              <TwText className="text-gray-900 font-bold text-xl tracking-wide leading-none">
                MASPRO
              </TwText>
              <TwText className="text-[#0EA5E9] font-bold text-[10px] tracking-widest leading-none mt-1">
                SPORTS INDIA
              </TwText>
            </TwView>
          </TwView>

          {/* Icon Circle */}
          <TwView className="w-20 h-20 rounded-full bg-[#FFFFFF] items-center justify-center mb-8">
            <PhoneCallIcon />
          </TwView>

          <TwText className="text-gray-900 text-2xl font-bold mb-3">
            Login with Phone
          </TwText>
          <TwText className="text-gray-500 text-sm text-center px-8 mb-10">
            Enter your mobile number to continue
          </TwText>

          {/* Input Area */}
          <TwView className="w-full flex-row items-center bg-[#FFFFFF] rounded-xl h-14 mb-8 overflow-hidden">
            <TwPressable className="flex-row items-center justify-center px-4 h-full border-r border-gray-200">
              <TwText className="text-xl mr-2">🇮🇳</TwText>
              <TwText className="text-gray-900 font-medium mr-2">+91</TwText>
              <ChevronDown />
            </TwPressable>
            <TwTextInput
              className="flex-1 text-gray-900 px-4 h-full"
              placeholder="Enter mobile number"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </TwView>

          {/* Action Button */}
          <TwPressable
            className="w-full bg-[#0EA5E9] h-14 rounded-xl items-center justify-center mb-8"
            onPress={() => {
              if (phone.length < 10) return;
              router.push({
                pathname: "/otp",
                params: { phone: `+91 ${phone}` },
              });
            }}
          >
            <TwText className="text-gray-900 font-bold text-base">
              Send OTP
            </TwText>
          </TwPressable>

          {/* Info Box */}
          <TwView className="w-full bg-[#FFFFFF] p-4 rounded-xl flex-row items-center">
            <TwView className="mr-3">
              <ShieldCheck />
            </TwView>
            <TwText className="text-gray-500 text-xs flex-1 leading-relaxed">
              We'll send you a One Time Password on this number
            </TwText>
          </TwView>
        </TwView>
      </TwView>
    </TwSafeAreaView>
  );
}
