import React, { ReactElement } from "react";
import { TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";

//TODO; finish up here
export const OSTextInput = React.forwardRef<TextInput, TextInputProps>((props, ref) => {
    return <TextInput style={styles.input} ref={ref} {...props} />;
});
