import React, { Component } from "react";
import { Renderer } from "./Renderer";
import { Platform } from "react-native";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/worker-html";
import "ace-builds/src-noconflict/worker-javascript";
import "ace-builds/src-noconflict/worker-css";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

function getAceEditor(language: LanguageType, content: string): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<title>ACE in Action</title>
<style type="text/css" media="screen">
    #editor { 
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
</style>
</head>
<body>

<div id="editor"></div>
    
<script src="/assets/ace/ace.js" type="text/javascript" charset="utf-8"></script>
<script>
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/${language}");
    editor.setValue("${content}");

    function getEditorContent() {
        return editor.getValue();
    }
</script>
</body>
</html>`;
}

type LanguageType = "html" | "css" | "javascript";

type EditorProps = {
    language: LanguageType;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
};

export class Editor extends Component<EditorProps> {
    renderer: Renderer | null = null;

    render(): JSX.Element {
        return Platform.OS === "web" ? (
            <AceEditor
                mode={this.props.language}
                theme="monokai"
                defaultValue={this.props.content}
                onChange={this.props.setContent}
                name={this.props.language + "-editor"}
                editorProps={{ $blockScrolling: true }}
                style={{
                    width: "100%",
                    height: "150px",
                }}
            />
        ) : (
            <Renderer
                html={getAceEditor(this.props.language, this.props.content)}
                css=""
                js=""
                ref={(r) => (this.renderer = r)}
            />
        );
    }

    getContent(): string {
        return (
            this.renderer
                ?.getRenderWindow()
                // @ts-ignore this function is defined, but typescript doesn't know it
                .contentWindow?.getEditorContent()
        );
    }
}
