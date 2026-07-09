import React from 'react';
import { View, Text, Pressable, ScrollView } from '../src/tw';
import { Image } from 'react-native';
import { ShieldCheck, BarChart3, Clock, Phone } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import { useSSO } from '@clerk/clerk-expo';
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

const GoogleLogo = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </Svg>
);

const AppleLogo = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M15.43 12.06c.03-2.12 1.74-3.15 1.82-3.19-1-1.44-2.54-1.65-3.09-1.68-1.32-.13-2.58.78-3.26.78-.68 0-1.7-.76-2.79-.74-1.41.02-2.72.82-3.45 2.1-1.48 2.58-.38 6.4 1.06 8.5 .71 1.03 1.55 2.18 2.66 2.14 1.08-.04 1.48-.69 2.78-.69 1.3 0 1.68.69 2.8.67 1.14-.02 1.87-1.05 2.58-2.09.81-1.18 1.14-2.32 1.16-2.38-.02-.01-2.22-.85-2.27-3.42M14.6 4.79c.6-.72 1-1.72.88-2.73-1-.04-2.09.58-2.71 1.32-.54.65-.98 1.68-.86 2.67 1.11.08 2.09-.54 2.69-1.26" fill="#000000"/>
  </Svg>
);

const SportsLogo = () => (
  <Svg width="56" height="56" viewBox="0 0 64 64" fill="none">
    <Path d="M43.7 15.6c0 2.7-2.2 4.9-4.9 4.9s-4.9-2.2-4.9-4.9 2.2-4.9 4.9-4.9 4.9 2.2 4.9 4.9z" fill="#FF8C00" />
    <Path d="M37.5 25.4L45.4 17.6L48.1 20.3L40.2 28.1L37.5 25.4Z" fill="#FF8C00" />
    <Path d="M26.2 36.3L37.5 25.4L42.2 30.1L30.9 41.0L26.2 36.3Z" fill="#FF8C00" />
    <Path d="M19.1 48.5L30.9 41.0L34.1 44.9L22.2 52.5L19.1 48.5Z" fill="#FF8C00" />
    <Path d="M30.9 41.0L35.6 52.5L31.8 54.0L27.1 42.5L30.9 41.0Z" fill="#FF8C00" />
    <Path d="M20.5 28.1C20.5 28.1 29.4 33.1 33.3 35.4L29.4 39.3C25.5 37.0 16.6 32.0 16.6 32.0L20.5 28.1Z" fill="#FF8C00" />
  </Svg>
);

export default function AuthScreen() {
  useWarmUpBrowser();
  const { startSSOFlow } = useSSO();

  const handleOAuth = React.useCallback(async (strategy: "oauth_google" | "oauth_apple") => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });
      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, [startSSOFlow]);

  return (
    <View className="flex-1 bg-[#050914]">
      {/* Background Image Container */}
      <View className="absolute top-0 w-full h-[55%]">
        <Image 
          source={require('../assets/images/sports_collage_bg.png')} 
          style={{ width: '100%', height: '100%', opacity: 0.8 }}
          resizeMode="cover"
        />
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1" contentContainerClassName="flex-grow pt-[20%] px-6 pb-10">
        
        {/* Logo Section */}
        <View className="items-center mb-[20%] mt-2">
          <View className="flex-row items-center justify-center">
            <SportsLogo />
            <View className="ml-3">
              <Text className="text-white font-black italic text-[38px] tracking-tight leading-[40px]">SPORTS</Text>
              <Text className="text-[#FF8C00] font-black italic text-[38px] tracking-tight leading-[40px]">HOLE</Text>
            </View>
          </View>
          <Text className="text-gray-400 tracking-[0.45em] text-[11px] mt-6 font-semibold ml-4">ADMIN PANEL</Text>
        </View>

        {/* Welcome Section */}
        <View className="items-center mb-6">
          <Text className="text-white font-bold text-[28px] mb-2.5">Welcome Back! 👋</Text>
          <Text className="text-gray-300 text-[14px]">Sign in to continue to your admin dashboard</Text>
        </View>

        {/* Feature Tags Row */}
        <View className="flex-row items-center justify-center bg-[#0e1423] rounded-2xl py-3.5 mb-10 mx-auto px-1 border border-[#141d33]">
          <View className="flex-row items-center px-3.5 border-r border-[#1e2942]">
            <ShieldCheck size={14} color="#FF8C00" strokeWidth={2.5} />
            <Text className="text-[#e2e8f0] text-[12px] ml-2 font-medium">Secure Access</Text>
          </View>
          <View className="flex-row items-center px-3.5 border-r border-[#1e2942]">
            <Clock size={14} color="#FF8C00" strokeWidth={2.5} />
            <Text className="text-[#e2e8f0] text-[12px] ml-2 font-medium">Real-time Data</Text>
          </View>
          <View className="flex-row items-center px-3.5">
            <BarChart3 size={14} color="#FF8C00" strokeWidth={2.5} />
            <Text className="text-[#e2e8f0] text-[12px] ml-2 font-medium">Manage Easily</Text>
          </View>
        </View>

        {/* SIGN IN WITH Divider */}
        <View className="flex-row items-center mb-8 px-4">
          <View className="flex-1 h-[1px] bg-[#1e2942]" />
          <Text className="text-[#64748b] mx-5 text-[11px] font-semibold tracking-wider">SIGN IN WITH</Text>
          <View className="flex-1 h-[1px] bg-[#1e2942]" />
        </View>

        {/* Auth Buttons */}
        <View className="gap-3.5 mb-10">
          <Pressable onPress={() => handleOAuth("oauth_google")} className="flex-row items-center bg-[#f8fafc] rounded-full h-[56px] px-6 active:opacity-80">
            <View className="absolute left-6">
              <GoogleLogo />
            </View>
            <Text className="text-[#0f172a] font-bold text-[16px] flex-1 text-center">Continue with Google</Text>
          </Pressable>

          <Pressable onPress={() => handleOAuth("oauth_apple")} className="flex-row items-center bg-[#f8fafc] rounded-full h-[56px] px-6 active:opacity-80">
            <View className="absolute left-6">
              <AppleLogo />
            </View>
            <Text className="text-[#0f172a] font-bold text-[16px] flex-1 text-center">Continue with Apple</Text>
          </Pressable>

          <Pressable className="flex-row items-center bg-[#f8fafc] rounded-full h-[56px] px-6 active:opacity-80">
            <View className="absolute left-6">
              <Phone size={22} color="#FF8C00" />
            </View>
            <Text className="text-[#0f172a] font-bold text-[16px] flex-1 text-center">Continue with Phone Number</Text>
          </Pressable>
        </View>

        {/* OR Divider */}
        <View className="flex-row items-center justify-center mb-8 px-10">
          <View className="flex-1 h-[1px] bg-[#1e2942]" />
          <Text className="text-[#64748b] mx-5 text-[11px] font-semibold tracking-wider">OR</Text>
          <View className="flex-1 h-[1px] bg-[#1e2942]" />
        </View>
        
        {/* Footer */}
        <View className="flex-row items-center justify-center mb-4">
          <ShieldCheck size={16} color="#FF8C00" strokeWidth={2.5} />
          <Text className="text-[#94a3b8] text-[13px] ml-2.5 font-medium">Your data is 100% secure and encrypted</Text>
        </View>

      </ScrollView>
    </View>
  );
}
