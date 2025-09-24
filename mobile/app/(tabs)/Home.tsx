import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import tw from '@/lib/tw';
import HomeHeader from '@/components/HomeHeader';
import UpcomingEvents from '@/components/UpcomingEvents';
import FriendsList from '@/components/FriendsList';

export default function Home() {
  return (
    <SafeAreaView style={tw`flex-1 bg-muted-50`}>
      <View>
        <HomeHeader />
      </View>

      <View style={tw`items-center pt-5`}>
        <UpcomingEvents />
      </View>

      <View style={tw`flex-1 px-4 pt-4`}>
        <FriendsList />
      </View>
    </SafeAreaView>
  );
}
