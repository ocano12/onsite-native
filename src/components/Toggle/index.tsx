import { useState } from "react";
import { Alert, Pressable, View, Text } from "react-native";
import { styles } from "./Toggle.styles";
import { theme } from "../../styles/theme";

export interface ToggelOptions<T> {
  label: string;
  value: T;
  active?: boolean;
}
export interface ToggleProps<T> {
  options: ToggelOptions<T>[];
  alignment?: "vertical" | "horizontal";
  onValueChange: (value: T) => void;
}

export const Toggle = <T,>({ options, alignment = "horizontal", onValueChange }: ToggleProps<T>) => {
  const [activeOption, setActiveOption] = useState<T | null>(options.find(option => option.active === true)?.value || null);

  const handleToggelPress = (optionValue: T) => {
    setActiveOption(optionValue);
    onValueChange(optionValue);
  };

  console.log("active option = ", activeOption);

  return (
    <View style={{ flexDirection: "row", gap: 5 }}>
      {options.map((option, index) => {
        return (
          <View style={{ flex: 1 }} key={index}>
            <Pressable
              onPress={() => handleToggelPress(option.value)}
              style={[
                activeOption === option.value ? { borderColor: theme.colors.black } : { borderColor: theme.colors.border },
                { borderWidth: 2, padding: 12, backgroundColor: "white" },
              ]}>
              <Text style={{ textAlign: "center", fontSize: theme.font.default }}>{option.label}</Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};
