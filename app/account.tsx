import { ThemedText, ThemedView } from "../components/Themed";
import React, { useEffect, useState } from "react";
import { styles } from "../constants/Style";
import { auth_GetUser, auth_HookUser } from "../api/firebase/firebase";
import { User } from "firebase/auth";
import { AuthFormComponent } from "../components/AuthForm";

export default function ModalScreen() {
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
