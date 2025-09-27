import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
  FlatList,
} from 'react-native';
import { Avatar, Icon } from 'react-native-paper';
import { useQuery } from '@tanstack/react-query';
import { getAllGroups } from '@/api/group';
import { LoadingSpinner } from './shared/LoadingSpinner';
import { ErrorMessage } from './shared/ErrorMessage';
import tw from '@/lib/tw';

interface AddFriendModalProps {
  visible: boolean;
  onClose: () => void;
  onAddFriend: (friendData: {
    name: string;
    contactFrequency: number;
    groupId?: string;
  }) => void;
}

export default function AddFriendModal({
  visible,
  onClose,
  onAddFriend,
}: AddFriendModalProps) {
  const [name, setName] = useState('');
  const [contactFrequency, setContactFrequency] = useState(7);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showGroupDropdown, setShowGroupDropdown] = useState(false);

  const {
    data: groups,
    isLoading: groupsLoading,
    error: groupsError,
  } = useQuery({
    queryKey: ['groups'],
    queryFn: getAllGroups,
  });

  const getSelectedGroupName = () => {
    if (!selectedGroupId) return 'No Group';
    const selectedGroup = groups?.find((group) => group.id === selectedGroupId);
    return selectedGroup?.name || 'No Group';
  };

  const handleGroupSelect = (groupId: string | null) => {
    setSelectedGroupId(groupId);
    setShowGroupDropdown(false);
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert('Missing Information', 'Please fill in the name field.');
      return;
    }

    if (contactFrequency < 1 || contactFrequency > 365) {
      Alert.alert(
        'Invalid Frequency',
        'Contact frequency must be between 1 and 365 days.',
      );
      return;
    }

    setIsLoading(true);

    try {
      onAddFriend({
        name: name.trim(),
        contactFrequency: contactFrequency,
        groupId: selectedGroupId || undefined,
      });

      setName('');
      setContactFrequency(7);
      setSelectedGroupId(null);
      setShowGroupDropdown(false);
      onClose();
    } catch {
      Alert.alert('Error', 'Failed to add friend. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setName('');
    setContactFrequency(7);
    setSelectedGroupId(null);
    setShowGroupDropdown(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1 bg-white`}
      >
        {/* Header */}
        <View
          style={tw`flex-row justify-between items-center px-4 py-4 border-b border-gray-200`}
        >
          <TouchableOpacity onPress={handleClose} style={tw`p-2`}>
            <Text style={tw`text-gray-600 text-lg`}>Cancel</Text>
          </TouchableOpacity>
          <Text style={tw`text-gray-900 text-lg font-semibold`}>
            Add New Friend
          </Text>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isLoading || !name.trim() || contactFrequency < 1}
            style={tw`p-2`}
          >
            <Text
              style={tw`text-primary text-lg font-semibold ${
                isLoading || !name.trim() || contactFrequency < 1
                  ? 'opacity-50'
                  : ''
              }`}
            >
              {isLoading ? 'Adding...' : 'Add'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={tw`flex-1 px-4 py-6`}>
          <View style={tw`items-center mb-8`}>
            <Avatar.Text
              size={80}
              label={name.charAt(0).toUpperCase() || '?'}
              style={tw`bg-primary`}
              labelStyle={tw`text-white text-2xl font-bold`}
            />
            <Text style={tw`text-gray-600 text-sm mt-2`}>
              {name ? `${name}'s avatar` : 'Friend avatar preview'}
            </Text>
          </View>

          {/* Form Fields */}
          <View style={tw`gap-4`}>
            {/* Name Field */}
            <View>
              <Text style={tw`text-gray-700 font-medium mb-2`}>Name *</Text>
              <TextInput
                style={tw`bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pb-4 text-gray-900 text-base`}
                placeholder="Enter friend's name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoCorrect={false}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Contact Frequency Field */}
            <View>
              <Text style={tw`text-gray-700 font-medium mb-2`}>
                Contact Frequency (days) *
              </Text>
              <TextInput
                style={tw`bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pb-4 text-gray-900 text-base`}
                placeholder="How often to contact (1-365 days)"
                value={contactFrequency > 0 ? contactFrequency.toString() : ''}
                onChangeText={(text) => {
                  if (text === '') {
                    setContactFrequency(0);
                  } else {
                    const num = parseInt(text, 10);
                    if (!isNaN(num) && num > 0) {
                      setContactFrequency(num);
                    }
                  }
                }}
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
              <Text style={tw`text-gray-500 text-xs mt-1`}>
                How often you'd like to be reminded to contact this friend
              </Text>
            </View>

            {/* Group Selection Field */}
            <View>
              <Text style={tw`text-gray-700 font-medium mb-2`}>
                Group (Optional)
              </Text>
              {groupsLoading ? (
                <View
                  style={tw`bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 items-center`}
                >
                  <LoadingSpinner />
                </View>
              ) : groupsError ? (
                <View
                  style={tw`bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 items-center`}
                >
                  <ErrorMessage />
                </View>
              ) : (
                <TouchableOpacity
                  style={tw`bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 flex-row items-center justify-between`}
                  onPress={() => setShowGroupDropdown(true)}
                  activeOpacity={0.8}
                >
                  <Text style={tw`text-gray-900 text-base`}>
                    {getSelectedGroupName()}
                  </Text>
                  <Icon
                    source="chevron-down"
                    color={tw.color('gray-400')}
                    size={24}
                  />
                </TouchableOpacity>
              )}
              <Text style={tw`text-gray-500 text-xs mt-1`}>
                Choose a group to organize your friends (optional)
              </Text>
            </View>
          </View>

          {/* Helper Text */}
          <View style={tw`mt-6 p-4 bg-blue-50 rounded-xl`}>
            <Text style={tw`text-blue-800 text-sm`}>
              💡 <Text style={tw`font-semibold`}>Tip:</Text> Setting a contact
              frequency will help you maintain meaningful relationships by
              reminding you to reach out regularly!
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Group Selection Modal */}
      <Modal
        visible={showGroupDropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setShowGroupDropdown(false)}
      >
        <TouchableOpacity
          style={tw`flex-1 bg-black bg-opacity-50 justify-center px-4`}
          activeOpacity={1}
          onPress={() => setShowGroupDropdown(false)}
        >
          <TouchableOpacity
            style={tw`bg-white rounded-xl max-h-80`}
            activeOpacity={1}
          >
            <View style={tw`p-4 border-b border-gray-200`}>
              <Text style={tw`text-lg font-semibold text-gray-900 text-center`}>
                Select Group
              </Text>
            </View>
            <FlatList
              data={[{ id: null, name: 'No Group' }, ...(groups || [])]}
              keyExtractor={(item) => item.id || 'no-group'}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={tw.style(
                    `px-4 py-3 border-b border-gray-100`,
                    selectedGroupId === item.id ? 'bg-primary-50' : '',
                  )}
                  onPress={() => handleGroupSelect(item.id)}
                  activeOpacity={0.8}
                >
                  <View style={tw`flex-row items-center justify-between`}>
                    <Text
                      style={tw.style(
                        `text-base`,
                        selectedGroupId === item.id
                          ? 'text-primary font-semibold'
                          : 'text-gray-900',
                      )}
                    >
                      {item.name}
                    </Text>
                    {selectedGroupId === item.id && (
                      <Text style={tw`text-primary text-lg`}>✓</Text>
                    )}
                  </View>
                </TouchableOpacity>
              )}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </Modal>
  );
}
