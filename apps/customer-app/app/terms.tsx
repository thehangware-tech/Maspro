import React from "react";
import {
  View as TwView,
  Text as TwText,
  Pressable as TwPressable,
  SafeAreaView as TwSafeAreaView,
  ScrollView as TwScrollView,
} from "../src/tw";
import Svg, { Path } from "react-native-svg";
import { StatusBar } from "expo-status-bar";

// Icons
const ArrowLeft = () => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#111827"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M15 18l-6-6 6-6" />
  </Svg>
);

export default function TermsAndConditions() {
  return (
    <TwSafeAreaView className="flex-1 bg-[#F8FAFC]">
      <StatusBar style="light" />

      {/* Header */}
      <TwView className="flex-row items-center px-6 pt-4 pb-4 border-b border-gray-200">
        <TwPressable className="w-10 h-10 justify-center">
          <ArrowLeft />
        </TwPressable>
        <TwView className="flex-1 items-center pr-10">
          <TwText className="text-gray-900 font-bold text-lg">
            Terms & Conditions
          </TwText>
        </TwView>
      </TwView>

      <TwScrollView className="flex-1" contentContainerClassName="px-6 py-6">
        <TwText className="text-gray-900 font-bold text-xl mb-4">
          1. Agreement to Terms
        </TwText>
        <TwText className="text-gray-500 text-sm leading-relaxed mb-6">
          By accessing or using the Maspro Sports India mobile application, you
          agree to be bound by these Terms and Conditions and our Privacy
          Policy. If you do not agree with any part of these terms, you may not
          use our services.
        </TwText>

        <TwText className="text-gray-900 font-bold text-xl mb-4">
          2. Intellectual Property Rights
        </TwText>
        <TwText className="text-gray-500 text-sm leading-relaxed mb-6">
          Other than the content you own, under these terms, Maspro Sports India
          and/or its licensors own all the intellectual property rights and
          materials contained in this app. You are granted a limited license
          only for purposes of viewing the material contained on this app.
        </TwText>

        <TwText className="text-gray-900 font-bold text-xl mb-4">
          3. Restrictions
        </TwText>
        <TwText className="text-gray-500 text-sm leading-relaxed mb-4">
          You are specifically restricted from all of the following:
        </TwText>
        <TwView className="pl-4 mb-6">
          <TwView className="flex-row mb-2">
            <TwText className="text-[#0EA5E9] mr-2">•</TwText>
            <TwText className="text-gray-500 text-sm leading-relaxed flex-1">
              Publishing any app material in any other media;
            </TwText>
          </TwView>
          <TwView className="flex-row mb-2">
            <TwText className="text-[#0EA5E9] mr-2">•</TwText>
            <TwText className="text-gray-500 text-sm leading-relaxed flex-1">
              Selling, sublicensing and/or otherwise commercializing any app
              material;
            </TwText>
          </TwView>
          <TwView className="flex-row mb-2">
            <TwText className="text-[#0EA5E9] mr-2">•</TwText>
            <TwText className="text-gray-500 text-sm leading-relaxed flex-1">
              Using this app in any way that is or may be damaging to this app;
            </TwText>
          </TwView>
          <TwView className="flex-row">
            <TwText className="text-[#0EA5E9] mr-2">•</TwText>
            <TwText className="text-gray-500 text-sm leading-relaxed flex-1">
              Using this app in any way that impacts user access to this app.
            </TwText>
          </TwView>
        </TwView>

        <TwText className="text-gray-900 font-bold text-xl mb-4">
          4. No Warranties
        </TwText>
        <TwText className="text-gray-500 text-sm leading-relaxed mb-6">
          This app is provided "as is," with all faults, and Maspro Sports India
          express no representations or warranties, of any kind related to this
          app or the materials contained on this app. Also, nothing contained on
          this app shall be interpreted as advising you.
        </TwText>

        <TwText className="text-gray-900 font-bold text-xl mb-4">
          5. Limitation of Liability
        </TwText>
        <TwText className="text-gray-500 text-sm leading-relaxed mb-8">
          In no event shall Maspro Sports India, nor any of its officers,
          directors and employees, shall be held liable for anything arising out
          of or in any way connected with your use of this app whether such
          liability is under contract. Maspro Sports India, including its
          officers, directors and employees shall not be held liable for any
          indirect, consequential or special liability arising out of or in any
          way related to your use of this app.
        </TwText>
      </TwScrollView>
    </TwSafeAreaView>
  );
}
