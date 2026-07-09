import React from 'react';
import { View as TwView, Text as TwText, Pressable as TwPressable, SafeAreaView as TwSafeAreaView, ScrollView as TwScrollView, Image as TwImage } from '../src/tw';
import { Svg, Path, Circle, Line } from 'react-native-svg';
import { StatusBar } from 'expo-status-bar';

// Icons
const ArrowLeft = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M15 18l-6-6 6-6" />
  </Svg>
);

const CartIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="9" cy="21" r="1" />
    <Circle cx="20" cy="21" r="1" />
    <Path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </Svg>
);

const HeartFilledIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="#FF6B00" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </Svg>
);

export default function Wishlist() {
  return (
    <TwSafeAreaView className="flex-1 bg-[#0B0D14]">
      <StatusBar style="light" />
      
      {/* Header */}
      <TwView className="flex-row justify-between items-center px-6 pt-4 pb-4">
        <TwPressable className="w-10 h-10 justify-center">
          <ArrowLeft />
        </TwPressable>
        
        <TwText className="text-white font-bold text-lg">Wishlist</TwText>

        <TwPressable className="relative w-10 h-10 justify-center items-end">
          <CartIcon />
          <TwView className="absolute top-1 -right-1 bg-[#FF6B00] w-3.5 h-3.5 rounded-full items-center justify-center border border-[#0B0D14]">
            <TwText className="text-white text-[8px] font-bold">2</TwText>
          </TwView>
        </TwPressable>
      </TwView>

      <TwScrollView className="flex-1" contentContainerClassName="px-6 pb-6 mt-4">
        
        <TwView className="flex-row flex-wrap justify-between">
          
          {/* Product 1 */}
          <TwPressable className="w-[48%] bg-[#13161F] rounded-2xl mb-4 overflow-hidden border border-gray-800 relative">
            <TwPressable className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/40 rounded-full items-center justify-center">
              <HeartFilledIcon />
            </TwPressable>
            
            <TwView className="aspect-square bg-[#1D212E] items-center justify-center">
              <TwText className="text-5xl drop-shadow-lg">👟</TwText>
            </TwView>
            
            <TwView className="p-3">
              <TwText className="text-white font-bold text-sm mb-1 line-clamp-1" numberOfLines={1}>Puma Running Shoes</TwText>
              <TwText className="text-[#FF6B00] font-bold text-base">$45.00</TwText>
            </TwView>
          </TwPressable>

          {/* Product 2 */}
          <TwPressable className="w-[48%] bg-[#13161F] rounded-2xl mb-4 overflow-hidden border border-gray-800 relative">
            <TwPressable className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/40 rounded-full items-center justify-center">
              <HeartFilledIcon />
            </TwPressable>
            
            <TwView className="aspect-square bg-[#1D212E] items-center justify-center">
              <TwText className="text-5xl drop-shadow-lg">🏏</TwText>
            </TwView>
            
            <TwView className="p-3">
              <TwText className="text-white font-bold text-sm mb-1 line-clamp-1" numberOfLines={1}>Cricket Bat Standard</TwText>
              <TwText className="text-[#FF6B00] font-bold text-base">$35.00</TwText>
            </TwView>
          </TwPressable>

          {/* Product 3 */}
          <TwPressable className="w-[48%] bg-[#13161F] rounded-2xl mb-4 overflow-hidden border border-gray-800 relative">
            <TwPressable className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/40 rounded-full items-center justify-center">
              <HeartFilledIcon />
            </TwPressable>
            
            <TwView className="aspect-square bg-[#1D212E] items-center justify-center">
              <TwText className="text-5xl drop-shadow-lg">🏋️</TwText>
            </TwView>
            
            <TwView className="p-3">
              <TwText className="text-white font-bold text-sm mb-1 line-clamp-1" numberOfLines={1}>Fitness Dumbbells 5kg</TwText>
              <TwText className="text-[#FF6B00] font-bold text-base">$25.00</TwText>
            </TwView>
          </TwPressable>

          {/* Product 4 */}
          <TwPressable className="w-[48%] bg-[#13161F] rounded-2xl mb-4 overflow-hidden border border-gray-800 relative">
            <TwPressable className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/40 rounded-full items-center justify-center">
              <HeartFilledIcon />
            </TwPressable>
            
            <TwView className="aspect-square bg-[#1D212E] items-center justify-center">
              <TwText className="text-5xl drop-shadow-lg">🏸</TwText>
            </TwView>
            
            <TwView className="p-3">
              <TwText className="text-white font-bold text-sm mb-1 line-clamp-1" numberOfLines={1}>Pro Badminton Racket</TwText>
              <TwText className="text-[#FF6B00] font-bold text-base">$55.00</TwText>
            </TwView>
          </TwPressable>

        </TwView>

      </TwScrollView>
    </TwSafeAreaView>
  );
}
