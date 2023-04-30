import React, { useState } from "react";
import { View, TextInput, Button, useColorScheme } from "react-native";
import { auth_SignUp, auth_SignIn } from "../api/firebase/firebase";
import { ThemedText } from "./Themed";
import Colors from "../constants/Colors";

export function AuthFormComponent(props: { signUp: boolean }) {
    const colorScheme = useColorScheme();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <>
            {props.signUp ? (
                <View>
                    <ThemedText>Sign Up</ThemedText>
                </View>
            ) : (
                <View>
                    <ThemedText>Sign In</ThemedText>
                </View>
            )}
            <ThemedText>Email</ThemedText>
            <TextInput
                value={email}
                onChangeText={setEmail}
                style={{ backgroundColor: Colors[colorScheme ?? "light"].text }}
            />
            <ThemedText>Password</ThemedText>
            <TextInput
                keyboardType="visible-password"
                value={password}
                onChangeText={setPassword}
                style={{ backgroundColor: Colors[colorScheme ?? "light"].text }}
            />
            <Button
                title={`Sign ${props.signUp ? "up" : "in"}`}
                onPress={() =>
                    props.signUp
                        ? auth_SignUp(email, password)
                              .then(console.log)
                              .catch(console.error)
                        : auth_SignIn(email, password)
                              .then(console.log)
                              .catch(console.error)
                }
            />
        </>
    );
}
