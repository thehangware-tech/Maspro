import React from 'react';
import { View as TwView, Text as TwText, Pressable as TwPressable, TextInput as TwTextInput, SafeAreaView as TwSafeAreaView, ScrollView as TwScrollView, Image as TwImage } from '../../src/tw';
import { Svg, Path, Circle, Polyline, Rect, Line } from 'react-native-svg';
import { StatusBar } from 'expo-status-bar';

// Icons
const MenuIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Line x1="3" y1="12" x2="21" y2="12" />
    <Line x1="3" y1="6" x2="21" y2="6" />
    <Line x1="3" y1="18" x2="21" y2="18" />
  </Svg>
);

const BellIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <Path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </Svg>
);

const CartIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="9" cy="21" r="1" />
    <Circle cx="20" cy="21" r="1" />
    <Path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </Svg>
);

const SearchIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="11" cy="11" r="8" />
    <Line x1="21" y1="21" x2="16.65" y2="16.65" />
  </Svg>
);

const FilterIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Line x1="4" y1="21" x2="4" y2="14" />
    <Line x1="4" y1="10" x2="4" y2="3" />
    <Line x1="12" y1="21" x2="12" y2="12" />
    <Line x1="12" y1="8" x2="12" y2="3" />
    <Line x1="20" y1="21" x2="20" y2="16" />
    <Line x1="20" y1="12" x2="20" y2="3" />
    <Line x1="1" y1="14" x2="7" y2="14" />
    <Line x1="9" y1="8" x2="15" y2="8" />
    <Line x1="17" y1="16" x2="23" y2="16" />
  </Svg>
);

