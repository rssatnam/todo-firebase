import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8Ku7v0dlLuIfYOnNuWwET8IwH8YgYi2Y",
  authDomain: "fireauth-practice-1.firebaseapp.com",
  projectId: "fireauth-practice-1",
  storageBucket: "fireauth-practice-1.appspot.com",
  messagingSenderId: "387404922389",
  appId: "1:387404922389:web:2088cb90824887fb84d81c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { app, auth, provider };
