import React, { Component } from "react";
import { Renderer } from "./Renderer";
import { Platform } from "react-native";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-html";
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
<script>
    function getEditorContent() {
        alert('hi');
    }
</script>
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

type LanguageType = "html" | "css" | "js";

type EditorProps = {
    language: LanguageType;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
};

export class Editor extends Component<EditorProps> {
    renderer: Renderer | null = null;

    render(): JSX.Element {
        console.log("updating editor");
        return Platform.OS === "web" ? (
            <AceEditor
                mode="html"
                theme="monokai"
                defaultValue={this.props.content}
                onChange={this.props.setContent}
                name="html-editor"
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                    width: "100vw",
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
        return this.renderer
            ?.getRenderWindow()
            .contentWindow?.getEditorContent();
    }
}
