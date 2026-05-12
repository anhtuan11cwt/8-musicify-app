import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children, activeMenu }) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar activeMenu={activeMenu} />

        {/* Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
