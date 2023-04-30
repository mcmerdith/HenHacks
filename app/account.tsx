import { StatusBar } from "expo-status-bar";
import {
    Button,
    Platform,
    TextInput,
    View,
    useColorScheme,
} from "react-native";

import { ThemedText, ThemedView } from "../components/Themed";

import React, { useEffect, useState } from "react";
import { styles } from "../constants/Style";
import {
    auth_GetUser,
    auth_HookUser,
    auth_SignIn,
    auth_SignUp,
} from "../api/firebase/firebase";
import { User } from "firebase/auth";
import Colors from "../constants/Colors";
import { AuthFormComponent } from "../components/AuthForm";

export default function ModalScreen() {
    const colorScheme = useColorScheme();

    const [user, setUser] = useState<User | null>(auth_GetUser());

    useEffect(() => auth_HookUser(setUser), []);

    return (
        <ThemedView
            style={{
                ...styles.container,
            }}
        >
            <ThemedText>
                {user
                    ? `Hello ${user.displayName || user.email}!`
                    : "Not signed in"}
            </ThemedText>
            {user ? (
                <></>
            ) : (
                <>
                    <AuthFormComponent signUp={false} />
                    <AuthFormComponent signUp={true} />
                </>
            )}
        </ThemedView>
    );
}
