import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import app from "./firebase.config";

const auth = getAuth(app);  

async function registerUser(email, password) {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    return credential.user;
}

async function loginUser(email, password) {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential.user;
}

async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(auth, provider);
    return credential.user;
}

async function logoutUser() {
    await signOut(auth); 
}

async function loggedUser(switchUser) {
    onAuthStateChanged(auth, switchUser);
}

export { registerUser, loginUser, loginWithGoogle, logoutUser, loggedUser };
