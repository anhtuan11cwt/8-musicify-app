import { Home, Library, Search } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="flex-shrink-0 bg-zinc-950 p-5 border-zinc-800 border-r w-16 md:w-64">
      <div className="space-y-4">
        <button
          className="flex md:flex-row flex-col items-center gap-3 text-white hover:text-green-400 transition cursor-pointer"
          type="button"
        >
          <Home size={22} />
          <span className="hidden md:inline">Trang chủ</span>
        </button>

        <button
          className="flex md:flex-row flex-col items-center gap-3 text-white hover:text-green-400 transition cursor-pointer"
          type="button"
        >
          <Search size={22} />
          <span className="hidden md:inline">Tìm kiếm</span>
        </button>

        <button
          className="flex md:flex-row flex-col items-center gap-3 text-white hover:text-green-400 transition cursor-pointer"
          type="button"
        >
          <Library size={22} />
          <span className="hidden md:inline">Thư viện</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
