import React, { useState } from 'react';
import { View, ScrollView, StatusBar, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, Bell, Search, Filter, ShoppingBag, Package, Truck, CheckCircle2, XCircle, ChevronRight } from 'lucide-react-native';
import { View as TwView, Text as TwText, Pressable as TwPressable } from '../../src/tw';

const OrderItem = ({ orderId, customer, date, status, price, items, icon: Icon, iconBg, statusColor }: any) => (
  <TwView className="bg-[#15171E] rounded-2xl p-4 mb-4 border border-[#22252D] flex-row items-center justify-between">
    <TwView className="flex-row items-center flex-1">
      <TwView className="w-12 h-12 rounded-xl items-center justify-center mr-4" style={{ backgroundColor: iconBg }}>
        <Icon color="white" size={24} />
      </TwView>
      <TwView>
        <TwText className="text-white font-bold text-base mb-1">{orderId}</TwText>
        <TwText className="text-gray-300 text-sm mb-1">{customer}</TwText>
        <TwText className="text-gray-500 text-xs">{date}</TwText>
      </TwView>
    </TwView>
    
    <TwView className="items-end">
      <TwView className="flex-row items-center mb-1">
        <TwText className="text-xs font-semibold mr-2" style={{ color: statusColor }}>{status}</TwText>
        <ChevronRight color="#6B7280" size={16} />
      </TwView>
      <TwText className="text-white font-bold text-sm mb-1">{price}</TwText>
      <TwText className="text-gray-500 text-xs">{items}</TwText>
    </TwView>
  </TwView>
);

export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState('All');
  
  const tabs = [
    { name: 'All', count: '1245' },
    { name: 'New', count: '298' },
    { name: 'Processing', count: '447' },
    { name: 'Shipped', count: '156' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A0D14' }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Header */}
      <TwView className="flex-row items-center justify-between px-6 py-4">
        <TwPressable onPress={() => router.push('/settings')}>
          <Menu color="white" size={24} />
        </TwPressable>
        <TwText className="text-white text-lg font-bold">Orders</TwText>
        <TwPressable onPress={() => router.push('/notifications')}>
          <Bell color="white" size={24} />
          <TwView className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full items-center justify-center">
            <TwText className="text-white text-[10px] font-bold">0</TwText>
          </TwView>
        </TwPressable>
      </TwView>

      <TwView className="px-6 py-2 flex-1">
        {/* Search Bar */}
        <TwView className="flex-row items-center justify-between mb-6">
          <TwView className="flex-row items-center bg-[#15171E] rounded-xl flex-1 h-12 px-4 border border-[#22252D] mr-4">
            <Search color="#6B7280" size={20} />
            <TextInput 
              placeholder="Search Order ID / Customer"
              placeholderTextColor="#6B7280"
              style={{ flex: 1, color: 'white', marginLeft: 8, fontSize: 14 }}
            />
          </TwView>
          <TwPressable className="w-12 h-12 bg-[#15171E] rounded-xl items-center justify-center border border-[#22252D]">
            <Filter color="white" size={20} />
          </TwPressable>
        </TwView>

        {/* Tabs */}
        <TwView className="mb-6 border-b border-[#22252D]">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tabs.map((tab) => (
              <TwPressable 
                key={tab.name}
                onPress={() => setActiveTab(tab.name)}
                className="mr-6 pb-3"
                style={activeTab === tab.name ? { borderBottomWidth: 2, borderBottomColor: '#FF6B00' } : {}}
              >
                <TwText 
                  className={activeTab === tab.name ? "text-[#FF6B00] font-bold" : "text-gray-500 font-medium"}
                >
                  {tab.name} ({tab.count})
                </TwText>
              </TwPressable>
            ))}
          </ScrollView>
        </TwView>

        {/* Orders List */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          <OrderItem 
            orderId="#SH12545" 
            customer="Rahul Sharma" 
            date="7 May 2025 | 10:30 AM" 
            status="New" 
            price="₹4,890" 
            items="3 Items" 
            icon={ShoppingBag} 
            iconBg="#9A4D1A" 
            statusColor="#10B981" 
          />
          <OrderItem 
            orderId="#SH12544" 
            customer="Vivek Kumar" 
            date="7 May 2025 | 09:15 AM" 
            status="Confirmed" 
            price="₹7,189" 
            items="5 Items" 
            icon={Package} 
            iconBg="#1E3A8A" 
            statusColor="#3B82F6" 
          />
          <OrderItem 
            orderId="#SH12543" 
            customer="MS Dhoni" 
            date="7 May 2025 | 08:40 AM" 
            status="Packed" 
            price="₹2,590" 
            items="2 Items" 
            icon={ShoppingBag} 
            iconBg="#927110" 
            statusColor="#F59E0B" 
          />
          <OrderItem 
            orderId="#SH12542" 
            customer="Rohit Das" 
            date="6 May 2025 | 07:50 PM" 
            status="Shipped" 
            price="₹6,490" 
            items="4 Items" 
            icon={Truck} 
            iconBg="#4C1D95" 
            statusColor="#8B5CF6" 
          />
          <OrderItem 
            orderId="#SH12541" 
            customer="Hardik Pandya" 
            date="6 May 2025 | 06:20 PM" 
            status="Delivered" 
            price="₹1,489" 
            items="1 Item" 
            icon={CheckCircle2} 
            iconBg="#065F46" 
            statusColor="#10B981" 
          />
          <OrderItem 
            orderId="#SH12540" 
            customer="Arjun Mehta" 
            date="6 May 2025 | 05:10 PM" 
            status="Cancelled" 
            price="₹2,999" 
            items="2 Items" 
            icon={XCircle} 
            iconBg="#7F1D1D" 
            statusColor="#EF4444" 
          />
        </ScrollView>
      </TwView>
    </SafeAreaView>
  );
}
