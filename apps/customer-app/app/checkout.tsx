import React, { useState } from 'react';
import { View as TwView, Text as TwText, Pressable as TwPressable, SafeAreaView as TwSafeAreaView, ScrollView as TwScrollView } from '../src/tw';
import { Svg, Path, Circle, Rect, Line } from 'react-native-svg';
import { StatusBar } from 'expo-status-bar';

// Icons
const ArrowLeft = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M15 18l-6-6 6-6" />
  </Svg>
);

const LocationIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <Circle cx="12" cy="10" r="3" />
  </Svg>
);

const RadioChecked = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke="#FF6B00" strokeWidth="2" />
    <Circle cx="12" cy="12" r="5" fill="#FF6B00" />
  </Svg>
);

const RadioUnchecked = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke="#4B5563" strokeWidth="2" />
  </Svg>
);

// Payment Method Icons
const GPayIcon = () => (
  <TwText className="text-xl">G</TwText>
);

const CardIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <Line x1="1" y1="10" x2="23" y2="10" />
  </Svg>
);

const BankIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
  </Svg>
);

const CashIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Rect x="2" y="6" width="20" height="12" rx="2" />
    <Circle cx="12" cy="12" r="2" />
    <Path d="M6 12h.01M18 12h.01" />
  </Svg>
);

export default function Checkout() {
  const [selectedPayment, setSelectedPayment] = useState('card');

  return (
    <TwSafeAreaView className="flex-1 bg-[#0B0D14]">
      <StatusBar style="light" />
      
      {/* Header */}
      <TwView className="flex-row items-center px-6 pt-4 pb-4 border-b border-gray-800">
        <TwPressable className="w-10 h-10 justify-center">
          <ArrowLeft />
        </TwPressable>
        <TwView className="flex-1 items-center pr-10">
          <TwText className="text-white font-bold text-lg">Checkout</TwText>
        </TwView>
      </TwView>

      <TwScrollView className="flex-1" contentContainerClassName="px-6 pb-6">
        
        {/* Delivery Address */}
        <TwView className="mt-6 mb-8">
          <TwText className="text-white font-bold text-lg mb-4">Delivery Address</TwText>
          <TwView className="bg-[#13161F] p-4 rounded-2xl flex-row items-start border border-gray-800">
            <TwView className="mt-1">
              <LocationIcon />
            </TwView>
            <TwView className="flex-1 ml-3">
              <TwView className="flex-row justify-between items-center mb-1">
                <TwView className="flex-row items-center">
                  <TwText className="text-white font-bold text-base mr-2">Adarsh Singh</TwText>
                  <TwView className="bg-gray-800 px-2 py-0.5 rounded">
                    <TwText className="text-gray-400 text-[10px]">HOME</TwText>
                  </TwView>
                </TwView>
                <TwPressable>
                  <TwText className="text-[#FF6B00] text-xs font-bold">Change</TwText>
                </TwPressable>
              </TwView>
              <TwText className="text-gray-400 text-sm leading-relaxed mt-1">
                123, Sports Complex Road,
                Near City Stadium,
                Bangalore, Karnataka - 560001
              </TwText>
              <TwText className="text-gray-400 text-sm mt-2">+91 98765 43210</TwText>
            </TwView>
          </TwView>
        </TwView>

        {/* Payment Method */}
        <TwView className="mb-8">
          <TwText className="text-white font-bold text-lg mb-4">Payment Method</TwText>
          <TwView className="bg-[#13161F] rounded-2xl border border-gray-800 overflow-hidden">
            
            {/* Google Pay */}
            <TwPressable 
              className="flex-row items-center p-4 border-b border-gray-800"
              onPress={() => setSelectedPayment('gpay')}
            >
              <TwView className="w-10 h-10 bg-gray-800 rounded-lg items-center justify-center mr-4">
                <GPayIcon />
              </TwView>
              <TwText className="text-white flex-1 font-medium">Google Pay</TwText>
              {selectedPayment === 'gpay' ? <RadioChecked /> : <RadioUnchecked />}
            </TwPressable>

            {/* Credit/Debit Card */}
            <TwPressable 
              className="flex-row items-center p-4 border-b border-gray-800"
              onPress={() => setSelectedPayment('card')}
            >
              <TwView className="w-10 h-10 bg-gray-800 rounded-lg items-center justify-center mr-4">
                <CardIcon />
              </TwView>
              <TwText className="text-white flex-1 font-medium">Credit/Debit Card</TwText>
              {selectedPayment === 'card' ? <RadioChecked /> : <RadioUnchecked />}
            </TwPressable>

            {/* Netbanking */}
            <TwPressable 
              className="flex-row items-center p-4 border-b border-gray-800"
              onPress={() => setSelectedPayment('netbanking')}
            >
              <TwView className="w-10 h-10 bg-gray-800 rounded-lg items-center justify-center mr-4">
                <BankIcon />
              </TwView>
              <TwText className="text-white flex-1 font-medium">Netbanking</TwText>
              {selectedPayment === 'netbanking' ? <RadioChecked /> : <RadioUnchecked />}
            </TwPressable>

            {/* Cash on Delivery */}
            <TwPressable 
              className="flex-row items-center p-4"
              onPress={() => setSelectedPayment('cod')}
            >
              <TwView className="w-10 h-10 bg-gray-800 rounded-lg items-center justify-center mr-4">
                <CashIcon />
              </TwView>
              <TwText className="text-white flex-1 font-medium">Cash on Delivery</TwText>
              {selectedPayment === 'cod' ? <RadioChecked /> : <RadioUnchecked />}
            </TwPressable>

          </TwView>
        </TwView>

        {/* Order Summary */}
        <TwView className="mb-4">
          <TwText className="text-white font-bold text-lg mb-4">Order Summary</TwText>
          <TwView className="bg-[#13161F] rounded-2xl p-5 border border-gray-800">
            <TwView className="flex-row justify-between mb-3">
              <TwText className="text-gray-400 font-medium">Subtotal</TwText>
              <TwText className="text-white font-bold">$70.00</TwText>
            </TwView>
            
            <TwView className="flex-row justify-between mb-3">
              <TwText className="text-gray-400 font-medium">Delivery Fee</TwText>
              <TwText className="text-white font-bold">$5.00</TwText>
            </TwView>
            
            <TwView className="flex-row justify-between mb-4">
              <TwText className="text-gray-400 font-medium">Discount (20%)</TwText>
              <TwText className="text-green-500 font-bold">-$14.00</TwText>
            </TwView>
            
            <TwView className="h-[1px] bg-gray-700 mb-4" />
            
            <TwView className="flex-row justify-between items-center">
              <TwText className="text-white font-bold text-lg">Total</TwText>
              <TwText className="text-white font-bold text-2xl">$61.00</TwText>
            </TwView>
          </TwView>
        </TwView>

      </TwScrollView>

      {/* Place Order Button */}
      <TwView className="px-6 pb-6 pt-2 bg-[#0B0D14]">
        <TwPressable className="bg-[#FF6B00] w-full h-14 rounded-xl items-center justify-center shadow-lg shadow-[#FF6B00]/30">
          <TwText className="text-white font-bold text-lg">Place Order - $61.00</TwText>
        </TwPressable>
      </TwView>
    </TwSafeAreaView>
  );
}