import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
  const location = useLocation();

  const getActiveMenu = () => {
    const path = location.pathname;
    switch (path) {
      case "/add-song":
        return "add-song";
      case "/list-songs":
        return "list-song";
      case "/add-album":
        return "add-album";
      case "/list-albums":
        return "list-album";
      default:
        return "add-song";
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar activeMenu={getActiveMenu()} />

        {/* Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
