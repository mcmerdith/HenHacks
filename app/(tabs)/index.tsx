import React from "react";
import { IDE } from "../../components/ide/IDE";

export default function TabOneScreen() {
    return (
        <IDE
            html="<h1>Hello World!</h1><button onclick='func()'>Click Me</button>"
            css="* { background-color: white; } h1 { font-family: 'Arial'; }"
            js="function func() {alert('hello world');}"
        />
    );
}
