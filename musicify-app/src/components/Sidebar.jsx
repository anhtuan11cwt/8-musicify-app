import { Home, Library, Search } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="bg-zinc-950 p-5 border-zinc-800 border-r w-64">
      <div className="space-y-4">
        <button
          className="flex items-center gap-3 text-white hover:text-green-400 transition cursor-pointer"
          type="button"
        >
          <Home size={22} />
          Trang chủ
        </button>

        <button
          className="flex items-center gap-3 text-white hover:text-green-400 transition cursor-pointer"
          type="button"
        >
          <Search size={22} />
          Tìm kiếm
        </button>

        <button
          className="flex items-center gap-3 text-white hover:text-green-400 transition cursor-pointer"
          type="button"
        >
          <Library size={22} />
          Thư viện
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
