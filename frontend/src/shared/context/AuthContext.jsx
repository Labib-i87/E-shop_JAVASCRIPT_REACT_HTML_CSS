import React, { useState, useEffect, createContext, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();
  const [role, setRole] = useState();

  const getLoggedIn = async () => {
    const loggedInRes = await axios.get("http://localhost:5000/auth/loggedIn");

    setLoggedIn(loggedInRes.data.verified);
    setUsername(loggedInRes.data.username);
    setUserId(loggedInRes.data.userId);
    setRole(loggedInRes.data.role);
  };

  const getLoggedOut = async () => {
    await axios.get("http://localhost:5000/auth/logout");
    getLoggedIn();
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ loggedIn, userId, username, role, getLoggedIn, getLoggedOut }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
