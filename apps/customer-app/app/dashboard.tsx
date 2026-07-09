import React from 'react';
import { View, Text, ScrollView, Pressable, Image } from '../src/tw';
import { Menu, Bell, Calendar, ShoppingBag, DollarSign, Users, Package, ChevronDown, Home, MoreHorizontal } from 'lucide-react-native';
import Svg, { Path, Circle } from 'react-native-svg';

export default function DashboardScreen() {
  return (
    <View className="flex-1 bg-[#050914]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-16 pb-4">
        <Pressable>
          <Menu color="#ffffff" size={24} />
        </Pressable>
        <Text className="text-white text-lg font-semibold">Dashboard</Text>
        <Pressable className="relative">
          <Bell color="#ffffff" size={24} />
          <View className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full items-center justify-center">
            <Text className="text-white text-[10px] font-bold">0</Text>
          </View>
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Greeting Section */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-white text-2xl font-bold mb-1">Hello, Admin 👋</Text>
            <Text className="text-[#94a3b8] text-sm">Here's what's happening today.</Text>
          </View>
          <Pressable className="flex-row items-center bg-[#0e1423] border border-[#1e2942] rounded-lg px-3 py-2">
            <Text className="text-[#e2e8f0] text-xs font-medium mr-2">7 May 2025</Text>
            <Calendar color="#94a3b8" size={14} />
          </Pressable>
        </View>

        {/* Summary Cards */}
        <View className="flex-row flex-wrap justify-between mb-6">
          {/* Card 1 */}
          <View className="bg-[#0e1423] border border-[#1e2942] w-[48%] rounded-2xl p-4 mb-4">
            <View className="flex-row items-center mb-4">
              <View className="bg-[#FF8C00]/20 p-2 rounded-lg mr-2">
                <ShoppingBag color="#FF8C00" size={16} />
              </View>
              <Text className="text-[#94a3b8] text-xs font-medium">Total Orders</Text>
            </View>
            <Text className="text-white text-2xl font-bold mb-2">1,245</Text>
            <Text className="text-green-500 text-xs font-medium">↑ 12.5% <Text className="text-[#64748b]">vs yesterday</Text></Text>
          </View>

          {/* Card 2 */}
          <View className="bg-[#0e1423] border border-[#1e2942] w-[48%] rounded-2xl p-4 mb-4">
            <View className="flex-row items-center mb-4">
              <View className="bg-green-500/20 p-2 rounded-lg mr-2">
                <DollarSign color="#22c55e" size={16} />
              </View>
              <Text className="text-[#94a3b8] text-xs font-medium">Revenue</Text>
            </View>
            <Text className="text-white text-2xl font-bold mb-2">₹12,45,000</Text>
            <Text className="text-green-500 text-xs font-medium">↑ 18.4% <Text className="text-[#64748b]">vs yesterday</Text></Text>
          </View>

          {/* Card 3 */}
          <View className="bg-[#0e1423] border border-[#1e2942] w-[48%] rounded-2xl p-4">
            <View className="flex-row items-center mb-4">
              <View className="bg-blue-500/20 p-2 rounded-lg mr-2">
                <Users color="#3b82f6" size={16} />
              </View>
              <Text className="text-[#94a3b8] text-xs font-medium">Customers</Text>
            </View>
            <Text className="text-white text-2xl font-bold mb-2">3,456</Text>
            <Text className="text-green-500 text-xs font-medium">↑ 9.7% <Text className="text-[#64748b]">vs yesterday</Text></Text>
          </View>

          {/* Card 4 */}
          <View className="bg-[#0e1423] border border-[#1e2942] w-[48%] rounded-2xl p-4">
            <View className="flex-row items-center mb-4">
              <View className="bg-purple-500/20 p-2 rounded-lg mr-2">
                <Package color="#a855f7" size={16} />
              </View>
              <Text className="text-[#94a3b8] text-xs font-medium">Products</Text>
            </View>
            <Text className="text-white text-2xl font-bold mb-2">982</Text>
            <Text className="text-green-500 text-xs font-medium">↑ 3.1% <Text className="text-[#64748b]">vs yesterday</Text></Text>
          </View>
        </View>

        {/* Sales Overview */}
        <View className="bg-[#0e1423] border border-[#1e2942] rounded-2xl p-4 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-base font-semibold">Sales Overview</Text>
            <Pressable className="flex-row items-center bg-[#1e2942] rounded-lg px-2 py-1">
              <Text className="text-[#e2e8f0] text-xs mr-1">This Week</Text>
              <ChevronDown color="#94a3b8" size={12} />
            </Pressable>
          </View>
          <Text className="text-white text-2xl font-bold mb-1">₹12,45,000</Text>
          <Text className="text-green-500 text-xs font-medium mb-6">↑ 18.4% <Text className="text-[#64748b]">vs last week</Text></Text>
          
          {/* Chart Placeholder */}
          <View className="flex-row h-32 mb-2">
            <View className="justify-between items-end mr-2 py-1">
              <Text className="text-[#64748b] text-[10px]">40K</Text>
              <Text className="text-[#64748b] text-[10px]">30K</Text>
              <Text className="text-[#64748b] text-[10px]">10K</Text>
              <Text className="text-[#64748b] text-[10px]">0</Text>
            </View>
            <View className="flex-1 justify-end relative">
              {/* Grid lines */}
              <View className="border-t border-[#1e2942] w-full absolute bottom-0 h-[25%]" />
              <View className="border-t border-[#1e2942] w-full absolute bottom-[25%] h-[25%]" />
              <View className="border-t border-[#1e2942] w-full absolute bottom-[50%] h-[25%]" />
              <View className="border-t border-[#1e2942] w-full absolute bottom-[75%] h-[25%]" />
              <View className="border-t border-[#1e2942] w-full absolute bottom-[100%] h-0" />
              
              <Svg height="100%" width="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <Path d="M0,80 L10,60 L20,70 L30,75 L40,65 L50,55 L60,65 L70,75 L80,50 L90,60 L100,20 L100,100 L0,100 Z" fill="#FF8C00" fillOpacity="0.1" />
                <Path d="M0,80 L10,60 L20,70 L30,75 L40,65 L50,55 L60,65 L70,75 L80,50 L90,60 L100,20" fill="none" stroke="#FF8C00" strokeWidth="2" />
                <Circle cx="10" cy="60" r="2" fill="#FF8C00" />
                <Circle cx="20" cy="70" r="2" fill="#FF8C00" />
                <Circle cx="30" cy="75" r="2" fill="#FF8C00" />
                <Circle cx="40" cy="65" r="2" fill="#FF8C00" />
                <Circle cx="50" cy="55" r="2" fill="#FF8C00" />
                <Circle cx="60" cy="65" r="2" fill="#FF8C00" />
                <Circle cx="70" cy="75" r="2" fill="#FF8C00" />
                <Circle cx="80" cy="50" r="2" fill="#FF8C00" />
                <Circle cx="90" cy="60" r="2" fill="#FF8C00" />
                <Circle cx="100" cy="20" r="2" fill="#FF8C00" />
              </Svg>
            </View>
          </View>
          <View className="flex-row justify-between pl-8">
            <Text className="text-[#64748b] text-[10px]">01 May</Text>
            <Text className="text-[#64748b] text-[10px]">03 May</Text>
            <Text className="text-[#64748b] text-[10px]">05 May</Text>
            <Text className="text-[#64748b] text-[10px]">07 May</Text>
          </View>
        </View>

        {/* Top Selling Product */}
        <View className="bg-[#0e1423] border border-[#1e2942] rounded-2xl p-4 mb-24">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-base font-semibold">Top Selling Product</Text>
            <Text className="text-blue-500 text-xs font-medium">View All</Text>
          </View>
          <View className="flex-row items-center">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100&q=80' }} 
              className="w-12 h-12 rounded-lg mr-4" 
            />
            <View className="flex-1">
              <Text className="text-white font-medium">Nike Air Zoom Pegasus 40</Text>
              <Text className="text-[#94a3b8] text-xs">289 Sold</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Tab Bar Placeholder */}
      <View className="absolute bottom-0 w-full bg-[#0e1423] border-t border-[#1e2942] flex-row justify-between items-center py-4 px-8 pb-8">
        <Pressable className="items-center">
          <Home color="#FF8C00" size={24} />
          <Text className="text-[#FF8C00] text-[10px] mt-1 font-medium">Dashboard</Text>
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
          <MoreHorizontal color="#64748b" size={24} />
          <Text className="text-[#64748b] text-[10px] mt-1 font-medium">More</Text>
        </Pressable>
      </View>
    </View>
  );
}
