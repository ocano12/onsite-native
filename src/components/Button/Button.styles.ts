import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";
import { TextStyle } from "react-native";

export const baseStyle = {
  container: {
    padding: 16,
    borderRadius: 4,
  },
  text: {
    fontSize: theme.font.default,
    textAlign: "center" as TextStyle["textAlign"],
    fontWeight: "600" as TextStyle["fontWeight"],
  },
};
export const disabled = {};

export const normal = {
  container: {
    ...baseStyle.container,
    backgroundColor: theme.colors.primary,
  },
  text: {
    ...baseStyle.text,
    color: theme.colors.white,
  },
};

export const outline = {
  container: {
    ...baseStyle.container,
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.border,
    borderWidth: 2,
    padding: 12,
  },
  text: {
    ...baseStyle.text,
    color: theme.colors.black,
  },
};

export const styles = StyleSheet.create({
  normalContainer: normal.container,
  normalTxt: normal.text,
  outlineContainer: outline.container,
  outlineTxt: outline.text,
});
