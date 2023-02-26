import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const app = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_apiKey,
    authDomain: process.env.REACT_APP_FIREBASE_authDomain,
    projectId: process.env.REACT_APP_FIREBASE_projectId,
    storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
    messagingSenderId: process.env.REACT_APP_FIREBASE_messageSenderId,
    appId: process.env.REACT_APP_FIREBASE_apId,
    measurementId: process.env.REACT_APP_FIREBASE_measurementId
  });
const auth = getAuth(app);

export const getCurrentUser = () => {
    if (auth !== null && auth.currentUser !== null){
        return auth.currentUser;
    }

    return null;
};

export const signOutCurrentUser = async () => {
    try {
        await auth.signOut();
        return true;
    } catch (e){
       console.log(e);
    } 
    return false;
};

export const createStoreProfile = async (email, password) => {
    try{
        const response = await createUserWithEmailAndPassword(auth, email, password);
        return response.user;
    } catch (err) {
        if (err.code === 'auth/email-already-in-use') {
            return 'Email already taken.';
        } else {
            return 'Something went wrong, Please try again later.';
        }
    }
}

export const loginStoreProfile = async (email, password) => {
    try{
        const response = await signInWithEmailAndPassword(auth, email, password);
        return response.user;
    } catch (err) {
        if (err.code === 'auth/invalid-email') {
            return 'Email is not valid.';
        } else if (err.code === 'auth/wrong-password') {
            return 'Password is incorrect.';
        } else {
            return 'Something went wrong, Please try again later.';
        }
    }
}
