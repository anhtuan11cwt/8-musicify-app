import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
              <div className="p-8">Thêm Bài Hát</div>
            </ProtectedRoute>
          }
          path="/add-song"
        />
        <Route
          element={
            <ProtectedRoute requireAdmin={true}>
              <div className="p-8">Danh Sách Bài Hát</div>
            </ProtectedRoute>
          }
          path="/list-songs"
        />
        <Route
          element={
            <ProtectedRoute requireAdmin={true}>
              <div className="p-8">Thêm Album</div>
            </ProtectedRoute>
          }
          path="/add-album"
        />
        <Route
          element={
            <ProtectedRoute requireAdmin={true}>
              <div className="p-8">Danh Sách Album</div>
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
