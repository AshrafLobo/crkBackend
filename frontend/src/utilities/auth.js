import { createContext, useContext, useState } from "react";

import DataProvider from "./DataProvider";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("x-auth-token"));

  const login = async (user) => {
    const provider = new DataProvider();
    const response = await provider.post("auth", user);
    const { data } = response;

    if (data && data.length > 0) {
      localStorage.setItem("x-auth-token", data);
      setToken(data);
    }

    return response;
  };

  const logout = () => {
    localStorage.removeItem("x-auth-token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
