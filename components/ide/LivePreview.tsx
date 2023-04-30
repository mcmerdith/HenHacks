import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import { Renderer, RendererProps } from "./Renderer";
import { useKeyboard } from "@react-native-community/hooks";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f6f6f6",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        borderWidth: 1,
        borderColor: "#c4c4c4",
        borderRadius: 4,
        borderBottomStartRadius: 0,
        borderBottomEndRadius: 0,
        padding: 10,
        shadowColor: "#c4c4c4",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
    },
    addressBar: {
        height: 30,
        backgroundColor: "#fff",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        borderRadius: 4,
        borderBottomStartRadius: 0,
        borderBottomEndRadius: 0,
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderWidth: 1,
        borderColor: "#c4c4c4",
    },
    urlText: {
        flex: 1,
        color: "#000",
        backgroundColor: "#f6f6f6",
        padding: 7,
        marginLeft: 10,
        borderRadius: 4,
        fontSize: 16,
        fontWeight: "bold",
        margin: 5,
    },
});

function LivePreview(props: RendererProps) {
    const keyboard = useKeyboard();

    if (keyboard.keyboardShown) return <></>;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.addressBar}>
                    <View
                        style={{
                            width: 12,
                            height: 12,
                            backgroundColor: "#ff5f56",
                            borderRadius: 50,
                        }}
                    ></View>
                    <View
                        style={{
                            width: 12,
                            height: 12,
                            backgroundColor: "#ffbd2e",
                            borderRadius: 50,
                            margin: 5,
                        }}
                    ></View>
                    <View
                        style={{
                            width: 12,
                            height: 12,
                            backgroundColor: "#27c93f",
                            borderRadius: 50,
                        }}
                    ></View>
                    <View style={styles.urlText}>
                        <Text>https://www.monkeysee.com/</Text>
                    </View>
                </View>
                <Renderer html={props.html} css={props.css} js={props.js} />
            </View>
        </SafeAreaView>
    );
}

export default LivePreview;
