import React, { useRef } from "react";
import "./Signin.css";

// import { signInWithEmailAndPassword } from "firebase/auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

import { auth } from "./firebaseConfig";
import { Backdrop, CircularProgress } from "@mui/material";
import GoogleLogin from "./GoogleLogin";

function Signin({ setMyuser }) {
  const email = useRef("");
  const password = useRef("");

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const loginUser = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(email.current.value, password.current.value);
  };

  if (error) {
    console.log(error.message);
  }

  return (
    <div className="signin">
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input type="email" ref={email} placeholder="Email" required />
        <input type="password" ref={password} placeholder="Password" required />
        <button>Sign in</button>
      </form>

      <GoogleLogin />
    </div>
  );
}

export default Signin;
