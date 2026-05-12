import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { loading, isAuthenticated, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Đang tải...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate replace to="/login" />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-2xl">
        Truy cập bị từ chối
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
