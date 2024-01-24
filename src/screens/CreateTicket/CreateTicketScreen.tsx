import React from 'react';
import { View, Text, PixelRatio } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';

export const CreateTicketScreen: React.FC = () => {
  const density = PixelRatio.get();
  console.log('density', density);
  return (
    <ScreenContainer>
      <View>
        <Text style={{ fontSize: 45, fontWeight: '600' }}>Create Ticket</Text>
      </View>
      {/* Add your components and logic for the Create Ticket screen */}
    </ScreenContainer>
  );
};
