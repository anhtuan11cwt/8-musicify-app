import { useNavigate } from "react-router-dom";
import { adminMenu } from "../assets/assets";

const Sidebar = ({ activeMenu }) => {
  const navigate = useNavigate();

  return (
    <aside className="w-20 md:w-64 border-r border-zinc-800 bg-zinc-900 min-h-[calc(100vh-64px)]">
      <div className="flex flex-col gap-2 p-3">
        {adminMenu.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;

          return (
            <button
              className={`
                flex items-center gap-3
                px-3 py-3 rounded-xl
                transition-all duration-200
                ${
                  isActive
                    ? "bg-green-500 text-black font-semibold"
                    : "hover:bg-zinc-800 text-zinc-300"
                }
              `}
              key={item.id}
              onClick={() => navigate(item.path)}
              type="button"
            >
              <Icon size={20} />
              <span className="hidden md:block">{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
