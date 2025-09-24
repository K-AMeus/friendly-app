import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import tw from '@/lib/tw';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarActiveTintColor: tw.color('primary'),
          tabBarIcon: ({ size }) => (
            <FontAwesome name="home" size={size} color={tw.color('primary')} />
          ),
        }}
      />
      <Tabs.Screen
        name="Feed"
        options={{
          title: 'Feed',
          tabBarActiveTintColor: tw.color('primary'),
          tabBarIcon: ({ size }) => (
            <FontAwesome name="list" size={size} color={tw.color('primary')} />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: 'Settings',
          tabBarActiveTintColor: tw.color('primary'),
          tabBarIcon: ({ size }) => (
            <FontAwesome name="cog" size={size} color={tw.color('primary')} />
          ),
        }}
      />
    </Tabs>
  );
}
