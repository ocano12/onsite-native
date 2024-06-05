import React from "react";
import { View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icons } from "../../icons";
import { theme } from "../../styles/theme";
import { ScreenContainer } from "../../components";

export const TicketScreen: React.FC = () => {
    const navigation = useNavigation();
    return (
        <ScreenContainer>
            <View style={{ position: "absolute", bottom: theme.space.default, right: theme.space.small }}>
                <Pressable onPress={() => navigation.navigate("CreateTicket")}>
                    <View style={{ backgroundColor: theme.colors.primary, padding: 14, alignItems: "center", borderRadius: 50 }}>
                        <Icons name="plus" fill={theme.colors.white} size="large" />
                    </View>
                </Pressable>
            </View>
        </ScreenContainer>
    );
};
