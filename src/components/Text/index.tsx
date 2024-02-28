import { Text } from "react-native";
import { theme } from "../../styles/theme";

export interface OSTextProps {
    text: string;
    size?: "small" | "medium" | "default" | "large" | "xlarge" | "xxl";
    lineHeight?: number;
    fontWeight?: "normal" | "bold";
}

export const OSText = ({ text, size = "default", lineHeight = 30, fontWeight = "normal" }: OSTextProps) => {
    return (
        <Text
            //@ts-ignore
            style={{
                fontSize: theme.font[size],
                lineHeight: lineHeight,
                fontWeight: theme.fontWeight[fontWeight],
            }}>
            {text}
        </Text>
    );
};