export default function Dashboard() {
  return (
    <TwSafeAreaView className="flex-1 bg-[#0B0D14]">
      <StatusBar style="light" />
      
      {/* Header */}
      <TwView className="flex-row justify-between items-center px-6 pt-4 pb-2">
        <TwPressable>
          <MenuIcon />
        </TwPressable>
        
        {/* Logo */}
        <TwView className="flex-row items-center">
          <TwView className="relative w-6 h-6 justify-center items-center mr-1">
            <TwText className="text-[#FF6B00] font-bold text-2xl italic">M</TwText>
            <TwView className="absolute top-0 left-0 w-1 h-1 bg-[#FF6B00] rounded-full" />
          </TwView>
          <TwView className="flex-col justify-center">
            <TwText className="text-white font-bold text-sm tracking-wide leading-none">MASPRO</TwText>
            <TwText className="text-[#FF6B00] font-bold text-[6px] tracking-widest leading-none mt-0.5">SPORTS INDIA</TwText>
          </TwView>
        </TwView>

        <TwView className="flex-row items-center space-x-4 gap-x-4">
          <TwPressable className="relative">
            <BellIcon />
            <TwView className="absolute -top-1 -right-1 bg-[#FF6B00] w-3.5 h-3.5 rounded-full items-center justify-center border border-[#0B0D14]">
              <TwText className="text-white text-[8px] font-bold">1</TwText>
            </TwView>
          </TwPressable>
          <TwPressable className="relative">
            <CartIcon />
            <TwView className="absolute -top-1 -right-1 bg-[#FF6B00] w-3.5 h-3.5 rounded-full items-center justify-center border border-[#0B0D14]">
              <TwText className="text-white text-[8px] font-bold">1</TwText>
            </TwView>
          </TwPressable>
        </TwView>
      </TwView>

      <TwScrollView className="flex-1" contentContainerClassName="pb-6">
        
        {/* Greeting */}
        <TwView className="px-6 mt-4">
          <TwText className="text-white text-2xl font-bold">Hello, Adarsh 👋</TwText>
          <TwText className="text-gray-400 text-sm mt-1">Find the best gear for your game.</TwText>
        </TwView>

        {/* Search */}
        <TwView className="px-6 mt-6">
          <TwView className="flex-row items-center bg-[#13161F] h-12 rounded-xl px-4">
            <SearchIcon />
            <TwTextInput 
              className="flex-1 text-white mx-3 h-full"
              placeholder="Search for products, brands..."
              placeholderTextColor="#9CA3AF"
            />
            <FilterIcon />
          </TwView>
        </TwView>

        {/* Promo Banner */}
        <TwView className="px-6 mt-6">
          <TwView className="w-full h-40 rounded-2xl bg-[#CC5500] overflow-hidden relative justify-center px-6">
            <TwView className="absolute inset-0 bg-black/20" />
            
            <TwView className="z-10 w-3/5">
              <TwText className="text-white text-xl font-bold">New Arrivals</TwText>
              <TwText className="text-[#FFD580] text-lg font-bold mt-1 mb-3">Up to 30% Off</TwText>
              <TwPressable className="bg-[#FF6B00] py-2 px-4 rounded-lg self-start">
                <TwText className="text-white text-xs font-bold">Shop Now</TwText>
              </TwPressable>
            </TwView>
            
            <TwView className="absolute right-0 bottom-0 top-0 w-1/2 items-center justify-center">
              <TwText className="text-7xl">⚽</TwText>
            </TwView>
          </TwView>
        </TwView>

        {/* Top Categories */}
        <TwView className="px-6 mt-8">
          <TwView className="flex-row justify-between items-end mb-4">
            <TwText className="text-white text-lg font-bold">Top Categories</TwText>
            <TwPressable>
              <TwText className="text-[#FF6B00] text-xs font-bold">View All</TwText>
            </TwPressable>
          </TwView>

          <TwView className="flex-row justify-between">
            <TwPressable className="items-center w-[22%]">
              <TwView className="w-full aspect-square bg-[#13161F] rounded-xl items-center justify-center mb-2">
                <TwText className="text-3xl">🏏</TwText>
              </TwView>
              <TwText className="text-white text-xs">Cricket</TwText>
            </TwPressable>
            
            <TwPressable className="items-center w-[22%]">
              <TwView className="w-full aspect-square bg-[#13161F] rounded-xl items-center justify-center mb-2">
                <TwText className="text-3xl">⚽</TwText>
              </TwView>
              <TwText className="text-white text-xs">Football</TwText>
            </TwPressable>
            
            <TwPressable className="items-center w-[22%]">
              <TwView className="w-full aspect-square bg-[#13161F] rounded-xl items-center justify-center mb-2">
                <TwText className="text-3xl">🏃</TwText>
              </TwView>
              <TwText className="text-white text-xs">Running</TwText>
            </TwPressable>
            
            <TwPressable className="items-center w-[22%]">
              <TwView className="w-full aspect-square bg-[#13161F] rounded-xl items-center justify-center mb-2">
                <TwText className="text-3xl">🏋️</TwText>
              </TwView>
              <TwText className="text-white text-xs">Fitness</TwText>
            </TwPressable>
          </TwView>
        </TwView>

        {/* Dashboard Widgets */}
        <TwView className="px-6 mt-8">
          <TwView className="flex-row justify-between mb-4">
            <TwView className="w-[48%] bg-[#13161F] p-4 rounded-xl">
              <TwText className="text-gray-300 text-xs mb-3">Total Orders</TwText>
              <TwText className="text-white text-3xl font-bold mb-2">24</TwText>
              <TwText className="text-green-500 text-xs font-bold">↗ 12%</TwText>
            </TwView>
            
            <TwView className="w-[48%] bg-[#13161F] p-4 rounded-xl">
              <TwText className="text-gray-300 text-xs mb-3">Wishlist</TwText>
              <TwText className="text-white text-3xl font-bold mb-2">16</TwText>
              <TwText className="text-gray-400 text-xs font-bold">Items</TwText>
            </TwView>
          </TwView>

          <TwView className="flex-row justify-between">
            <TwView className="w-[48%] bg-[#1D172E] p-4 rounded-xl">
              <TwText className="text-purple-300 text-xs mb-3">Offers</TwText>
              <TwText className="text-white text-3xl font-bold mb-2">8</TwText>
              <TwText className="text-green-400 text-xs font-bold">Active</TwText>
            </TwView>
            
            <TwView className="w-[48%] bg-[#10201C] p-4 rounded-xl">
              <TwText className="text-teal-300 text-xs mb-3">Reward Points</TwText>
              <TwText className="text-white text-3xl font-bold mb-2">350</TwText>
              <TwText className="text-teal-500 text-xs font-bold">Points</TwText>
            </TwView>
          </TwView>
        </TwView>

        {/* Best Sellers */}
        <TwView className="px-6 mt-8">
          <TwView className="flex-row justify-between items-end mb-4">
            <TwText className="text-white text-lg font-bold">Best Sellers</TwText>
            <TwPressable>
              <TwText className="text-[#FF6B00] text-xs font-bold">View All</TwText>
            </TwPressable>
          </TwView>
          <TwView className="h-40 bg-[#13161F] rounded-xl items-center justify-center">
             <TwText className="text-gray-500">Products list placeholder</TwText>
          </TwView>
        </TwView>

      </TwScrollView>
    </TwSafeAreaView>
  );
}