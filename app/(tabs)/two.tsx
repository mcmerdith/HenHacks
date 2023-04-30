import { ThemedView } from "../../components/Themed";
import { Editor } from "../../components/ide/Editor";

export default function TabTwoScreen() {
    return (
        <ThemedView style={{}}>
            <Editor
                language="html"
                content="<h1>Hello World</h1>"
                setContent={() => {}}
            />
        </ThemedView>
    );
}
