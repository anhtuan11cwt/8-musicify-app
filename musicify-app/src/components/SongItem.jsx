import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContextValue";

const SongItem = ({ image, name, desc, id }) => {
  const { playWithId } = useContext(PlayerContext);

  return (
    <button
      className="min-w-[180px] p-4 rounded-lg cursor-pointer bg-[#181818] hover:bg-[#252525] transition-all duration-300 text-left border-none"
      onClick={() => playWithId(id)}
      type="button"
    >
      <img alt={name} className="rounded-md mb-4" src={image} />
      <p className="font-bold mb-2 truncate">{name}</p>
      <p className="text-slate-400 text-sm">{desc}</p>
    </button>
  );
};

export default SongItem;
