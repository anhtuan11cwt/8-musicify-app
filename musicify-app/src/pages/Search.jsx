import { useContext } from "react";
import AlbumItem from "../components/AlbumItem";
import SongItem from "../components/SongItem";
import { SearchContext } from "../context/SearchContext";

const Search = () => {
  const { searchQuery, searchResults } = useContext(SearchContext);
  const totalResults = searchResults.songs.length + searchResults.albums.length;

  return (
    <div className="p-6 text-white min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Tìm kiếm</h1>
        {searchQuery && (
          <p className="text-gray-400 mt-2">
            Tìm thấy {totalResults} kết quả cho "{searchQuery}"
          </p>
        )}
      </div>

      {/* Empty Query */}
      {!searchQuery && (
        <div className="text-gray-400 mt-20 text-center">
          <h2 className="text-2xl font-semibold">Tìm kiếm bài hát & album</h2>
          <p className="mt-2">Bắt đầu nhập trong ô tìm kiếm...</p>
        </div>
      )}

      {/* No Results */}
      {searchQuery && totalResults === 0 && (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-semibold">Không tìm thấy kết quả</h2>
          <p className="text-gray-400 mt-2">Thử từ khóa khác</p>
        </div>
      )}

      {/* Albums */}
      {searchResults.albums.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Album</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {searchResults.albums.map((album) => (
              <AlbumItem
                desc={album.description}
                id={album._id}
                image={album.image}
                key={album._id}
                name={album.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Songs */}
      {searchResults.songs.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Bài hát</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.songs.map((song) => (
              <SongItem
                desc={song.description}
                id={song._id}
                image={song.image}
                key={song._id}
                name={song.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
