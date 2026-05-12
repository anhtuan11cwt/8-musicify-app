import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AuthWrapper from "./components/AuthWrapper";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import { PlayerContext } from "./context/PlayerContextValue";
import DisplayAlbum from "./pages/DisplayAlbum";
import DisplayHome from "./pages/DisplayHome";
import Search from "./pages/Search";

function App() {
  const { track } = useContext(PlayerContext);

  return (
    <AuthWrapper>
      <div className="flex flex-col bg-black h-screen overflow-hidden text-white">
        <div className="flex flex-1 min-h-0">
          <Sidebar />
          <div className="flex flex-col flex-1 min-w-0">
            <Navbar />
            <div className="flex-1 p-4 md:p-6 overflow-y-auto">
              <Routes>
                <Route element={<DisplayHome />} path="/" />
                <Route element={<DisplayAlbum />} path="/album/:id" />
                <Route element={<Search />} path="/search" />
              </Routes>
            </div>
          </div>
        </div>
        {track && <Player />}
      </div>
    </AuthWrapper>
  );
}

export default App;
