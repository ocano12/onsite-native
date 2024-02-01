import React, { useState } from "react";
import { View, Text, Alert, TextInput } from "react-native";
import { Button, ScreenContainer, OSText, Toggle } from "../../components";
import { theme } from "../../styles/theme";
import { style } from "./styles";

export const CreateTicketScreen: React.FC = () => {
  const [comment, setComment] = useState<string>("");
  const [site, setSite] = useState<string>("");
  const [incident, setIncident] = useState<string>("");
  const [emergency, setEmergancy] = useState<string>("No");

  const createTicket = () => {
    const ticket = {
      site,
      incident,
      comment,
    };
  };

  return (
    <ScreenContainer>
      <View style={{ flex: 1, padding: 10 }}>
        <View style={{ marginBottom: 20 }}>
          <OSText size="xxl" fontWeight="bold" text="Create Ticket" lineHeight={50} />
        </View>
        <View>
          <View>
            <View>
              <OSText text="Site" />
              <TextInput style={style.input} placeholder="Start typing..." onChangeText={setSite} />
            </View>
            <View>
              <OSText text="Incident Type" />
              <TextInput style={style.input} placeholder="Start typing..." onChangeText={setIncident} />
            </View>
            <View>
              <OSText text="Emergency?" />
              <Toggle
                options={[
                  { label: "Yes", value: "Yes" },
                  { label: "No", value: "No", active: true },
                ]}
                onValueChange={(value: string) => setEmergancy(value)}
              />
            </View>
            <View>
              <OSText text="Comments" />
              <TextInput multiline placeholder="Add a comment..." numberOfLines={4} onChangeText={setComment} value={comment} style={[style.area, { marginBottom: 20 }]} />
            </View>
          </View>
          <View>
            <Button title="Create Ticket" onPress={createTicket} />
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};
