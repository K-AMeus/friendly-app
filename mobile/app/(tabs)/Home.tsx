import React from 'react';
import { View, Text } from 'react-native';
import { getFriends } from '../../api/friend';
import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { ErrorMessage } from '@/components/shared/ErrorMessage';

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
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B1CC74',
      }}
    >
      {friends.length > 0 ? (
        friends.map((friend) => <Text key={friend.id}>{friend.firstName}</Text>)
      ) : (
        <Text>No friend yet :(</Text>
      )}
    </View>
  );
}
