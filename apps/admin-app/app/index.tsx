import React, { useState } from 'react';
import { View, Image, StatusBar, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { View as TwView, Text as TwText, Pressable as TwPressable } from '../src/tw';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';

const MasproLogo = () => (
  <TwView className="items-center justify-center mt-10 mb-4 z-10">
    <TwView className="flex-row items-center justify-center">
      <TwView className="mr-3">
        <Svg width="50" height="50" viewBox="0 0 40 40" fill="none">
          <Path d="M8 30 L15 15 L20 25 L28 10 L35 30" stroke="#FF6B00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <Circle cx="12" cy="10" r="3" fill="#FF6B00" />
        </Svg>
      </TwView>
      <TwView>
        <TwText className="text-white font-extrabold text-3xl tracking-widest leading-none">SPORTS</TwText>
        <TwText className="text-[#FF6B00] font-extrabold text-3xl tracking-widest leading-none mt-1">HOLE</TwText>
      </TwView>
    </TwView>
    <TwText className="text-gray-400 font-medium text-sm tracking-[0.3em] mt-3">A D M I N   P A N E L</TwText>
  </TwView>
);

const GoogleIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24">
    <Path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <Path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <Path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <Path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </Svg>
);

export default function LoginScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleGetOTP = () => {
    // In a real app, you would initiate the phone verification here
    // For now, just navigate to the OTP screen
    if (phoneNumber.length >= 10) {
      router.push({
        pathname: "/(auth)/otp",
        params: { phone: `+91${phoneNumber}` }
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0A0D14' }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Background Image with Gradient */}
      <View style={{ position: 'absolute', width: '100%', height: '50%' }}>
        <Image 
          source={require('../assets/images/sports_collage_bg.png')}
          style={{ width: '100%', height: '100%', opacity: 0.5 }}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', '#0A0D14']}
          style={{ position: 'absolute', width: '100%', height: '100%', bottom: 0 }}
        />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }} showsVerticalScrollIndicator={false}>
          <View>
            <MasproLogo />
          </View>

          <TwView className="px-6 pb-12">
            <TwView className="items-center mb-8 mt-10">
              <TwText className="text-white text-3xl font-bold mb-2">Welcome Back! 👋</TwText>
              <TwText className="text-gray-400 text-base text-center">
                Sign in to continue to your admin dashboard
              </TwText>
            </TwView>

            {/* Mobile Number Input */}
            <TwView className="bg-[#15171E] rounded-2xl h-14 flex-row items-center px-4 border border-[#22252D] mb-4">
              <TwText className="text-white font-medium text-base mr-3">+91</TwText>
              <TwView className="w-[1px] h-6 bg-[#22252D] mr-3" />
              <TextInput
                style={{ flex: 1, color: 'white', fontSize: 16 }}
                placeholder="Enter Mobile Number"
                placeholderTextColor="#6B7280"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                maxLength={10}
              />
            </TwView>

            {/* Get OTP Button */}
            <TwPressable 
              className={`rounded-2xl h-14 items-center justify-center mb-8 ${phoneNumber.length >= 10 ? 'bg-[#FF6B00]' : 'bg-[#FF6B00]/50'}`}
              onPress={handleGetOTP}
              disabled={phoneNumber.length < 10}
            >
              <TwText className="text-white font-bold text-base">GET OTP</TwText>
            </TwPressable>

            {/* Divider */}
            <TwView className="flex-row items-center justify-center mb-6">
              <TwView className="flex-1 h-[1px] bg-[#22252D]" />
              <TwText className="text-gray-500 font-medium text-xs px-4 tracking-widest">SIGN IN WITH</TwText>
              <TwView className="flex-1 h-[1px] bg-[#22252D]" />
            </TwView>

            {/* Google Auth Button */}
            <TwPressable 
              className="bg-white rounded-2xl flex-row items-center justify-center h-14 mb-4"
              onPress={() => console.log('Google Auth')}
            >
              <TwView className="absolute left-6">
                <GoogleIcon />
              </TwView>
              <TwText className="text-black font-semibold text-base">Continue with Google</TwText>
            </TwPressable>

          </TwView>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

