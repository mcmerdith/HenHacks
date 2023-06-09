/**
 * Code Renderer
 * (C) Matthew Meredith 2023
 */

import WebView from "react-native-webview";
import { ThemedView } from "../../components/Themed";
import { Platform } from "react-native";
import { Component } from "react";
import React from "react";
import { styles } from "../../constants/Style";

export type RendererProps = {
    html: string;
    css: string;
    js: string;
};

function buildWebpage(props: RendererProps) {
    return `<!DOCTYPE html>
    <html>
    <head>
    <style>${props.css}</style>
    <script>${props.js}</script>
    </head>
    <body>${props.html}</body>
    </html>`;
}

export class Renderer extends Component<RendererProps> {
    id: number;

    constructor(props: RendererProps) {
        super(props);
        this.id = Math.random();
    }

    webUpdate() {
        if (Platform.OS === "web") {
            const iframe = this.getRenderWindow();
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.border = "none";

            const doc = iframe.contentWindow?.document;
            doc?.open();
            doc?.write(buildWebpage(this.props));
            doc?.close();
        }
    }

    componentDidMount() {
        this.webUpdate();
    }

    componentDidUpdate() {
        this.webUpdate();
    }

    render() {
        this.id = Math.random();
        return (
            <ThemedView
                style={{
                    ...styles.fillWidth,
                    ...styles.fillHeight,
                    borderBottomStartRadius: 4,
                    borderBottomEndRadius: 4,
                }}
            >
                {Platform.OS === "web" ? (
                    <iframe
                        id={"content-renderer-" + this.id}
                        style={{
                            borderBottomRightRadius: 4,
                            borderBottomLeftRadius: 4,
                        }}
                    ></iframe>
                ) : (
                    <WebView
                        originWhitelist={["*"]}
                        source={{
                            html: buildWebpage(this.props),
                        }}
                        style={{
                            ...styles.fillWidth,
                            ...styles.fillHeight,
                        }}
                    />
                )}
            </ThemedView>
        );
    }

    getRenderWindow() {
        return document.getElementById(
            "content-renderer-" + this.id,
        ) as HTMLIFrameElement;
    }
}
