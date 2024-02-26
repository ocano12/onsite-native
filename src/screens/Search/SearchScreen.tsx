import { View, Text } from "react-native";
import { Button, ScreenContainer } from "../../components";

export interface SearchScreenProps {
    data?: any[];
    navigation: any;
}

export const SearchScreen = ({ data, navigation }: SearchScreenProps) => {
    return (
        <ScreenContainer>
            <Text>Testing</Text>
            <Button title="Cancle" onPress={() => navigation.goBack()}></Button>
        </ScreenContainer>
    );
};
