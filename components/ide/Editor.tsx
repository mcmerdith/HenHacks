import React from "react";
import { Platform } from "react-native";
import AceEditor from "react-ace";
import CodeEditor, {
    CodeEditorSyntaxStyles,
} from "@rivascva/react-native-code-editor";

if (Platform.OS === "web") {
    require("ace-builds/src-noconflict/mode-html");
    require("ace-builds/src-noconflict/mode-javascript");
    require("ace-builds/src-noconflict/mode-css");
    require("ace-builds/src-noconflict/theme-monokai");
    require("ace-builds/src-noconflict/ext-language_tools");
}

import { styles } from "../../constants/Style";

type LanguageType = "html" | "css" | "javascript";

type EditorProps = {
    language: LanguageType;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
};

export function Editor(props: EditorProps): JSX.Element {
    return Platform.OS === "web" ? (
        <AceEditor
            mode={props.language}
            theme="monokai"
            defaultValue={props.content}
            onChange={props.setContent}
            name={props.language + "-editor"}
            editorProps={{ $blockScrolling: true }}
            style={{ ...styles.fillHeight, ...styles.fillWidth }}
        />
    ) : (
        <CodeEditor
            language={props.language === "html" ? "htmlbars" : props.language}
            initialValue={props.content}
            onChange={props.setContent}
            syntaxStyle={CodeEditorSyntaxStyles.atom}
            showLineNumbers
        />
    );
}
