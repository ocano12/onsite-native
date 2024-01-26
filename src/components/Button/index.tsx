import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { theme } from '../../styles/theme';

export interface ButtonProps {
  title: string;
  disabled?: boolean;
  onPress: () => void;
}

export const Button = ({ title, disabled = false, onPress }: ButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          backgroundColor: theme.colors.primary,
          padding: 16,
          borderRadius: 4,
        }}>
        <Text
          style={{
            color: theme.colors.white,
            fontSize: theme.font.default,
            textAlign: 'center',
            fontWeight: '600',
          }}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};
