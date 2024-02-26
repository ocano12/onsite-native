type Status = "Open" | "Closed" | "In Progress" | "Cancelled";

export type Incident = "Interior" | "Exterior" | "Hvac" | "Landscape" | "Other" | "";

export interface TicketPayload {
    title: string;
    status: Status;
    emergancy: boolean;
    siteID: number;
    incidentType: Incident;
    comment?: string;
    userID: number;
}

export interface Site {
    id: number;
    name: string;
    addressID: number;
    isResidential: boolean;
    dateCreated: Date;
    dateModified: Date;
    createdBy: number;
    modifiedBy: number;
}

export type RootStackParamList = {
    Main: undefined;
    Search: { data?: [] };
};
