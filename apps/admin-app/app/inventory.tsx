import React from 'react';
import { View, ScrollView, StatusBar, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Filter, AlertTriangle } from 'lucide-react-native';
import { View as TwView, Text as TwText, Pressable as TwPressable } from '../src/tw';
import { useRouter } from 'expo-router';

const InventoryItem = ({ image, title, sku, stock, minStock, status, statusColor }: any) => (
  <TwView className="bg-[#15171E] rounded-2xl p-4 mb-4 border border-[#22252D] flex-row items-center">
    <TwView className="w-16 h-16 bg-[#22252D] rounded-xl mr-4 overflow-hidden items-center justify-center">
      {image ? (
        <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
      ) : (
        <TwView className="w-10 h-10 bg-gray-700 rounded-md" />
      )}
    </TwView>
    <TwView className="flex-1">
      <TwText className="text-white font-bold text-sm mb-1">{title}</TwText>
      <TwView className="flex-row items-center justify-between mb-2">
        <TwText className="text-gray-400 text-xs">SKU: {sku}</TwText>
        <TwText className="text-xs font-semibold" style={{ color: statusColor }}>{status}</TwText>
      </TwView>
      <TwView className="flex-row items-center justify-between">
        <TwView>
          <TwText className="text-white font-bold text-base">{stock} <TwText className="text-gray-500 text-xs font-normal">in stock</TwText></TwText>
          <TwText className="text-gray-500 text-[10px]">Min: {minStock}</TwText>
        </TwView>
        <TwPressable className="bg-[#22252D] border border-[#333742] px-4 py-2 rounded-lg">
          <TwText className="text-white text-xs font-bold">Update</TwText>
        </TwPressable>
      </TwView>
    </TwView>
  </TwView>
);

export default function InventoryScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A0D14' }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Header */}
      <TwView className="flex-row items-center justify-between px-6 py-4">
        <TwPressable onPress={() => router.back()}>
          <ArrowLeft color="white" size={24} />
        </TwPressable>
        <TwText className="text-white text-lg font-bold">Inventory</TwText>
        <TwPressable>
          <Filter color="white" size={24} />
        </TwPressable>
      </TwView>

      {/* Warning Banner */}
      <TwView className="px-6 pb-4">
        <TwView className="bg-[#7F1D1D] rounded-xl p-3 flex-row items-center">
          <AlertTriangle color="#FCA5A5" size={20} />
          <TwText className="text-red-200 ml-2 text-sm font-medium flex-1">12 items are below minimum stock level</TwText>
          <TwPressable>
            <TwText className="text-white text-xs font-bold underline">View All</TwText>
          </TwPressable>
        </TwView>
      </TwView>

      {/* Search Bar */}
      <TwView className="px-6 py-2 pb-4 border-b border-[#22252D]">
        <TwView className="flex-row items-center bg-[#15171E] rounded-xl w-full h-12 px-4 border border-[#22252D]">
          <Search color="#6B7280" size={20} />
          <TextInput 
            placeholder="Search inventory..."
            placeholderTextColor="#6B7280"
            style={{ flex: 1, color: 'white', marginLeft: 8, fontSize: 14 }}
          />
        </TwView>
      </TwView>

      <ScrollView contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
        <InventoryItem 
          image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150"
          title="SS Master 1000 Cricket Bat"
          sku="BAT1000"
          stock="25"
          minStock="10"
          status="In Stock"
          statusColor="#10B981"
        />
        <InventoryItem 
          image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150"
          title="Nike Air Zoom Pegasus 40"
          sku="SHOE2001"
          stock="4"
          minStock="15"
          status="Low Stock"
          statusColor="#F59E0B"
        />
        <InventoryItem 
          image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150"
          title="SG Club Helmet"
          sku="HMS001"
          stock="0"
          minStock="5"
          status="Out of Stock"
          statusColor="#EF4444"
        />
        <InventoryItem 
          image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150"
          title="Nivia Storm Football"
          sku="FB1001"
          stock="40"
          minStock="20"
          status="In Stock"
          statusColor="#10B981"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
