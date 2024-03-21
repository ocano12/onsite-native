import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
    base: {
        borderRadius: 4,
        borderWidth: 1,
        padding: 10,
    },
    input: {
        borderColor: theme.colors.border,
    },
    error: {
        borderColor: theme.colors.error,
    },

    errorMessage: {
        marginTop: 5,
        fontSize: theme.font.medium,
        marginBottom: 10,
        color: theme.colors.error,
    },
});
