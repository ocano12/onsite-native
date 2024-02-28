import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
    input: {
        padding: 9,
        borderColor: theme.colors.border,
        borderRadius: 4,
        borderWidth: 1,
        marginBottom: 15, // Add some bottom margin to each input
    },
});
