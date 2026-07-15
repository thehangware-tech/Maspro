import React, { useState } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Plus, Minus } from "lucide-react-native";
import {
  View as TwView,
  Text as TwText,
  Pressable as TwPressable,
} from "../../../src/tw";
import { useRouter } from "expo-router";

export default function StockAdjustmentScreen() {
  const router = useRouter();
  const [adjustmentType, setAdjustmentType] = useState<"add" | "remove">("add");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0A0D14" }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Header */}
      <TwView className="flex-row items-center px-6 py-4 border-b border-[#22252D]">
        <TwPressable onPress={() => router.back()} className="mr-4">
          <ArrowLeft color="white" size={24} />
        </TwPressable>
        <TwText className="text-white text-lg font-bold flex-1">
          Adjust Stock
        </TwText>
      </TwView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Product Info */}
          <TwView className="bg-[#15171E] rounded-xl border border-[#22252D] p-4 mb-6">
            <TwText className="text-white font-bold text-base mb-2">
              SS Master 1000 Cricket Bat
            </TwText>
            <TwText className="text-gray-400 text-sm">SKU: SSM1000</TwText>
          </TwView>

          {/* Current Stock */}
          <TwView className="items-center mb-8">
            <TwText className="text-gray-400 text-sm mb-2">
              Current Stock
            </TwText>
            <TwText className="text-white font-bold text-4xl">25</TwText>
          </TwView>

          {/* Type of Adjustment */}
          <TwText className="text-gray-400 text-xs mb-3 font-medium">
            Adjustment Type
          </TwText>
          <TwView className="flex-row bg-[#15171E] rounded-xl p-1 mb-6 border border-[#22252D]">
            <TwPressable
              onPress={() => setAdjustmentType("add")}
              className={`flex-1 flex-row items-center justify-center py-3 rounded-lg ${adjustmentType === "add" ? "bg-[#FF6B00]" : ""}`}
            >
              <Plus
                color={adjustmentType === "add" ? "white" : "#6B7280"}
                size={18}
                className="mr-2"
              />
              <TwText
                className={`font-bold text-sm ${adjustmentType === "add" ? "text-white" : "text-gray-400"}`}
              >
                Add Stock
              </TwText>
            </TwPressable>

            <TwPressable
              onPress={() => setAdjustmentType("remove")}
              className={`flex-1 flex-row items-center justify-center py-3 rounded-lg ${adjustmentType === "remove" ? "bg-[#EF4444]" : ""}`}
            >
              <Minus
                color={adjustmentType === "remove" ? "white" : "#6B7280"}
                size={18}
                className="mr-2"
              />
              <TwText
                className={`font-bold text-sm ${adjustmentType === "remove" ? "text-white" : "text-gray-400"}`}
              >
                Remove Stock
              </TwText>
            </TwPressable>
          </TwView>

          {/* Form Fields */}
          <TwView className="mb-4">
            <TwText className="text-gray-400 text-xs mb-2 font-medium">
              Quantity
            </TwText>
            <TwView className="bg-[#15171E] rounded-xl border border-[#22252D] h-12 flex-row items-center px-4">
              <TextInput
                placeholder="0"
                placeholderTextColor="#6B7280"
                style={{ flex: 1, color: "white", fontSize: 14 }}
                keyboardType="numeric"
              />
            </TwView>
          </TwView>

          <TwView className="mb-4">
            <TwText className="text-gray-400 text-xs mb-2 font-medium">
              Reason
            </TwText>
            <TwView className="bg-[#15171E] rounded-xl border border-[#22252D] h-24 flex-row py-3 px-4">
              <TextInput
                placeholder="Enter reason for adjustment"
                placeholderTextColor="#6B7280"
                style={{
                  flex: 1,
                  color: "white",
                  fontSize: 14,
                  textAlignVertical: "top",
                }}
                multiline
              />
            </TwView>
          </TwView>
        </ScrollView>

        {/* Update Button */}
        <TwView className="absolute bottom-0 w-full px-6 py-4 bg-[#0A0D14] border-t border-[#22252D]">
          <TwPressable className="bg-[#FF6B00] rounded-xl h-12 items-center justify-center w-full">
            <TwText className="text-white font-bold text-base">
              Update Stock
            </TwText>
          </TwPressable>
        </TwView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
