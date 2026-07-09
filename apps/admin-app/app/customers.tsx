import React from 'react';
import { View, ScrollView, StatusBar, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Phone, Calendar, ShoppingBag, IndianRupee } from 'lucide-react-native';
import { View as TwView, Text as TwText, Pressable as TwPressable } from '../src/tw';
import { useRouter } from 'expo-router';

const CustomerCard = ({ name, initials, bg, phone, joined, orders, spent }: any) => (
  <TwView className="bg-[#15171E] rounded-2xl p-4 mb-4 border border-[#22252D]">
    <TwView className="flex-row items-center mb-4 border-b border-[#22252D] pb-4">
      <TwView className="w-12 h-12 rounded-full items-center justify-center mr-4" style={{ backgroundColor: bg }}>
        <TwText className="text-white font-bold text-lg">{initials}</TwText>
      </TwView>
      <TwView className="flex-1">
        <TwText className="text-white font-bold text-base mb-1">{name}</TwText>
        <TwView className="flex-row items-center">
          <Phone color="#6B7280" size={12} />
          <TwText className="text-gray-400 text-xs ml-1 mr-3">{phone}</TwText>
          <Calendar color="#6B7280" size={12} />
          <TwText className="text-gray-400 text-xs ml-1">Joined: {joined}</TwText>
        </TwView>
      </TwView>
    </TwView>
    
    <TwView className="flex-row justify-between px-2">
      <TwView className="items-center">
        <TwView className="flex-row items-center mb-1">
          <ShoppingBag color="#FF6B00" size={14} />
          <TwText className="text-gray-400 text-xs ml-1">Total Orders</TwText>
        </TwView>
        <TwText className="text-white font-bold">{orders}</TwText>
      </TwView>
      <TwView className="w-[1px] h-full bg-[#22252D]" />
      <TwView className="items-center">
        <TwView className="flex-row items-center mb-1">
          <IndianRupee color="#10B981" size={14} />
          <TwText className="text-gray-400 text-xs ml-1">Total Spent</TwText>
        </TwView>
        <TwText className="text-white font-bold">{spent}</TwText>
      </TwView>
    </TwView>
  </TwView>
);

export default function CustomersScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A0D14' }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Header */}
      <TwView className="flex-row items-center justify-between px-6 py-4">
        <TwPressable onPress={() => router.back()}>
          <ArrowLeft color="white" size={24} />
        </TwPressable>
        <TwText className="text-white text-lg font-bold">Customers</TwText>
        <TwPressable>
          <Search color="white" size={24} />
        </TwPressable>
      </TwView>

      {/* Search Bar */}
      <TwView className="px-6 py-2 pb-4 border-b border-[#22252D]">
        <TwView className="flex-row items-center bg-[#15171E] rounded-xl w-full h-12 px-4 border border-[#22252D]">
          <Search color="#6B7280" size={20} />
          <TextInput 
            placeholder="Search customers..."
            placeholderTextColor="#6B7280"
            style={{ flex: 1, color: 'white', marginLeft: 8, fontSize: 14 }}
          />
        </TwView>
      </TwView>

      <ScrollView contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
        <CustomerCard 
          name="Rahul Sharma" 
          initials="R" 
          bg="#9A4D1A" 
          phone="+91 9876543210" 
          joined="5 May 2025" 
          orders="12" 
          spent="₹45,200" 
        />
        <CustomerCard 
          name="Vivek Kumar" 
          initials="V" 
          bg="#1E3A8A" 
          phone="+91 9876543211" 
          joined="20 Apr 2025" 
          orders="8" 
          spent="₹28,500" 
        />
        <CustomerCard 
          name="MS Dhoni" 
          initials="M" 
          bg="#927110" 
          phone="+91 9876543212" 
          joined="15 Mar 2025" 
          orders="24" 
          spent="₹1,12,400" 
        />
        <CustomerCard 
          name="Rohit Das" 
          initials="R" 
          bg="#4C1D95" 
          phone="+91 9876543213" 
          joined="10 Feb 2025" 
          orders="5" 
          spent="₹14,900" 
        />
        <CustomerCard 
          name="Arjun Mehta" 
          initials="A" 
          bg="#065F46" 
          phone="+91 9876543214" 
          joined="1 Jan 2025" 
          orders="3" 
          spent="₹6,200" 
        />
      </ScrollView>
    </SafeAreaView>
  );
}
