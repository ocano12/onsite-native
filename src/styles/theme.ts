import { DefaultTheme } from "@react-navigation/native";

export type SizeKey = keyof typeof theme.size;

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#E87000",
        text: "#312C28",
        white: "white",
        border: "#CECFD0",
        black: "#000",
        error: "#cc0000",
    },
    font: {
        small: 8,
        medium: 12,
        default: 16,
        large: 24,
        xlarge: 32,
        xxl: 42,
    },
    fontWeight: {
        normal: "400",
        bold: "600",
    },
    size: {
        small: "12",
        medium: "16",
        default: "20",
        large: "24",
        xlarge: "32",
        xxlarge: "64",
    },
    space: {
        xs: 4,
        small: 8,
        default: 16,
        large: 24,
        xl: 32,
    },
};

export const getSize = (size: SizeKey): string => {
    return theme.size[size];
};
