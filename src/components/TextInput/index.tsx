import React, { ReactElement, useRef, useEffect } from "react";
import { TextInput, TextInputProps, Text, Animated } from "react-native";
import { styles } from "./styles";
import { FieldError } from "react-hook-form";

export interface TextInputPropsWithError extends TextInputProps {
    error?: FieldError;
}

export const OSTextInput = React.forwardRef<TextInput, TextInputPropsWithError>((props, ref) => {
    const { error, ...inputProps } = props;

    const fadeAnimation = useRef(new Animated.Value(0)).current;

    //TODO: look into the animation api more. you can also probably use the hook here useAnimation
    useEffect(() => {
        Animated.timing(fadeAnimation, {
            toValue: error ? 1 : 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [error, fadeAnimation]);

    return (
        <>
            <TextInput style={[styles.base, error ? styles.error : styles.input]} ref={ref} {...inputProps} />
            {error && <Animated.Text style={[styles.errorMessage, { opacity: fadeAnimation }]}>{error.message}</Animated.Text>}
        </>
    );
});
