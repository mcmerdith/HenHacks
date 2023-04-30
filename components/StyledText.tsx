import { ThemedText, TextProps } from "./Themed";

export function StyledText(props: TextProps) {
    return (
        <ThemedText
            {...props}
            style={[props.style, { fontFamily: "SpaceMono" }]}
        />
    );
}
