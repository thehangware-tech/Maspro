import React from "react";
import { View, Text, ScrollView, Pressable, TextInput } from "../src/tw";
import { Image } from "react-native";
import {
  Menu,
  Search,
  Filter,
  Home,
  ShoppingBag,
  Package,
  MoreHorizontal,
  ScanLine,
  RefreshCw,
} from "lucide-react-native";

const lowStockProducts = [
  {
    name: "SS Master 1000 Cricket Bat",
    stock: 5,
    image:
      "https://images.unsplash.com/photo-1593341646782-e0be42c30084?w=150&h=150&fit=crop&q=80",
  },
  {
    name: "Nike Air Zoom Pegasus 40",
    stock: 6,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop&q=80",
  },
  {
    name: "Nivia Storm Football",
    stock: 7,
    image:
      "https://images.unsplash.com/photo-1614632537190-23e4146777db?w=150&h=150&fit=crop&q=80",
  },
  {
    name: "Yonex Astrox 99",
    stock: 8,
    image:
      "https://images.unsplash.com/photo-1622279457486-640c5eaeb1eb?w=150&h=150&fit=crop&q=80",
  },
  {
    name: "SG Club Helmet",
    stock: 9,
    image:
      "https://images.unsplash.com/photo-1558634360-61b7fcf7c7c9?w=150&h=150&fit=crop&q=80",
  },
];

export default function InventoryScreen() {
  return (
    <View className="flex-1 bg-[#050914]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-16 pb-4">
        <Pressable>
          <Menu color="#ffffff" size={24} />
        </Pressable>
        <Text className="text-gray-900 text-lg font-semibold">Inventory</Text>
        <Pressable className="relative">
          <ScanLine color="#ffffff" size={24} />
          <View className="absolute top-0 right-0 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-[#050914]" />
        </Pressable>
      </View>

      {/* Search Bar */}
      <View className="flex-row px-6 mb-4">
        <View className="flex-1 bg-[#0e1423] border border-[#1e2942] rounded-xl flex-row items-center px-4 h-12 mr-3">
          <Search color="#64748b" size={18} />
          <TextInput
            className="flex-1 text-gray-900 ml-2 text-sm"
            placeholder="Search product..."
            placeholderTextColor="#64748b"
          />
        </View>
        <Pressable className="bg-[#0e1423] border border-[#1e2942] w-12 h-12 rounded-xl items-center justify-center">
          <Filter color="#94a3b8" size={20} />
        </Pressable>
      </View>

      {/* Summary Cards */}
      <View className="px-6 mb-6">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row"
        >
          <View className="bg-[#0e1423] border border-[#1e2942] rounded-xl p-4 mr-3 min-w-[110px]">
            <Text className="text-[#38BDF8] text-xs font-semibold mb-2">
              Total Products
            </Text>
            <Text className="text-gray-900 text-xl font-bold">982</Text>
          </View>
          <View className="bg-[#0e1423] border border-[#1e2942] rounded-xl p-4 mr-3 min-w-[110px]">
            <Text className="text-[#f97316] text-xs font-semibold mb-2">
              Low Stock
            </Text>
            <Text className="text-gray-900 text-xl font-bold">128</Text>
          </View>
          <View className="bg-[#0e1423] border border-[#1e2942] rounded-xl p-4 mr-6 min-w-[110px]">
            <Text className="text-[#ef4444] text-xs font-semibold mb-2">
              Out of Stock
            </Text>
            <Text className="text-gray-900 text-xl font-bold">24</Text>
          </View>
        </ScrollView>
      </View>

      {/* Low Stock Products */}
      <ScrollView
        className="flex-1 px-6 mb-32"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-900 text-base font-semibold">
            Low Stock Products
          </Text>
          <Text className="text-blue-500 text-xs font-medium">View All</Text>
        </View>

        {lowStockProducts.map((product, index) => (
          <View key={index} className="flex-row items-center mb-4">
            <Image
              source={{ uri: product.image }}
              className="w-14 h-14 bg-[#161f33] rounded-xl mr-4 border border-[#1e2942]"
              resizeMode="cover"
            />
            <View className="flex-1">
              <Text className="text-gray-900 font-medium text-sm mb-1">
                {product.name}
              </Text>
              <Text className="text-[#94a3b8] text-xs">
                Stock: {product.stock}
              </Text>
            </View>
            <View className="bg-red-500/10 px-3 py-1.5 rounded-md">
              <Text className="text-red-500 text-xs font-medium">Low</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Stock Adjustment Button */}
      <View className="absolute bottom-[90px] w-full px-6">
        <Pressable className="bg-[#0EA5E9] h-14 rounded-xl flex-row items-center justify-center shadow-lg">
          <RefreshCw color="#ffffff" size={18} className="mr-2" />
          <Text className="text-gray-900 font-bold text-base">
            Stock Adjustment
          </Text>
        </Pressable>
      </View>

      {/* Tab Bar Placeholder */}
      <View className="absolute bottom-0 w-full bg-[#0e1423] border-t border-[#1e2942] flex-row justify-between items-center py-4 px-8 pb-8">
        <Pressable className="items-center">
          <Home color="#64748b" size={24} />
          <Text className="text-[#64748b] text-[10px] mt-1 font-medium">
            Dashboard
          </Text>
        </Pressable>
        <Pressable className="items-center">
          <ShoppingBag color="#64748b" size={24} />
          <Text className="text-[#64748b] text-[10px] mt-1 font-medium">
            Orders
          </Text>
        </Pressable>
        <Pressable className="items-center">
          <Package color="#FF8C00" size={24} />
          <Text className="text-[#FF8C00] text-[10px] mt-1 font-medium">
            Products
          </Text>
        </Pressable>
        <Pressable className="items-center">
          <MoreHorizontal color="#64748b" size={24} />
          <Text className="text-[#64748b] text-[10px] mt-1 font-medium">
            More
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
