import React from "react";
import { auth } from "./firebaseConfig";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { Backdrop, CircularProgress } from "@mui/material";

function GoogleLogin() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const googleLogin = () => {
    signInWithGoogle();
  };

  return (
    <div className="googleLogin">
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <h1>Sign in with Google</h1>
      <button onClick={googleLogin}>LOGIN</button>
    </div>
  );
}

export default GoogleLogin;
