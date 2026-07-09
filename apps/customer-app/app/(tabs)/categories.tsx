import React from 'react';
import { View as TwView, Text as TwText, Pressable as TwPressable, TextInput as TwTextInput, SafeAreaView as TwSafeAreaView, ScrollView as TwScrollView } from '../../src/tw';
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

const SearchIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="11" cy="11" r="8" />
    <Line x1="21" y1="21" x2="16.65" y2="16.65" />
  </Svg>
);

const CATEGORIES = [
  { name: 'Cricket', count: '120+', emoji: '🏏' },
  { name: 'Football', count: '98+', emoji: '⚽' },
  { name: 'Running', count: '75+', emoji: '🏃' },
  { name: 'Fitness', count: '60+', emoji: '🏋️' },
  { name: 'Badminton', count: '55+', emoji: '🏸' },
  { name: 'Tennis', count: '40+', emoji: '🎾' },
  { name: 'Basketball', count: '45+', emoji: '🏀' },
  { name: 'Accessories', count: '100+', emoji: '🎒' },
];

export default function Categories() {
  return (
    <TwSafeAreaView className="flex-1 bg-[#0B0D14]">
      <StatusBar style="light" />
      
      {/* Header */}
      <TwView className="flex-row justify-between items-center px-6 pt-4 pb-4">
        <TwPressable className="w-10 h-10 justify-center">
          <ArrowLeft />
        </TwPressable>
        
        <TwText className="text-white font-bold text-lg">Categories</TwText>

        <TwPressable className="relative w-10 h-10 justify-center items-end">
          <CartIcon />
          <TwView className="absolute top-1 -right-1 bg-[#FF6B00] w-3.5 h-3.5 rounded-full items-center justify-center border border-[#0B0D14]">
            <TwText className="text-white text-[8px] font-bold">1</TwText>
          </TwView>
        </TwPressable>
      </TwView>

      {/* Search */}
      <TwView className="px-6 mb-6">
        <TwView className="flex-row items-center bg-[#13161F] h-12 rounded-xl px-4">
          <SearchIcon />
          <TwTextInput 
            className="flex-1 text-white mx-3 h-full"
            placeholder="Search categories"
            placeholderTextColor="#9CA3AF"
          />
        </TwView>
      </TwView>

      {/* Grid */}
      <TwScrollView className="flex-1" contentContainerClassName="px-6 pb-6">
        <TwView className="flex-row flex-wrap justify-between">
          {CATEGORIES.map((cat, index) => (
            <TwPressable 
              key={index} 
              className="w-[48%] aspect-[4/5] bg-[#13161F] rounded-2xl mb-4 overflow-hidden relative"
            >
              {/* Fake gradient glow in center */}
              <TwView className="absolute inset-0 items-center justify-center opacity-30">
                <TwView className="w-24 h-24 bg-white rounded-full blur-xl" />
              </TwView>
              
              <TwView className="flex-1 items-center justify-center pb-6">
                <TwText className="text-6xl drop-shadow-xl">{cat.emoji}</TwText>
              </TwView>
              
              <TwView className="absolute bottom-0 left-0 right-0 p-4">
                <TwText className="text-white font-bold text-base mb-1">{cat.name}</TwText>
                <TwText className="text-gray-400 text-xs">{cat.count} Products</TwText>
              </TwView>
            </TwPressable>
          ))}
        </TwView>
      </TwScrollView>
    </TwSafeAreaView>
  );
}