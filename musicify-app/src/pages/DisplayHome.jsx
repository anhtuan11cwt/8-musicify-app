import { useContext } from "react";
import AlbumItem from "../components/AlbumItem";
import SongItem from "../components/SongItem";
import { PlayerContext } from "../context/PlayerContextValue";

const DisplayHome = () => {
  const { albumsData, songsData } = useContext(PlayerContext);

  return (
    <div className="text-white">
      <div className="mb-8">
        <h1 className="my-5 font-bold text-2xl">Bảng xếp hạng nổi bật</h1>
        <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {albumsData.map((item) => (
            <AlbumItem
              desc={item.description}
              id={item._id}
              image={item.image}
              key={item._id}
              name={item.name}
            />
          ))}
        </div>
      </div>
      <div>
        <h1 className="my-5 font-bold text-2xl">Bài hát thịnh hành hôm nay</h1>
        <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {songsData.map((item) => (
            <SongItem
              desc={item.description}
              id={item._id}
              image={item.image}
              key={item._id}
              name={item.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayHome;
