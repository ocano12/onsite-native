import { View, Text, FlatList, TextInput } from "react-native";
import { Button, ScreenContainer } from "../../components";
import { Site, Incident, SearchData } from "../../models/types";
import { RouteProp } from "@react-navigation/native";
import React, { ReactNode, useState } from "react";

export interface SearchScreenProps {
    route: RouteProp<{ params: { data: SearchData[] } }, "params">;
    navigation: any;
}

export interface Item {
    title: string;
    subTitle?: string;
    icon?: ReactNode;
}

//TODO: styles for item list
//TODO: make textInput into a component
//TODO: make items clickable
//TODO: return the selected item to the other Screen
//TODO: optional search by subtitle
//TODO: show something when no matches found!
export const SearchScreen = ({ route, navigation }: SearchScreenProps) => {
    const { data } = route.params;

    const [searchText, setSearchText] = useState<string>("");
    const [filteredData, setFilteredList] = useState<SearchData[]>(data);

    const Item = ({ title, icon }: Item) => {
        return (
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", backgroundColor: "grey", padding: 20, marginVertical: 8, marginHorizontal: 16 }}>
                {icon && icon}
                <Text>{title}</Text>
            </View>
        );
    };

    const handleFilterData = (searchText: string) => {
        setSearchText(searchText);

        const filteredData = data.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()));

        setFilteredList(filteredData);
    };

    return (
        <ScreenContainer>
            <TextInput placeholder="Start typing..." onChangeText={handleFilterData} value={searchText} />
            {!data || !data.length ? <Text>Something went wrong!</Text> : <FlatList data={filteredData} renderItem={({ item }) => <Item title={item.title} icon={item?.icon} />} />}
            <Button title="Cancle" onPress={() => navigation.goBack()} type="outline" />
        </ScreenContainer>
    );
};
