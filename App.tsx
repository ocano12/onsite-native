import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MyTabs } from './src/navigation/TabsNavigator';
import { theme } from './src/styles/theme';

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <MyTabs />
    </NavigationContainer>
  );
}
