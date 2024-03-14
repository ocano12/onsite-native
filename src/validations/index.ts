import React from "react";
import * as Yup from "yup";

export const CreateTicketSchema = Yup.object().shape({
    title: Yup.string().required("Required!"),
    siteName: Yup.string().required("Required!"),
    incidentType: Yup.string().required("Required!"),
    emergency: Yup.boolean().default(false),
    comments: Yup.string().max(255, "Too Long!").optional(),
});
