import React, { useState, useCallback, useRef, useEffect } from "react";
import { View, Text, Alert, TextInput, Modal } from "react-native";
import { Button, ScreenContainer, OSText, Toggle, OSTextInput } from "../../components";
import { CreateTicketForm, SearchData, TicketPayload, Site, CreateScreenRouteProp } from "../../models/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CreateTicketSchema } from "../../validations";
import { theme } from "../../styles/theme";
import { style } from "./styles";
import { useCreateTicketMutation } from "../../api/tickets";
import { isEmpty } from "lodash";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//TODO: convert searchable input fields into a component
//TODO: search animations and transations
//TODO: error if ticket can't be submitted with Modal Alert might be ok now just to track
//TODO: better styling for Screen
//TODO: error ui if something goes wrong with a Retry
//TODO: refactor Controller so its an easier component to write.
//TODO: modal component for better error handling? low prio
//TODO: images in the comments low prio (Not MVP)

export const CreateTicketScreen: React.FC = () => {
    const siteInputRef = useRef<TextInput>(null);
    const navigation = useNavigation();

    const [createTicket, { status, error, isLoading }] = useCreateTicketMutation();

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
        formState: { errors },
    } = useForm<CreateTicketForm>({
        defaultValues: defaultValues,
        resolver: yupResolver(CreateTicketSchema),
    });

    const { params } = useRoute<CreateScreenRouteProp>();

    useEffect(() => {
        params?.site && setValue("siteName", params?.site?.name);
    }, [params?.site]);

    //temp values
    const userID = 1;

    const onSubmit = async (data: CreateTicketForm) => {
        const { title, incidentType, emergency, comment } = data;

        const ticket: TicketPayload = {
            title,
            status: "Open",
            siteID: params?.site.id,
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
            Alert.alert("Failed to Save Ticket");
        }
    };

    const handleSiteInputFocus = useCallback(() => {
        siteInputRef.current && siteInputRef?.current.blur();

        //@ts-ignore
        navigation.navigate("Search" as never, {});
    }, [siteInputRef, navigation]);

    //TODO; if site and incident are selected should  ichange the UI to show they are selected? could be
    return (
        <ScreenContainer>
            <View style={{ flex: 1, padding: theme.space.small, justifyContent: "space-between" }}>
                <View style={{ flex: 1, gap: theme.space.default }}>
                    <View>
                        <OSText text="Site" size="medium" fontWeight="bold" />
                        <Controller name="siteName" control={control} render={({ field: { value } }) => <OSTextInput placeholder="Search Site" value={value} onFocus={handleSiteInputFocus} ref={siteInputRef} error={errors.siteName} />} />
                    </View>
                    <View>
                        <OSText text="Title" size="medium" fontWeight="bold" />
                        <Controller name="title" control={control} render={({ field: { onChange, value } }) => <OSTextInput placeholder="Start typing..." value={value} onChangeText={onChange} error={errors.title} />} />
                    </View>
                    <View>
                        <OSText text="Incident Type" size="medium" fontWeight="bold" />
                        <Controller name="incidentType" control={control} render={({ field: { onChange, value } }) => <OSTextInput placeholder="Start typing..." onChangeText={onChange} value={value} error={errors.incidentType} />} />
                    </View>
                    <View>
                        <OSText text="Emergency?" size="medium" fontWeight="bold" />
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
                    </View>
                    <View>
                        <OSText text="Comments" size="medium" fontWeight="bold" />
                        <Controller
                            name="comment"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <OSTextInput multiline placeholder="Add a comment..." numberOfLines={4} maxLength={255} onChangeText={onChange} value={value} style={[style.area, { marginBottom: 20 }]} error={errors.comment} scrollEnabled />
                            )}
                        />
                    </View>
                </View>
                <View>
                    <View>
                        <Button title="Create Ticket" onPress={handleSubmit(onSubmit)} disabled={!isEmpty(errors)} isLoading={isLoading} />
                    </View>
                </View>
            </View>
        </ScreenContainer>
    );
};
