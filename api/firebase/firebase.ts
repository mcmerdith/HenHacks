// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    Auth,
    User,
    onAuthStateChanged,
    Unsubscribe,
} from "firebase/auth";
import {
    getFirestore,
    Firestore,
    DocumentReference,
    doc,
    getDoc,
} from "firebase/firestore";
import {
    getStorage,
    FirebaseStorage,
    StorageReference,
    ref,
    uploadString,
    getDownloadURL,
    UploadResult,
} from "firebase/storage";
import { UserProfile } from "./interface/userprofile";
import axios from "axios";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAMAjhK_FMBiVZ0DbYhhigAz6NC98sRC0U",
    authDomain: "henhacks23.firebaseapp.com",
    projectId: "henhacks23",
    storageBucket: "henhacks23.appspot.com",
    messagingSenderId: "748087910736",
    appId: "1:748087910736:web:314552434363ede0008c55",
    measurementId: "G-ZYWXVDQ8HE",
};

// Initialize Firebase
export let app: FirebaseApp;
export let analytics: Analytics;
export let auth: Auth;
export let storage: FirebaseStorage;
export let firestore: Firestore;
let user: User | null;

export function firebaseInit() {
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    auth = getAuth(app);
    storage = getStorage(app);
    firestore = getFirestore(app);
    onAuthStateChanged(auth, (newuser) => {
        user = newuser;
    });
}

export function auth_GetUser(): User | null {
    return user;
}

/**
 * Do not call outside of useEffect
 * Must be unsubscribed
 */
export function auth_HookUser(
    stateFunction: React.Dispatch<React.SetStateAction<User | null>>,
): Unsubscribe {
    return onAuthStateChanged(auth, (user) => stateFunction(user));
}

export function auth_SignUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export function auth_SignIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function auth_SignOut() {
    return signOut(auth);
}

/*
Database
*/

export function database_GetDocument<T>(
    document: DocumentReference<T>,
): Promise<T> {
    return new Promise((resolve, reject) =>
        getDoc(document)
            .then((snapshot) => {
                if (snapshot.exists()) resolve(snapshot.data());
                else reject("Not Found");
            })
            .catch(reject),
    );
}

export function database_GetUserDoc(
    user: User,
): DocumentReference<UserProfile> {
    return doc(firestore, "users", user.uid) as DocumentReference<UserProfile>;
}

export function database_GetUser(user: User): Promise<UserProfile> {
    return database_GetDocument(database_GetUserDoc(user));
}

/*
Storage
*/

export type FileType = "html" | "css" | "js";

export function storage_GetFileReference(
    activity: string,
    step: number,
    type: FileType,
    template: boolean,
    user: User | null,
) {
    return ref(
        storage,
        `${
            template ? "" : user?.uid + "/"
        }${activity}/${step}/activity.${type}`,
    );
}

export function storage_WriteData(
    ref: StorageReference,
    data: string,
): Promise<UploadResult> {
    return uploadString(ref, data);
}

export function storage_ReadData(ref: StorageReference): Promise<string> {
    return new Promise((resolve, reject) =>
        getDownloadURL(ref)
            .then((url) =>
                axios
                    .get(url)
                    .then((value) => {
                        if (value.status !== 200) {
                            reject(value.statusText);
                        } else {
                            resolve(value.data);
                        }
                    })
                    .catch(reject),
            )
            .catch(reject),
    );
}
