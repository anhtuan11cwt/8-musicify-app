import { useNavigate } from "react-router-dom";

const AlbumItem = ({ image, name, desc, id }) => {
  const navigate = useNavigate();

  return (
    <button
      className="bg-[#181818] hover:bg-[#252525] p-3 md:p-4 border-none rounded-lg w-full text-left transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/album/${id}`)}
      type="button"
    >
      <img
        alt={name}
        className="mb-3 rounded-md w-full object-cover aspect-square"
        src={image}
      />
      <p className="mb-1 font-bold text-sm md:text-base truncate">{name}</p>
      <p className="text-slate-400 text-xs md:text-sm line-clamp-2">{desc}</p>
    </button>
  );
};

export default AlbumItem;
