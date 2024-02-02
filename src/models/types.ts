type Status = "Open" | "Closed" | "In Progress" | "Cancelled";

export type Incident = "Interior" | "Exterior" | "Hvac" | "Landscape" | "Other" | undefined;

export interface Ticket {
  id?: number;
  title: string;
  status?: Status;
  emergancy: boolean;
  site?: string;
  incidentType?: Incident;
  assigned?: number;
  dateCreated?: Date;
  dateModified?: Date;
  createdBy: number;
}
