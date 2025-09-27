import React from 'react';
import { View, Text } from 'react-native';
import tw from '@/lib/tw';

interface ContactStatusProps {
  lastContacted: Date | string;
  contactFrequency: number;
}

const ContactStatus: React.FC<ContactStatusProps> = ({
  lastContacted,
  contactFrequency,
}) => {
  const calculateDaysLeft = () => {
    const lastContactedDate = new Date(lastContacted);
    const today = new Date();

    lastContactedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const nextContactDate = new Date(lastContactedDate);
    nextContactDate.setDate(lastContactedDate.getDate() + contactFrequency);

    const diffTime = nextContactDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysLeft = calculateDaysLeft();

  const getStatusStyle = () => {
    if (daysLeft <= 0) {
      return {
        container: tw`bg-red-100`,
        text: tw`text-red-800`,
      };
    }
    if (daysLeft === 1) {
      return {
        container: tw`bg-orange-100`,
        text: tw`text-orange-800`,
      };
    }
    if (daysLeft >= 2 && daysLeft <= 3) {
      return {
        container: tw`bg-yellow-100`,
        text: tw`text-yellow-800`,
      };
    }
    if (daysLeft >= 4 && daysLeft <= 6) {
      return {
        container: tw`bg-green-100`,
        text: tw`text-green-800`,
      };
    }
    return {
      container: tw`bg-gray-100`,
      text: tw`text-gray-800`,
    };
  };

  const getStatusText = () => {
    if (daysLeft < 0) {
      return `${Math.abs(daysLeft)} days late`;
    }
    if (daysLeft === 0) {
      return 'Contact today';
    }
    if (daysLeft === 1) {
      return '1 day left';
    }
    return `${daysLeft} days left`;
  };

  const { container, text } = getStatusStyle();

  return (
    <View style={[tw`px-2 py-1 rounded-full`, container]}>
      <Text style={[tw`font-semibold text-xs`, text]}>{getStatusText()}</Text>
    </View>
  );
};

export default ContactStatus;
