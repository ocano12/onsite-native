import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const style = StyleSheet.create({
    area: {
        minHeight: 80,
        maxHeight: 80,
        borderColor: theme.colors.border,
        borderRadius: 8,
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        textAlignVertical: "top",
    },
});
