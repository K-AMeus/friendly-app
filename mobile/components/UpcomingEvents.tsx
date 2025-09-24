import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import tw from '@/lib/tw';

// Sample data
const upcomingEvents = [
  {
    id: 1,
    friendName: 'Sarah Johnson',
    event: 'Birthday',
    when: 'Tomorrow, 2:00 PM',
    type: 'celebration',
  },
  {
    id: 2,
    friendName: 'Mike Chen',
    event: 'Birthday party',
    when: 'Friday, 7:00 PM',
    type: 'celebration',
  },
  {
    id: 3,
    friendName: 'Emma Wilson',
    event: 'Movie night',
    when: 'Next Tuesday, 8:00 PM',
    type: 'entertainment',
  },
];

const getEventIcon = (type: string) => {
  switch (type) {
    case 'coffee':
      return '☕';
    case 'celebration':
      return '🎉';
    case 'entertainment':
      return '🎬';
    default:
      return '📅';
  }
};

const getEventColor = (type: string) => {
  switch (type) {
    case 'coffee':
      return 'bg-amber-50 border-amber-200';
    case 'celebration':
      return 'bg-pink-50 border-pink-200';
    case 'entertainment':
      return 'bg-blue-50 border-blue-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};

export default function UpcomingEvents() {
  return (
    <View style={tw`w-full px-4`}>
      <Text style={tw`text-gray-800 text-xl font-bold mb-4`}>
        Upcoming Events
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={tw`-mx-4`}
      >
        <View style={tw`flex-row gap-3 px-4`}>
          {upcomingEvents.map((event) => (
            <View
              key={event.id}
              style={tw`${getEventColor(event.type)} border rounded-xl p-3 min-w-64`}
            >
              <View style={tw`flex-row items-center mb-2`}>
                <Text style={tw`text-2xl mr-2`}>
                  {getEventIcon(event.type)}
                </Text>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-gray-900 font-semibold text-base`}>
                    {event.friendName}
                  </Text>
                  <Text style={tw`text-gray-600 text-sm`}>{event.when}</Text>
                </View>
              </View>

              <View style={tw`bg-white rounded-lg p-3`}>
                <Text style={tw`text-gray-800 font-medium`}>{event.event}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
