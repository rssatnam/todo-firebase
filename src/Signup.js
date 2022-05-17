import React, { useRef } from "react";
import "./Signup.css";

// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

import { auth } from "./firebaseConfig";
import { Backdrop, CircularProgress } from "@mui/material";

function Signup({ setMyuser }) {
  const name = useRef("");
  const email = useRef("");
  const password = useRef("");

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const registerUser = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      email.current.value,
      password.current.value
    ).catch((err) => alert(err.message));
  };

  return (
    <div className="signup">
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <h1>Register Now</h1>
      <form onSubmit={registerUser}>
        <input type="text" ref={name} required placeholder="Full Name" />
        <input type="email" ref={email} required placeholder="Email" />
        <input type="password" ref={password} required placeholder="Password" />
        <button>Sign up</button>
      </form>
    </div>
  );
}

export default Signup;
