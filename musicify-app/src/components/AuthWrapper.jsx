import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Login from "../pages/Login";
import Register from "../pages/Register";

const AuthWrapper = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-black min-h-screen">
        Đang tải...
      </div>
    );
  }

  if (!isAuthenticated) {
    return isLogin ? (
      <Login switchToRegister={() => setIsLogin(false)} />
    ) : (
      <Register switchToLogin={() => setIsLogin(true)} />
    );
  }

  return children;
};

export default AuthWrapper;
