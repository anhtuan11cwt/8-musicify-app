import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { AuthContext } from "./AuthContextProvider";

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("musicify_token");
  const storedUser = localStorage.getItem("musicify_user");

  const [user, setUser] = useState(() =>
    storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null,
  );
  const [token, setToken] = useState(() => storedToken || null);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const isAuthenticated = !!token;

  const register = async (email, password) => {
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/register`, {
        email,
        password,
      });
      toast.success("Tạo tài khoản thành công");
    } catch (error) {
      toast.error(error.response?.data?.message || "Đăng ký thất bại");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      const data = response.data;
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("musicify_token", data.token);
      localStorage.setItem("musicify_user", JSON.stringify(data.user));
      toast.success("Đăng nhập thành công");
    } catch (error) {
      toast.error(error.response?.data?.message || "Đăng nhập thất bại");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("musicify_token");
    localStorage.removeItem("musicify_user");
    setUser(null);
    setToken(null);
    toast.success("Đã đăng xuất");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, login, logout, register, token, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
