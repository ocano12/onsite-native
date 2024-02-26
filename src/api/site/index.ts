import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Site } from "../../models/types";
import Config from "react-native-config";

//TODO: can I put a timeout here? so it doesnt just stay stuck if nothing comes back
export const siteAPI = createApi({
    reducerPath: "siteApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${Config.ONSITE_API_HOST}` }),
    endpoints: builder => ({
        getAllSites: builder.query<Site[], void>({ query: () => "/sites" }),
    }),
});

export const { useGetAllSitesQuery } = siteAPI;
