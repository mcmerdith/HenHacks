import { Button, TextInput } from "react-native";

import { ThemedView } from "../../components/Themed";
import { styles } from "../../constants/Style";
import React, { useState } from "react";
import { makeRequest } from "../../api/chatGPT";

export default function ChatGPTScreen() {
    const [input, setInput] = useState<string>("");

    return (
        <ThemedView style={styles.container}>
            <TextInput onChangeText={setInput} value={input} />
            <Button
                title="GO TIME"
                onPress={() => {
                    makeRequest(input).then(console.log);
                }}
            />
        </ThemedView>
    );
}

//.then((value) => {
//  value.data.choices[0].text
//})
