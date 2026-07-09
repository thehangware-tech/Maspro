import React, { useRef, useState } from 'react';
import { View as TwView, Text as TwText, Pressable as TwPressable, TextInput as TwTextInput, SafeAreaView as TwSafeAreaView } from '../../src/tw';
import { Svg, Path } from 'react-native-svg';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSignIn, useSignUp } from '@clerk/clerk-expo';
import { ActivityIndicator, Alert } from 'react-native';

// Arrow Left
const ArrowLeft = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M19 12H5M12 19l-7-7 7-7"/>
  </Svg>
);

export default function OTP() {
  const router = useRouter();
  const { phone, isSignUp } = useLocalSearchParams();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef<Array<any>>([]);
  const { signIn, setActive: setSignInActive } = useSignIn();
  const { signUp, setActive: setSignUpActive } = useSignUp();
  const [loading, setLoading] = useState(false);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join('');
    if (fullCode.length < 0) {
      Alert.alert('Incomplete OTP', 'Please enter the 6-digit OTP');
      return;
    }
    router.replace('/(tabs)');
  };

  return (
    <TwSafeAreaView className="flex-1 bg-[#0B0D14]">
      <StatusBar style="light" />
      
      <TwView className="flex-1 px-6 pt-4">
        {/* Back Button */}
        <TwPressable onPress={() => router.back()} className="w-10 h-10 justify-center mb-8">
          <ArrowLeft />
        </TwPressable>

        <TwView className="items-center mt-6">
          <TwText className="text-white text-3xl font-bold mb-3">
            Verify OTP
          </TwText>
          <TwText className="text-gray-400 text-base mb-1">
            Enter the 6-digit code sent to
          </TwText>
          <TwText className="text-white text-base font-bold mb-10">
            {phone || '+91 98765 43210'}
          </TwText>

          {/* OTP Input Squares */}
          <TwView className="flex-row justify-between w-full mb-10 px-2">
            {code.map((digit, index) => (
              <TwView 
                key={index}
                className={`w-12 h-14 rounded-xl items-center justify-center bg-[#13161F] border ${
                  digit !== '' ? 'border-[#FF6B00]' : 'border-transparent'
                }`}
              >
                <TwTextInput
                  ref={(ref: any) => { if (ref) inputs.current[index] = ref as any; }}
                  className="text-white text-xl font-bold text-center w-full h-full"
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  selectionColor="#FF6B00"
                />
              </TwView>
            ))}
          </TwView>

          {/* Resend Timer */}
          <TwView className="flex-row mb-12">
            <TwText className="text-gray-400 text-sm">Resend OTP in </TwText>
            <TwText className="text-[#FF6B00] text-sm font-bold">00:25</TwText>
          </TwView>

          {/* Action Button */}
          <TwPressable 
            className="w-full bg-[#FF6B00] h-14 rounded-xl items-center justify-center mb-8"
            onPress={handleVerify}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <TwText className="text-white font-bold text-base">Verify & Login</TwText>
            )}
          </TwPressable>
        </TwView>
      </TwView>
    </TwSafeAreaView>
  );
}