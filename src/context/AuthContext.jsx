// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { getProtectedData, logoutAPI } from "../api/apiService"; // hits /protected
import { fa0, faL } from "@fortawesome/free-solid-svg-icons";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchUser() {
      try {
        const protectedData = await getProtectedData();
        if (protectedData.user) {
          setIsLoggedIn(true);
          setUser(protectedData.user);
        } else {
          setIsLoggedIn(false);

          setUser(null);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    }

    fetchUser();
  }, []);

  const loggedIn = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = async () => {
    const response = await logoutAPI();
    if (response.success) {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
