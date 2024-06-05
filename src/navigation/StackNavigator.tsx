import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SelectSiteScreen } from "../screens/SelectSite/SelectSiteScreen";
import { RootStackParamList } from "../models/types";
import { CreateTicketScreen, TicketScreen } from "../screens";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { OSText } from "../components";

export const TicketStack = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const navigation = useNavigation();

    const cancelPress = () => {
        return (
            <Pressable onPress={() => navigation.goBack()} style={{ alignSelf: "center" }}>
                <OSText text="Cancel" size="medium" />
            </Pressable>
        );
    };

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tickets" component={TicketScreen} />
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen
                    name="CreateTicket"
                    component={CreateTicketScreen}
                    options={{
                        headerShown: true,
                        headerLeft: () => cancelPress(),
                    }}
                />
                <Stack.Screen
                    name="Search"
                    component={SelectSiteScreen}
                    options={{
                        headerShown: true,
                        headerLeft: () => cancelPress(),
                    }}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
};
