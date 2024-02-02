import React, { useState } from "react";
import { View, Text, Alert, TextInput } from "react-native";
import { Button, ScreenContainer, OSText, Toggle } from "../../components";
import { Ticket, Incident } from "../../models/types";
import { style } from "./styles";
import { converToBoolean } from "../../util/convertToBoolean";
import axios from "axios";

//TODO: create ticket object and types
//TODO: submit ticket
//TODO: loader when a ticket is being submitted
//TODO: input error handling and validation
//TODO: comments limit character
//TODO: error if ticket can't be submitted
//TODO: clear states if ticket was successful
//TODO: better styling for Screen
//TODO: sub list with available options

export const CreateTicketScreen: React.FC = () => {
  const [comment, setComment] = useState<string>("");
  const [site, setSite] = useState<string>("");
  const [incidentType, setIncident] = useState<Incident>(undefined);
  const [emergency, setEmergancy] = useState<string>("No");

  const createTicket = () => {
    const ticket: Partial<Ticket> = {
      site,
      incidentType,
      emergancy: converToBoolean(emergency),
    };

    const result = axios.post("", ticket);
  };

  const handleIncidentInput = (text: string) => {
    setIncident(text as Incident);
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
              <TextInput style={style.input} placeholder="Start typing..." onChangeText={handleIncidentInput} />
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
