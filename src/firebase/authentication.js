import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase'; 

const googleProvider = new GoogleAuthProvider();

async function registerUser(email, password) {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    return credential.user;
};

async function loginUser(email, password) {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential.user;
};

async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(auth, provider);
    return credential.user;
}

async function logoutUser() {
    await signOut(auth);
}

export { registerUser, loginUser, loginWithGoogle, logoutUser }