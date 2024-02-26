import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CreateTicketScreen, TicketScreen, SettingScreen } from "../screens";
import { Icons } from "../icons";

const Tab = createBottomTabNavigator();

export const MyTabs = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color, size }) => <Icons name="home" fill={color} size="medium" />,
                }}
                name="Home"
                component={CreateTicketScreen}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color }) => <Icons name="ticket" fill={color} size="medium" />,
                }}
                name="Ticket"
                component={TicketScreen}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color }) => <Icons name="setting" fill={color} size="medium" />,
                }}
                name="Setting"
                component={SettingScreen}
            />
        </Tab.Navigator>
    );
};
