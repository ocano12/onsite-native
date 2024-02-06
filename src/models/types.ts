type Status = "Open" | "Closed" | "In Progress" | "Cancelled";

export type Incident = "Interior" | "Exterior" | "Hvac" | "Landscape" | "Other" | "";

export interface Ticket {
  title: string;
  status: Status;
  emergancy: boolean;
  siteID: number;
  incidentType: Incident;
  comment?: string;
  userID: number;
}
