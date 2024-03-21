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
import { isEmpty } from "lodash";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//TODO: form loading states when submitting after reset it stayed submitting.
//TODO: convert searchable input fields into a component
//TODO: search animations and transations
//TODO: input error handling and validation
//TODO: comments limit character
//TODO: error if ticket can't be submitted with Modal Alert might be ok now just to track
//TODO: better styling for Screen
//TODO: error ui if something goes wrong with a Retry
//TODO: refactor Controller so its an easier component to write.

export const CreateTicketScreen: React.FC = () => {
    const siteInputRef = useRef<TextInput>(null);
    const navigation = useNavigation();
    const { data: sites, error } = useGetAllSitesQuery();
    const [createTicket, { isLoading }] = useCreateTicketMutation();

    const defaultValues = {
        title: "",
        siteName: "",
        incidentType: "",
        emergency: false,
        comment: "",
    };

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreateTicketForm>({
        defaultValues: defaultValues,
        resolver: yupResolver(CreateTicketSchema),
    });

    const { params } = useRoute<CreateScreenRouteProp>();

    // TODO: check this
    useEffect(() => {
        if (error) {
            Alert.alert("Something went wrong");
        }
    }, [error]);

    useEffect(() => {
        params?.id && setValue("siteName", sites?.find(site => site.id === params?.id)?.name ?? "", { shouldValidate: true });
    }, [params?.id]);

    //temp values
    const userID = 1;

    const onSubmit = async (data: CreateTicketForm) => {
        const { title, incidentType, emergency, comment } = data;

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
            reset(defaultValues);
        } catch (error) {
            console.log(error);
            Alert.alert("Failed to Save Ticket");
        }
    };

    const handleSiteInputFocus = useCallback(() => {
        console.log(sites);
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
    }, [siteInputRef, sites, navigation, params?.id]);

    console.log(isSubmitting);

    //TODO; if site and incident are selected should  ichange the UI to show they are selected? could be
    return (
        <ScreenContainer>
            <View style={{ flex: 1, padding: 11 }}>
                <View style={{ marginBottom: 10 }}>
                    <OSText size="xlarge" fontWeight="bold" text="Create Ticket" lineHeight={50} />
                </View>
                <View>
                    <OSText text="Title" />
                    <Controller name="title" control={control} render={({ field: { onChange, value } }) => <OSTextInput placeholder="Start typing..." value={value} onChangeText={onChange} error={errors.title} />} />
                </View>
                <View>
                    <OSText text="Site" />
                    <Controller name="siteName" control={control} render={({ field: { value } }) => <OSTextInput placeholder="Start typing..." value={value} onFocus={() => handleSiteInputFocus()} ref={siteInputRef} error={errors.siteName} />} />
                </View>
                <View>
                    <OSText text="Incident Type" />
                    <Controller name="incidentType" control={control} render={({ field: { onChange, value } }) => <OSTextInput placeholder="Start typing..." onChangeText={onChange} value={value} error={errors.incidentType} />} />
                    {/* */}
                </View>
                <View>
                    <OSText text="Emergency?" />
                    <Controller
                        name="emergency"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Toggle
                                options={[
                                    { label: "Yes", value: true },
                                    { label: "No", value: false },
                                ]}
                                onValueChange={onChange}
                                value={value}
                            />
                        )}
                    />
                    {/*
                     */}
                </View>
                <View>
                    {/* TODO: make the comments be able to scoll so it doesnt push down the page */}
                    <OSText text="Comments" />
                    <Controller
                        name="comment"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <OSTextInput multiline placeholder="Add a comment..." numberOfLines={4} maxLength={255} onChangeText={onChange} value={value} style={[style.area, { marginBottom: 20 }]} error={errors.comment} scrollEnabled />
                        )}
                    />
                    {/*  */}
                </View>
                <View>
                    <Button title="Create Ticket" onPress={handleSubmit(onSubmit)} disabled={!isEmpty(errors)} isLoading={isSubmitting} />
                </View>
            </View>
        </ScreenContainer>
    );
};
