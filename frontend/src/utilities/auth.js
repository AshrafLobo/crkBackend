import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = async (user) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/",
        user
      );
      const { data } = response;

      localStorage.setItem("x-auth-token", data);
      setToken(data);

      return response;
    } catch (error) {
      const response = error.response;
      return response;
    }
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
