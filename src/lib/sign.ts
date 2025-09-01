import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";

// 회원가입
export async function signUp(email: string, password: string) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

// 로그인
export async function logIn(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}
