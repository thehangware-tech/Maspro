import React from "react";
import { View, Text, ScrollView, Pressable, TextInput, Image } from "../src/tw";
import { ChevronLeft, ChevronDown, Plus } from "lucide-react-native";

export default function AddProductScreen() {
  return (
    <View className="flex-1 bg-[#050914]">
      {/* Header */}
      <View className="flex-row items-center px-6 pt-16 pb-4">
        <Pressable className="mr-4">
          <ChevronLeft color="#ffffff" size={24} />
        </Pressable>
        <Text className="text-gray-900 text-lg font-semibold flex-1">
          Add Product
        </Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Images Horizontal Scroll */}
        <View className="mb-6">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row py-2"
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&q=80&w=200&h=240",
              }}
              className="w-20 h-24 bg-[#161f33] rounded-xl mr-3 border border-[#1e2942]"
            />
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1593341646879-11c7512a8742?auto=format&fit=crop&q=80&w=200&h=240",
              }}
              className="w-20 h-24 bg-[#161f33] rounded-xl mr-3 border border-[#1e2942]"
            />
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1593341646698-46ba097d8c55?auto=format&fit=crop&q=80&w=200&h=240",
              }}
              className="w-20 h-24 bg-[#161f33] rounded-xl mr-3 border border-[#1e2942]"
            />

            <Pressable className="w-20 h-24 rounded-xl border border-dashed border-[#64748b] items-center justify-center bg-[#050914] mr-6">
              <Plus color="#ffffff" size={24} className="mb-1" />
              <Text className="text-[#e2e8f0] text-[10px] font-medium">
                Add Images
              </Text>
            </Pressable>
          </ScrollView>
        </View>

        {/* Form Fields */}
        <View className="mb-6">
          <Text className="text-gray-900 text-sm font-medium mb-2">
            Product Name
          </Text>
          <View className="bg-[#0e1423] border border-[#1e2942] rounded-xl h-12 px-4 justify-center mb-4">
            <TextInput
              className="text-gray-900 text-sm"
              placeholder="Enter product name"
              placeholderTextColor="#64748b"
            />
          </View>

          <Text className="text-gray-900 text-sm font-medium mb-2">
            Category
          </Text>
          <Pressable className="bg-[#0e1423] border border-[#1e2942] rounded-xl h-12 px-4 flex-row items-center justify-between mb-4">
            <Text className="text-[#64748b] text-sm">Select Category</Text>
            <ChevronDown color="#64748b" size={16} />
          </Pressable>

          <View className="flex-row justify-between mb-4">
            <View className="w-[48%]">
              <Text className="text-gray-900 text-sm font-medium mb-2">
                Brand
              </Text>
              <View className="bg-[#0e1423] border border-[#1e2942] rounded-xl h-12 px-4 justify-center">
                <TextInput
                  className="text-gray-900 text-sm"
                  placeholder="Select Brand"
                  placeholderTextColor="#64748b"
                />
              </View>
            </View>
            <View className="w-[48%]">
              <Text className="text-gray-900 text-sm font-medium mb-2">
                SKU
              </Text>
              <View className="bg-[#0e1423] border border-[#1e2942] rounded-xl h-12 px-4 justify-center">
                <TextInput
                  className="text-gray-900 text-sm"
                  placeholder="Enter SKU"
                  placeholderTextColor="#64748b"
                />
              </View>
            </View>
          </View>

          <View className="flex-row justify-between mb-4">
            <View className="w-[48%]">
              <Text className="text-gray-900 text-sm font-medium mb-2">
                Retail Price (₹)
              </Text>
              <View className="bg-[#0e1423] border border-[#1e2942] rounded-xl h-12 px-4 justify-center">
                <TextInput
                  className="text-gray-900 text-sm"
                  placeholder="0.00"
                  placeholderTextColor="#64748b"
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View className="w-[48%]">
              <Text className="text-gray-900 text-sm font-medium mb-2">
                Wholesale Price (₹)
              </Text>
              <View className="bg-[#0e1423] border border-[#1e2942] rounded-xl h-12 px-4 justify-center">
                <TextInput
                  className="text-gray-900 text-sm"
                  placeholder="0.00"
                  placeholderTextColor="#64748b"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          <View className="flex-row justify-between mb-24">
            <View className="w-[48%]">
              <Text className="text-gray-900 text-sm font-medium mb-2">
                Stock Quantity
              </Text>
              <View className="bg-[#0e1423] border border-[#1e2942] rounded-xl h-12 px-4 justify-center">
                <TextInput
                  className="text-gray-900 text-sm"
                  placeholder="0"
                  placeholderTextColor="#64748b"
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View className="w-[48%]">
              <Text className="text-gray-900 text-sm font-medium mb-2">
                Minimum Wholesale Qty
              </Text>
              <View className="bg-[#0e1423] border border-[#1e2942] rounded-xl h-12 px-4 justify-center">
                <TextInput
                  className="text-gray-900 text-sm"
                  placeholder="0"
                  placeholderTextColor="#64748b"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View className="absolute bottom-0 w-full px-6 py-6 bg-[#050914] border-t border-[#1e2942]">
        <Pressable className="bg-[#FF8C00] h-14 rounded-xl items-center justify-center">
          <Text className="text-gray-900 font-bold text-base">
            Save Product
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
