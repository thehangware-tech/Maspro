import React from 'react';
import { View, Text, ScrollView, Pressable, TextInput } from '../src/tw';
import { Menu, Search, Filter, Home, ShoppingBag, Package, MoreHorizontal, ChevronRight } from 'lucide-react-native';

const customers = [
  { name: 'Sports World Pvt. Ltd.', type: 'Wholesale', credit: 'Credit: ₹45,000', orders: null },
  { name: 'Game On Sports', type: 'Wholesale', credit: 'Credit: ₹22,500', orders: null },
  { name: 'Rahul Sharma', type: 'Retail', credit: null, orders: '12' },
  { name: 'Vivek Kumar', type: 'Retail', credit: null, orders: '8' },
  { name: 'Arjun Mehta', type: 'Retail', credit: null, orders: '5' },
];

export default function CustomersScreen() {
  return (
    <View className="flex-1 bg-[#050914]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-16 pb-4">
        <Pressable>
          <Menu color="#ffffff" size={24} />
        </Pressable>
        <Text className="text-white text-lg font-semibold">Customers</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Bar */}
      <View className="flex-row px-6 mb-4">
        <View className="flex-1 bg-[#0e1423] border border-[#1e2942] rounded-xl flex-row items-center px-4 h-12 mr-3">
          <Search color="#64748b" size={18} />
          <TextInput 
            className="flex-1 text-white ml-2 text-sm"
            placeholder="Search customer..."
            placeholderTextColor="#64748b"
          />
        </View>
        <Pressable className="bg-[#0e1423] border border-[#1e2942] w-12 h-12 rounded-xl items-center justify-center">
          <Filter color="#94a3b8" size={20} />
        </Pressable>
      </View>

      {/* Tabs */}
      <View className="px-6 mb-6">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
          <View className="mr-6 border-b-2 border-[#FF8C00] pb-2">
            <Text className="text-[#FF8C00] font-semibold text-sm">All (3456)</Text>
          </View>
          <View className="mr-6 pb-2">
            <Text className="text-[#94a3b8] font-medium text-sm">Retail (2745)</Text>
          </View>
          <View className="mr-6 pb-2">
            <Text className="text-[#94a3b8] font-medium text-sm">Wholesale (711)</Text>
          </View>
        </ScrollView>
      </View>

      {/* Customer List */}
      <ScrollView className="flex-1 px-6 mb-24" showsVerticalScrollIndicator={false}>
        {customers.map((customer, index) => (
          <View key={index} className="bg-[#0e1423] border border-[#1e2942] rounded-2xl p-4 flex-row items-center mb-4">
            <View className="w-12 h-12 bg-[#161f33] rounded-full mr-4 border border-[#1e2942]"></View>
            <View className="flex-1">
              <Text className="text-white font-medium text-sm mb-1">{customer.name}</Text>
              <Text className="text-[#94a3b8] text-xs">{customer.type}</Text>
            </View>
            
            <View className="items-end justify-center">
              {customer.credit ? (
                <View className="bg-green-500/10 px-3 py-1 rounded-md">
                  <Text className="text-green-500 text-xs font-medium">{customer.credit}</Text>
                </View>
              ) : (
                <>
                  <ChevronRight color="#64748b" size={16} className="mb-1" />
                  <Text className="text-[#94a3b8] text-xs">Orders: {customer.orders}</Text>
                </>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

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
          <Package color="#64748b" size={24} />
          <Text className="text-[#64748b] text-[10px] mt-1 font-medium">Products</Text>
        </Pressable>
        <Pressable className="items-center">
          <MoreHorizontal color="#FF8C00" size={24} />
          <Text className="text-[#FF8C00] text-[10px] mt-1 font-medium">More</Text>
        </Pressable>
      </View>
    </View>
  );
}
