import { LogOut, Music2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="top-0 z-50 sticky flex justify-between items-center bg-zinc-900 px-4 md:px-6 border-zinc-800 border-b h-16">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-green-500 p-2 rounded-lg">
          <Music2 className="text-black" size={20} />
        </div>
        <h1 className="font-bold text-white text-lg md:text-xl">
          Musicify Admin
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* User Info */}
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-zinc-300 text-sm">{user?.email}</span>
          <span className="bg-green-500/20 px-2 py-0.5 rounded-full font-semibold text-[10px] text-green-400 uppercase">
            {user?.role}
          </span>
        </div>

        {/* Logout */}
        <button
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg font-medium text-white text-sm transition"
          onClick={logout}
          type="button"
        >
          <LogOut size={18} />
          <span className="hidden md:block">Đăng xuất</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
