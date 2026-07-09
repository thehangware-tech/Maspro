import React, { useState } from 'react';
import { View as TwView, Text as TwText, Pressable as TwPressable, TextInput as TwTextInput, SafeAreaView as TwSafeAreaView, ScrollView as TwScrollView } from '../../src/tw';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Svg, Path, Line, Circle, Polyline, Rect } from 'react-native-svg';
import { StatusBar } from 'expo-status-bar';

// Icons
const ArrowLeft = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M15 18l-6-6 6-6" />
  </Svg>
);

const CalendarIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <Line x1="16" y1="2" x2="16" y2="6" />
    <Line x1="8" y1="2" x2="8" y2="6" />
    <Line x1="3" y1="10" x2="21" y2="10" />
  </Svg>
);

const ChevronDown = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Polyline points="6 9 12 15 18 9" />
  </Svg>
);

export default function PersonalDetails() {
  const [name, setName] = useState('Adarsh Singh');
  const [email, setEmail] = useState('adarsh@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [dob, setDob] = useState('12-10-1998');
  const [gender, setGender] = useState('Male');

  return (
    <TwSafeAreaView className="flex-1 bg-[#0B0D14]">
      <StatusBar style="light" />
      
      {/* Header */}
      <TwView className="flex-row items-center px-6 pt-4 pb-4 border-b border-gray-800">
        <TwPressable className="w-10 h-10 justify-center">
          <ArrowLeft />
        </TwPressable>
        <TwView className="flex-1 items-center pr-10">
          <TwText className="text-white font-bold text-lg">Personal Details</TwText>
        </TwView>
      </TwView>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <TwScrollView className="flex-1" contentContainerClassName="px-6 py-8">
          
          {/* Full Name */}
          <TwView className="mb-5">
            <TwText className="text-gray-400 font-medium mb-2">Full Name</TwText>
            <TwView className="bg-[#13161F] h-14 rounded-xl px-4 border border-gray-800 justify-center">
              <TwTextInput 
                className="text-white text-base"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#9CA3AF"
              />
            </TwView>
          </TwView>

          {/* Email */}
          <TwView className="mb-5">
            <TwText className="text-gray-400 font-medium mb-2">Email Address</TwText>
            <TwView className="bg-[#13161F] h-14 rounded-xl px-4 border border-gray-800 justify-center">
              <TwTextInput 
                className="text-white text-base"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#9CA3AF"
              />
            </TwView>
          </TwView>

          {/* Phone Number */}
          <TwView className="mb-5">
            <TwText className="text-gray-400 font-medium mb-2">Phone Number</TwText>
            <TwView className="bg-[#13161F] h-14 rounded-xl px-4 border border-gray-800 justify-center">
              <TwTextInput 
                className="text-white text-base"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholderTextColor="#9CA3AF"
              />
            </TwView>
          </TwView>

          {/* Date of Birth */}
          <TwView className="mb-5">
            <TwText className="text-gray-400 font-medium mb-2">Date of Birth</TwText>
            <TwPressable className="bg-[#13161F] h-14 rounded-xl px-4 border border-gray-800 flex-row items-center justify-between">
              <TwText className="text-white text-base">{dob}</TwText>
              <CalendarIcon />
            </TwPressable>
          </TwView>

          {/* Gender */}
          <TwView className="mb-8">
            <TwText className="text-gray-400 font-medium mb-2">Gender</TwText>
            <TwPressable className="bg-[#13161F] h-14 rounded-xl px-4 border border-gray-800 flex-row items-center justify-between">
              <TwText className="text-white text-base">{gender}</TwText>
              <ChevronDown />
            </TwPressable>
          </TwView>

        </TwScrollView>

        {/* Save Button */}
        <TwView className="px-6 pb-6 pt-2 bg-[#0B0D14]">
          <TwPressable className="bg-[#FF6B00] w-full h-14 rounded-xl items-center justify-center shadow-lg shadow-[#FF6B00]/30">
            <TwText className="text-white font-bold text-lg">Save Changes</TwText>
          </TwPressable>
        </TwView>
      </KeyboardAvoidingView>

    </TwSafeAreaView>
  );
}
