// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    Auth,
    User,
    onAuthStateChanged,
    Unsubscribe,
} from "firebase/auth";
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
let googleProvider: GoogleAuthProvider;
let user: User | null;

export function firebaseInit() {
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    onAuthStateChanged(auth, (newuser) => {
        user = newuser;
    });
    console.log("initialized firebase");
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
