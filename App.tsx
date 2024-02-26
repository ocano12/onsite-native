import * as React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { MyTabs } from "./src/navigation/TabsNavigator";
import { theme } from "./src/styles/theme";
import { store } from "./src/store";
import { DataLoader } from "./src/components/DataLoader";
import { StackNavigator } from "./src/navigation/StackNavigator";

export default function App() {
    return (
        <Provider store={store}>
            <DataLoader>
                <NavigationContainer theme={theme}>
                    <StackNavigator />
                </NavigationContainer>
            </DataLoader>
        </Provider>
    );
}
