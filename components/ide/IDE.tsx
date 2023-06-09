import React, { useState } from "react";
import { Button, SafeAreaView, useColorScheme } from "react-native";
import { Editor } from "./Editor";
import { RendererProps } from "./Renderer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../../constants/Colors";
import { styles } from "../../constants/Style";
import LivePreview from "./LivePreview";

export function IDE(props: RendererProps) {
    const [tempHtml, setTempHtml] = useState<string>(props.html);
    const [htmlContent, setHtmlContent] = useState<string>(props.html);

    const [tempCss, setTempCss] = useState<string>(props.css);
    const [cssContent, setCssContent] = useState<string>(props.css);

    const [tempJs, setTempJs] = useState<string>(props.js);
    const [jsContent, setJsContent] = useState<string>(props.js);

    const Tab = createBottomTabNavigator();

    const htmlEditor = () => (
        <Editor
            language="html"
            content={htmlContent}
            setContent={setTempHtml}
        />
    );

    const cssEditor = () => {
        return (
            <Editor
                language="css"
                content={cssContent}
                setContent={setTempCss}
            />
        );
    };

    const jsEditor = () => (
        <Editor
            language="javascript"
            content={jsContent}
            setContent={setTempJs}
        />
    );

    const colorScheme = useColorScheme();

    return (
        <>
            <LivePreview html={htmlContent} css={cssContent} js={jsContent} />

            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                    tabBarIcon: () => <></>,
                }}
            >
                <Tab.Screen name="HTML">{htmlEditor}</Tab.Screen>
                <Tab.Screen name="CSS">{cssEditor}</Tab.Screen>
                <Tab.Screen name="JavaScript">{jsEditor}</Tab.Screen>
            </Tab.Navigator>

            <Button
                title="Run"
                onPress={() => {
                    setHtmlContent(tempHtml);
                    setCssContent(tempCss);
                    setJsContent(tempJs);
                }}
            />
        </>
    );
}
