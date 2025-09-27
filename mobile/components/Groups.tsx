import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { getAllGroups, createGroup } from '@/api/group';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LoadingSpinner } from './shared/LoadingSpinner';
import { ErrorMessage } from './shared/ErrorMessage';
import AddGroupModal from './AddGroupModal';
import tw from '@/lib/tw';

interface GroupsProps {
  selectedGroup: string | null;
  setSelectedGroup: (id: string | null) => void;
}

export default function Groups({
  selectedGroup,
  setSelectedGroup,
}: GroupsProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: groups,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['groups'],
    queryFn: getAllGroups,
  });

  const createGroupMutation = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['groups'] });
      setIsModalVisible(false);
    },
    onError: (error) => {
      console.error('Failed to create group:', error);
    },
  });

  if (isLoading) {
    return (
      <View style={tw`h-16 justify-center items-center`}>
        <LoadingSpinner />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`h-16 justify-center items-center px-4`}>
        <ErrorMessage />
      </View>
    );
  }

  function handleFilterPress(groupId: string) {
    setSelectedGroup(groupId === 'all' ? null : groupId);
  }

  const handleAddGroup = () => {
    setIsModalVisible(true);
  };

  const handleAddGroupSubmit = (groupData: { name: string }) => {
    void createGroupMutation.mutateAsync(groupData);
  };

  const allGroups = [
    { id: 'all', name: 'All' },
    ...(groups ?? []),
    { id: 'add-group', name: 'Add Group' },
  ];

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`px-4 py-3 gap-2`}
      >
        {allGroups.map((group) => {
          if (group.id === 'add-group') {
            return (
              <TouchableOpacity
                key={group.id}
                onPress={handleAddGroup}
                style={tw`bg-primary rounded-full px-2 py-1 flex-row items-center shadow-sm`}
                activeOpacity={0.8}
              >
                <Text style={tw`text-white text-lg mr-1`}>+</Text>
                <Text style={tw`text-white font-semibold text-sm`}>
                  Add Group
                </Text>
              </TouchableOpacity>
            );
          }

          const isSelected =
            (selectedGroup === null && group.id === 'all') ||
            selectedGroup === group.id;
          return (
            <TouchableOpacity
              key={group.id}
              onPress={() => handleFilterPress(group.id)}
              style={tw.style(
                `px-4 py-2 rounded-full border`,
                isSelected
                  ? 'bg-primary border-primary'
                  : 'bg-white border-gray-200',
              )}
              activeOpacity={0.8}
            >
              <Text
                style={tw.style(
                  `font-semibold`,
                  isSelected ? 'text-white' : 'text-gray-700',
                )}
              >
                {group.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <AddGroupModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAddGroup={handleAddGroupSubmit}
      />
    </View>
  );
}
