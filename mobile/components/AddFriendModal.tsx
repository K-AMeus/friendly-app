import React from 'react';
import { Text } from 'react-native';

export default function AddFriendModal({
  visible,
  onClose,
  onAddFriend,
}: {
  visible: boolean;
  onClose: () => void;
  onAddFriend: (friendData: { name: string; contactFrequency: number }) => void;
}) {
  return <></>;
}
