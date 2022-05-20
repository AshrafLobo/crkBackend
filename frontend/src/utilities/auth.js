import { createContext, useContext, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (user) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/",
        user
      );
      const { data } = response;

      localStorage.setItem("x-auth-token", data);

      const { phoneNo } = jwt_decode(data);
      setUser(phoneNo);

      return response;
    } catch (error) {
      const response = error.response;
      return response;
    }
  };

  const logout = () => {
    localStorage.removeItem("x-auth-token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
