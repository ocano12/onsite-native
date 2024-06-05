import React from "react";
import { RouteProp } from "@react-navigation/native";
type Status = "Open" | "Closed" | "In Progress" | "Cancelled";

export type Incident = "Interior" | "Exterior" | "Hvac" | "Landscape" | "Other" | "";

export interface TicketPayload {
    title: string;
    status: Status;
    emergency: boolean;
    siteID: number;
    incidentType: string;
    comment?: string;
    userID: number;
}

export interface Ticket {
    id: number;
    title: string;
    status: Status;
    emergency: boolean;
    site_id: number;
    incident_type: string;
    comment_id?: number;
    assigned_id?: number;
    created_by: number;
    modified_by: number;
}

export interface Site {
    id: number;
    name: string;
    isResidential: boolean;
    address_1: string;
    address_2?: string;
    city: string;
    state: string;
    zip_code: string;
}

export interface SearchData {
    id: number;
    title: string;
    icon?: string;
    subTitle?: string;
}

export type RootStackParamList = {
    Tickets: undefined;
    CreateTicket: undefined;
    Search: { data?: [] };
};

export interface CreateTicketForm {
    title: string;
    siteName: string;
    incidentType: string;
    emergency: boolean;
    comment?: string;
}

///SCREEN TYPES

export type CreateScreenStackProp = {
    CreateTicket: { site: Site }; // Replace 'YourScreenName' with the actual name of your screen
};

export type CreateScreenRouteProp = RouteProp<CreateScreenStackProp, "CreateTicket">;
