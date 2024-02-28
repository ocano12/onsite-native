import { View, Text, FlatList, TextInput, Pressable } from "react-native";
import { Button, ScreenContainer, OSTextInput, OSText } from "../../components";
import { Site, Incident, SearchData } from "../../models/types";
import { RouteProp } from "@react-navigation/native";
import React, { ReactNode, useState } from "react";
import { SearchScreenStyles } from "./styles";

export interface SearchScreenProps {
    route: RouteProp<{ params: { data: SearchData[]; onItemSelect: (id: number) => void } }, "params">;
    navigation: any;
}

export interface Item {
    title: string;
    id: number;
    subTitle?: string;
    icon?: ReactNode;
}

//TODO: optional search by subtitle
//TODO: show something when no matches found!
//TODO: make cancel up top with the search bar
export const SearchScreen = ({ route, navigation }: SearchScreenProps) => {
    const { data, onItemSelect } = route.params;

    const [searchText, setSearchText] = useState<string>("");
    const [filteredData, setFilteredList] = useState<SearchData[]>(data);

    const handleSelect = (id: number) => {
        onItemSelect(id);
        navigation.goBack();
    };

    const Item = ({ id, title, icon }: Item) => {
        return (
            <Pressable onPress={() => handleSelect(id)}>
                <View style={SearchScreenStyles.item}>
                    {icon && <View style={{ flex: 1 }}>{icon}</View>}
                    <View style={{ flex: 5 }}>
                        <OSText text={title} size="large" fontWeight="bold" />
                        <OSText text="3181 sw 85 ave, Miami, FL, 33155" size="default" fontWeight="bold" />
                    </View>
                </View>
            </Pressable>
        );
    };

    const handleFilterData = (searchText: string) => {
        setSearchText(searchText);

        const filteredData = data.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()));

        setFilteredList(filteredData);
    };

    return (
        <ScreenContainer>
            <OSTextInput placeholder="Start typing..." onChangeText={handleFilterData} value={searchText} />
            {!data || !data.length ? <Text>Something went wrong!</Text> : <FlatList data={filteredData} renderItem={({ item }) => <Item id={item.id} title={item.title} icon={item?.icon} />} />}
            <Button title="Cancel" onPress={() => navigation.goBack()} type="outline" />
        </ScreenContainer>
    );
};
