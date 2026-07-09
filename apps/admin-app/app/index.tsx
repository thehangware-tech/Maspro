import React from 'react';
import { View, Image, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShieldCheck, Clock, BarChart3, Phone } from 'lucide-react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { View as TwView, Text as TwText, Pressable as TwPressable } from '../src/tw';
import { LinearGradient } from 'expo-linear-gradient';

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

const AppleIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="#000000">
    <Path d="M17.05 13.92c-.03-2.58 2.1-3.83 2.19-3.89-1.2-1.75-3.07-1.99-3.75-2.01-1.6-.16-3.12.94-3.94.94-.8 0-2.06-.92-3.41-.9-1.73.02-3.32 1-4.22 2.56-1.83 3.16-.47 7.82 1.3 10.37.87 1.25 1.89 2.65 3.25 2.6 1.32-.05 1.82-.85 3.42-.85 1.58 0 2.05.85 3.44.82 1.4-.02 2.27-1.25 3.13-2.5 1-1.47 1.41-2.9 1.44-2.98-.03-.01-2.77-1.06-2.8-4.16M14.97 6.94c.73-.89 1.22-2.13 1.09-3.37-1.07.04-2.36.71-3.11 1.61-.67.79-1.26 2.05-1.11 3.27 1.2.09 2.39-.62 3.13-1.51"/>
  </Svg>
);

export default function WelcomeScreen() {
  const router = useRouter();

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

          <TwView className="px-6 pb-8">
            <TwView className="items-center mb-8 mt-10">
              <TwText className="text-white text-3xl font-bold mb-2">Welcome Back! 👋</TwText>
              <TwText className="text-gray-400 text-base text-center">
                Sign in to continue to your admin dashboard
              </TwText>
            </TwView>

            {/* Features Bar */}
            <TwView className="bg-[#15171E] rounded-2xl p-4 flex-row justify-between items-center mb-8 border border-[#22252D]">
              <TwView className="flex-row items-center flex-1 justify-center">
                <ShieldCheck color="#FF6B00" size={16} />
                <TwText className="text-gray-300 text-xs ml-2">Secure Access</TwText>
              </TwView>
              <TwView className="w-[1px] h-6 bg-[#22252D]" />
              <TwView className="flex-row items-center flex-1 justify-center">
                <Clock color="#FF6B00" size={16} />
                <TwText className="text-gray-300 text-xs ml-2">Real-time Data</TwText>
              </TwView>
              <TwView className="w-[1px] h-6 bg-[#22252D]" />
              <TwView className="flex-row items-center flex-1 justify-center">
                <BarChart3 color="#FF6B00" size={16} />
                <TwText className="text-gray-300 text-xs ml-2">Manage Easily</TwText>
              </TwView>
            </TwView>

            {/* Divider */}
            <TwView className="flex-row items-center justify-center mb-6">
              <TwView className="flex-1 h-[1px] bg-[#22252D]" />
              <TwText className="text-gray-500 font-medium text-xs px-4 tracking-widest">SIGN IN WITH</TwText>
              <TwView className="flex-1 h-[1px] bg-[#22252D]" />
            </TwView>

            {/* Auth Buttons */}
            <TwView className="space-y-4 gap-y-4">
              <TwPressable 
                className="bg-white rounded-2xl flex-row items-center justify-center h-14"
                onPress={() => console.log('Google Auth')}
              >
                <TwView className="absolute left-6">
                  <GoogleIcon />
                </TwView>
                <TwText className="text-black font-semibold text-base">Continue with Google</TwText>
              </TwPressable>

              <TwPressable 
                className="bg-white rounded-2xl flex-row items-center justify-center h-14"
                onPress={() => console.log('Apple Auth')}
              >
                <TwView className="absolute left-6">
                  <AppleIcon />
                </TwView>
                <TwText className="text-black font-semibold text-base">Continue with Apple</TwText>
              </TwPressable>

              <TwPressable 
                className="bg-white rounded-2xl flex-row items-center justify-center h-14"
                onPress={() => router.push('/(auth)/phone')}
              >
                <TwView className="absolute left-6">
                  <Phone color="#FF6B00" size={24} />
                </TwView>
                <TwText className="text-black font-semibold text-base">Continue with Phone Number</TwText>
              </TwPressable>
            </TwView>

            {/* Footer */}
            <TwView className="flex-row items-center justify-center mt-10">
              <ShieldCheck color="#FF6B00" size={16} />
              <TwText className="text-gray-500 text-xs ml-2">Your data is 100% secure and encrypted</TwText>
            </TwView>
          </TwView>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
