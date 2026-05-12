import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-between items-center px-6 border-zinc-800 border-b h-16">
      <h1 className="font-bold text-green-500 text-2xl">Musicify</h1>

      <div className="flex items-center gap-4">
        <p className="text-zinc-400 text-sm">{user?.email}</p>

        <button
          className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg cursor-pointer"
          onClick={logout}
          type="button"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Navbar;
