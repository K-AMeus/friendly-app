import { Button } from 'react-native-paper';
import React from 'react';
import tw from '@/lib/tw';

export default function HomeHeader() {
  return (
    <>
      <Button icon="plus" mode="contained" buttonColor={tw.color('primary')}>
        Add friend
      </Button>
      <Button icon="account" mode="contained" buttonColor={tw.color('primary')}>
        Profile
      </Button>
    </>
  );
}
