import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export function LoadingSpinner() {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
