import React from 'react';
import { View as TwView, Text as TwText, Pressable as TwPressable, SafeAreaView as TwSafeAreaView, ScrollView as TwScrollView } from '../../src/tw';
import { Svg, Path, Circle, Polyline, Line, Rect } from 'react-native-svg';
import { StatusBar } from 'expo-status-bar';

// Icons
const ArrowRight = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 18l6-6-6-6" />
  </Svg>
);

const UserIcon = () => (
  <Svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <Circle cx="12" cy="7" r="4" />
  </Svg>
);

const BoxIcon = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <Polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <Line x1="12" y1="22.08" x2="12" y2="12" />
  </Svg>
);

const MapPinIcon = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <Circle cx="12" cy="10" r="3" />
  </Svg>
);

const CreditCardIcon = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <Line x1="1" y1="10" x2="23" y2="10" />
  </Svg>
);

const HeartIcon = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </Svg>
);

const SettingsIcon = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="3" />
    <Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </Svg>
);

const HelpIcon = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <Line x1="12" y1="17" x2="12.01" y2="17" />
  </Svg>
);

const LogoutIcon = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <Polyline points="16 17 21 12 16 7" />
    <Line x1="21" y1="12" x2="9" y2="12" />
  </Svg>
);

export default function Account() {
  return (
    <TwSafeAreaView className="flex-1 bg-[#0B0D14]">
      <StatusBar style="light" />
      
      {/* Header */}
      <TwView className="px-6 pt-4 pb-4 border-b border-gray-800">
        <TwText className="text-white font-bold text-xl">Profile</TwText>
      </TwView>

      <TwScrollView className="flex-1" contentContainerClassName="pb-6">
        
        {/* User Info */}
        <TwView className="px-6 py-8 items-center border-b border-gray-800">
          <TwView className="w-24 h-24 bg-gray-800 rounded-full items-center justify-center mb-4 border-2 border-[#13161F]">
            <UserIcon />
          </TwView>
          <TwText className="text-white font-bold text-2xl mb-1">Adarsh Singh</TwText>
          <TwText className="text-gray-400 text-sm mb-4">adarsh@example.com</TwText>
          <TwPressable className="bg-[#1D212E] px-6 py-2.5 rounded-xl border border-gray-700">
            <TwText className="text-white font-bold">Edit Profile</TwText>
          </TwPressable>
        </TwView>

        {/* Links */}
        <TwView className="px-6 mt-6">
          
          <TwPressable className="flex-row items-center bg-[#13161F] p-4 rounded-xl mb-3 border border-gray-800">
            <TwView className="w-10 h-10 bg-gray-800 rounded-lg items-center justify-center mr-4">
              <BoxIcon />
            </TwView>
            <TwText className="flex-1 text-white font-medium text-base">My Orders</TwText>
            <ArrowRight />
          </TwPressable>

          <TwPressable className="flex-row items-center bg-[#13161F] p-4 rounded-xl mb-3 border border-gray-800">
            <TwView className="w-10 h-10 bg-gray-800 rounded-lg items-center justify-center mr-4">
              <MapPinIcon />
            </TwView>
            <TwText className="flex-1 text-white font-medium text-base">Shipping Address</TwText>
            <ArrowRight />
          </TwPressable>

          <TwPressable className="flex-row items-center bg-[#13161F] p-4 rounded-xl mb-3 border border-gray-800">
            <TwView className="w-10 h-10 bg-gray-800 rounded-lg items-center justify-center mr-4">
              <CreditCardIcon />
            </TwView>
            <TwText className="flex-1 text-white font-medium text-base">Payment Methods</TwText>
            <ArrowRight />
          </TwPressable>

          <TwPressable className="flex-row items-center bg-[#13161F] p-4 rounded-xl mb-3 border border-gray-800">
            <TwView className="w-10 h-10 bg-gray-800 rounded-lg items-center justify-center mr-4">
              <HeartIcon />
            </TwView>
            <TwText className="flex-1 text-white font-medium text-base">Wishlist</TwText>
            <ArrowRight />
          </TwPressable>

          <TwPressable className="flex-row items-center bg-[#13161F] p-4 rounded-xl mb-3 border border-gray-800">
            <TwView className="w-10 h-10 bg-gray-800 rounded-lg items-center justify-center mr-4">
              <SettingsIcon />
            </TwView>
            <TwText className="flex-1 text-white font-medium text-base">Settings</TwText>
            <ArrowRight />
          </TwPressable>

          <TwPressable className="flex-row items-center bg-[#13161F] p-4 rounded-xl mb-3 border border-gray-800">
            <TwView className="w-10 h-10 bg-gray-800 rounded-lg items-center justify-center mr-4">
              <HelpIcon />
            </TwView>
            <TwText className="flex-1 text-white font-medium text-base">Help & Support</TwText>
            <ArrowRight />
          </TwPressable>

          <TwPressable className="flex-row items-center bg-[#13161F] p-4 rounded-xl mt-4 border border-gray-800">
            <TwView className="w-10 h-10 bg-red-500/10 rounded-lg items-center justify-center mr-4">
              <LogoutIcon />
            </TwView>
            <TwText className="flex-1 text-red-500 font-bold text-base">Logout</TwText>
          </TwPressable>

        </TwView>
      </TwScrollView>
    </TwSafeAreaView>
  );
}