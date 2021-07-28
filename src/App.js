import React, { useEffect } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { selectUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
import { auth } from "./firebase";
import { logIn, logOut } from "./app/actions";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log(user);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      // console.log("user is", authUser);

      if (authUser) {
        // log In
        dispatch(
          logIn({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName
          })
        );
      } else {
        // log out
        dispatch(logOut());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
