import React from "react";
import {
  View as TwView,
  Text as TwText,
  Pressable as TwPressable,
  SafeAreaView as TwSafeAreaView,
  ScrollView as TwScrollView,
  Image as TwImage,
  TextInput as TwTextInput,
} from "../../src/tw";
import Svg, { Path, Line, Polyline } from "react-native-svg";
import { StatusBar } from "expo-status-bar";

// Icons
const ArrowLeft = () => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#111827"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M15 18l-6-6 6-6" />
  </Svg>
);

const TrashIcon = ({ color = "#FFFFFF" }) => (
  <Svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M3 6h18" />
    <Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </Svg>
);

const MinusIcon = () => (
  <Svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#111827"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Line x1="5" y1="12" x2="19" y2="12" />
  </Svg>
);

const PlusIcon = () => (
  <Svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#111827"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Line x1="12" y1="5" x2="12" y2="19" />
    <Line x1="5" y1="12" x2="19" y2="12" />
  </Svg>
);

export default function Cart() {
  return (
    <TwSafeAreaView className="flex-1 bg-[#F8FAFC]">
      <StatusBar style="light" />

      {/* Header */}
      <TwView className="flex-row justify-between items-center px-6 pt-4 pb-4">
        <TwPressable className="w-10 h-10 justify-center">
          <ArrowLeft />
        </TwPressable>

        <TwText className="text-gray-900 font-bold text-lg">My Cart</TwText>

        <TwPressable className="w-10 h-10 justify-center items-end">
          <TrashIcon />
        </TwPressable>
      </TwView>

      <TwScrollView className="flex-1" contentContainerClassName="px-6 pb-6">
        {/* Cart Items */}
        <TwView className="mt-4">
          {/* Item 1 */}
          <TwView className="flex-row items-center bg-[#FFFFFF] p-3 rounded-2xl mb-4">
            <TwView className="w-20 h-20 bg-[#E0F2FE] rounded-xl items-center justify-center mr-4">
              <TwText className="text-3xl">🏏</TwText>
            </TwView>
            <TwView className="flex-1">
              <TwView className="flex-row justify-between items-start">
                <TwView>
                  <TwText className="text-gray-900 font-bold text-base">
                    CRICKET BAT
                  </TwText>
                  <TwText className="text-gray-500 text-xs mt-1">
                    Size: Standard
                  </TwText>
                </TwView>
                <TwPressable className="p-1">
                  <TrashIcon color="#ef4444" />
                </TwPressable>
              </TwView>
              <TwView className="flex-row justify-between items-end mt-2">
                <TwText className="text-gray-900 font-bold text-lg">
                  $35.00
                </TwText>

                {/* Quantity Control */}
                <TwView className="flex-row items-center bg-[#F3F4F6] rounded-lg p-1">
                  <TwPressable className="w-6 h-6 items-center justify-center rounded bg-[#E5E7EB]">
                    <MinusIcon />
                  </TwPressable>
                  <TwText className="text-gray-900 font-bold mx-3 text-sm">
                    1
                  </TwText>
                  <TwPressable className="w-6 h-6 items-center justify-center rounded bg-[#0EA5E9]">
                    <PlusIcon />
                  </TwPressable>
                </TwView>
              </TwView>
            </TwView>
          </TwView>

          {/* Item 2 */}
          <TwView className="flex-row items-center bg-[#FFFFFF] p-3 rounded-2xl mb-4">
            <TwView className="w-20 h-20 bg-[#E0F2FE] rounded-xl items-center justify-center mr-4">
              <TwText className="text-3xl">👟</TwText>
            </TwView>
            <TwView className="flex-1">
              <TwView className="flex-row justify-between items-start">
                <TwView>
                  <TwText className="text-gray-900 font-bold text-base">
                    PUMA SHOE
                  </TwText>
                  <TwText className="text-gray-500 text-xs mt-1">
                    Size: US 10
                  </TwText>
                </TwView>
                <TwPressable className="p-1">
                  <TrashIcon color="#ef4444" />
                </TwPressable>
              </TwView>
              <TwView className="flex-row justify-between items-end mt-2">
                <TwText className="text-gray-900 font-bold text-lg">
                  $35.00
                </TwText>

                {/* Quantity Control */}
                <TwView className="flex-row items-center bg-[#F3F4F6] rounded-lg p-1">
                  <TwPressable className="w-6 h-6 items-center justify-center rounded bg-[#E5E7EB]">
                    <MinusIcon />
                  </TwPressable>
                  <TwText className="text-gray-900 font-bold mx-3 text-sm">
                    1
                  </TwText>
                  <TwPressable className="w-6 h-6 items-center justify-center rounded bg-[#0EA5E9]">
                    <PlusIcon />
                  </TwPressable>
                </TwView>
              </TwView>
            </TwView>
          </TwView>
        </TwView>

        {/* Promo Code */}
        <TwView className="flex-row items-center bg-[#FFFFFF] h-14 rounded-xl px-4 mt-4 border border-dashed border-gray-300">
          <Svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0EA5E9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <Line x1="7" y1="7" x2="7.01" y2="7" />
          </Svg>
          <TwTextInput
            className="flex-1 text-gray-900 mx-3 h-full"
            placeholder="Apply Promo Code"
            placeholderTextColor="#9CA3AF"
          />
          <TwPressable>
            <TwText className="text-[#0EA5E9] font-bold">Apply</TwText>
          </TwPressable>
        </TwView>

        {/* Order Info */}
        <TwView className="bg-[#FFFFFF] rounded-2xl p-5 mt-6 mb-4">
          <TwView className="flex-row justify-between mb-3">
            <TwText className="text-gray-500 font-medium">Subtotal</TwText>
            <TwText className="text-gray-900 font-bold">$70.00</TwText>
          </TwView>

          <TwView className="flex-row justify-between mb-3">
            <TwText className="text-gray-500 font-medium">Delivery Fee</TwText>
            <TwText className="text-gray-900 font-bold">$5.00</TwText>
          </TwView>

          <TwView className="flex-row justify-between mb-4">
            <TwText className="text-gray-500 font-medium">
              Discount (20%)
            </TwText>
            <TwText className="text-green-500 font-bold">-$14.00</TwText>
          </TwView>

          <TwView className="h-[1px] bg-gray-200 mb-4" />

          <TwView className="flex-row justify-between items-center">
            <TwText className="text-gray-900 font-bold text-lg">Total</TwText>
            <TwText className="text-gray-900 font-bold text-2xl">$61.00</TwText>
          </TwView>
        </TwView>
      </TwScrollView>

      {/* Checkout Button */}
      <TwView className="px-6 pb-6 pt-2">
        <TwPressable className="bg-[#0EA5E9] w-full h-14 rounded-xl flex-row items-center justify-between px-6 shadow-lg shadow-[#0EA5E9]/30">
          <TwText className="text-gray-900 font-bold text-lg">Checkout</TwText>
          <TwText className="text-gray-900 font-bold text-lg">$61.00</TwText>
        </TwPressable>
      </TwView>
    </TwSafeAreaView>
  );
}
