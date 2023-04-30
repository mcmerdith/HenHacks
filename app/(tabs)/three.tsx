import { Button, TextInput } from "react-native";

import { ThemedView } from "../../components/Themed";
import { styles } from "../../constants/Style";
import React, { useState } from "react";
import { makeRequest } from "../../api/chatGPT";
import { Text } from 'react-native';


export default function ChatGPTScreen() {
    const [input, setInput] = useState<string>("");
    const [response, setResponse] = useState(''); // Initialize state with an empty string
    const handleRequest = (input: string) => {
        makeRequest(input).then((res) => {
          setResponse(res); // Update state with the response from the API
        });
      };
    return (
        <ThemedView style={styles.container}>
            <TextInput 
            style={styles.input}
            onChangeText={setInput} 
            value={input}
            placeholder ="Enter question here"
            />
            <Button
                title="GO TIME"
                onPress={() => {
                    handleRequest(input);
                }}
        
            />   
            <Text style={styles.text}>AI Helper</Text>
            <Text style={styles.response}>{response}</Text> {/* Render the response from the API */}
            
        </ThemedView>

        
    );
}