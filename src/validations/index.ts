import React from "react";
import * as Yup from "yup";

export const CreateTicketSchema = Yup.object().shape({
    title: Yup.string().required("Title is required!"),
    siteName: Yup.string().required("Site is required!"),
    incidentType: Yup.string().required("Inicden type is required!"),
    emergency: Yup.boolean().default(false),
    comment: Yup.string().max(255, "Max characters is 255").optional(),
});
