import React from "react";
import { View, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Calendar,
  TrendingUp,
  IndianRupee,
  ShoppingBag,
  BarChart2,
  PieChart,
} from "lucide-react-native";
import {
  View as TwView,
  Text as TwText,
  Pressable as TwPressable,
} from "../src/tw";
import { useRouter } from "expo-router";

const StatCard = ({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
  color,
}: any) => (
  <TwView className="bg-[#15171E] rounded-2xl p-4 border border-[#22252D] flex-1 mb-4">
    <TwView className="flex-row items-center justify-between mb-3">
      <TwView
        className="w-10 h-10 rounded-xl items-center justify-center"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon color={color} size={20} />
      </TwView>
      <TwView
        className={`px-2 py-1 rounded-md flex-row items-center ${isPositive ? "bg-green-900/30" : "bg-red-900/30"}`}
      >
        <TrendingUp
          color={isPositive ? "#10B981" : "#EF4444"}
          size={12}
          style={{ transform: [{ rotate: isPositive ? "0deg" : "180deg" }] }}
        />
        <TwText
          className={`text-[10px] font-bold ml-1 ${isPositive ? "text-green-500" : "text-red-500"}`}
        >
          {change}
        </TwText>
      </TwView>
    </TwView>
    <TwText className="text-white font-bold text-xl mb-1">{value}</TwText>
    <TwText className="text-gray-400 text-xs">{title}</TwText>
  </TwView>
);

const CategoryRow = ({ name, percentage, amount, color }: any) => (
  <TwView className="flex-row items-center justify-between mb-4">
    <TwView className="flex-row items-center">
      <TwView
        className="w-3 h-3 rounded-full mr-3"
        style={{ backgroundColor: color }}
      />
      <TwText className="text-white text-sm">{name}</TwText>
    </TwView>
    <TwView className="flex-row items-center w-1/2">
      <TwView className="flex-1 bg-[#22252D] h-2 rounded-full mr-3 overflow-hidden">
        <TwView
          className="h-full rounded-full"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </TwView>
      <TwText className="text-gray-400 text-xs w-16 text-right">
        {amount}
      </TwText>
    </TwView>
  </TwView>
);

export default function ReportsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0A0D14" }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Header */}
      <TwView className="flex-row items-center justify-between px-6 py-4">
        <TwPressable onPress={() => router.back()}>
          <ArrowLeft color="white" size={24} />
        </TwPressable>
        <TwText className="text-white text-lg font-bold">
          Reports & Analytics
        </TwText>
        <TwPressable>
          <Calendar color="white" size={24} />
        </TwPressable>
      </TwView>

      <ScrollView
        contentContainerStyle={{ padding: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Time period selector */}
        <TwView className="flex-row bg-[#15171E] rounded-xl p-1 mb-6 border border-[#22252D]">
          {["Today", "Week", "Month", "Year"].map((period, index) => (
            <TwPressable
              key={period}
              className={`flex-1 py-2 items-center rounded-lg ${index === 2 ? "bg-[#FF6B00]" : ""}`}
            >
              <TwText
                className={`text-xs font-bold ${index === 2 ? "text-white" : "text-gray-400"}`}
              >
                {period}
              </TwText>
            </TwPressable>
          ))}
        </TwView>

        {/* Stats Row 1 */}
        <TwView className="flex-row space-x-4 gap-x-4">
          <StatCard
            title="Total Revenue"
            value="₹2,45,890"
            change="+12.5%"
            isPositive={true}
            icon={IndianRupee}
            color="#10B981"
          />
          <StatCard
            title="Total Orders"
            value="1,245"
            change="+8.2%"
            isPositive={true}
            icon={ShoppingBag}
            color="#3B82F6"
          />
        </TwView>

        {/* Stats Row 2 */}
        <TwView className="flex-row space-x-4 gap-x-4">
          <StatCard
            title="Average Value"
            value="₹1,850"
            change="-2.4%"
            isPositive={false}
            icon={BarChart2}
            color="#F59E0B"
          />
          <StatCard
            title="Conversion"
            value="3.2%"
            change="+1.1%"
            isPositive={true}
            icon={PieChart}
            color="#8B5CF6"
          />
        </TwView>

        {/* Revenue Chart Placeholder */}
        <TwView className="bg-[#15171E] rounded-2xl p-4 mb-6 border border-[#22252D]">
          <TwView className="flex-row items-center justify-between mb-4">
            <TwText className="text-white font-bold text-base">
              Revenue Overview
            </TwText>
            <TwText className="text-[#FF6B00] text-xs font-bold underline">
              Detailed Report
            </TwText>
          </TwView>
          <TwView className="h-40 items-center justify-end flex-row items-end space-x-2 gap-x-2 pt-4">
            <TwView className="w-8 bg-[#22252D] h-[40%] rounded-t-sm" />
            <TwView className="w-8 bg-[#22252D] h-[60%] rounded-t-sm" />
            <TwView className="w-8 bg-[#22252D] h-[35%] rounded-t-sm" />
            <TwView className="w-8 bg-[#22252D] h-[80%] rounded-t-sm" />
            <TwView className="w-8 bg-[#FF6B00] h-[100%] rounded-t-sm" />
            <TwView className="w-8 bg-[#22252D] h-[50%] rounded-t-sm" />
            <TwView className="w-8 bg-[#22252D] h-[75%] rounded-t-sm" />
          </TwView>
          <TwView className="flex-row justify-between mt-2 px-1">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <TwText
                key={day}
                className="text-gray-500 text-[10px] w-8 text-center"
              >
                {day}
              </TwText>
            ))}
          </TwView>
        </TwView>

        {/* Category Breakdown */}
        <TwView className="bg-[#15171E] rounded-2xl p-4 mb-6 border border-[#22252D]">
          <TwText className="text-white font-bold text-base mb-6">
            Sales by Category
          </TwText>
          <CategoryRow
            name="Cricket Gear"
            percentage={45}
            amount="₹1.1L"
            color="#FF6B00"
          />
          <CategoryRow
            name="Footwear"
            percentage={30}
            amount="₹74K"
            color="#3B82F6"
          />
          <CategoryRow
            name="Apparel"
            percentage={15}
            amount="₹37K"
            color="#10B981"
          />
          <CategoryRow
            name="Accessories"
            percentage={10}
            amount="₹24K"
            color="#F59E0B"
          />
        </TwView>
      </ScrollView>
    </SafeAreaView>
  );
}
