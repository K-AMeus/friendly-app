import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView } from 'react-native';
import { getFriends } from '../../api/friend';
import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import tw from '@/lib/tw';
import HomeHeader from '@/components/HomeHeader';

export default function Home() {
  const {
    data: friends,
    isLoading: friendsLoading,
    error: friendsError,
  } = useQuery({ queryKey: ['friends'], queryFn: getFriends });

  if (friendsLoading) {
    return <LoadingSpinner />;
  }

  if (friendsError || !friends) {
    return <ErrorMessage />;
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-muted-50`}>
      <View style={tw`bg-primary`}>
        <HomeHeader />
      </View>

      <ScrollView contentContainerStyle={tw`px-4 py-4`}>
        <View style={tw`flex-row gap-3 mb-4`}></View>
        {friends.length > 0 ? (
          friends.map((f) => (
            <View key={f.id} style={tw`bg-white rounded-xl p-4 mb-3`}>
              <Text style={tw`text-brand-900 font-semibold`}>{f.name}</Text>
            </View>
          ))
        ) : (
          <Text style={tw`text-muted-600`}>No friend yet :(</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
