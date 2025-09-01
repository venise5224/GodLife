import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("로그인됨:", user);
  } else {
    console.log("로그아웃됨");
  }
});
