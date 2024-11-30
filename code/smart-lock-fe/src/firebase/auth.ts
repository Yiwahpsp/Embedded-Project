import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, } from "firebase/auth";

export const createUser = async (email: string, password: string) => {
  const response = await createUserWithEmailAndPassword(auth, email, password);
  return response
}

export const signInUser = async (email: string, password: string) => {
  const response = await signInWithEmailAndPassword(auth, email, password);
  return response
}

export const signOutUser = () => {
  const response = auth.signOut();
  return response
}