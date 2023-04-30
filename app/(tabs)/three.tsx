import { Button, StyleSheet, TextInput } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { styles } from "../../constants/Style";
import { useState } from "react";
import { makeRequest } from "../../api/chatGPT";

export default function ChatGPTScreen() {
    const [input, setInput] = useState<string>("");

    return (
        <View style={styles.container}>
            <TextInput onChangeText={setInput} value={input} />
            <Button title="" onPress={() => {
                makeRequest(input).then(console.log);
            }} />
        </View>
    );
}

//.then((value) => {
//  value.data.choices[0].text
//})
