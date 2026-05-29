import { auth } from '../firebase/config';
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";

export const doSignInWithEmailAndPassword = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = async () => {
  return await signOut(auth);
}

export const doPasswordReset = async (email) => {
  return await sendPasswordResetEmail(email);
}


