import { Avatar } from 'react-native-paper';
import React from 'react';
import tw from '@/lib/tw';
import { View, Text } from 'react-native';

export default function HomeHeader() {
  return (
    <View style={tw`flex-row justify-between items-center px-4 py-3`}>
      <Text style={tw`text-primary text-2xl font-extrabold`}>Friendly</Text>
      <Avatar.Icon
        size={40}
        icon="account"
        color={tw.color('white')}
        theme={{ colors: { primary: tw.color('primary') } }}
      />
    </View>
  );
}
