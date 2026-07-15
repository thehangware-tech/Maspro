import React from "react";
import { View, ScrollView, StatusBar, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, MoreVertical } from "lucide-react-native";
import {
  View as TwView,
  Text as TwText,
  Pressable as TwPressable,
} from "../../../src/tw";
import { useRouter } from "expo-router";

export default function ProductDetailsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0A0D14" }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Header */}
      <TwView className="flex-row items-center justify-between px-6 py-4 border-b border-[#22252D]">
        <TwPressable onPress={() => router.back()}>
          <ArrowLeft color="white" size={24} />
        </TwPressable>
        <TwText className="text-white text-lg font-bold">
          Product Details
        </TwText>
        <TwPressable>
          <MoreVertical color="white" size={24} />
        </TwPressable>
      </TwView>

      <ScrollView
        contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Info Row */}
        <TwView className="flex-row mb-8">
          {/* Image */}
          <TwView className="w-1/3 aspect-[3/4] bg-[#15171E] rounded-xl border border-[#22252D] items-center justify-center overflow-hidden mr-4">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300",
              }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </TwView>

          {/* Details */}
          <TwView className="flex-1 justify-center">
            <TwText className="text-white font-bold text-base mb-2">
              SS Master 1000 Cricket Bat
            </TwText>

            <TwView className="bg-[#10B981]/20 self-start px-2 py-1 rounded mb-3">
              <TwText className="text-[#10B981] text-xs font-bold">
                In Stock
              </TwText>
            </TwView>

            <TwText className="text-white font-bold text-2xl mb-4">
              ₹2,999
            </TwText>

            <TwText className="text-gray-400 text-xs mb-1">SKU: SSM1000</TwText>
            <TwText className="text-gray-400 text-xs mb-1">Brand: SS</TwText>
            <TwText className="text-gray-400 text-xs">Category: Cricket</TwText>
          </TwView>
        </TwView>

        {/* Stats Row */}
        <TwView className="flex-row bg-[#15171E] rounded-2xl p-4 mb-8 border border-[#22252D] justify-between">
          <TwView className="items-center flex-1">
            <TwText className="text-gray-400 text-xs font-medium mb-1">
              Stock Quantity
            </TwText>
            <TwText className="text-white font-bold text-xl">25</TwText>
          </TwView>
          <TwView className="w-[1px] h-full bg-[#22252D]" />
          <TwView className="items-center flex-1">
            <TwText className="text-gray-400 text-xs font-medium mb-1">
              Sold
            </TwText>
            <TwText className="text-white font-bold text-xl">289</TwText>
          </TwView>
          <TwView className="w-[1px] h-full bg-[#22252D]" />
          <TwView className="items-center flex-1">
            <TwText className="text-gray-400 text-xs font-medium mb-1">
              Views
            </TwText>
            <TwText className="text-white font-bold text-xl">1,256</TwText>
          </TwView>
        </TwView>

        {/* Description */}
        <TwView className="mb-8">
          <TwText className="text-white font-bold text-sm mb-2">
            Description
          </TwText>
          <TwText className="text-gray-400 text-sm leading-6">
            Premium quality English willow bat with excellent balance and power.
            Ideal for professional players.
          </TwText>
        </TwView>
      </ScrollView>

      {/* Bottom Actions */}
      <TwView className="absolute bottom-0 w-full flex-row px-6 py-4 bg-[#0A0D14] border-t border-[#22252D] space-x-4 gap-x-4">
        <TwPressable
          className="flex-1 rounded-xl h-12 items-center justify-center border border-[#FF6B00]"
          onPress={() => router.push("/products/123/edit")}
        >
          <TwText className="text-[#FF6B00] font-bold text-base">Edit</TwText>
        </TwPressable>
        <TwPressable
          className="flex-1 rounded-xl h-12 items-center justify-center border border-[#EF4444]"
          onPress={() => router.back()}
        >
          <TwText className="text-[#EF4444] font-bold text-base">Delete</TwText>
        </TwPressable>
      </TwView>
    </SafeAreaView>
  );
}
