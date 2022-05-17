import { useState } from "react";
import "./App.css";
import Dashboard from "./Dashboard";
import { auth } from "./firebaseConfig";
import Signin from "./Signin";
import Signup from "./Signup";

import { useAuthState } from "react-firebase-hooks/auth";
import { Backdrop, CircularProgress } from "@mui/material";

function App() {
  const [myuser, setMyuser] = useState(auth.currentUser);

  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="app">
      {/* if user signin then show dashboard */}
      {loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : user ? (
        <Dashboard setMyuser={setMyuser} />
      ) : (
        <div className="app__form">
          <div className="app__form-register">
            <Signup setMyuser={setMyuser} />
          </div>
          <div className="app__form-login">
            <Signin setMyuser={setMyuser} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
