import React, { useState } from 'react';
import { ScrollView, Switch, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Bell, Moon, Shield, Smartphone, Globe, ChevronRight } from 'lucide-react-native';
import { View as TwView, Text as TwText, Pressable as TwPressable } from '../src/tw';
import { useRouter } from 'expo-router';

const SettingItem = ({ icon: Icon, title, subtitle, hasSwitch, switchValue, onSwitchChange, isDestructive }: any) => (
  <TwPressable className="flex-row items-center justify-between py-4 border-b border-[#22252D]">
    <TwView className="flex-row items-center flex-1">
      <TwView className={`w-10 h-10 rounded-xl bg-[#15171E] items-center justify-center mr-4 border border-[#22252D]`}>
        <Icon color={isDestructive ? "#EF4444" : "#6B7280"} size={20} />
      </TwView>
      <TwView className="flex-1 mr-4">
        <TwText className={`font-medium text-base ${isDestructive ? 'text-red-500' : 'text-white'}`}>{title}</TwText>
        {subtitle && <TwText className="text-gray-400 text-sm mt-0.5">{subtitle}</TwText>}
      </TwView>
    </TwView>
    {hasSwitch ? (
      <Switch 
        value={switchValue} 
        onValueChange={onSwitchChange}
        trackColor={{ false: '#22252D', true: '#FF6B00' }}
        thumbColor={'#FFFFFF'}
      />
    ) : (
      <ChevronRight color="#6B7280" size={20} />
    )}
  </TwPressable>
);

export default function SettingsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A0D14' }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Header */}
      <TwView className="flex-row items-center px-6 py-4 border-b border-[#22252D]">
        <TwPressable onPress={() => router.back()} className="mr-4">
          <ArrowLeft color="white" size={24} />
        </TwPressable>
        <TwText className="text-white text-xl font-bold">Settings</TwText>
      </TwView>

      <ScrollView contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
        
        {/* App Settings */}
        <TwView className="mb-8">
          <TwText className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">App Settings</TwText>
          <TwView className="bg-[#15171E] rounded-2xl px-4 border border-[#22252D]">
            <SettingItem 
              icon={Bell} 
              title="Push Notifications" 
              subtitle="Get updates on new orders"
              hasSwitch 
              switchValue={notifications}
              onSwitchChange={setNotifications}
            />
            <SettingItem 
              icon={Moon} 
              title="Dark Mode" 
              subtitle="App appearance"
              hasSwitch 
              switchValue={darkMode}
              onSwitchChange={setDarkMode}
            />
            <SettingItem 
              icon={Smartphone} 
              title="Marketing Emails" 
              subtitle="Receive product updates"
              hasSwitch 
              switchValue={marketing}
              onSwitchChange={setMarketing}
            />
          </TwView>
        </TwView>

        {/* Security */}
        <TwView className="mb-8">
          <TwText className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">Security</TwText>
          <TwView className="bg-[#15171E] rounded-2xl px-4 border border-[#22252D]">
            <SettingItem icon={Shield} title="Change Password" />
            <SettingItem icon={Globe} title="Two-Factor Authentication" subtitle="Extra layer of security" />
          </TwView>
        </TwView>

      </ScrollView>
    </SafeAreaView>
  );
}
