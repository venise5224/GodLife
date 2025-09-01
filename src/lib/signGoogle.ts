import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

const provider = new GoogleAuthProvider();

export async function googleLogin() {
  return await signInWithPopup(auth, provider);
}
