import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    fillHeight: {
        height: "100%",
    },
    fillWidth: {
        width: "100%",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    response: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20
    },
    input:{
        height: 40,
        borderColor: 'gray',
        borderWidth: 3,
        backgroundColor: "white",
        padding: 2,
        margin: 10,
        borderRadius: 5,
    }
});
