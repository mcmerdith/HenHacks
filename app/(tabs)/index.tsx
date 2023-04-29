import { Button, StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { Renderer } from "../../components/ide/Renderer";
import { Editor } from "../../components/ide/Editor";
import React, { useState } from "react";

export default function TabOneScreen() {
    let editor: Editor | null;
    const [tempHtml, setTempHtml] = useState<string>("");
    const [htmlContent, setHtmlContent] = useState<string>(
        "<h1>Hello World!</h1>",
    );

    return (
        <View style={styles.container}>
            <Renderer
                html={htmlContent}
                css="* { background-color: white; } h1 { font-family: 'Comic Sans MS'; }"
                js="function func() {alert('helloworld');}"
            />
            <Editor
                language="html"
                content={htmlContent}
                setContent={setTempHtml}
                ref={(r) => (editor = r)}
            />
            <Button
                title="Run"
                onPress={() => {
                    //const newHtml = editor?.getContent() || "";
                    setHtmlContent(tempHtml);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        //alignItems: "center",
        //justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
