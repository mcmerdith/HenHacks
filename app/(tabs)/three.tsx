import { Button, TextInput } from "react-native";

import { ThemedText, ThemedView } from "../../components/Themed";
import { styles } from "../../constants/Style";
import React, { useState } from "react";
import { makeRequest } from "../../api/chatGPT";
import { Text } from "react-native";

export default function ChatGPTScreen() {
    const [input, setInput] = useState<string>("");
    const [response, setResponse] = useState(""); // Initialize state with an empty string
    const handleRequest = (input: string) => {
        makeRequest(input).then((res) => {
            setResponse(res); // Update state with the response from the API
        });
    };
    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.text}>AI Helper</ThemedText>
            <TextInput
                style={styles.input}
                onChangeText={setInput}
                value={input}
                placeholder="Enter question here"
            />
            <Button
                color="orange"
                title="Generate"
                onPress={() => {
                    handleRequest(input);
                }}
            />

            <ThemedText style={styles.response}>{response}</ThemedText>
            {/* Render the response from the API */}
        </ThemedView>
    );
}
