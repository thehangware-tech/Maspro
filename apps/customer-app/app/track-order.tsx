import React from 'react';
import { View as TwView, Text as TwText, Pressable as TwPressable, SafeAreaView as TwSafeAreaView, ScrollView as TwScrollView } from '../src/tw';
import { Svg, Path, Circle, Line, Polyline } from 'react-native-svg';
import { StatusBar } from 'expo-status-bar';

// Icons
const ArrowLeft = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M15 18l-6-6 6-6" />
  </Svg>
);

const MapPinIcon = () => (
  <Svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <Circle cx="12" cy="10" r="3" />
  </Svg>
);

const CheckIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <Polyline points="20 6 9 17 4 12" />
  </Svg>
);

export default function TrackOrder() {
  return (
    <TwSafeAreaView className="flex-1 bg-[#0B0D14]">
      <StatusBar style="light" />
      
      {/* Header */}
      <TwView className="flex-row items-center px-6 pt-4 pb-4 border-b border-gray-800">
        <TwPressable className="w-10 h-10 justify-center">
          <ArrowLeft />
        </TwPressable>
        <TwView className="flex-1 items-center pr-10">
          <TwText className="text-white font-bold text-lg">Track Order</TwText>
        </TwView>
      </TwView>

      <TwScrollView className="flex-1" contentContainerClassName="px-6 pb-6 mt-6">
        
        {/* Order Details Card */}
        <TwView className="bg-[#13161F] rounded-2xl p-5 border border-gray-800 mb-6 shadow-lg shadow-black/50">
          <TwView className="flex-row justify-between items-center mb-3">
            <TwText className="text-gray-400 font-medium">Order ID</TwText>
            <TwText className="text-[#FF6B00] font-bold">#123456</TwText>
          </TwView>
          <TwView className="flex-row justify-between items-center mb-3">
            <TwText className="text-gray-400 font-medium">Item</TwText>
            <TwText className="text-white font-bold">Cricket Bat</TwText>
          </TwView>
          <TwView className="flex-row justify-between items-center">
            <TwText className="text-gray-400 font-medium">Expected Delivery</TwText>
            <TwText className="text-white font-bold">12th Oct 2023</TwText>
          </TwView>
        </TwView>

        {/* Map Placeholder */}
        <TwView className="bg-[#1D212E] h-48 rounded-2xl mb-8 items-center justify-center border border-gray-700 overflow-hidden relative">
          <TwView className="absolute inset-0 opacity-10">
            {/* Fake map grid pattern */}
            {[...Array(10)].map((_, i) => (
              <TwView key={`h-${i}`} className="absolute w-full h-[1px] bg-white" style={{ top: i * 20 }} />
            ))}
            {[...Array(20)].map((_, i) => (
              <TwView key={`v-${i}`} className="absolute h-full w-[1px] bg-white" style={{ left: i * 20 }} />
            ))}
          </TwView>
          <MapPinIcon />
          <TwText className="text-gray-400 font-bold mt-2 z-10">Live Tracking Available Soon</TwText>
        </TwView>

        {/* Tracking Timeline */}
        <TwView className="px-2">
          <TwText className="text-white font-bold text-lg mb-6">Order Status</TwText>
          
          {/* Step 1: Ordered (Completed) */}
          <TwView className="flex-row mb-6">
            <TwView className="items-center mr-4">
              <TwView className="w-6 h-6 rounded-full bg-green-500 items-center justify-center z-10">
                <CheckIcon />
              </TwView>
              <TwView className="w-[2px] h-12 bg-green-500 absolute top-6" />
            </TwView>
            <TwView className="flex-1 pb-2">
              <TwText className="text-white font-bold text-base">Order Placed</TwText>
              <TwText className="text-gray-400 text-xs mt-1">Oct 10, 2023 - 10:00 AM</TwText>
            </TwView>
          </TwView>

          {/* Step 2: Shipped (Completed) */}
          <TwView className="flex-row mb-6">
            <TwView className="items-center mr-4">
              <TwView className="w-6 h-6 rounded-full bg-green-500 items-center justify-center z-10">
                <CheckIcon />
              </TwView>
              <TwView className="w-[2px] h-12 bg-green-500 absolute top-6" />
            </TwView>
            <TwView className="flex-1 pb-2">
              <TwText className="text-white font-bold text-base">Shipped</TwText>
              <TwText className="text-gray-400 text-xs mt-1">Oct 11, 2023 - 11:00 AM</TwText>
            </TwView>
          </TwView>

          {/* Step 3: In Transit (Current) */}
          <TwView className="flex-row mb-6">
            <TwView className="items-center mr-4">
              <TwView className="w-6 h-6 rounded-full bg-[#FF6B00] border-4 border-[#FF6B00]/30 z-10" />
              <TwView className="w-[2px] h-12 bg-gray-800 absolute top-6" />
            </TwView>
            <TwView className="flex-1 pb-2">
              <TwText className="text-[#FF6B00] font-bold text-base">In Transit</TwText>
              <TwText className="text-gray-400 text-xs mt-1">Oct 11, 2023 - 04:00 PM</TwText>
              <TwText className="text-gray-300 text-sm mt-2">Your package is on the way to the final delivery station.</TwText>
            </TwView>
          </TwView>

          {/* Step 4: Delivered (Pending) */}
          <TwView className="flex-row">
            <TwView className="items-center mr-4">
              <TwView className="w-6 h-6 rounded-full bg-gray-800 border-2 border-gray-700 z-10" />
            </TwView>
            <TwView className="flex-1 pb-2">
              <TwText className="text-gray-500 font-bold text-base">Delivered</TwText>
              <TwText className="text-gray-600 text-xs mt-1">Pending</TwText>
            </TwView>
          </TwView>

        </TwView>

      </TwScrollView>
    </TwSafeAreaView>
  );
}
