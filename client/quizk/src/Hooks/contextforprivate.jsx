// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { api } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check session by calling a protected endpoint
    api.get("/me", { withCredentials: true })
      .then((response) => {
        setIsAuthenticated(true);
      })
      .catch((error) => {
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
