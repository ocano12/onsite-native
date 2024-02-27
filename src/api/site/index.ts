import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Site } from "../../models/types";
import Config from "react-native-config";

//TODO: can I put a timeout here? so it doesnt just stay stuck if nothing comes back
//TODO: error handling
//TODO; have to query address too and morph the data or create and address query and then use a selector.
export const siteAPI = createApi({
    reducerPath: "siteApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${Config.ONSITE_API_HOST}` }),
    endpoints: builder => ({
        getAllSites: builder.query<Site[], void>({ query: () => "/sites" }),
    }),
});

export const { useGetAllSitesQuery } = siteAPI;
