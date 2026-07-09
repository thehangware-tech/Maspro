import os

files = {
    'app/index.tsx': '''import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/(tabs)" />;
}''',
    'app/(tabs)/index.tsx': '''import React from 'react';
import { View as TwView, Text as TwText, ScrollView as TwScrollView, TextInput as TwTextInput, Pressable as TwPressable } from '../../src/tw';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0D14' }}>
      <TwView className="flex-1 items-center justify-center">
        <TwText className="text-white text-xl">Home Dashboard</TwText>
      </TwView>
    </SafeAreaView>
  );
}''',
    'app/(tabs)/categories.tsx': '''import React from 'react';
import { View as TwView, Text as TwText } from '../../src/tw';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Categories() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0D14' }}>
      <TwView className="flex-1 items-center justify-center">
        <TwText className="text-white text-xl">Categories</TwText>
      </TwView>
    </SafeAreaView>
  );
}''',
    'app/(tabs)/cart.tsx': '''import React from 'react';
import { View as TwView, Text as TwText } from '../../src/tw';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Cart() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0D14' }}>
      <TwView className="flex-1 items-center justify-center">
        <TwText className="text-white text-xl">Cart</TwText>
      </TwView>
    </SafeAreaView>
  );
}''',
    'app/(tabs)/orders.tsx': '''import React from 'react';
import { View as TwView, Text as TwText } from '../../src/tw';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Orders() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0D14' }}>
      <TwView className="flex-1 items-center justify-center">
        <TwText className="text-white text-xl">Orders</TwText>
      </TwView>
    </SafeAreaView>
  );
}''',
    'app/(tabs)/account.tsx': '''import React from 'react';
import { View as TwView, Text as TwText } from '../../src/tw';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Account() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0D14' }}>
      <TwView className="flex-1 items-center justify-center">
        <TwText className="text-white text-xl">Account</TwText>
      </TwView>
    </SafeAreaView>
  );
}''',
    'app/auth.tsx': '''import React from 'react';
import { View as TwView, Text as TwText } from '../src/tw';

export default function Auth() {
  return <TwView className="flex-1 bg-[#0B0D14]"><TwText className="text-white">Auth</TwText></TwView>;
}''',
    'app/checkout.tsx': '''import React from 'react';
import { View as TwView, Text as TwText } from '../src/tw';

export default function Checkout() {
  return <TwView className="flex-1 bg-[#0B0D14]"><TwText className="text-white">Checkout</TwText></TwView>;
}''',
    'app/otp.tsx': '''import React from 'react';
import { View as TwView, Text as TwText } from '../src/tw';

export default function Otp() {
  return <TwView className="flex-1 bg-[#0B0D14]"><TwText className="text-white">OTP</TwText></TwView>;
}''',
    'app/product/[id].tsx': '''import React from 'react';
import { View as TwView, Text as TwText } from '../../src/tw';

export default function Product() {
  return <TwView className="flex-1 bg-[#0B0D14]"><TwText className="text-white">Product</TwText></TwView>;
}''',
    'app/profile/details.tsx': '''import React from 'react';
import { View as TwView, Text as TwText } from '../../src/tw';

export default function ProfileDetails() {
  return <TwView className="flex-1 bg-[#0B0D14]"><TwText className="text-white">Profile Details</TwText></TwView>;
}''',
    'app/terms.tsx': '''import React from 'react';
import { View as TwView, Text as TwText } from '../src/tw';

export default function Terms() {
  return <TwView className="flex-1 bg-[#0B0D14]"><TwText className="text-white">Terms</TwText></TwView>;
}''',
    'app/orders/tracking.tsx': '''import React from 'react';
import { View as TwView, Text as TwText } from '../../src/tw';

export default function Tracking() {
  return <TwView className="flex-1 bg-[#0B0D14]"><TwText className="text-white">Tracking</TwText></TwView>;
}''',
}

for filepath, content in files.items():
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w') as f:
        f.write(content)
