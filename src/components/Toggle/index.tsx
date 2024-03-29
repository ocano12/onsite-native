import { useState } from "react";
import { Alert, Pressable, View, Text } from "react-native";
import { styles } from "./Toggle.styles";
import { theme } from "../../styles/theme";

//TODO: add a default
//TODO: move styles
//TODO: double check this component
export interface ToggelOptions<T> {
    label: string;
    value: boolean;
}
export interface ToggleProps<T> {
    options: ToggelOptions<T>[];
    alignment?: "vertical" | "horizontal";
    onValueChange: (value: boolean) => void;
    value: T;
}

const Toggle = <T,>({ options, alignment = "horizontal", onValueChange, value }: ToggleProps<T>) => {
    const [activeOption, setActiveOption] = useState<boolean>(false);

    const handleToggelPress = (optionValue: boolean) => {
        setActiveOption(optionValue);
        onValueChange(optionValue);
    };

    return (
        <View style={{ flexDirection: "row", gap: 5 }}>
            {options.map((option, index) => {
                return (
                    <View style={{ flex: 1 }} key={index}>
                        <Pressable
                            onPress={() => handleToggelPress(option.value)}
                            style={[activeOption === option.value ? { borderColor: theme.colors.black } : { borderColor: theme.colors.border }, { borderWidth: 2, padding: 12, backgroundColor: "white" }]}>
                            <Text style={{ textAlign: "center", fontSize: theme.font.default }}>{option.label}</Text>
                        </Pressable>
                    </View>
                );
            })}
        </View>
    );
};

export default Toggle;
