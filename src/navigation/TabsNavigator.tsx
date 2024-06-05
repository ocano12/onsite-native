import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TicketStack } from "./StackNavigator";
import { SettingScreen } from "../screens";
import { Icons } from "../icons";

const Tab = createBottomTabNavigator();

export const MyTabs = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color }) => <Icons name="ticket" fill={color} size="large" />,
                }}
                name="TicketTab"
                component={TicketStack}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color }) => <Icons name="setting" fill={color} size="large" />,
                }}
                name="SettingTab"
                component={SettingScreen}
            />
        </Tab.Navigator>
    );
};
