import React from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, Users, PackageOpen, Ticket, BarChart4, Settings, LogOut, ChevronRight, User } from 'lucide-react-native';
import { View as TwView, Text as TwText, Pressable as TwPressable } from '../../src/tw';
import { useRouter } from 'expo-router';

const MenuItem = ({ icon: Icon, title, route, color = "#6B7280" }: any) => {
  const router = useRouter();
  
  return (
    <TwPressable 
      className="flex-row items-center justify-between py-4 border-b border-[#22252D]"
      onPress={() => route && router.push(route)}
    >
      <TwView className="flex-row items-center">
        <TwView className="w-10 h-10 rounded-xl bg-[#15171E] items-center justify-center mr-4 border border-[#22252D]">
          <Icon color={color} size={20} />
        </TwView>
        <TwText className="text-white font-medium text-base">{title}</TwText>
      </TwView>
      <ChevronRight color="#6B7280" size={20} />
    </TwPressable>
  );
};

export default function MoreMenuScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A0D14' }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Header */}
      <TwView className="flex-row items-center px-6 py-4 border-b border-[#22252D]">
        <TwText className="text-white text-xl font-bold">Menu</TwText>
      </TwView>

      <ScrollView contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
        
        {/* Profile Card */}
        <TwView className="bg-[#15171E] rounded-2xl p-4 mb-8 border border-[#22252D] flex-row items-center">
          <TwView className="w-14 h-14 bg-[#22252D] rounded-full items-center justify-center mr-4">
            <User color="#FF6B00" size={24} />
          </TwView>
          <TwView className="flex-1">
            <TwText className="text-white font-bold text-lg">Admin User</TwText>
            <TwText className="text-gray-400 text-sm">admin@maspro.in</TwText>
          </TwView>
        </TwView>

        {/* Menu Items */}
        <TwView className="mb-8">
          <TwText className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">Management</TwText>
          <TwView className="bg-[#15171E] rounded-2xl px-4 border border-[#22252D]">
            <MenuItem icon={Users} title="Customers" route="/customers" color="#3B82F6" />
            <MenuItem icon={PackageOpen} title="Inventory" route="/inventory" color="#F59E0B" />
            <MenuItem icon={Ticket} title="Offers & Coupons" route="/offers" color="#EC4899" />
            <MenuItem icon={BarChart4} title="Reports" route="/reports" color="#10B981" />
          </TwView>
        </TwView>

        <TwView className="mb-8">
          <TwText className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">System</TwText>
          <TwView className="bg-[#15171E] rounded-2xl px-4 border border-[#22252D]">
            <MenuItem icon={Settings} title="Settings" />
            
            <TwPressable 
              className="flex-row items-center py-4"
              onPress={() => router.replace('/')}
            >
              <TwView className="flex-row items-center">
                <TwView className="w-10 h-10 rounded-xl bg-[#2a1313] items-center justify-center mr-4 border border-[#4a1c1c]">
                  <LogOut color="#EF4444" size={20} />
                </TwView>
                <TwText className="text-red-500 font-medium text-base">Sign Out</TwText>
              </TwView>
            </TwPressable>
          </TwView>
        </TwView>

      </ScrollView>
    </SafeAreaView>
  );
}
