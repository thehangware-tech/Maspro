import React from 'react';
import { View, ScrollView, StatusBar, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Plus, Calendar, Tag, Percent } from 'lucide-react-native';
import { View as TwView, Text as TwText, Pressable as TwPressable } from '../src/tw';
import { useRouter } from 'expo-router';

const CouponCard = ({ title, code, status, validTill, minOrder, maxDiscount, type = 'percentage', amount }: any) => (
  <TwView className="bg-[#15171E] rounded-2xl p-4 mb-4 border border-[#22252D]">
    <TwView className="flex-row items-center justify-between mb-4 border-b border-[#22252D] pb-4">
      <TwView className="flex-row items-center flex-1">
        <TwView className="w-12 h-12 bg-[#FF6B00] rounded-xl items-center justify-center mr-4">
          {type === 'percentage' ? <Percent color="white" size={24} /> : <Tag color="white" size={24} />}
        </TwView>
        <TwView>
          <TwText className="text-white font-bold text-base mb-1">{title}</TwText>
          <TwView className="flex-row items-center">
            <TwText className="text-gray-400 text-xs">Discount: </TwText>
            <TwText className="text-white font-bold text-sm">{amount}</TwText>
          </TwView>
        </TwView>
      </TwView>
      <TwView className={`px-2 py-1 rounded-md ${status === 'Active' ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
        <TwText className={`text-xs font-bold ${status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>{status}</TwText>
      </TwView>
    </TwView>
    
    <TwView className="flex-row justify-between items-center px-2 mb-3">
      <TwView className="flex-row items-center">
        <TwText className="text-gray-400 text-xs mr-2">Code:</TwText>
        <TwView className="bg-[#22252D] px-2 py-1 rounded border border-[#333742] border-dashed">
          <TwText className="text-[#FF6B00] font-bold text-sm tracking-widest">{code}</TwText>
        </TwView>
      </TwView>
      <TwView className="flex-row items-center">
        <Calendar color="#6B7280" size={14} />
        <TwText className="text-gray-400 text-xs ml-1">Till: {validTill}</TwText>
      </TwView>
    </TwView>

    <TwView className="bg-[#0A0D14] rounded-lg p-3 flex-row justify-between">
      <TwView>
        <TwText className="text-gray-500 text-[10px] uppercase mb-1">Min Order</TwText>
        <TwText className="text-white font-medium text-sm">{minOrder}</TwText>
      </TwView>
      <TwView className="items-end">
        <TwText className="text-gray-500 text-[10px] uppercase mb-1">Max Discount</TwText>
        <TwText className="text-white font-medium text-sm">{maxDiscount}</TwText>
      </TwView>
    </TwView>
  </TwView>
);

export default function OffersScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A0D14' }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Header */}
      <TwView className="flex-row items-center justify-between px-6 py-4">
        <TwPressable onPress={() => router.back()}>
          <ArrowLeft color="white" size={24} />
        </TwPressable>
        <TwText className="text-white text-lg font-bold">Offers & Coupons</TwText>
        <TwPressable>
          <Plus color="white" size={24} />
        </TwPressable>
      </TwView>

      {/* Search Bar */}
      <TwView className="px-6 py-2 pb-4 border-b border-[#22252D]">
        <TwView className="flex-row items-center bg-[#15171E] rounded-xl w-full h-12 px-4 border border-[#22252D]">
          <Search color="#6B7280" size={20} />
          <TextInput 
            placeholder="Search coupons..."
            placeholderTextColor="#6B7280"
            style={{ flex: 1, color: 'white', marginLeft: 8, fontSize: 14 }}
          />
        </TwView>
      </TwView>

      <ScrollView contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
        <CouponCard 
          title="Summer Sale 2025" 
          code="SUMMER20" 
          status="Active" 
          validTill="31 May 2025" 
          minOrder="₹1,500" 
          maxDiscount="₹500" 
          type="percentage"
          amount="20%"
        />
        <CouponCard 
          title="Welcome Discount" 
          code="WELCOME10" 
          status="Active" 
          validTill="31 Dec 2025" 
          minOrder="₹500" 
          maxDiscount="₹200" 
          type="percentage"
          amount="10%"
        />
        <CouponCard 
          title="Flat ₹500 Off" 
          code="FLAT500" 
          status="Active" 
          validTill="15 Jun 2025" 
          minOrder="₹2,500" 
          maxDiscount="₹500" 
          type="flat"
          amount="₹500"
        />
        <CouponCard 
          title="Diwali Special" 
          code="DIWALI30" 
          status="Expired" 
          validTill="15 Nov 2024" 
          minOrder="₹2,000" 
          maxDiscount="₹1,000" 
          type="percentage"
          amount="30%"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
