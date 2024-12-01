import { auth, firestore } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
// Create a new user
export const createUser = async (email: string, password: string) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    if(user){
      await setDoc(doc(firestore, "Users", user.uid), {
        email: user.email,
        password: password,
      });
    }
    console.log("User created:", response);
    if (user?.uid) {
      await setDoc(doc(firestore, "Lock", user.uid), {
        name: 'lock',
        location: '-',
        lock: true,
      });
    }
    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error('User creation failed');
  }
};

// Sign in an existing user
export const signInUser = async (email: string, password: string) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", response);
    return response;
  } catch (error) {
    console.error("Error signing in:", error);
    throw new Error('Sign-in failed');
  }
};

// Sign out the user
export const signOutUser = async () => {
  try {
    const response = await auth.signOut();
    console.log("User signed out");
    return response;
  } catch (error) {
    console.error("Error signing out:", error);
    throw new Error('Sign-out failed');
  }
};
