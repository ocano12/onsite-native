import React from "react";
import { Pressable, View, Text, ActivityIndicator } from "react-native";
import { theme } from "../../styles/theme";
import { styles } from "./Button.styles.ts";

export interface ButtonProps {
    title: string;
    disabled?: boolean;
    onPress: () => void;
    type?: "normal" | "outline";
    isLoading?: boolean;
}

export const Button = ({ title, disabled = false, onPress, type = "normal", isLoading = false }: ButtonProps) => {
    let buttonStyles;
    let buttonText;

    switch (type) {
        case "outline":
            buttonStyles = styles.outlineContainer;
            buttonText = styles.outlineTxt;
            break;

        default:
            buttonStyles = styles.normalContainer;
            buttonText = styles.normalTxt;
    }
    return (
        <Pressable onPress={onPress}>
            <View style={[buttonStyles, disabled ? { opacity: 0.5 } : null]}>{isLoading ? <ActivityIndicator color={theme.colors.white} size="small" /> : <Text style={buttonText}>{title}</Text>}</View>
        </Pressable>
    );
};
