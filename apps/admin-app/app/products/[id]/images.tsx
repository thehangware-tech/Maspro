import React from 'react';
import { View, ScrollView, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Trash2, Plus, Star } from 'lucide-react-native';
import { View as TwView, Text as TwText, Pressable as TwPressable } from '../../../src/tw';
import { useRouter } from 'expo-router';

export default function ManageImagesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A0D14' }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Header */}
      <TwView className="flex-row items-center px-6 py-4 border-b border-[#22252D]">
        <TwPressable onPress={() => router.back()} className="mr-4">
          <ArrowLeft color="white" size={24} />
        </TwPressable>
        <TwText className="text-white text-lg font-bold flex-1">Manage Images</TwText>
      </TwView>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        
        {/* Product Info */}
        <TwView className="bg-[#15171E] rounded-xl border border-[#22252D] p-4 mb-6">
          <TwText className="text-white font-bold text-base mb-1">SS Master 1000 Cricket Bat</TwText>
          <TwText className="text-gray-400 text-sm">SKU: SSM1000</TwText>
        </TwView>

        <TwText className="text-gray-400 text-xs mb-4 font-medium">Current Images (3)</TwText>

        {/* Image Item 1 - Primary */}
        <TwView className="flex-row bg-[#15171E] rounded-xl p-3 border border-[#22252D] mb-4">
          <TwView className="w-24 aspect-[3/4] rounded-lg bg-[#22252D] overflow-hidden mr-4 border border-[#22252D]">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200' }} 
              style={{ width: '100%', height: '100%' }} 
              resizeMode="cover"
            />
          </TwView>
          <TwView className="flex-1 justify-between py-2">
            <TwView className="bg-[#10B981]/20 self-start px-3 py-1.5 rounded-lg flex-row items-center">
              <Star color="#10B981" size={14} className="mr-1.5" />
              <TwText className="text-[#10B981] text-xs font-bold">Primary Image</TwText>
            </TwView>
            <TwPressable className="border border-[#EF4444] rounded-lg h-10 w-10 items-center justify-center self-end">
              <Trash2 color="#EF4444" size={18} />
            </TwPressable>
          </TwView>
        </TwView>

        {/* Image Item 2 */}
        <TwView className="flex-row bg-[#15171E] rounded-xl p-3 border border-[#22252D] mb-4">
          <TwView className="w-24 aspect-[3/4] rounded-lg bg-[#22252D] overflow-hidden mr-4 border border-[#22252D]">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200' }} 
              style={{ width: '100%', height: '100%' }} 
              resizeMode="cover"
            />
          </TwView>
          <TwView className="flex-1 justify-between py-2">
            <TwPressable className="border border-[#22252D] bg-[#0A0D14] self-start px-3 py-1.5 rounded-lg">
              <TwText className="text-gray-300 text-xs font-bold">Set as Primary</TwText>
            </TwPressable>
            <TwPressable className="border border-[#EF4444] rounded-lg h-10 w-10 items-center justify-center self-end">
              <Trash2 color="#EF4444" size={18} />
            </TwPressable>
          </TwView>
        </TwView>

        {/* Image Item 3 */}
        <TwView className="flex-row bg-[#15171E] rounded-xl p-3 border border-[#22252D] mb-4">
          <TwView className="w-24 aspect-[3/4] rounded-lg bg-[#22252D] overflow-hidden mr-4 border border-[#22252D]">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200' }} 
              style={{ width: '100%', height: '100%' }} 
              resizeMode="cover"
            />
          </TwView>
          <TwView className="flex-1 justify-between py-2">
            <TwPressable className="border border-[#22252D] bg-[#0A0D14] self-start px-3 py-1.5 rounded-lg">
              <TwText className="text-gray-300 text-xs font-bold">Set as Primary</TwText>
            </TwPressable>
            <TwPressable className="border border-[#EF4444] rounded-lg h-10 w-10 items-center justify-center self-end">
              <Trash2 color="#EF4444" size={18} />
            </TwPressable>
          </TwView>
        </TwView>

      </ScrollView>

      {/* Upload Button */}
      <TwView className="absolute bottom-0 w-full px-6 py-4 bg-[#0A0D14] border-t border-[#22252D]">
        <TwPressable className="bg-[#FF6B00] rounded-xl h-12 flex-row items-center justify-center w-full">
          <Plus color="white" size={20} className="mr-2" />
          <TwText className="text-white font-bold text-base">Upload New Image</TwText>
        </TwPressable>
      </TwView>
    </SafeAreaView>
  );
}
