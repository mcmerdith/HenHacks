import { Button } from "react-native";
import { ThemedView } from "../../components/Themed";
import { Editor } from "../../components/ide/Editor";
import React from "react";
import {
    storage_GetFileReference,
    storage_ReadData,
} from "../../api/firebase/firebase";

export default function TabTwoScreen() {
    return (
        <ThemedView style={{}}>
            <Button
                title="data"
                onPress={() => {
                    storage_ReadData(
                        storage_GetFileReference("one", 1, "html", true, null),
                    ).then(console.log);
                }}
            />
        </ThemedView>
    );
}
