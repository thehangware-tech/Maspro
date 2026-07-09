import React from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Image } from '../src/tw';
import { Menu, Search, Filter, Home, ShoppingBag, Package, MoreHorizontal, ChevronRight, Plus, RefreshCw } from 'lucide-react-native';

const products = [
  { name: 'SS Master 1000 Cricket Bat', sku: 'BAT1000', stock: 25, price: '₹2,999', icon: RefreshCw, iconColor: '#f97316', image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=200&h=200&fit=crop' },
  { name: 'Nike Air Zoom Pegasus 40', sku: 'SHOE2001', stock: 36, price: '₹6,499', icon: ChevronRight, iconColor: '#64748b', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop' },
  { name: 'Nivia Storm Football', sku: 'FB1001', stock: 40, price: '₹1,899', icon: ChevronRight, iconColor: '#64748b', image: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?w=200&h=200&fit=crop' },
  { name: 'Yonex Astrox 99', sku: 'BN1002', stock: 28, price: '₹1,899', icon: ChevronRight, iconColor: '#64748b', image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=200&h=200&fit=crop' },
  { name: 'SG Club Helmet', sku: 'HM5001', stock: 19, price: '₹1,199', icon: ChevronRight, iconColor: '#64748b', image: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=200&h=200&fit=crop' },
];

export default function ProductsScreen() {
  return (
    <View className="flex-1 bg-[#050914]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-16 pb-4">
        <Pressable>
          <Menu color="#ffffff" size={24} />
        </Pressable>
        <Text className="text-white text-lg font-semibold">Products</Text>
        <View style={{ width: 24 }} /> {/* Empty placeholder for alignment */}
      </View>

      {/* Search Bar */}
      <View className="flex-row px-6 mb-4">
        <View className="flex-1 bg-[#0e1423] border border-[#1e2942] rounded-xl flex-row items-center px-4 h-12 mr-3">
          <Search color="#64748b" size={18} />
          <TextInput 
            className="flex-1 text-white ml-2 text-sm"
            placeholder="Search products..."
            placeholderTextColor="#64748b"
          />
        </View>
        <Pressable className="bg-[#0e1423] border border-[#1e2942] w-12 h-12 rounded-xl items-center justify-center">
          <Filter color="#94a3b8" size={20} />
        </Pressable>
      </View>

      {/* Tabs */}
      <View className="px-6 mb-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
          <View className="mr-6 border-b-2 border-[#FF8C00] pb-2">
            <Text className="text-[#FF8C00] font-semibold text-sm">All (982)</Text>
          </View>
          <View className="mr-6 pb-2">
            <Text className="text-[#94a3b8] font-medium text-sm">In Stock</Text>
          </View>
          <View className="mr-6 pb-2">
            <Text className="text-[#94a3b8] font-medium text-sm">Low Stock</Text>
          </View>
          <View className="mr-6 pb-2">
            <Text className="text-[#94a3b8] font-medium text-sm">Out of Stock</Text>
          </View>
        </ScrollView>
      </View>

      {/* Product List */}
      <ScrollView className="flex-1 px-6 mb-24" showsVerticalScrollIndicator={false}>
        {products.map((product, index) => (
          <View key={index} className="bg-[#0e1423] border border-[#1e2942] rounded-2xl p-4 flex-row mb-4">
            {/* Product Image */}
            <View className="w-16 h-16 bg-[#161f33] rounded-xl mr-4 justify-center items-center overflow-hidden">
              <Image source={{ uri: product.image }} className="w-14 h-14 rounded-lg" resizeMode="contain" />
            </View>
            <View className="flex-1 justify-center">
              <View className="flex-row justify-between items-start mb-1">
                <Text className="text-white font-semibold text-sm flex-1 mr-2">{product.name}</Text>
                <product.icon color={product.iconColor} size={16} />
              </View>
              <Text className="text-[#94a3b8] text-xs mb-1">SKU: {product.sku}</Text>
              <View className="flex-row justify-between items-end">
                <Text className="text-[#94a3b8] text-xs">Stock: {product.stock}</Text>
                <Text className="text-white font-bold">{product.price}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* FAB */}
      <Pressable className="absolute bottom-28 right-6 bg-[#FF8C00] w-14 h-14 rounded-full items-center justify-center shadow-lg">
        <Plus color="#ffffff" size={28} />
      </Pressable>

      {/* Tab Bar Placeholder */}
      <View className="absolute bottom-0 w-full bg-[#0e1423] border-t border-[#1e2942] flex-row justify-between items-center py-4 px-8 pb-8">
        <Pressable className="items-center">
          <Home color="#64748b" size={24} />
          <Text className="text-[#64748b] text-[10px] mt-1 font-medium">Dashboard</Text>
        </Pressable>
        <Pressable className="items-center">
          <ShoppingBag color="#64748b" size={24} />
          <Text className="text-[#64748b] text-[10px] mt-1 font-medium">Orders</Text>
        </Pressable>
        <Pressable className="items-center">
          <Package color="#FF8C00" size={24} />
          <Text className="text-[#FF8C00] text-[10px] mt-1 font-medium">Products</Text>
        </Pressable>
        <Pressable className="items-center">
          <MoreHorizontal color="#64748b" size={24} />
          <Text className="text-[#64748b] text-[10px] mt-1 font-medium">More</Text>
        </Pressable>
      </View>
    </View>
  );
}
