import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import AddAlbum from "./pages/AddAlbum";
import AddSong from "./pages/AddSong";
import ListAlbums from "./pages/ListAlbums";
import ListSongs from "./pages/ListSongs";
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
              <DashboardLayout>
                <Routes>
                  <Route element={<AddSong />} path="/add-song" />
                  <Route element={<ListSongs />} path="/list-songs" />
                  <Route element={<AddAlbum />} path="/add-album" />
                  <Route element={<ListAlbums />} path="/list-albums" />
                  <Route
                    element={<Navigate replace to="/add-song" />}
                    path="*"
                  />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          }
          path="/*"
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
