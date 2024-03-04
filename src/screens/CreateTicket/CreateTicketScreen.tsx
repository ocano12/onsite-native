import React, { useState, useCallback, useRef, useEffect } from "react";
import { View, Text, Alert, TextInput, Modal } from "react-native";
import { Button, ScreenContainer, OSText, Toggle, OSTextInput } from "../../components";
import { Incident, SearchData, TicketPayload, Site } from "../../models/types";
import axios, { AxiosError } from "axios";
import Config from "react-native-config";
import { useNavigation } from "@react-navigation/native";
import { useGetAllSitesQuery } from "../../api/site";
import { converToBoolean } from "../../util/convertToBoolean";
import { theme } from "../../styles/theme";
import { style } from "./styles";
import { Icons } from "../../icons";
import { useCreateTicketMutation } from "../../api/tickets";

//TODO: use Formink for validations.
//TODO: convert searchable input fields into a component
//TODO: search animations and transations
//TODO: change toggle to accept what the current state is.
//TODO: input error handling and validation
//TODO: comments limit character
//TODO: error if ticket can't be submitted with Modal Alert might be ok now just to track
//TODO: better styling for Screen
//TODO: make api calls utils
//TODO: create a util function for axios errors
//TODO: error ui if something goes wrong with a Retry

export const CreateTicketScreen: React.FC = () => {
    const [comment, setComment] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [selectedSite, setSelectedSite] = useState<Site | undefined>();
    const [incidentType, setIncident] = useState<Incident>("");
    const [emergency, setEmergancy] = useState<string>("No");

    const siteInputRef = useRef<TextInput>(null);

    const navigation = useNavigation();

    const { data: sites, error } = useGetAllSitesQuery();
    const [createTicket, { isLoading }] = useCreateTicketMutation();

    useEffect(() => {
        if (error) {
            Alert.alert("Something went wrong");
        }
    }, [error]);

    //temp values
    const userID = 1;

    const resetState = () => {
        setComment("");
        setIncident("");
        setEmergancy("No");
    };

    const handleCreateTicket = async () => {
        const ticket: TicketPayload = {
            title,
            status: "Open",
            siteID: selectedSite?.id,
            incidentType,
            emergancy: converToBoolean(emergency),
            comment,
            userID,
        };

        try {
            console.log(isLoading);
            await createTicket(ticket).unwrap();
            Alert.alert("Ticket saved Successfully");
        } catch (error) {
            console.log(error);
            Alert.alert("Failed to Save Ticket");
        }
    };

    const handleTitleInput = (text: string) => {
        setTitle(text);
    };

    const handleIncidentInput = useCallback(
        (text: string) => {
            setIncident(text as Incident);
        },
        [setIncident],
    );

    const handleSiteInputFocus = () => {
        siteInputRef.current && siteInputRef?.current.blur();

        const data: SearchData[] = sites.map(site => ({
            id: site.id,
            title: site.name,
            subTitle: `${site.address_1}, ${site.city} ${site.state}, ${site.zip_code}`,
            icon: site.isResidential ? <Icons name="home" fill={theme.colors.primary} size="xlarge" /> : <Icons name="building" fill={theme.colors.primary} size="xlarge" />,
        }));
        //TODO: look at this low prio
        //@ts-ignore
        navigation.navigate("Search" as never, {
            data,
            onItemSelect: (siteID: number) => {
                setSelectedSite(sites?.find(site => site.id === siteID));
            },
        });
    };

    const onEmergancyChange = useCallback((value: string) => {
        setEmergancy(value);
    }, []);

    //TODO; if site and incident are selected should  ichange the UI to show they are selected? could be

    return (
        <>
            <ScreenContainer>
                <View style={{ flex: 1, padding: 11 }}>
                    <View style={{ marginBottom: 10 }}>
                        <OSText size="xlarge" fontWeight="bold" text="Create Ticket" lineHeight={50} />
                    </View>
                    <View>
                        <View>
                            <View>
                                <OSText text="Title" />
                                <OSTextInput style={style.input} placeholder="Start typing..." value={title} onChangeText={handleTitleInput} />
                            </View>
                            <View>
                                <OSText text="Site" />
                                <OSTextInput style={style.input} placeholder="Start typing..." value={selectedSite?.name} onFocus={handleSiteInputFocus} ref={siteInputRef} />
                            </View>
                            <View>
                                <OSText text="Incident Type" />
                                <OSTextInput style={style.input} placeholder="Start typing..." onChangeText={handleIncidentInput} value={incidentType} />
                            </View>
                            <View>
                                <OSText text="Emergency?" />

                                <Toggle
                                    options={[
                                        { label: "Yes", value: "Yes" },
                                        { label: "No", value: "No", active: true },
                                    ]}
                                    onValueChange={onEmergancyChange}
                                    value={emergency}
                                />
                            </View>
                            <View>
                                <OSText text="Comments" />
                                <TextInput multiline placeholder="Add a comment..." numberOfLines={4} onChangeText={setComment} value={comment} style={[style.area, { marginBottom: 20 }]} />
                            </View>
                        </View>
                        <View>
                            <Button title="Create Ticket" onPress={handleCreateTicket} isLoading={isLoading} />
                        </View>
                    </View>
                </View>
            </ScreenContainer>
        </>
    );
};
