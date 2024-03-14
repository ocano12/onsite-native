import React, { useState, useCallback, useRef, useEffect } from "react";
import { View, Text, Alert, TextInput, Modal } from "react-native";
import { Button, ScreenContainer, OSText, Toggle, OSTextInput } from "../../components";
import { CreateTicketForm, SearchData, TicketPayload, Site, CreateScreenRouteProp } from "../../models/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useGetAllSitesQuery } from "../../api/site";
import { CreateTicketSchema } from "../../validations";
import { theme } from "../../styles/theme";
import { style } from "./styles";
import { useCreateTicketMutation } from "../../api/tickets";
import { Formik, useFormikContext } from "formik";
import { isEmpty } from "lodash";

//TODO: form loading states when submitting after reset it stayed submitting.
//TODO: convert searchable input fields into a component
//TODO: search animations and transations
//TODO: input error handling and validation
//TODO: comments limit character
//TODO: error if ticket can't be submitted with Modal Alert might be ok now just to track
//TODO: better styling for Screen
//TODO: error ui if something goes wrong with a Retry

export const CreateTicketScreen: React.FC = () => {
    const siteInputRef = useRef<TextInput>(null);
    const navigation = useNavigation();
    const { data: sites, error } = useGetAllSitesQuery();
    const [createTicket, { isLoading }] = useCreateTicketMutation();

    const { params } = useRoute<CreateScreenRouteProp>();

    let selectedSiteName: string;

    //TODO: check this
    // useEffect(() => {
    //     if (error) {
    //         Alert.alert("Something went wrong");
    //     }
    // }, [error]);

    //temp values
    const userID = 1;

    const handleCreateTicket = async ({ title, incidentType, emergency, comment }: CreateTicketForm) => {
        const ticket: TicketPayload = {
            title,
            status: "Open",
            siteID: params?.id,
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

    const handleSiteInputFocus = useCallback(() => {
        if (!sites) {
            return;
        }

        siteInputRef.current && siteInputRef?.current.blur();

        const data: SearchData[] = sites.map(site => ({
            id: site.id,
            title: site.name,
            subTitle: `${site.address_1}, ${site.city} ${site.state}, ${site.zip_code}`,
            icon: site.isResidential ? "home" : "building",
        }));

        //@ts-ignore
        navigation.navigate("Search" as never, {
            data,
        });
    }, [siteInputRef, sites, navigation, params?.id]); // Dependencies

    //TODO; if site and incident are selected should  ichange the UI to show they are selected? could be

    return (
        <ScreenContainer>
            <View style={{ flex: 1, padding: 11 }}>
                <View style={{ marginBottom: 10 }}>
                    <OSText size="xlarge" fontWeight="bold" text="Create Ticket" lineHeight={50} />
                </View>
                <Formik
                    initialValues={{ title: "", siteName: "", incidentType: "", emergency: false, comment: "" }}
                    validationSchema={CreateTicketSchema}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={(values, { resetForm }) => {
                        handleCreateTicket(values);
                        resetForm();
                    }}>
                    {({ handleChange, handleSubmit, setFieldValue, values, errors, isSubmitting }) => {
                        //TODO: look at this later...
                        useEffect(() => {
                            setFieldValue("siteName", sites?.find(site => site.id === params?.id)?.name ?? "");
                        }, [params?.id]);
                        return (
                            <>
                                {console.log(errors)}
                                {/* {console.log(values)}r */}
                                <View>
                                    <OSText text="Title" />
                                    <OSTextInput style={style.input} placeholder="Start typing..." value={values.title} onChangeText={handleChange("title")} />
                                </View>
                                <View>
                                    <OSText text="Site" />
                                    <OSTextInput style={style.input} placeholder="Start typing..." value={values.siteName} onFocus={() => handleSiteInputFocus()} ref={siteInputRef} />
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
                                    <Button title="Create Ticket" onPress={handleSubmit} isLoading={isSubmitting} />
                                </View>
                            </>
                        );
                    }}
                </Formik>
            </View>
        </ScreenContainer>
    );
};
