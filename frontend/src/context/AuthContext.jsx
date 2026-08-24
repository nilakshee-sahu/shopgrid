import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("userInfo"));
  const [user, setUser] = useState(storedUser);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("userInfo", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};