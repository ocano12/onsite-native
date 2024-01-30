import React, { useState } from 'react';
import { View, Text, Alert, TextInput } from 'react-native';
import { Button, ScreenContainer, OSText } from '../../components';
import { theme } from '../../styles/theme';
import { style } from './styles';

export const CreateTicketScreen: React.FC = () => {
  const [comment, setComment] = useState<string>('');
  const [site, setSite] = useState<string>('');
  const [incident, setIncident] = useState<string>('');

  const createTicket = () => {
    const ticket = {
      site,
      incident,
      comment,
    };
    Alert.alert(site, incident);
  };

  return (
    <ScreenContainer>
      <View style={{ flex: 1, padding: 10 }}>
        <View style={{ marginBottom: 20 }}>
          <OSText size="xxl" fontWeight="bold" text="Create Ticket" lineHeight={50} />
        </View>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View>
            <OSText text="Site" />
            <TextInput style={style.input} placeholder="Start typing..." onChangeText={setSite} />

            <OSText text="Incident Type" />
            <TextInput style={style.input} placeholder="Start typing..." onChangeText={setIncident} />

            <OSText text="Emergency" />

            <OSText text="Comments" />
            <TextInput multiline placeholder="Add a comment..." numberOfLines={4} onChangeText={setComment} value={comment} style={[style.area, { marginBottom: 20 }]} />
          </View>
          <View>
            <Button title="Create Ticket" onPress={createTicket} />
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};
