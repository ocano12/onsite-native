import { configureStore } from "@reduxjs/toolkit";
import { siteAPI } from "../api/site";
import { ticketAPI } from "../api/tickets";

const middleware: any = [];

if (__DEV__) {
    const createDebugger = require("redux-flipper").default;
    middleware.push(createDebugger());
}
export const store = configureStore({
    reducer: {
        [siteAPI.reducerPath]: siteAPI.reducer,
        [ticketAPI.reducerPath]: ticketAPI.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(siteAPI.middleware, ticketAPI.middleware, middleware),
});
