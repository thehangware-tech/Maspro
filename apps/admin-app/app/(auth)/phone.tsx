import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Phone, ShieldCheck, ChevronDown } from 'lucide-react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { View as TwView, Text as TwText, Pressable as TwPressable, TextInput as TwTextInput } from '../src/tw';

const MasproLogo = () => (
  <TwView className="items-center justify-center mt-4 mb-6">
    <TwView className="flex-row items-center justify-center">
      <TwView className="mr-2">
        <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <Path d="M8 30 L15 15 L20 25 L28 10 L35 30" stroke="#FF6B00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <Circle cx="12" cy="10" r="3" fill="#FF6B00" />
        </Svg>
      </TwView>
      <TwView>
        <TwText className="text-white font-bold text-2xl tracking-widest leading-none">MASPRO</TwText>
        <TwText className="text-[#FF6B00] font-bold text-xs tracking-wider">SPORTS INDIA</TwText>
      </TwView>
    </TwView>
  </TwView>
);
import { useRouter } from 'expo-router';

export default function AuthScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A0D14' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1, paddingHorizontal: 24, paddingTop: 16 }}
      >
        {/* Back Button */}
        <TwView className="mb-6">
          <TwPressable 
            className="w-10 h-10 items-center justify-center"
            onPress={() => router.back()}
          >
            <ArrowLeft color="white" size={24} />
          </TwPressable>
        </TwView>

        <MasproLogo />

        {/* Icon & Title */}
        <TwView className="items-center mb-8">
          <TwView className="w-20 h-20 bg-[#15171E] rounded-full items-center justify-center mb-6">
            <Phone color="#FF6B00" size={32} strokeWidth={2} />
          </TwView>
          <TwText className="text-3xl font-bold text-white mb-3">Login with Phone</TwText>
          <TwText className="text-gray-400 text-center text-base leading-6">
            {"Enter your mobile number\nto continue"}
          </TwText>
        </TwView>

        {/* Phone Input */}
        <TwView className="flex-row items-center bg-[#15171E] rounded-2xl h-14 mb-6 border border-[#22252D]">
          <TwPressable className="flex-row items-center pl-4 pr-3 h-full">
            <TwText className="text-xl mr-2">🇮🇳</TwText>
            <TwText className="text-white font-semibold text-base mr-1">+91</TwText>
            <ChevronDown color="#6B7280" size={16} />
          </TwPressable>
          <TwView className="w-[1px] h-6 bg-[#2A2D35]" />
          <TwTextInput
            className="flex-1 h-full text-white px-4 text-base font-medium"
            placeholder="Enter mobile number"
            placeholderTextColor="#6B7280"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </TwView>

        {/* Send OTP Button */}
        <TwPressable className="bg-[#FF6B00] h-14 rounded-2xl items-center justify-center mb-6">
          <TwText className="text-white font-bold text-lg">Send OTP</TwText>
        </TwPressable>

        {/* Info Box */}
        <TwView className="bg-[#15171E] p-4 rounded-2xl flex-row items-center border border-[#22252D]">
          <ShieldCheck color="#FF6B00" size={24} strokeWidth={2} />
          <TwText className="text-gray-400 text-sm ml-3 flex-1 leading-5">
            {"We'll send you a One Time\nPassword on this number"}
          </TwText>
        </TwView>

        <View style={{ flex: 1 }} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
