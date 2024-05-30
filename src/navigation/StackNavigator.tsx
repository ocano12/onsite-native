import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyTabs } from "./TabsNavigator";
import { SelectSiteScreen } from "../screens/SelectSite/SelectSiteScreen";
import { RootStackParamList } from "../models/types";

export const StackNavigator = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={MyTabs} />
            <Stack.Screen name="Search" component={SelectSiteScreen} />
        </Stack.Navigator>
    );
};
