import { Button } from "react-native";
import { ThemedView } from "../../components/Themed";
import React, { useEffect, useState } from "react";
import {
    Activity,
    database_GetActivities,
    storage_GetFileReference,
    storage_ReadData,
} from "../../api/firebase/firebase";
import { IDE } from "../../components/ide/IDE";
import { styles } from "../../constants/Style";
import DropDownPicker from "react-native-dropdown-picker";

export default function TabTwoScreen() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [activity, setActivity] = useState<string>("zero");
    const [ideKey, setIdeKey] = useState<string>(Math.random().toString());
    const [step, setStep] = useState<number>(0);

    const [html, setHtml] = useState<string>("");
    const [css, setCss] = useState<string>("");
    const [js, setJs] = useState<string>("");

    const [htmlLoaded, setHtmlLoaded] = useState<boolean>(false);
    const [cssLoaded, setCssLoaded] = useState<boolean>(false);
    const [jsLoaded, setJsLoaded] = useState<boolean>(false);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        database_GetActivities().then(setActivities).catch(console.error);
    }, []);

    useEffect(() => {
        console.log("fetching", activity, step);
        storage_ReadData(
            storage_GetFileReference(activity, step, "html", true, null),
        )
            .then((val) => {
                console.log("Loaded html");
                setHtml(val);
            })
            .catch(console.error)
            .finally(() => setHtmlLoaded(true));
        storage_ReadData(
            storage_GetFileReference(activity, step, "css", true, null),
        )
            .then((val) => {
                setCss(val);
            })
            .catch(console.error)
            .finally(() => setCssLoaded(true));
        storage_ReadData(
            storage_GetFileReference(activity, step, "js", true, null),
        )
            .then((val) => {
                setJs(val);
            })
            .catch(console.error)
            .finally(() => setJsLoaded(true));
    }, [activity, step]);

    useEffect(() => {
        if (htmlLoaded && cssLoaded && jsLoaded) {
            setHtmlLoaded(false);
            setCssLoaded(false);
            setJsLoaded(false);
            setIdeKey(Math.random().toString());
        }
    }, [htmlLoaded, cssLoaded, jsLoaded]);

    return (
        <ThemedView style={{ ...styles.fillWidth, ...styles.fillHeight }}>
            <ThemedView
                style={{
                    ...styles.fillWidth,
                    zIndex: 99,
                }}
            >
                <DropDownPicker
                    open={open}
                    value={activity}
                    items={activities.map((activity) => ({
                        label: activity.name,
                        value: activity.name,
                    }))}
                    setOpen={setOpen}
                    setValue={setActivity}
                    setItems={setActivities}
                />
                <Button title="Previous" />
                <Button title="Next" />
            </ThemedView>
            <IDE html={html} css={css} js={js} key={ideKey} />
        </ThemedView>
    );
}
