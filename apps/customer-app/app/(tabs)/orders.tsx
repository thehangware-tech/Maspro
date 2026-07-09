import React, { useState } from 'react';
import { View as TwView, Text as TwText, Pressable as TwPressable, SafeAreaView as TwSafeAreaView, ScrollView as TwScrollView } from '../../src/tw';
import { Svg, Path, Circle, Polyline, Line } from 'react-native-svg';
import { StatusBar } from 'expo-status-bar';

// Icons
const ArrowLeft = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M15 18l-6-6 6-6" />
  </Svg>
);

const PackageIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <Polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <Line x1="12" y1="22.08" x2="12" y2="12" />
  </Svg>
);

export default function Orders() {
  const [activeTab, setActiveTab] = useState('active');

  return (
    <TwSafeAreaView className="flex-1 bg-[#0B0D14]">
      <StatusBar style="light" />
      
      {/* Header */}
      <TwView className="flex-row items-center px-6 pt-4 pb-4 border-b border-gray-800">
        <TwPressable className="w-10 h-10 justify-center">
          <ArrowLeft />
        </TwPressable>
        <TwView className="flex-1 items-center pr-10">
          <TwText className="text-white font-bold text-lg">My Orders</TwText>
        </TwView>
      </TwView>

      {/* Tabs */}
      <TwView className="flex-row px-6 mt-4 mb-4">
        <TwPressable 
          className={`flex-1 items-center py-3 border-b-2 ${activeTab === 'active' ? 'border-[#FF6B00]' : 'border-transparent'}`}
          onPress={() => setActiveTab('active')}
        >
          <TwText className={`font-bold ${activeTab === 'active' ? 'text-[#FF6B00]' : 'text-gray-500'}`}>Active</TwText>
        </TwPressable>
        <TwPressable 
          className={`flex-1 items-center py-3 border-b-2 ${activeTab === 'completed' ? 'border-[#FF6B00]' : 'border-transparent'}`}
          onPress={() => setActiveTab('completed')}
        >
          <TwText className={`font-bold ${activeTab === 'completed' ? 'text-[#FF6B00]' : 'text-gray-500'}`}>Completed</TwText>
        </TwPressable>
        <TwPressable 
          className={`flex-1 items-center py-3 border-b-2 ${activeTab === 'cancelled' ? 'border-[#FF6B00]' : 'border-transparent'}`}
          onPress={() => setActiveTab('cancelled')}
        >
          <TwText className={`font-bold ${activeTab === 'cancelled' ? 'text-[#FF6B00]' : 'text-gray-500'}`}>Cancelled</TwText>
        </TwPressable>
      </TwView>

      <TwScrollView className="flex-1" contentContainerClassName="px-6 pb-6">
        
        {/* Order Card 1 */}
        <TwView className="bg-[#13161F] rounded-2xl p-4 mb-4 border border-gray-800">
          {/* Top Row: Order ID & Status */}
          <TwView className="flex-row justify-between items-center mb-4 border-b border-gray-800 pb-3">
            <TwText className="text-[#FF6B00] font-bold">Order #123456</TwText>
            <TwView className="bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
              <TwText className="text-blue-400 text-xs font-bold">In Transit</TwText>
            </TwView>
          </TwView>
          
          {/* Middle Row: Item Info */}
          <TwView className="flex-row items-center mb-4">
            <TwView className="w-16 h-16 bg-gray-800 rounded-xl items-center justify-center mr-4">
              <TwText className="text-2xl">🏏</TwText>
            </TwView>
            <TwView className="flex-1">
              <TwText className="text-white font-bold text-base mb-1">Cricket Bat</TwText>
              <TwText className="text-gray-400 text-xs mb-1">Size: Standard  |  Qty: 1</TwText>
              <TwText className="text-white font-bold">$35.00</TwText>
            </TwView>
          </TwView>
          
          {/* Bottom Row: Delivery & Action */}
          <TwView className="flex-row justify-between items-center pt-3 border-t border-gray-800">
            <TwView className="flex-row items-center">
              <PackageIcon />
              <TwText className="text-gray-400 text-xs ml-2">Expected: 12th Oct 2023</TwText>
            </TwView>
            <TwPressable className="bg-[#1D212E] px-4 py-2 rounded-lg border border-gray-700">
              <TwText className="text-white text-xs font-bold">Track Order</TwText>
            </TwPressable>
          </TwView>
        </TwView>

        {/* Order Card 2 */}
        <TwView className="bg-[#13161F] rounded-2xl p-4 mb-4 border border-gray-800">
          {/* Top Row: Order ID & Status */}
          <TwView className="flex-row justify-between items-center mb-4 border-b border-gray-800 pb-3">
            <TwText className="text-[#FF6B00] font-bold">Order #123457</TwText>
            <TwView className="bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/30">
              <TwText className="text-orange-400 text-xs font-bold">Processing</TwText>
            </TwView>
          </TwView>
          
          {/* Middle Row: Item Info */}
          <TwView className="flex-row items-center mb-4">
            <TwView className="w-16 h-16 bg-gray-800 rounded-xl items-center justify-center mr-4">
              <TwText className="text-2xl">👟</TwText>
            </TwView>
            <TwView className="flex-1">
              <TwText className="text-white font-bold text-base mb-1">Puma Running Shoes</TwText>
              <TwText className="text-gray-400 text-xs mb-1">Size: US 10  |  Qty: 1</TwText>
              <TwText className="text-white font-bold">$45.00</TwText>
            </TwView>
          </TwView>
          
          {/* Bottom Row: Delivery & Action */}
          <TwView className="flex-row justify-between items-center pt-3 border-t border-gray-800">
            <TwView className="flex-row items-center">
              <PackageIcon />
              <TwText className="text-gray-400 text-xs ml-2">Expected: 14th Oct 2023</TwText>
            </TwView>
            <TwPressable className="bg-[#1D212E] px-4 py-2 rounded-lg border border-gray-700">
              <TwText className="text-white text-xs font-bold">Track Order</TwText>
            </TwPressable>
          </TwView>
        </TwView>

      </TwScrollView>
    </TwSafeAreaView>
  );
}