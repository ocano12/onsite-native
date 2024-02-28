import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const SearchScreenStyles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: theme.space.default,
        marginVertical: theme.space.small,
        borderRadius: theme.space.small,
        borderColor: theme.colors.primary,
        borderWidth: 1,
    },
});
