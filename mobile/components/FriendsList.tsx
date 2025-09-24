import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import tw from '@/lib/tw';
import { formatDate } from '@/utils/Formatters';
import { getFriends, addFriend } from '@/api/friend';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ErrorMessage } from './shared/ErrorMessage';
import { LoadingSpinner } from './shared/LoadingSpinner';
import AddFriendModal from './AddFriendModal';

export default function FriendsList() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: friends,
    isLoading: friendsLoading,
    error: friendsError,
  } = useQuery({ queryKey: ['friends'], queryFn: getFriends });

  const addFriendMutation = useMutation({
    mutationFn: addFriend,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['friends'] });
      setIsModalVisible(false);
    },
  });

  const handleAddFriend = () => {
    setIsModalVisible(true);
  };

  const handleAddFriendSubmit = (friendData: {
    name: string;
    contactFrequency: number;
  }) => {
    void addFriendMutation.mutateAsync(friendData);
  };

  if (friendsLoading) {
    return <LoadingSpinner />;
  }

  if (friendsError || !friends) {
    return <ErrorMessage />;
  }
  return (
    <>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-gray-800 text-xl font-bold`}>Your Friends</Text>
        <TouchableOpacity
          style={tw`bg-primary rounded-full px-2.5 py-1.5 flex-row items-center shadow-sm`}
          activeOpacity={0.8}
          onPress={handleAddFriend}
        >
          <Text style={tw`text-white text-lg mr-1`}>+</Text>
          <Text style={tw`text-white font-semibold text-sm`}>Add Friend</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {friends.length > 0 ? (
          <View style={tw`gap-3`}>
            {friends.map((f) => (
              <TouchableOpacity
                key={f.id}
                style={tw`bg-white rounded-xl p-3 shadow-sm border border-gray-100`}
                activeOpacity={0.7}
              >
                <View style={tw`flex-row items-center`}>
                  <Avatar.Text
                    size={48}
                    label={f.name.charAt(0).toUpperCase()}
                    style={tw`bg-primary mr-4`}
                    labelStyle={tw`text-white font-bold`}
                  />
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-gray-900 font-semibold text-lg`}>
                      {f.name}
                    </Text>
                    <Text style={tw`text-gray-500 text-sm mt-1`}>
                      Last contacted:{' '}
                      <Text style={tw`font-bold`}>
                        {formatDate(f.lastContacted)}
                      </Text>
                    </Text>
                  </View>
                  <View style={tw`items-end`}></View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={tw`items-center py-12`}>
            <Text style={tw`text-6xl mb-4`}>👥</Text>
            <Text style={tw`text-gray-600 text-lg font-medium mb-2`}>
              No friends yet
            </Text>
            <Text style={tw`text-gray-500 text-center`}>
              Start being your friendliest by adding your first friend!
            </Text>
          </View>
        )}
      </ScrollView>

      <AddFriendModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAddFriend={handleAddFriendSubmit}
      />
    </>
  );
}
