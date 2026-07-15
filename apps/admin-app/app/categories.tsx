import React from "react";
import { View, ScrollView, StatusBar, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Plus, MoreVertical } from "lucide-react-native";
import {
  View as TwView,
  Text as TwText,
  Pressable as TwPressable,
} from "../src/tw";
import { useRouter } from "expo-router";

const CategoryItem = ({ name, productsCount, imageUrl }: any) => (
  <TwView className="flex-row items-center bg-[#15171E] p-3 rounded-2xl mb-4 border border-[#22252D]">
    <TwView className="w-14 h-14 bg-[#22252D] rounded-xl overflow-hidden mr-4 border border-[#22252D]">
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <TwView className="w-full h-full items-center justify-center bg-[#22252D]">
          <TwText className="text-gray-400 font-bold text-lg">
            {name.charAt(0)}
          </TwText>
        </TwView>
      )}
    </TwView>

    <TwView className="flex-1">
      <TwText className="text-white font-bold text-base mb-1">{name}</TwText>
      <TwText className="text-gray-400 text-xs">
        {productsCount} Products
      </TwText>
    </TwView>

    <TwPressable className="h-10 w-10 items-center justify-center">
      <MoreVertical color="#6B7280" size={20} />
    </TwPressable>
  </TwView>
);

export default function CategoriesScreen() {
  const router = useRouter();

  const categories = [
    {
      id: "1",
      name: "Cricket",
      productsCount: 145,
      imageUrl:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150",
    },
    {
      id: "2",
      name: "Football",
      productsCount: 89,
      imageUrl:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150",
    },
    {
      id: "3",
      name: "Tennis",
      productsCount: 56,
      imageUrl:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150",
    },
    {
      id: "4",
      name: "Swimming",
      productsCount: 34,
      imageUrl:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150",
    },
    {
      id: "5",
      name: "Fitness",
      productsCount: 112,
      imageUrl:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0A0D14" }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Header */}
      <TwView className="flex-row items-center justify-between px-6 py-4 border-b border-[#22252D]">
        <TwPressable onPress={() => router.back()} className="mr-4">
          <ArrowLeft color="white" size={24} />
        </TwPressable>
        <TwText className="text-white text-lg font-bold flex-1">
          Categories
        </TwText>
        <TwPressable className="h-10 w-10 items-center justify-center bg-[#15171E] rounded-full border border-[#22252D]">
          <Plus color="white" size={20} />
        </TwPressable>
      </TwView>

      <ScrollView
        contentContainerStyle={{ padding: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            name={category.name}
            productsCount={category.productsCount}
            imageUrl={category.imageUrl}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
