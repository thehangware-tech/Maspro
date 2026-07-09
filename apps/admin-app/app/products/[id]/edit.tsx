import React, { useState } from 'react';
import { View, ScrollView, StatusBar, TextInput, Image, KeyboardAvoidingView, Platform, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus, ChevronDown } from 'lucide-react-native';
import { View as TwView, Text as TwText, Pressable as TwPressable } from '../../../src/tw';
import { useRouter } from 'expo-router';

const InputField = ({ label, placeholder, value, flex = 1, isDropdown = false, keyboardType = 'default' }: any) => (
  <TwView className="mb-4" style={{ flex }}>
    <TwText className="text-gray-400 text-xs mb-2 font-medium">{label}</TwText>
    <TwView className="bg-[#15171E] rounded-xl border border-[#22252D] h-12 flex-row items-center px-4">
      <TextInput 
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        value={value}
        style={{ flex: 1, color: 'white', fontSize: 14 }}
        keyboardType={keyboardType}
        editable={!isDropdown}
      />
      {isDropdown && <ChevronDown color="#6B7280" size={16} />}
    </TwView>
  </TwView>
);

export default function EditProductScreen() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A0D14' }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Header */}
      <TwView className="flex-row items-center px-6 py-4 border-b border-[#22252D]">
        <TwPressable onPress={() => router.back()} className="mr-4">
          <ArrowLeft color="white" size={24} />
        </TwPressable>
        <TwText className="text-white text-lg font-bold flex-1">Edit Product</TwText>
      </TwView>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
          
          {/* Images Section */}
          <TwText className="text-gray-400 text-xs mb-3 font-medium">Product Images</TwText>
          <TwView className="flex-row mb-8">
            <TwView className="w-20 h-20 bg-[#15171E] rounded-xl mr-4 border border-[#22252D] items-center justify-center overflow-hidden">
              <Image source={{ uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150' }} style={{ width: '100%', height: '100%' }} />
            </TwView>
            <TwView className="w-20 h-20 bg-[#15171E] rounded-xl mr-4 border border-[#22252D] items-center justify-center overflow-hidden">
              <Image source={{ uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150' }} style={{ width: '100%', height: '100%' }} />
            </TwView>
            <TwView className="w-20 h-20 bg-[#15171E] rounded-xl mr-4 border border-[#22252D] items-center justify-center overflow-hidden">
              <Image source={{ uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150' }} style={{ width: '100%', height: '100%' }} />
            </TwView>
            <TwPressable className="w-20 h-20 rounded-xl border border-dashed border-[#6B7280] items-center justify-center">
              <Plus color="#6B7280" size={20} />
              <TwText className="text-[#6B7280] text-[10px] mt-1 font-medium">Add More</TwText>
            </TwPressable>
          </TwView>

          {/* Form Fields */}
          <InputField label="Product Name" value="SS Master 1000 Cricket Bat" />
          <InputField label="Category" value="Cricket" isDropdown={true} />
          
          <TwView className="flex-row space-x-4 gap-x-4">
            <InputField label="Brand" value="SS" isDropdown={true} />
            <InputField label="SKU" value="SSM1000" />
          </TwView>

          <TwView className="flex-row space-x-4 gap-x-4">
            <InputField label="Retail Price (₹)" value="2,999" keyboardType="numeric" />
            <InputField label="Wholesale Price (₹)" value="2,100" keyboardType="numeric" />
          </TwView>

          <TwView className="flex-row space-x-4 gap-x-4">
            <InputField label="Stock Quantity" value="25" keyboardType="numeric" />
            <InputField label="Min. Wholesale Qty" value="5" keyboardType="numeric" />
          </TwView>

          {/* Product Status */}
          <TwView className="flex-row items-center justify-between mt-4 mb-4">
            <TwText className="text-gray-400 text-sm font-medium">Product Status</TwText>
            <Switch 
              value={isActive} 
              onValueChange={setIsActive}
              trackColor={{ false: '#22252D', true: '#FF6B00' }}
              thumbColor={'#FFFFFF'}
            />
          </TwView>
        </ScrollView>

        {/* Save Button */}
        <TwView className="absolute bottom-0 w-full px-6 py-4 bg-[#0A0D14] border-t border-[#22252D]">
          <TwPressable onPress={() => router.back()} className="bg-[#FF6B00] rounded-xl h-12 items-center justify-center w-full">
            <TwText className="text-white font-bold text-base">Update Product</TwText>
          </TwPressable>
        </TwView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
