import React from 'react';
import { View, Text, ScrollView, Pressable } from '../src/tw';
import { ChevronLeft, Home, ShoppingBag, Package, MoreHorizontal, Plus, Tag } from 'lucide-react-native';

const coupons = [
  { code: 'WELCOME10', desc: 'Flat 10% OFF', status: 'Active', statusColor: 'text-green-500', statusBg: 'bg-green-500/10', minOrder: 'Min. Order: ₹999', dateLabel: 'Valid Till: 31 May 2025', usage: 'Used: 234', iconBg: 'bg-red-500/10', iconColor: '#ef4444' },
  { code: 'WHOLESALE5', desc: 'Flat 5% OFF', status: 'Active', statusColor: 'text-green-500', statusBg: 'bg-green-500/10', minOrder: 'Min. Order: ₹5,000', dateLabel: 'Valid Till: 15 Jun 2025', usage: 'Used: 98', iconBg: 'bg-red-500/10', iconColor: '#ef4444' },
  { code: 'SUMMER20', desc: '20% OFF up to ₹1000', status: 'Scheduled', statusColor: 'text-blue-500', statusBg: 'bg-blue-500/10', minOrder: 'Min. Order: ₹2,999', dateLabel: 'Starts: 20 May 2025', usage: '', iconBg: 'bg-blue-500/10', iconColor: '#3b82f6' },
  { code: 'EXTRA15', desc: 'Flat 15% OFF', status: 'Expired', statusColor: 'text-[#94a3b8]', statusBg: 'bg-[#1e2942]', minOrder: 'Min. Order: ₹1,499', dateLabel: 'Expired on: 01 May 2025', usage: 'Used: 120', iconBg: 'bg-[#1e2942]', iconColor: '#94a3b8' },
];

export default function OffersScreen() {
  return (
    <View className="flex-1 bg-[#050914]">
      {/* Header */}
      <View className="flex-row items-center px-6 pt-16 pb-4">
        <Pressable className="mr-4">
          <ChevronLeft color="#ffffff" size={24} />
        </Pressable>
        <Text className="text-white text-lg font-semibold flex-1 text-center pr-8">Offers & Coupons</Text>
      </View>

      {/* Segmented Control */}
      <View className="px-6 mb-6">
        <View className="flex-row bg-[#0e1423] rounded-xl p-1 border border-[#1e2942]">
          <Pressable className="flex-1 bg-[#FF8C00] rounded-lg py-2.5 items-center">
            <Text className="text-white font-semibold text-sm">Coupons</Text>
          </Pressable>
          <Pressable className="flex-1 rounded-lg py-2.5 items-center">
            <Text className="text-[#94a3b8] font-semibold text-sm">Banners</Text>
          </Pressable>
        </View>
      </View>

      {/* Coupons List */}
      <ScrollView className="flex-1 px-6 mb-24" showsVerticalScrollIndicator={false}>
        {coupons.map((coupon, index) => (
          <View key={index} className="bg-[#0e1423] border border-[#1e2942] rounded-2xl p-4 mb-4">
            <View className="flex-row items-center mb-4">
              <View className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${coupon.iconBg}`}>
                <Tag color={coupon.iconColor} size={24} />
              </View>
              <View className="flex-1">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-white font-bold text-base uppercase">{coupon.code}</Text>
                  <View className={`px-2 py-1 rounded-md ${coupon.statusBg}`}>
                    <Text className={`text-[10px] font-bold ${coupon.statusColor}`}>{coupon.status}</Text>
                  </View>
                </View>
                <Text className="text-[#94a3b8] text-sm">{coupon.desc}</Text>
              </View>
            </View>
            <View className="flex-row justify-between items-center pt-2">
              <Text className="text-[#64748b] text-[10px]">{coupon.minOrder}</Text>
              <Text className="text-[#64748b] text-[10px]">{coupon.dateLabel}</Text>
              {coupon.usage ? (
                <Text className="text-[#64748b] text-[10px]">{coupon.usage}</Text>
              ) : (
                <View style={{ width: 40 }} />
              )}
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
