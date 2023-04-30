import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                headerRight: () => (
                    <Link href="/account" asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <FontAwesome
                                    name="user"
                                    size={25}
                                    color={Colors[colorScheme ?? "light"].text}
                                    style={{
                                        marginRight: 15,
                                        opacity: pressed ? 0.5 : 1,
                                    }}
                                />
                            )}
                        </Pressable>
                    </Link>
                ),
                headerTitle: "MonkeySee",
                headerStyle: {backgroundColor: Colors[colorScheme ?? "light"].background},
                tabBarIcon: () => <></>,
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            }}
        >
            <Tabs.Screen name="index" options={{ title: "Code Editor" }} />
            <Tabs.Screen name="two" options={{ title: "Chat GPT" }} />
            <Tabs.Screen
                name="three"
                options={{
                    title: "Chat GPT Assistant",
                }}
            />
        </Tabs>
    );
}
