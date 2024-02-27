import React, { useState, useCallback, useRef } from "react";
import { View, Text, Alert, TextInput } from "react-native";
import { Button, ScreenContainer, OSText, Toggle } from "../../components";
import { Incident, SearchData, TicketPayload } from "../../models/types";
import { style } from "./styles";
import { converToBoolean } from "../../util/convertToBoolean";
import axios, { AxiosError } from "axios";
import Config from "react-native-config";
import { useNavigation } from "@react-navigation/native";
import { useGetAllSitesQuery } from "../../api/site";
import { Icons } from "../../icons";

//TODO: convert searchable input fields into a component
//TODO: search animations and transations
//TODO: change toggle to accept what the current state is.
//TODO: input error handling and validation
//TODO: comments limit character
//TODO: error if ticket can't be submitted with Modal Alert might be ok now just to track
//TODO: better styling for Screen
//TODO: make api calls utils
//TODO: create a util function for axios errors

export const CreateTicketScreen: React.FC = () => {
    const [comment, setComment] = useState<string>("");
    const [site, setSite] = useState<string>("");
    const [incidentType, setIncident] = useState<Incident>("");
    const [emergency, setEmergancy] = useState<string>("No");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const siteInputRef = useRef<TextInput>(null);

    const navigation = useNavigation();
    // const {data: sites, error} = useGetAllSitesQuery();

    //TODO:remove this
    const sites = [
        {
            id: 1,
            name: "Orlando Cano",
            addressID: 1,
            isResidential: true,
            dateCreated: new Date(),
            dateModified: new Date(),
            createdBy: 1,
            modifiedBy: 1,
        },
        {
            id: 1,
            name: "Miami Heat",
            addressID: 2,
            isResidential: false,
            dateCreated: new Date(),
            dateModified: new Date(),
            createdBy: 1,
            modifiedBy: 1,
        },
    ];

    //temp values
    const siteID = 2;
    const title = "Orlando second ticket from app";
    const userID = 1;

    const resetState = () => {
        setComment("");
        setSite("");
        setIncident("");
        setEmergancy("No");
        setIsLoading(false);
    };

    const createTicket = async () => {
        setIsLoading(true);

        const ticket: TicketPayload = {
            title,
            status: "Open",
            siteID,
            incidentType,
            emergancy: converToBoolean(emergency),
            comment,
            userID,
        };

        //TODO: this might change now that im using RTK so that the store stays synced
        try {
            const response = await axios.post(Config.ONSITE_API_HOST + "/create-ticket", ticket);
            if (response.status === 200) {
                // Alert.alert("Ticket Created", `${response.data.id}`);
                resetState();
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                console.error(axiosError.message);
                if (axiosError.response) {
                    Alert.alert(`Something went wrong. Try again!`);
                } else {
                    Alert.alert("An unexpected error occurred");
                }
            } else {
                // Handle non-Axios errors
                console.error(error);
                Alert.alert("An error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSiteInput = useCallback(
        (text: string) => {
            setSite(text as string);
        },
        [setSite],
    );

    const handleIncidentInput = useCallback(
        (text: string) => {
            setIncident(text as Incident);
        },
        [setIncident],
    );

    const handleSiteInputFocus = () => {
        siteInputRef.current && siteInputRef?.current.blur();

        const data: SearchData[] = sites.map(site => ({
            title: site.name,
            icon: site.isResidential ? <Icons name="home" fill={"black"} size="medium" /> : <Icons name="home" fill={"black"} size="medium" />,
        }));
        //TODO: look at this low prio
        //@ts-ignore
        navigation.navigate("Search" as never, {
            data,
        });
    };

    const onEmergancyChange = useCallback((value: string) => {
        setEmergancy(value);
    }, []);

    return (
        <ScreenContainer>
            <View style={{ flex: 1, padding: 11 }}>
                <View style={{ marginBottom: 10 }}>
                    <OSText size="xlarge" fontWeight="bold" text="Create Ticket" lineHeight={50} />
                </View>
                <View>
                    <View>
                        <View>
                            <OSText text="Site" />
                            <TextInput style={style.input} placeholder="Start typing..." onChangeText={handleSiteInput} value={site} onFocus={handleSiteInputFocus} ref={siteInputRef} />
                        </View>
                        <View>
                            <OSText text="Incident Type" />
                            <TextInput style={style.input} placeholder="Start typing..." onChangeText={handleIncidentInput} value={incidentType} />
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
                        <Button title="Create Ticket" onPress={createTicket} isLoading={isLoading} />
                    </View>
                </View>
            </View>
        </ScreenContainer>
    );
};
