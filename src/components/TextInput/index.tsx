import React from "React";
import { TextInput } from "react-native";

export interface OSTextInputProps {}

//TODO; finish up here
export const OSTextInput = ({ onChangeText, value, onFocus, ref }) => {
    return <TextInput style={style.input} placeholder="Start typing..." onChangeText={handleSiteInput} value={site} onFocus={handleSiteInputFocus} ref={siteInputRef} />;
};
