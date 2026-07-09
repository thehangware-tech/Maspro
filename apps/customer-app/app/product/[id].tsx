import React, { useState } from 'react';
import { View as TwView, Text as TwText, Pressable as TwPressable, SafeAreaView as TwSafeAreaView, ScrollView as TwScrollView, Image as TwImage } from '../../src/tw';
import { Svg, Path, Line, Circle } from 'react-native-svg';
import { StatusBar } from 'expo-status-bar';

// Icons
const ArrowLeft = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M15 18l-6-6 6-6" />
  </Svg>
);

const HeartIcon = ({ filled = false }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? "#FF6B00" : "none"} stroke={filled ? "#FF6B00" : "#FFFFFF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </Svg>
);

const StarIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="#EAB308" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </Svg>
);

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState('UK 10');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const sizes = ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'];

  return (
    <TwSafeAreaView className="flex-1 bg-[#0B0D14]">
      <StatusBar style="light" />
      
      {/* Header (Absolute over image) */}
      <TwView className="absolute top-12 left-0 right-0 z-10 flex-row justify-between px-6">
        <TwPressable className="w-10 h-10 bg-black/30 rounded-full items-center justify-center backdrop-blur-md">
          <ArrowLeft />
        </TwPressable>
        <TwPressable 
          className="w-10 h-10 bg-black/30 rounded-full items-center justify-center backdrop-blur-md"
          onPress={() => setIsWishlisted(!isWishlisted)}
        >
          <HeartIcon filled={isWishlisted} />
        </TwPressable>
      </TwView>

      <TwScrollView className="flex-1" bounces={false} showsVerticalScrollIndicator={false}>
        
        {/* Product Image Area */}
        <TwView className="w-full aspect-[4/3] bg-[#1D212E] items-center justify-center rounded-b-[40px] relative">
          <TwView className="absolute inset-0 items-center justify-center opacity-40">
            <TwView className="w-64 h-64 bg-white rounded-full blur-3xl" />
          </TwView>
          <TwText className="text-9xl drop-shadow-2xl z-10">👟</TwText>
        </TwView>

        {/* Product Info */}
        <TwView className="px-6 pt-6 pb-4">
          <TwView className="flex-row justify-between items-start mb-2">
            <TwView className="flex-1 pr-4">
              <TwText className="text-white font-bold text-2xl mb-2">Puma Running Shoes</TwText>
              
              {/* Rating */}
              <TwView className="flex-row items-center mb-1">
                <StarIcon />
                <TwText className="text-white font-bold ml-2">4.8</TwText>
                <TwText className="text-gray-400 text-sm ml-1">(120 Reviews)</TwText>
              </TwView>
            </TwView>
            
            <TwText className="text-[#FF6B00] font-bold text-3xl">$45.00</TwText>
          </TwView>
        </TwView>

        <TwView className="h-[1px] bg-gray-800 mx-6 mb-6" />

        {/* Size Selector */}
        <TwView className="px-6 mb-8">
          <TwView className="flex-row justify-between items-center mb-4">
            <TwText className="text-white font-bold text-lg">Select Size</TwText>
            <TwText className="text-[#FF6B00] font-medium text-sm">Size Guide</TwText>
          </TwView>
          
          <TwScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {sizes.map((size) => (
              <TwPressable
                key={size}
                onPress={() => setSelectedSize(size)}
                className={`mr-3 px-6 py-3 rounded-xl border ${
                  selectedSize === size 
                    ? 'bg-[#FF6B00] border-[#FF6B00]' 
                    : 'bg-[#13161F] border-gray-700'
                }`}
              >
                <TwText 
                  className={`font-bold ${
                    selectedSize === size ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  {size}
                </TwText>
              </TwPressable>
            ))}
          </TwScrollView>
        </TwView>

        {/* Description */}
        <TwView className="px-6 mb-10">
          <TwText className="text-white font-bold text-lg mb-3">Description</TwText>
          <TwText className="text-gray-400 text-sm leading-relaxed">
            Engineered for speed and comfort, the Puma Running Shoes feature advanced cushioning technology that absorbs impact and returns energy with every stride. The breathable mesh upper ensures optimal airflow, keeping your feet cool during intense workouts. Whether you're hitting the track or navigating city streets, these shoes provide the perfect blend of style and performance.
          </TwText>
        </TwView>

      </TwScrollView>

      {/* Bottom CTA */}
      <TwView className="px-6 pb-6 pt-4 bg-[#0B0D14] border-t border-gray-800">
        <TwPressable className="bg-[#FF6B00] w-full h-14 rounded-xl items-center justify-center shadow-lg shadow-[#FF6B00]/30 flex-row">
          <TwText className="text-white font-bold text-lg">Add to Cart</TwText>
          <TwView className="w-1.5 h-1.5 bg-white rounded-full mx-3 opacity-50" />
          <TwText className="text-white font-bold text-lg">$45.00</TwText>
        </TwPressable>
      </TwView>
    </TwSafeAreaView>
  );
}