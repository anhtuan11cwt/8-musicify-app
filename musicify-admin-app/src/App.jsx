import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/login" />

        <Route
          element={
            <ProtectedRoute requireAdmin={true}>
              <DashboardLayout activeMenu="add-song">
                <div className="text-2xl font-bold">Thêm Bài Hát</div>
              </DashboardLayout>
            </ProtectedRoute>
          }
          path="/add-song"
        />
        <Route
          element={
            <ProtectedRoute requireAdmin={true}>
              <DashboardLayout activeMenu="list-song">
                <div className="text-2xl font-bold">Danh Sách Bài Hát</div>
              </DashboardLayout>
            </ProtectedRoute>
          }
          path="/list-songs"
        />
        <Route
          element={
            <ProtectedRoute requireAdmin={true}>
              <DashboardLayout activeMenu="add-album">
                <div className="text-2xl font-bold">Thêm Album</div>
              </DashboardLayout>
            </ProtectedRoute>
          }
          path="/add-album"
        />
        <Route
          element={
            <ProtectedRoute requireAdmin={true}>
              <DashboardLayout activeMenu="list-album">
                <div className="text-2xl font-bold">Danh Sách Album</div>
              </DashboardLayout>
            </ProtectedRoute>
          }
          path="/list-albums"
        />
        <Route element={<Navigate replace to="/add-song" />} path="*" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
