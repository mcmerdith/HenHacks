import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Renderer, RendererProps } from "./Renderer";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        backgroundColor: "#f6f6f6",
        padding: 10,
    },
    addressBar: {
        width: "100%",
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 4,
        borderBottomStartRadius: 0,
        borderBottomEndRadius: 0,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#c4c4c4",
    },
    urlText: {
        height: 30,
        color: "#000",
        backgroundColor: "#f6f6f6",
        fontWeight: "bold",
        fontSize: 16,
        flexGrow: 1,
        margin: 5,
        marginLeft: 10,
        padding: 7,
        borderRadius: 4,
    },
    renderContainer: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 4,
        borderTopStartRadius: 0,
        borderTopEndRadius: 0,
    },
});

function LivePreview(props: RendererProps) {
    return (
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
            <View style={styles.renderContainer}>
                <Renderer html={props.html} css={props.css} js={props.js} />
            </View>
        </View>
    );
}

export default LivePreview;
