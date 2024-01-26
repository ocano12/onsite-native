import React, { useState } from 'react';
import { View, Text, Alert, TextInput } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Button } from '../../components/Button';
import { theme } from '../../styles/theme';
import { style } from './styles';

export const CreateTicketScreen: React.FC = () => {
  const [comment, setComment] = useState<string>('');

  const createTicket = () => {
    Alert.alert('Ticket created');
  };

  return (
    <ScreenContainer>
      <View style={{ flex: 1 }}>
        <View>
          <Text style={{ fontSize: 45, fontWeight: '600' }}>Create Ticket</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: theme.font.default, lineHeight: 30 }}>
            Comments
          </Text>
          <TextInput
            multiline
            placeholder="Add a comment..."
            numberOfLines={4}
            onChangeText={setComment}
            value={comment}
            style={style.area}
          />
        </View>
        <View>
          <Button title="Create Ticket" onPress={createTicket} />
        </View>
      </View>
    </ScreenContainer>
  );
};
