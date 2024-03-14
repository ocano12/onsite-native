import { View, Text, FlatList, Pressable } from "react-native";
import { Button, ScreenContainer, OSTextInput, OSText } from "../../components";
import { SearchData } from "../../models/types";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { SearchScreenStyles } from "./styles";
import { Icons } from "../../icons";
import { theme } from "../../styles/theme";

export interface Item {
    title: string;
    id: number;
    subTitle?: string;
    icon?: string;
}

//TODO: optional search by subtitle
//TODO: show something when no matches found!
//TODO: make cancel up top with the search bar
export const SearchScreen = () => {
    const { params } = useRoute();
    //@ts-ignore
    const { data } = params;
    const navigation = useNavigation();

    const [searchText, setSearchText] = useState<string>("");
    const [filteredData, setFilteredList] = useState<SearchData[]>(data);

    const handleSelect = (id: number) => {
        //@ts-ignore
        navigation.navigate("CreateTicket" as never, {
            id,
        });
    };

    const Item = ({ id, title, icon, subTitle }: Item) => {
        return (
            <Pressable onPress={() => handleSelect(id)}>
                <View style={SearchScreenStyles.item}>
                    {icon && (
                        <View style={{ flex: 1 }}>
                            <Icons name={icon} fill={theme.colors.primary} size="xlarge" />
                        </View>
                    )}
                    <View style={{ flex: 5 }}>
                        <OSText text={title} size="default" fontWeight="bold" />
                        <OSText text={subTitle || ""} size="medium" fontWeight="bold" />
                    </View>
                </View>
            </Pressable>
        );
    };

    const handleFilterData = (searchText: string) => {
        setSearchText(searchText);

        const filteredData = data.filter((item: SearchData) => item.title.toLowerCase().includes(searchText.toLowerCase()));

        setFilteredList(filteredData);
    };

    return (
        <ScreenContainer>
            <OSTextInput placeholder="Start typing..." onChangeText={handleFilterData} value={searchText} />
            {!data || !data.length ? <Text>Something went wrong!</Text> : <FlatList data={filteredData} renderItem={({ item }) => <Item id={item.id} title={item.title} icon={item.icon} subTitle={item.subTitle} />} />}
            <Button title="Cancel" onPress={() => navigation.goBack()} type="outline" />
        </ScreenContainer>
    );
};
