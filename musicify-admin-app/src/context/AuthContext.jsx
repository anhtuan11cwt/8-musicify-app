/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

import toast from "react-hot-toast";
import api from "../services/apiService";

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("adminUser");
    if (storedUser && storedUser !== "undefined") {
      return JSON.parse(storedUser);
    }
    return null;
  });

  const [token, setToken] = useState(
    localStorage.getItem("adminToken") || null,
  );

  const [loading] = useState(false);

  const login = async (email, password) => {
    try {
      const response = await api.post("/login", {
        email,
        password,
        portal: "admin",
      });

      const data = response.data;

      const user = {
        email: data.email,
        role: data.role,
      };

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(user));

      setToken(data.token);
      setUser(user);

      toast.success("Đăng nhập thành công");

      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Đăng nhập thất bại");

      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");

    localStorage.removeItem("adminUser");

    setUser(null);

    setToken(null);

    toast.success("Đã đăng xuất");
  };

  const isAuthenticated = !!token;

  const isAdmin = user?.role === "ADMIN";

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        isAuthenticated,
        loading,
        login,
        logout,
        token,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
