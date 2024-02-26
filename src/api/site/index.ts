import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Site } from "../../models/types";
import Config from "react-native-config";

export const siteAPI = createApi({
    reducerPath: "siteApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${Config.ONSITE_API_HOST}` }),
    endpoints: builder => ({
        getAllSites: builder.query<Site[], void>({ query: () => "/sites" }),
    }),
});

export const { useGetAllSitesQuery } = siteAPI;
