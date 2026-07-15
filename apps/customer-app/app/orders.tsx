import React from "react";
import { View, Text, ScrollView, Pressable, TextInput } from "../src/tw";
import {
  Menu,
  Bell,
  Search,
  Filter,
  ShoppingBag,
  Box,
  Briefcase,
  Truck,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Home,
  Package,
  MoreHorizontal,
} from "lucide-react-native";

const orders = [
  {
    id: "#SH12545",
    status: "New",
    customer: "Rahul Sharma",
    amount: "₹4,890",
    items: "3 Items",
    date: "7 May 2025 | 10:30 AM",
    icon: ShoppingBag,
    color: "bg-orange-500/20",
    iconColor: "#f97316",
    statusColor: "text-green-500",
    statusBg: "bg-green-500/10",
  },
  {
    id: "#SH12544",
    status: "Confirmed",
    customer: "Vivek Kumar",
    amount: "₹7,189",
    items: "5 Items",
    date: "7 May 2025 | 09:15 AM",
    icon: Box,
    color: "bg-blue-500/20",
    iconColor: "#38BDF8",
    statusColor: "text-blue-500",
    statusBg: "bg-blue-500/10",
  },
  {
    id: "#SH12543",
    status: "Packed",
    customer: "MS Dhoni",
    amount: "₹2,590",
    items: "2 Items",
    date: "7 May 2025 | 08:40 AM",
    icon: Briefcase,
    color: "bg-yellow-500/20",
    iconColor: "#eab308",
    statusColor: "text-orange-500",
    statusBg: "bg-orange-500/10",
  },
  {
    id: "#SH12542",
    status: "Shipped",
    customer: "Rohit Das",
    amount: "₹6,490",
    items: "4 Items",
    date: "6 May 2025 | 07:50 PM",
    icon: Truck,
    color: "bg-purple-500/20",
    iconColor: "#a855f7",
    statusColor: "text-purple-500",
    statusBg: "bg-purple-500/10",
  },
  {
    id: "#SH12541",
    status: "Delivered",
    customer: "Hardik Pandya",
    amount: "₹1,489",
    items: "1 Item",
    date: "6 May 2025 | 06:20 PM",
    icon: CheckCircle2,
    color: "bg-teal-500/20",
    iconColor: "#14b8a6",
    statusColor: "text-teal-500",
    statusBg: "bg-teal-500/10",
  },
  {
    id: "#SH12540",
    status: "Cancelled",
    customer: "Arjun Mehta",
    amount: "₹2,999",
    items: "0 Items",
    date: "6 May 2025 | 05:10 PM",
    icon: XCircle,
    color: "bg-red-500/20",
    iconColor: "#ef4444",
    statusColor: "text-red-500",
    statusBg: "bg-red-500/10",
  },
];

export default function OrdersScreen() {
  return (
    <View className="flex-1 bg-[#050914]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-16 pb-4">
        <Pressable>
          <Menu color="#ffffff" size={24} />
        </Pressable>
        <Text className="text-gray-900 text-lg font-semibold">Orders</Text>
        <Pressable className="relative">
          <Bell color="#ffffff" size={24} />
          <View className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full items-center justify-center">
            <Text className="text-gray-900 text-[10px] font-bold">0</Text>
          </View>
        </Pressable>
      </View>

      {/* Search Bar */}
      <View className="flex-row px-6 mb-4">
        <View className="flex-1 bg-[#0e1423] border border-[#1e2942] rounded-xl flex-row items-center px-4 h-12 mr-3">
          <Search color="#64748b" size={18} />
          <TextInput
            className="flex-1 text-gray-900 ml-2 text-sm"
            placeholder="Search Order ID / Customer"
            placeholderTextColor="#64748b"
          />
        </View>
        <Pressable className="bg-[#0e1423] border border-[#1e2942] w-12 h-12 rounded-xl items-center justify-center">
          <Filter color="#94a3b8" size={20} />
        </Pressable>
      </View>

      {/* Tabs */}
      <View className="px-6 mb-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row"
        >
          <View className="mr-6 border-b-2 border-[#FF8C00] pb-2">
            <Text className="text-[#FF8C00] font-semibold text-sm">
              All (1245)
            </Text>
          </View>
          <View className="mr-6 pb-2">
            <Text className="text-[#94a3b8] font-medium text-sm">
              New (298)
            </Text>
          </View>
          <View className="mr-6 pb-2">
            <Text className="text-[#94a3b8] font-medium text-sm">
              Processing (447)
            </Text>
          </View>
          <View className="mr-6 pb-2">
            <Text className="text-[#94a3b8] font-medium text-sm">Shipped</Text>
          </View>
        </ScrollView>
      </View>

      {/* Order List */}
      <ScrollView
        className="flex-1 px-6 mb-24"
        showsVerticalScrollIndicator={false}
      >
        {orders.map((order, index) => (
          <View
            key={index}
            className="bg-[#0e1423] border border-[#1e2942] rounded-2xl p-4 flex-row mb-4"
          >
            <View
              className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${order.color}`}
            >
              <order.icon color={order.iconColor} size={24} />
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-gray-900 font-bold">{order.id}</Text>
                <View className="flex-row items-center">
                  <View
                    className={`px-2 py-1 rounded-md mr-2 ${order.statusBg}`}
                  >
                    <Text
                      className={`text-[10px] font-bold ${order.statusColor}`}
                    >
                      {order.status}
                    </Text>
                  </View>
                  <ChevronRight color="#64748b" size={16} />
                </View>
              </View>
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-[#e2e8f0] text-sm">{order.customer}</Text>
                <Text className="text-gray-900 font-bold">{order.amount}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-[#64748b] text-[11px]">{order.date}</Text>
                <Text className="text-[#94a3b8] text-xs">{order.items}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Tab Bar Placeholder */}
      <View className="absolute bottom-0 w-full bg-[#0e1423] border-t border-[#1e2942] flex-row justify-between items-center py-4 px-8 pb-8">
        <Pressable className="items-center">
          <Home color="#64748b" size={24} />
          <Text className="text-[#64748b] text-[10px] mt-1 font-medium">
            Dashboard
          </Text>
        </Pressable>
        <Pressable className="items-center">
          <ShoppingBag color="#FF8C00" size={24} />
          <Text className="text-[#FF8C00] text-[10px] mt-1 font-medium">
            Orders
          </Text>
        </Pressable>
        <Pressable className="items-center">
          <Package color="#64748b" size={24} />
          <Text className="text-[#64748b] text-[10px] mt-1 font-medium">
            Products
          </Text>
        </Pressable>
        <Pressable className="items-center">
          <MoreHorizontal color="#64748b" size={24} />
          <Text className="text-[#64748b] text-[10px] mt-1 font-medium">
            More
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
