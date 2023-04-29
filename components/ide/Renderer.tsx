/**
 * Code Renderer
 * (C) Matthew Meredith 2023
 */

import WebView from "react-native-webview";
import { Text, View } from "../../components/Themed";
import { Button, Platform } from "react-native";
import { Component, useEffect, useState } from "react";
import React from "react";

type RendererProps = {
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
            console.log("updating", this.id);
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
        console.log("rendering", this.id);
        return (
            <View>
                {Platform.OS === "web" ? (
                    <iframe id={"content-renderer-" + this.id}></iframe>
                ) : (
                    <WebView
                        originWhitelist={["*"]}
                        source={{
                            html: buildWebpage(this.props),
                        }}
                        containerStyle={{ width: "100%", height: "100%" }}
                    />
                )}
            </View>
        );
    }

    getRenderWindow() {
        return document.getElementById(
            "content-renderer-" + this.id,
        ) as HTMLIFrameElement;
    }
}
