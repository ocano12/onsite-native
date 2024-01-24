import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { styles } from './ScreenContainer.styles';

interface ScreenContainerProps {
  children: React.ReactNode;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.paddedContent}>{children}</View>
    </SafeAreaView>
  );
};
