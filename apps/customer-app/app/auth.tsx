import React from 'react';
import { View as TwView, Text as TwText, Pressable as TwPressable, SafeAreaView as TwSafeAreaView } from '../src/tw';
import { Svg, Path, Rect, Circle } from 'react-native-svg';
import { StatusBar } from 'expo-status-bar';

// Google Logo SVG
const GoogleIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </Svg>
);

// Apple Logo SVG
const AppleIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M17.05 16.32c-.05 1.39 1.18 2.33 1.25 2.38-.9 1.32-1.87 2.62-3.23 2.65-1.33.02-2.18-.89-3.48-.89-1.28 0-2.22.87-3.46.91-1.31.05-2.43-1.4-3.35-2.73-1.89-2.72-3.32-7.66-1.39-11.02.96-1.67 2.67-2.74 4.54-2.76 1.31-.02 2.53.88 3.32.88.78 0 2.27-1.1 3.86-.94 1.63.17 2.76.84 3.45 1.87-.69.45-2.49 1.5-2.51 3.55zm-2.72-9.67c.72-.88 1.2-2.11 1.07-3.32-1.04.04-2.32.71-3.05 1.58-.65.78-1.22 2.03-1.07 3.22 1.16.09 2.32-.6 3.05-1.48z" fill="#FFFFFF"/>
  </Svg>
);

// Phone Icon SVG
const PhoneIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
    <Path d="M12 18h.01"/>
  </Svg>
);

export default function Auth() {
  return (
    <TwSafeAreaView className="flex-1 bg-[#0B0D14]">
      <StatusBar style="light" />
      
      <TwView className="flex-1 px-6 justify-between pt-16 pb-12">
        {/* Top Section */}
        <TwView className="items-center mt-10">
          {/* Mockup of Maspro Logo */}
          <TwView className="flex-row items-center mb-16">
            <TwView className="relative w-12 h-12 justify-center items-center mr-2">
              <TwText className="text-[#FF6B00] font-bold text-5xl italic">M</TwText>
              <TwView className="absolute top-1 left-1 w-2.5 h-2.5 bg-[#FF6B00] rounded-full" />
            </TwView>
            <TwView className="flex-col justify-center mt-1">
              <TwText className="text-white font-bold text-2xl tracking-wide leading-none">MASPRO</TwText>
              <TwText className="text-[#FF6B00] font-bold text-xs tracking-widest leading-none mt-1">SPORTS INDIA</TwText>
            </TwView>
          </TwView>

          <TwText className="text-white text-3xl font-bold mb-3">
            Welcome Back!
          </TwText>
          <TwText className="text-gray-400 text-sm mb-12">
            Login to continue
          </TwText>

          {/* Buttons */}
          <TwView className="w-full space-y-4 gap-y-4">
            <TwPressable className="flex-row items-center bg-[#13161F] p-4 rounded-2xl">
              <TwView className="w-10 h-10 justify-center items-center">
                <GoogleIcon />
              </TwView>
              <TwText className="flex-1 text-center text-white text-base font-medium mr-10">
                Continue with Google
              </TwText>
            </TwPressable>

            <TwPressable className="flex-row items-center bg-[#13161F] p-4 rounded-2xl">
              <TwView className="w-10 h-10 justify-center items-center">
                <AppleIcon />
              </TwView>
              <TwText className="flex-1 text-center text-white text-base font-medium mr-10">
                Continue with Apple
              </TwText>
            </TwPressable>

            <TwPressable className="flex-row items-center bg-[#13161F] p-4 rounded-2xl">
              <TwView className="w-10 h-10 justify-center items-center">
                <PhoneIcon />
              </TwView>
              <TwText className="flex-1 text-center text-white text-base font-medium mr-10">
                Continue with Phone
              </TwText>
            </TwPressable>
          </TwView>
        </TwView>

        {/* Bottom Section */}
        <TwView className="items-center mb-4">
          <TwText className="text-gray-400 text-xs mb-1">
            By continuing, you agree to our
          </TwText>
          <TwView className="flex-row">
            <TwText className="text-[#FF6B00] text-xs font-medium">Terms of Service</TwText>
            <TwText className="text-gray-400 text-xs mx-1">and</TwText>
            <TwText className="text-[#FF6B00] text-xs font-medium">Privacy Policy</TwText>
          </TwView>
        </TwView>
      </TwView>
    </TwSafeAreaView>
  );
}