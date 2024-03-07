import React from "react";
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
    icon?: React.ReactNode;
    subTitle?: string;
}

export type RootStackParamList = {
    Main: undefined;
    Search: { data?: [] };
};

export interface CreateTicketForm {
    title: string;
    siteID: number;
    incidentType: string;
    emergency: boolean;
    comment: string;
}
