import { Home, Library, Search as SearchIcon } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const { searchQuery, setSearchQuery, setIsSearchActive, clearSearch } =
    useContext(SearchContext);

  return (
    <div className="flex-shrink-0 bg-zinc-950 p-5 border-zinc-800 border-r w-16 md:w-64">
      <div className="space-y-4">
        <button
          className="flex md:flex-row flex-col items-center gap-3 text-white hover:text-green-400 transition cursor-pointer"
          onClick={() => navigate("/")}
          type="button"
        >
          <Home size={22} />
          <span className="hidden md:inline">Trang chủ</span>
        </button>

        <div className="relative">
          <button
            className="flex md:flex-row flex-col items-center gap-3 text-white hover:text-green-400 transition cursor-pointer"
            onClick={() => setShowSearch(!showSearch)}
            type="button"
          >
            <SearchIcon size={22} />
            <span className="hidden md:inline">Tìm kiếm</span>
          </button>
          {showSearch && (
            <div className="relative mt-4">
              <input
                className="w-full bg-[#242424] text-white pl-4 pr-10 py-2 rounded-full outline-none border border-gray-700 focus:border-green-500 hidden md:block"
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchQuery(value);
                  setIsSearchActive(true);
                  navigate("/search");
                }}
                placeholder="Tìm kiếm..."
                type="text"
                value={searchQuery}
              />
              <button
                className="absolute right-3 top-2.5 text-gray-400 hover:text-white hidden md:block cursor-pointer"
                onClick={() => {
                  clearSearch();
                  setShowSearch(false);
                }}
                type="button"
              >
                ✕
              </button>
            </div>
          )}
        </div>

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
