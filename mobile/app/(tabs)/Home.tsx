import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import tw from '@/lib/tw';
import HomeHeader from '@/components/HomeHeader';
import UpcomingEvents from '@/components/UpcomingEvents';
import FriendsList from '@/components/FriendsList';
import Groups from '@/components/Groups';

export default function Home() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  return (
    <SafeAreaView style={tw`flex-1 bg-muted-50`}>
      <View>
        <HomeHeader />
      </View>

      <View style={tw`items-center pt-5`}>
        <UpcomingEvents />
      </View>

      <View>
        <Groups
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
        />
      </View>

      <View style={tw`flex-1 px-4 pt-4`}>
        <FriendsList selectedGroup={selectedGroup} />
      </View>
    </SafeAreaView>
  );
}
