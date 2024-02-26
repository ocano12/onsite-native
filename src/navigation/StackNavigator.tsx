import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyTabs } from "./TabsNavigator";
import { SearchScreen } from "../screens/Search/SearchScreen";

export const StackNavigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="main" component={MyTabs} />
            <Stack.Screen name="search" component={SearchScreen} />
        </Stack.Navigator>
    );
};
