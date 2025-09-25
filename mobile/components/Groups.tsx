import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { getAllGroups } from '@/api/group';
import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from './shared/LoadingSpinner';
import { ErrorMessage } from './shared/ErrorMessage';
import tw from '@/lib/tw';

interface GroupsProps {
  selectedGroup: string | null;
  setSelectedGroup: (id: string | null) => void;
}

export default function Groups({
  selectedGroup,
  setSelectedGroup,
}: GroupsProps) {
  const {
    data: groups,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['groups'],
    queryFn: getAllGroups,
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

  const allGroups = [{ id: 'all', name: 'All' }, ...(groups ?? [])];

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`px-4 py-3 gap-2`}
      >
        {allGroups.map((group) => {
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
    </View>
  );
}
