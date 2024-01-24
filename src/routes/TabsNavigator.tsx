import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CreateTicketScreen } from '../screens/CreateTicket/CreateTicketScreen';
import { TicketScreen } from '../screens/TIckets/TicketsScreen';

const Tab = createBottomTabNavigator();

export const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={CreateTicketScreen} />
      <Tab.Screen name="Ticket" component={TicketScreen} />
    </Tab.Navigator>
  );
};
