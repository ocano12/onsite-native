import React, { useState, useCallback, useRef, useEffect } from "react";
import { View, Text, Alert, TextInput, Modal } from "react-native";
import { Button, ScreenContainer, OSText, Toggle, OSTextInput } from "../../components";
import { CreateTicketForm, SearchData, TicketPayload, Site } from "../../models/types";
import { useNavigation } from "@react-navigation/native";
import { useGetAllSitesQuery } from "../../api/site";
import { CreateTicketSchema } from "../../validations";
import { theme } from "../../styles/theme";
import { style } from "./styles";
import { Icons } from "../../icons";
import { useCreateTicketMutation } from "../../api/tickets";
import { Formik } from "formik";

//TODO: convert searchable input fields into a component
//TODO: search animations and transations
//TODO: input error handling and validation
//TODO: comments limit character
//TODO: error if ticket can't be submitted with Modal Alert might be ok now just to track
//TODO: better styling for Screen
//TODO: error ui if something goes wrong with a Retry

export const CreateTicketScreen: React.FC = () => {
    const [selectedSite, setSelectedSite] = useState<Site | undefined>();
    const siteInputRef = useRef<TextInput>(null);
    const navigation = useNavigation();
    const { data: sites, error } = useGetAllSitesQuery();
    const [createTicket, { isLoading }] = useCreateTicketMutation();

    //TODO: check this
    useEffect(() => {
        if (error) {
            Alert.alert("Something went wrong");
        }
    }, [error]);

    //temp values
    const userID = 1;

    const handleCreateTicket = async ({ title, siteID, incidentType, emergency, comment }: CreateTicketForm) => {
        const ticket: TicketPayload = {
            title,
            status: "Open",
            siteID,
            incidentType,
            emergency,
            comment,
            userID,
        };

        try {
            await createTicket(ticket).unwrap();
            Alert.alert("Ticket saved Successfully");
        } catch (error) {
            console.log(error);
            Alert.alert("Failed to Save Ticket");
        }
    };

    const handleSiteInputFocus = (setFieldValue: any) => {
        siteInputRef.current && siteInputRef?.current.blur();

        //TODO: a way to retry to get sites. probably a pull down
        if (!sites) {
            return;
        }

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
                setFieldValue("siteID", sites?.find(site => site.id === siteID)?.id, true);
                setSelectedSite(sites?.find(site => site.id === siteID));
            },
        });
    };

    //TODO; if site and incident are selected should  ichange the UI to show they are selected? could be

    return (
        <ScreenContainer>
            <View style={{ flex: 1, padding: 11 }}>
                <View style={{ marginBottom: 10 }}>
                    <OSText size="xlarge" fontWeight="bold" text="Create Ticket" lineHeight={50} />
                </View>
                <Formik initialValues={{ title: "", siteID: -1, incidentType: "", emergency: false, comment: "" }} onSubmit={values => handleCreateTicket(values)}>
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
                        <>
                            <View>
                                <OSText text="Title" />
                                <OSTextInput style={style.input} placeholder="Start typing..." value={values.title} onChangeText={handleChange("title")} />
                            </View>
                            <View>
                                <OSText text="Site" />
                                <OSTextInput style={style.input} placeholder="Start typing..." value={selectedSite?.name} onFocus={() => handleSiteInputFocus(setFieldValue)} ref={siteInputRef} />
                            </View>
                            <View>
                                <OSText text="Incident Type" />
                                <OSTextInput style={style.input} placeholder="Start typing..." onChangeText={handleChange("incidentType")} value={values.incidentType} />
                            </View>
                            <View>
                                <OSText text="Emergency?" />

                                <Toggle
                                    options={[
                                        { label: "Yes", value: true },
                                        { label: "No", value: false },
                                    ]}
                                    onValueChange={(value: boolean) => setFieldValue("emergency", value)}
                                    value={values.emergency as boolean}
                                />
                            </View>
                            <View>
                                <OSText text="Comments" />
                                <TextInput multiline placeholder="Add a comment..." numberOfLines={4} onChangeText={handleChange("comment")} value={values.comment} style={[style.area, { marginBottom: 20 }]} />
                            </View>
                            <View>
                                <Button title="Create Ticket" onPress={handleSubmit} isLoading={isLoading} />
                            </View>
                        </>
                    )}
                </Formik>
            </View>
        </ScreenContainer>
    );
};
