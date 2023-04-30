import { ThemedText, TextProps } from "./Themed";
import React from "react";

export function StyledText(props: TextProps) {
    return (
        <ThemedText
            {...props}
            style={[props.style, { fontFamily: "SpaceMono" }]}
        />
    );
}
