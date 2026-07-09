import React from 'react';
import { View, ScrollView, StatusBar, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, Bell, Calendar as CalendarIcon, ShoppingBag, Banknote, Users, Package, ChevronDown } from 'lucide-react-native';
import Svg, { Path, Polyline, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { View as TwView, Text as TwText, Pressable as TwPressable } from '../../src/tw';

const HeaderLogo = () => (
  <TwView className="flex-row items-center justify-center">
    <TwView className="mr-2">
      <Svg width="24" height="24" viewBox="0 0 40 40" fill="none">
        <Path d="M8 30 L15 15 L20 25 L28 10 L35 30" stroke="#FF6B00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <Circle cx="12" cy="10" r="3" fill="#FF6B00" />
      </Svg>
    </TwView>
    <TwView>
      <TwText className="text-white font-extrabold text-[16px] tracking-widest leading-none">MASPRO</TwText>
      <TwText className="text-[#FF6B00] font-extrabold text-[8px] tracking-widest leading-none mt-0.5">SPORTS INDIA</TwText>
    </TwView>
  </TwView>
);

const { width } = Dimensions.get('window');

const StatCard = ({ title, value, change, isPositive, icon: Icon, iconBg, onPress }: any) => (
  <TwPressable onPress={onPress} className="bg-[#15171E] rounded-2xl p-4 flex-1 border border-[#22252D]">
    <TwView className="flex-row items-center mb-3">
      <TwView className={`w-8 h-8 rounded-lg items-center justify-center mr-3`} style={{ backgroundColor: iconBg }}>
        <Icon color="white" size={16} />
      </TwView>
      <TwText className="text-gray-400 text-xs font-medium">{title}</TwText>
    </TwView>
    <TwText className="text-white text-2xl font-bold mb-2">{value}</TwText>
    <TwView className="flex-row items-center">
      <TwText className={isPositive ? "text-green-500 text-xs font-medium" : "text-red-500 text-xs font-medium"}>
        {isPositive ? '▲' : '▼'} {change}
      </TwText>
      <TwText className="text-gray-500 text-xs ml-1">vs yesterday</TwText>
    </TwView>
  </TwPressable>
);

import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A0D14' }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Header */}
      <TwView className="flex-row items-center justify-between px-6 py-4">
        <TwPressable onPress={() => router.push('/settings')}>
          <Menu color="white" size={24} />
        </TwPressable>
        <HeaderLogo />
        <TwPressable onPress={() => router.push('/notifications')}>
          <Bell color="white" size={24} />
          <TwView className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full items-center justify-center">
            <TwText className="text-white text-[10px] font-bold">0</TwText>
          </TwView>
        </TwPressable>
      </TwView>

      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 8 }} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <TwView className="flex-row justify-between items-start mb-6">
          <TwView>
            <TwText className="text-white text-xl font-bold mb-1">Hello, Admin 👋</TwText>
            <TwText className="text-gray-400 text-sm">Here's what's happening today.</TwText>
          </TwView>
          <TwView className="flex-row items-center bg-[#15171E] rounded-full px-3 py-1.5 border border-[#22252D]">
            <TwText className="text-gray-300 text-xs mr-2">7 May 2025</TwText>
            <CalendarIcon color="#6B7280" size={14} />
          </TwView>
        </TwView>

        {/* Stats Grid */}
        <TwView className="flex-row justify-between space-x-4 mb-4 gap-x-4">
          <StatCard 
            title="Total Orders" 
            value="1,245" 
            change="12.5%" 
            isPositive={true} 
            icon={ShoppingBag} 
            iconBg="#FF6B00"
            onPress={() => router.push('/(tabs)/orders')} 
          />
          <StatCard 
            title="Revenue" 
            value="₹12,45,000" 
            change="18.4%" 
            isPositive={true} 
            icon={Banknote} 
            iconBg="#10B981" 
            onPress={() => router.push('/reports')}
          />
        </TwView>
        <TwView className="flex-row justify-between space-x-4 mb-8 gap-x-4">
          <StatCard 
            title="Customers" 
            value="3,456" 
            change="9.7%" 
            isPositive={true} 
            icon={Users} 
            iconBg="#3B82F6" 
            onPress={() => router.push('/customers')}
          />
          <StatCard 
            title="Products" 
            value="982" 
            change="3.1%" 
            isPositive={false} 
            icon={Package} 
            iconBg="#8B5CF6" 
            onPress={() => router.push('/(tabs)/products')}
          />
        </TwView>

        {/* Sales Overview */}
        <TwView className="mb-8">
          <TwView className="flex-row justify-between items-center mb-6">
            <TwText className="text-white text-lg font-bold">Sales Overview</TwText>
            <TwView className="flex-row items-center bg-[#15171E] rounded-lg px-3 py-1.5 border border-[#22252D]">
              <TwText className="text-gray-300 text-xs mr-2">This Week</TwText>
              <ChevronDown color="#6B7280" size={14} />
            </TwView>
          </TwView>
          
          <TwView className="mb-6">
            <TwText className="text-white text-2xl font-bold mb-1">₹12,45,000</TwText>
            <TwView className="flex-row items-center">
              <TwText className="text-green-500 text-xs font-medium">▲ 18.4%</TwText>
              <TwText className="text-gray-500 text-xs ml-2">vs last week</TwText>
            </TwView>
          </TwView>

          <TwView className="flex-row">
            <TwView className="justify-between py-2 mr-2">
              <TwText className="text-gray-500 text-[10px]">40k</TwText>
              <TwText className="text-gray-500 text-[10px]">30k</TwText>
              <TwText className="text-gray-500 text-[10px]">20k</TwText>
              <TwText className="text-gray-500 text-[10px]">10k</TwText>
              <TwText className="text-gray-500 text-[10px]">0</TwText>
            </TwView>
            <TwView className="h-[150px] flex-1">
              <Svg width="100%" height="100%" viewBox="0 0 300 150" preserveAspectRatio="none">
                {/* Grid Lines */}
                <Path d="M0 20 L300 20" stroke="#22252D" strokeWidth="1" strokeDasharray="4 4" />
                <Path d="M0 60 L300 60" stroke="#22252D" strokeWidth="1" strokeDasharray="4 4" />
                <Path d="M0 100 L300 100" stroke="#22252D" strokeWidth="1" strokeDasharray="4 4" />
                <Path d="M0 140 L300 140" stroke="#22252D" strokeWidth="1" strokeDasharray="4 4" />
              
              {/* Chart Line */}
              <Polyline 
                points="0,130 40,80 80,100 120,110 160,80 200,100 240,50 280,60 300,20" 
                fill="none" 
                stroke="#FF6B00" 
                strokeWidth="3" 
              />
              
              {/* Data Points */}
              <Circle cx="40" cy="80" r="4" fill="#FF6B00" stroke="#0A0D14" strokeWidth="2" />
              <Circle cx="80" cy="100" r="4" fill="#FF6B00" stroke="#0A0D14" strokeWidth="2" />
              <Circle cx="120" cy="110" r="4" fill="#FF6B00" stroke="#0A0D14" strokeWidth="2" />
              <Circle cx="160" cy="80" r="4" fill="#FF6B00" stroke="#0A0D14" strokeWidth="2" />
              <Circle cx="200" cy="100" r="4" fill="#FF6B00" stroke="#0A0D14" strokeWidth="2" />
              <Circle cx="240" cy="50" r="4" fill="#FF6B00" stroke="#0A0D14" strokeWidth="2" />
              <Circle cx="280" cy="60" r="4" fill="#FF6B00" stroke="#0A0D14" strokeWidth="2" />
              <Circle cx="300" cy="20" r="4" fill="#FF6B00" stroke="#0A0D14" strokeWidth="2" />
            </Svg>
              <TwView className="flex-row justify-between mt-2 pl-4 pr-1">
                <TwText className="text-gray-500 text-[10px]">01 May</TwText>
                <TwText className="text-gray-500 text-[10px]">03 May</TwText>
                <TwText className="text-gray-500 text-[10px]">05 May</TwText>
                <TwText className="text-gray-500 text-[10px]">07 May</TwText>
              </TwView>
            </TwView>
          </TwView>
        </TwView>

        {/* Top Selling Product */}
        <TwView className="mb-4">
          <TwView className="flex-row justify-between items-center mb-4">
            <TwText className="text-white text-lg font-bold">Top Selling Product</TwText>
            <TwPressable onPress={() => router.push('/(tabs)/products')}>
              <TwText className="text-[#FF6B00] text-xs font-medium">View All</TwText>
            </TwPressable>
          </TwView>
          
          <TwView className="bg-[#15171E] rounded-2xl p-4 flex-row items-center border border-[#22252D]">
            <TwView className="w-16 h-16 bg-[#22252D] rounded-xl items-center justify-center mr-4 overflow-hidden">
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150' }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </TwView>
            <TwView className="flex-1">
              <TwText className="text-white font-bold text-base mb-1">Nike Air Zoom Pegasus 40</TwText>
              <TwText className="text-[#FF6B00] font-medium text-xs">261 Sold</TwText>
            </TwView>
          </TwView>
        </TwView>
        
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
