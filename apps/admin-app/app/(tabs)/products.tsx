import React, { useState } from 'react';
import { View, ScrollView, StatusBar, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, Filter, Search, ChevronRight, Plus } from 'lucide-react-native';
import { View as TwView, Text as TwText, Pressable as TwPressable } from '../../src/tw';
import { useRouter } from 'expo-router';

const ProductItem = ({ image, title, sku, stock, price }: any) => (
  <TwView className="bg-[#15171E] rounded-2xl p-4 mb-4 border border-[#22252D] flex-row items-center">
    <TwView className="w-16 h-16 bg-[#22252D] rounded-xl mr-4 overflow-hidden items-center justify-center">
      {image ? (
        <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
      ) : (
        <TwView className="w-10 h-10 bg-gray-700 rounded-md" />
      )}
    </TwView>
    <TwView className="flex-1 justify-center">
      <TwView className="flex-row items-start justify-between mb-1">
        <TwText className="text-white font-bold text-sm flex-1 pr-2">{title}</TwText>
        <ChevronRight color="#6B7280" size={16} />
      </TwView>
      <TwText className="text-gray-400 text-xs mb-1">SKU: {sku}</TwText>
      <TwView className="flex-row justify-between items-center mt-1">
        <TwText className="text-gray-500 text-xs">Stock: {stock}</TwText>
        <TwText className="text-white font-bold text-base">{price}</TwText>
      </TwView>
    </TwView>
  </TwView>
);

export default function ProductsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('All');
  
  const tabs = [
    { name: 'All', count: '982' },
    { name: 'In Stock', count: '' },
    { name: 'Low Stock', count: '' },
    { name: 'Out of Stock', count: '' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A0D14' }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Header */}
      <TwView className="flex-row items-center justify-between px-6 py-4">
        <TwPressable>
          <Menu color="white" size={24} />
        </TwPressable>
        <TwText className="text-white text-lg font-bold">Products</TwText>
        <TwPressable>
          <Filter color="white" size={24} />
        </TwPressable>
      </TwView>

      <TwView className="px-6 py-2 flex-1">
        {/* Search Bar */}
        <TwView className="flex-row items-center bg-[#15171E] rounded-xl w-full h-12 px-4 border border-[#22252D] mb-6">
          <Search color="#6B7280" size={20} />
          <TextInput 
            placeholder="Search products..."
            placeholderTextColor="#6B7280"
            style={{ flex: 1, color: 'white', marginLeft: 8, fontSize: 14 }}
          />
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
                  {tab.name} {tab.count ? `(${tab.count})` : ''}
                </TwText>
              </TwPressable>
            ))}
          </ScrollView>
        </TwView>

        {/* Products List */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
          <ProductItem 
            image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150"
            title="SS Master 1000 Cricket Bat"
            sku="BAT1000"
            stock="25"
            price="₹2,999"
          />
          <ProductItem 
            image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150"
            title="Nike Air Zoom Pegasus 40"
            sku="SHOE2001"
            stock="36"
            price="₹6,499"
          />
          <ProductItem 
            image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150"
            title="Nivia Storm Football"
            sku="FB1001"
            stock="40"
            price="₹1,899"
          />
          <ProductItem 
            image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150"
            title="Yonex Astrox 99"
            sku="BN1002"
            stock="28"
            price="₹1,899"
          />
          <ProductItem 
            image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150"
            title="SG Club Helmet"
            sku="HMS001"
            stock="19"
            price="₹1,199"
          />
        </ScrollView>
      </TwView>

      {/* Floating Action Button */}
      <TwPressable 
        className="absolute bottom-6 right-6 w-14 h-14 bg-[#FF6B00] rounded-full items-center justify-center shadow-lg"
        onPress={() => router.push('/products/add')}
        style={{
          shadowColor: '#FF6B00',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 5
        }}
      >
        <Plus color="white" size={24} />
      </TwPressable>
    </SafeAreaView>
  );
}
