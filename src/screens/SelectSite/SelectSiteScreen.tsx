import React, { useState, useCallback } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, ScreenContainer, OSTextInput, OSText } from "../../components";
import { useGetAllSitesQuery } from "../../api/site";
import { Site } from "../../models/types";
import { selectSiteStyles } from "./styles";
import { Icons } from "../../icons";
import { theme } from "../../styles/theme";

//TODO: optional search by subtitle
//TODO: show something when no matches found!
//TODO: make cancel up top with the search bar
export const SelectSiteScreen = () => {
    const navigation = useNavigation();
    const { data: sites, error } = useGetAllSitesQuery();

    const [searchText, setSearchText] = useState<string>("");
    const [filteredData, setFilteredList] = useState<Site[] | undefined>(sites);

    const handleSelect = (site: Site) => {
        //@ts-ignore
        navigation.navigate("CreateTicket" as never, {
            site,
        });
    };

    const SiteItem = ({ site }: any) => {
        const { id, name, isResidential, address_1, address_2, city, state, zip_code } = site;
        return (
            <Pressable onPress={() => handleSelect(site)}>
                <View style={selectSiteStyles.item}>
                    <View style={{ flex: 1 }}>
                        <Icons name={isResidential ? "home" : "building"} fill={theme.colors.primary} size="xlarge" />
                    </View>
                    <View style={{ flex: 5 }}>
                        <OSText text={name} size="default" fontWeight="bold" />
                        <OSText text={`${address_1}, ${city} ${state}, ${zip_code}` || ""} size="medium" fontWeight="bold" />
                    </View>
                </View>
            </Pressable>
        );
    };

    const handleFilterData = useCallback(
        (searchText: string) => {
            setSearchText(searchText);

            const filteredData = sites && sites.filter((site: Site) => site.name.toLowerCase().includes(searchText.toLowerCase()));

            setFilteredList(filteredData);
        },
        [searchText],
    );

    return (
        <ScreenContainer>
            <View style={{ flex: 1, justifyContent: "space-between" }}>
                <OSTextInput placeholder="Start typing..." onChangeText={handleFilterData} value={searchText} />
                {!sites || error ? <Text>Something went wrong!</Text> : <FlatList data={filteredData} renderItem={({ item }) => <SiteItem site={item} />} />}
                <Button title="Cancel" onPress={() => navigation.goBack()} type="outline" />
            </View>
        </ScreenContainer>
    );
};
