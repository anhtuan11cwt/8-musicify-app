import { Route, Routes } from "react-router-dom";
import AuthWrapper from "./components/AuthWrapper";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const DisplayHome = () => <h1>Trang chủ</h1>;
const DisplayAlbum = () => <h1>Trang Album</h1>;
const Search = () => <h1>Trang Tìm kiếm</h1>;

function App() {
  return (
    <AuthWrapper>
      <div className="flex bg-black h-screen text-white">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Navbar />
          <div className="flex-1 p-6 overflow-y-auto">
            <Routes>
              <Route element={<DisplayHome />} path="/" />
              <Route element={<DisplayAlbum />} path="/album/:id" />
              <Route element={<Search />} path="/search" />
            </Routes>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default App;
