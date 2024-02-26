import React, { ReactNode } from "react";
import { View, Text } from "react-native";
import { useGetAllSitesQuery } from "../../api/site";
import { ScreenContainer } from "..";

type DataLoaderProps = {
    children: ReactNode;
};

//TODO: handle errors
//TODO: load other slices. while its loading maybe we should show the splash screen or some type of actual loader.
export const DataLoader = ({ children }: DataLoaderProps) => {
    const { data: sites, error, isLoading } = useGetAllSitesQuery();

    if (isLoading) {
        return (
            <ScreenContainer>
                <Text>Loading...</Text>
            </ScreenContainer>
        );
    }

    console.log("sites", sites);

    return <>{children}</>;
};
