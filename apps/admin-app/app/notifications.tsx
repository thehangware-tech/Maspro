import React from "react";
import { ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Bell,
  ShoppingBag,
  UserPlus,
  AlertTriangle,
} from "lucide-react-native";
import {
  View as TwView,
  Text as TwText,
  Pressable as TwPressable,
} from "../src/tw";
import { useRouter } from "expo-router";

const NotificationItem = ({ type, title, message, time, isUnread }: any) => {
  let Icon = Bell;
  let iconBg = "#22252D";
  let iconColor = "#6B7280";

  switch (type) {
    case "order":
      Icon = ShoppingBag;
      iconColor = "#FF6B00";
      iconBg = "#2A1708";
      break;
    case "user":
      Icon = UserPlus;
      iconColor = "#3B82F6";
      iconBg = "#0E1E36";
      break;
    case "alert":
      Icon = AlertTriangle;
      iconColor = "#EF4444";
      iconBg = "#2A0E0E";
      break;
  }

  return (
    <TwPressable
      className={`flex-row p-4 border-b border-[#22252D] ${isUnread ? "bg-[#15171E]" : ""}`}
    >
      <TwView
        className="w-12 h-12 rounded-full items-center justify-center mr-4"
        style={{ backgroundColor: iconBg }}
      >
        <Icon color={iconColor} size={20} />
      </TwView>
      <TwView className="flex-1 pr-6">
        <TwView className="flex-row justify-between items-start mb-1">
          <TwText
            className={`text-base font-bold ${isUnread ? "text-white" : "text-gray-300"}`}
          >
            {title}
          </TwText>
        </TwView>
        <TwText className="text-gray-400 text-sm leading-5 mb-2">
          {message}
        </TwText>
        <TwText className="text-gray-500 text-xs">{time}</TwText>
      </TwView>
      {isUnread && (
        <TwView className="w-2 h-2 rounded-full bg-[#FF6B00] absolute right-4 top-8" />
      )}
    </TwPressable>
  );
};

export default function NotificationsScreen() {
  const router = useRouter();

  const notifications = [
    {
      id: 1,
      type: "order",
      title: "New Order Received",
      message: "Order #ORD-8347 has been placed successfully by John Doe.",
      time: "2 mins ago",
      isUnread: true,
    },
    {
      id: 2,
      type: "user",
      title: "New Customer Registered",
      message: "Sarah Smith just created a new account.",
      time: "1 hour ago",
      isUnread: true,
    },
    {
      id: 3,
      type: "alert",
      title: "Low Inventory Alert",
      message:
        "Nike Air Zoom Pegasus 40 is running low on stock (Only 2 left).",
      time: "3 hours ago",
      isUnread: false,
    },
    {
      id: 4,
      type: "order",
      title: "Order Delivered",
      message: "Order #ORD-8340 has been delivered to the customer.",
      time: "1 day ago",
      isUnread: false,
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
      <TwView className="flex-row items-center px-6 py-4 border-b border-[#22252D]">
        <TwPressable onPress={() => router.back()} className="mr-4">
          <ArrowLeft color="white" size={24} />
        </TwPressable>
        <TwText className="text-white text-xl font-bold">Notifications</TwText>
      </TwView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {notifications.map((notif) => (
          <NotificationItem key={notif.id} {...notif} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
