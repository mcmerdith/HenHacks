import { useState } from "react";
import { Button, ScrollView } from "react-native";
import { Editor } from "./Editor";
import { Renderer, RendererProps } from "./Renderer";
import { styles } from "../../constants/Style";

export function IDE(props: RendererProps) {
    const [tempHtml, setTempHtml] = useState<string>(props.html);
    const [htmlContent, setHtmlContent] = useState<string>(props.html);
    const [tempCss, setTempCss] = useState<string>(props.css);
    const [cssContent, setCssContent] = useState<string>(props.css);
    const [tempJs, setTempJs] = useState<string>(props.js);
    const [jsContent, setJsContent] = useState<string>(props.js);

    return (
        <ScrollView>
            <Renderer html={htmlContent} css={cssContent} js={jsContent} />
            <Button
                title="Run"
                onPress={() => {
                    setHtmlContent(tempHtml);
                    setCssContent(tempCss);
                    setJsContent(tempJs);
                }}
            />
            <Editor
                language="html"
                content={htmlContent}
                setContent={setTempHtml}
            />
            <Editor
                language="css"
                content={cssContent}
                setContent={setTempCss}
            />
            <Editor
                language="javascript"
                content={jsContent}
                setContent={setTempJs}
            />
        </ScrollView>
    );
}
