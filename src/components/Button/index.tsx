import React from 'react';
import { Pressable, View, Text } from 'react-native';

export interface ButtonProps {
  title: string;
  disabled?: boolean;
}

export const Button = ({ title, disabled = false }: ButtonProps) => {
  return (
    <View>
      <Pressable>
        <Text>{title}</Text>
      </Pressable>
    </View>
  );
};
