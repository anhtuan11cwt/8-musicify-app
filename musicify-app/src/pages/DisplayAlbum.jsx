import { useContext } from "react";
import { useParams } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContextValue";

const DisplayAlbum = () => {
  const { id } = useParams();
  const { albumsData, songsData, playWithId } = useContext(PlayerContext);

  const albumData = albumsData.find((item) => item._id === id);
  const albumSongs = songsData.filter((song) => song.album === albumData?.name);

  return albumData ? (
    <div>
      <div
        className="flex md:flex-row flex-col md:items-end gap-8 p-8"
        style={{ background: `linear-gradient(${albumData.bgColor}, #121212)` }}
      >
        <img
          alt={albumData.name}
          className="rounded w-48"
          src={albumData.image}
        />
        <div className="flex flex-col gap-3">
          <p>Danh sách phát</p>
          <h1 className="font-bold text-5xl">{albumData.name}</h1>
          <p>{albumData.description}</p>
          <p>Musicify • {albumSongs.length} bài hát</p>
        </div>
      </div>
      <div className="px-6">
        <div className="grid grid-cols-[0.5fr_4fr_2fr_1fr] py-2 border-[#ffffff2b] border-b text-slate-400 text-sm">
          <p>#</p>
          <p>Tiêu đề</p>
          <p>Album</p>
          <p>Thời gian</p>
        </div>
        {albumSongs.map((item, index) => (
          <button
            className="items-center gap-2 grid grid-cols-[0.5fr_4fr_2fr_1fr] hover:bg-[#ffffff26] p-2 text-[#a7a7a7] cursor-pointer border-none w-full text-left"
            key={item._id}
            onClick={() => playWithId(item._id)}
            type="button"
          >
            <p>{index + 1}</p>
            <div className="flex items-center gap-3">
              <img alt={item.name} className="w-10" src={item.image} />
              <div>
                <p className="text-white">{item.name}</p>
                <p className="text-sm">{item.description}</p>
              </div>
            </div>
            <p>{item.album}</p>
            <p>{item.duration}</p>
          </button>
        ))}
      </div>
    </div>
  ) : null;
};

export default DisplayAlbum;
