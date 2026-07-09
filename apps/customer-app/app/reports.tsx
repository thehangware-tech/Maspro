import React from 'react';
import { View, Text, ScrollView, Pressable } from '../src/tw';
import { ChevronLeft, Filter, ChevronDown, Home, ClipboardList, Package, List } from 'lucide-react-native';
import Svg, { Rect, Line, Text as SvgText } from 'react-native-svg';

export default function ReportsScreen() {
  return (
    <View className="flex-1 bg-[#050914]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-16 pb-4">
        <Pressable>
          <ChevronLeft color="#ffffff" size={24} />
        </Pressable>
        <Text className="text-white text-lg font-semibold">Reports</Text>
        <Pressable>
          <Filter color="#ffffff" size={20} />
        </Pressable>
      </View>

      {/* Tabs */}
      <View className="px-6 mb-6">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
          <Pressable className="bg-[#FF8C00] px-4 py-2 rounded-lg mr-3">
            <Text className="text-white font-semibold text-sm">Sales</Text>
          </Pressable>
          <Pressable className="bg-[#0e1423] border border-[#1e2942] px-4 py-2 rounded-lg mr-3">
            <Text className="text-[#94a3b8] font-medium text-sm">Orders</Text>
          </Pressable>
          <Pressable className="bg-[#0e1423] border border-[#1e2942] px-4 py-2 rounded-lg mr-3">
            <Text className="text-[#94a3b8] font-medium text-sm">Inventory</Text>
          </Pressable>
          <Pressable className="bg-[#0e1423] border border-[#1e2942] px-4 py-2 rounded-lg mr-3">
            <Text className="text-[#94a3b8] font-medium text-sm">Customers</Text>
          </Pressable>
        </ScrollView>
      </View>

      <ScrollView className="flex-1 px-6 mb-24" showsVerticalScrollIndicator={false}>
        {/* Main Chart Section */}
        <View className="bg-[#0e1423] border border-[#1e2942] rounded-2xl p-4 mb-6">
          <View className="flex-row justify-end mb-2">
            <Pressable className="flex-row items-center bg-[#1e2942] rounded-lg px-2 py-1">
              <Text className="text-[#e2e8f0] text-xs mr-1">This Month</Text>
              <ChevronDown color="#94a3b8" size={12} />
            </Pressable>
          </View>
          
          <Text className="text-[#e2e8f0] text-xs font-medium mb-1">Total Revenue</Text>
          <Text className="text-white text-3xl font-bold mb-1">₹12,45,000</Text>
          <Text className="text-green-500 text-xs font-medium mb-6">↑ 18.4% <Text className="text-[#64748b]">vs last month</Text></Text>

          {/* Bar Chart Placeholder */}
          <View className="h-40 justify-end mb-2 relative">
            <View className="absolute inset-0 flex justify-between pb-6">
              <View className="flex-row items-center">
                <Text className="text-[#64748b] text-[10px] w-8">40K</Text>
                <View className="flex-1 border-t border-[#1e2942] ml-2" />
              </View>
              <View className="flex-row items-center">
                <Text className="text-[#64748b] text-[10px] w-8">30K</Text>
                <View className="flex-1 border-t border-[#1e2942] ml-2" />
              </View>
              <View className="flex-row items-center">
                <Text className="text-[#64748b] text-[10px] w-8">20K</Text>
                <View className="flex-1 border-t border-[#1e2942] ml-2" />
              </View>
              <View className="flex-row items-center">
                <Text className="text-[#64748b] text-[10px] w-8">10K</Text>
                <View className="flex-1 border-t border-[#1e2942] ml-2" />
              </View>
              <View className="flex-row items-center">
                <Text className="text-[#64748b] text-[10px] w-8">0</Text>
                <View className="flex-1 border-t border-[#1e2942] ml-2" />
              </View>
            </View>

            <View className="flex-row justify-between items-end h-[100px] ml-10 mr-2 z-10 pb-2">
              <View className="w-2 bg-[#a855f7] h-[60%] rounded-t-sm" />
              <View className="w-2 bg-[#a855f7] h-[40%] rounded-t-sm" />
              <View className="w-2 bg-[#a855f7] h-[20%] rounded-t-sm" />
              <View className="w-2 bg-[#a855f7] h-[75%] rounded-t-sm" />
              <View className="w-2 bg-[#a855f7] h-[30%] rounded-t-sm" />
              <View className="w-2 bg-[#a855f7] h-[55%] rounded-t-sm" />
              <View className="w-2 bg-[#a855f7] h-[100%] rounded-t-sm" />
              <View className="w-2 bg-[#a855f7] h-[30%] rounded-t-sm" />
              <View className="w-2 bg-[#a855f7] h-[55%] rounded-t-sm" />
              <View className="w-2 bg-[#a855f7] h-[35%] rounded-t-sm" />
              <View className="w-2 bg-[#a855f7] h-[85%] rounded-t-sm" />
              <View className="w-2 bg-[#a855f7] h-[25%] rounded-t-sm" />
              <View className="w-2 bg-[#a855f7] h-[75%] rounded-t-sm" />
              <View className="w-2 bg-[#a855f7] h-[35%] rounded-t-sm" />
              <View className="w-2 bg-[#a855f7] h-[15%] rounded-t-sm" />
              <View className="w-2 bg-[#a855f7] h-[60%] rounded-t-sm" />
              <View className="w-2 bg-[#a855f7] h-[25%] rounded-t-sm" />
            </View>
            <View className="flex-row justify-between ml-10 mr-2 mt-2">
              <Text className="text-[#64748b] text-[10px]">1 May</Text>
              <Text className="text-[#64748b] text-[10px]">8 May</Text>
              <Text className="text-[#64748b] text-[10px]">15 May</Text>
              <Text className="text-[#64748b] text-[10px]">22 May</Text>
              <Text className="text-[#64748b] text-[10px]">29 May</Text>
            </View>
          </View>
        </View>

        {/* Summary Section */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-white text-base font-semibold">Summary</Text>
          <Text className="text-blue-500 text-xs font-medium">View All</Text>
        </View>

        <View className="flex-row flex-wrap justify-between">
          <View className="bg-[#0e1423] border border-[#1e2942] w-[48%] rounded-2xl p-4 mb-4">
            <Text className="text-[#94a3b8] text-xs font-medium mb-2">Total Orders</Text>
            <Text className="text-white text-xl font-bold mb-1">1,245</Text>
            <Text className="text-green-500 text-xs font-medium">↑ 12.5%</Text>
          </View>
          <View className="bg-[#0e1423] border border-[#1e2942] w-[48%] rounded-2xl p-4 mb-4">
            <Text className="text-[#94a3b8] text-xs font-medium mb-2">Avg. Order Value</Text>
            <Text className="text-white text-xl font-bold mb-1">₹1,245</Text>
            <Text className="text-green-500 text-xs font-medium">↑ 8.6%</Text>
          </View>
          <View className="bg-[#0e1423] border border-[#1e2942] w-[48%] rounded-2xl p-4 mb-4">
            <Text className="text-[#94a3b8] text-xs font-medium mb-2">Total Customers</Text>
            <Text className="text-white text-xl font-bold mb-1">3,456</Text>
            <Text className="text-green-500 text-xs font-medium">↑ 9.7%</Text>
          </View>
          <View className="bg-[#0e1423] border border-[#1e2942] w-[48%] rounded-2xl p-4 mb-4">
            <Text className="text-[#94a3b8] text-xs font-medium mb-2">New Customers</Text>
            <Text className="text-white text-xl font-bold mb-1">456</Text>
            <Text className="text-green-500 text-xs font-medium">↑ 11.2%</Text>
          </View>
        </View>

      </ScrollView>

      {/* Tab Bar Placeholder */}
      <View className="absolute bottom-0 w-full bg-[#0e1423] border-t border-[#1e2942] flex-row justify-between items-center py-4 px-8 pb-8">
        <Pressable className="items-center">
          <Home color="#64748b" size={24} />
          <Text className="text-[#64748b] text-[10px] mt-1 font-medium">Dashboard</Text>
        </Pressable>
        <Pressable className="items-center">
          <ClipboardList color="#64748b" size={24} />
          <Text className="text-[#64748b] text-[10px] mt-1 font-medium">Orders</Text>
        </Pressable>
        <Pressable className="items-center">
          <Package color="#64748b" size={24} />
          <Text className="text-[#64748b] text-[10px] mt-1 font-medium">Products</Text>
        </Pressable>
        <Pressable className="items-center">
          <List color="#FF8C00" size={24} />
          <Text className="text-[#FF8C00] text-[10px] mt-1 font-medium">More</Text>
        </Pressable>
      </View>
    </View>
  );
}
