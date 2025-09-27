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
} from 'react-native';
import { Icon } from 'react-native-paper';
import tw from '@/lib/tw';

interface AddGroupModalProps {
  visible: boolean;
  onClose: () => void;
  onAddGroup: (groupData: { name: string }) => void;
}

export default function AddGroupModal({
  visible,
  onClose,
  onAddGroup,
}: AddGroupModalProps) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert('Missing Information', 'Please enter a group name.');
      return;
    }

    if (name.trim().length < 2) {
      Alert.alert(
        'Invalid Name',
        'Group name must be at least 2 characters long.',
      );
      return;
    }

    if (name.trim().length > 25) {
      Alert.alert(
        'Name Too Long',
        'Group name must be less than 25 characters.',
      );
      return;
    }

    setIsLoading(true);

    try {
      onAddGroup({
        name: name.trim(),
      });

      setName('');
      onClose();
    } catch {
      Alert.alert('Error', 'Failed to create group. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setName('');
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
            Create New Group
          </Text>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isLoading || !name.trim() || name.trim().length < 2}
            style={tw`p-2`}
          >
            <Text
              style={tw`text-primary text-lg font-semibold ${
                isLoading || !name.trim() || name.trim().length < 2
                  ? 'opacity-50'
                  : ''
              }`}
            >
              {isLoading ? 'Creating...' : 'Create'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={tw`flex-1 px-4 py-6`}>
          <View style={tw`items-center mb-8`}>
            <View
              style={tw`w-20 h-20 bg-primary rounded-full items-center justify-center mb-2`}
            >
              <Icon source="account-group" color="white" size={40} />
            </View>
            <Text style={tw`text-gray-600 text-sm mt-2`}>
              {name ? `${name} group` : 'Group preview'}
            </Text>
          </View>

          {/* Form Fields */}
          <View style={tw`gap-4`}>
            {/* Name Field */}
            <View>
              <Text style={tw`text-gray-700 font-medium mb-2`}>
                Group Name *
              </Text>
              <TextInput
                style={tw`bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pb-4 text-gray-900 text-base`}
                placeholder="Enter group name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoCorrect={false}
                placeholderTextColor="#9CA3AF"
                maxLength={25}
                autoFocus
              />
              <Text style={tw`text-gray-500 text-xs mt-1`}>
                Choose a name that describes this group of friends
              </Text>
            </View>
          </View>

          {/* Helper Text */}
          <View style={tw`mt-6 p-4 bg-blue-50 rounded-xl`}>
            <Text style={tw`text-blue-800 text-sm`}>
              💡 <Text style={tw`font-semibold`}>Tip:</Text> Groups help you
              organize your friends by categories like Family, Work, School, or
              Hobbies. You can filter your friends list by group!
            </Text>
          </View>

          {/* Examples */}
          <View style={tw`mt-4`}>
            <Text style={tw`text-gray-600 text-sm font-medium mb-2`}>
              Popular group names:
            </Text>
            <View style={tw`flex-row flex-wrap gap-2`}>
              {[
                '😻 Besties',
                '💅 Baddies',
                '👮 Hooligans',
                '🏋️‍♀️ Workout Buddies',
                '🎓 College',
              ].map((example) => (
                <TouchableOpacity
                  key={example}
                  onPress={() => setName(example)}
                  style={tw`px-3 py-1.5 bg-gray-100 rounded-full`}
                  activeOpacity={0.7}
                >
                  <Text style={tw`text-gray-700 text-sm`}>{example}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
