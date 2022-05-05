import React, { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";
import jwt_decode from "jwt-decode";

// create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // global authtoken state
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null
  );

  // global current user state
  const [currentUser, setCurrentUser] = useState(() =>
    localStorage.getItem("authToken")
      ? jwt_decode(localStorage.getItem("authToken"))
      : null
  );

  // useHistory to redirect
  const [tokenLoading, setTokenLoading] = useState(true);
  let navigate = useNavigate();
  let location = useLocation();

  // useEffect to re-render when there is change in authToken
  // change state of token loading to false after
  useEffect(() => {
    if (authToken) {
      setCurrentUser(jwt_decode(authToken.access));
    }
    setTokenLoading(false);
  }, [authToken, tokenLoading]);

  // login function
  async function loginUser(event) {
    console.log(event);

    const url = "http://127.0.0.1:8000/api/accounts/login/";
    const data = JSON.stringify(event);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(url, data, config);

    if (response.status === 200) {
      console.log(response.data);
      setAuthToken(response.data);
      setCurrentUser(jwt_decode(response.data.access));
      localStorage.setItem("authToken", JSON.stringify(response.data));
      console.log("login success");
      navigate(`${location.pathname}`);
    } else {
      alert("login failed");
    }
  }

  // logout function (NO BLACKLIST)
  async function logoutUser(event) {
    setCurrentUser(null);
    setAuthToken(null);
    localStorage.removeItem("authToken");
    console.log("logout success");
    alert("thanks for logging out");
    navigate("/");
  }

  const contextData = {
    authToken: authToken,
    setAuthToken: setAuthToken,
    currentUser: currentUser,
    setCurrentUser: setCurrentUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {tokenLoading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
