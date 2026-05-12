import { useCallback, useContext, useMemo, useState } from "react";
import { PlayerContext } from "./PlayerContext";
import { SearchContext } from "./SearchContextValue";

export { SearchContext };

const normalizeText = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const SearchProvider = ({ children }) => {
  const { songsData, albumsData } = useContext(PlayerContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setIsSearchActive(false);
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return { albums: [], songs: [] };
    }

    const query = normalizeText(searchQuery);

    const filteredSongs = songsData.filter((song) => {
      const name = song.name ? normalizeText(song.name) : "";
      const desc = song.description ? normalizeText(song.description) : "";
      return name.includes(query) || desc.includes(query);
    });

    const filteredAlbums = albumsData.filter((album) => {
      const name = album.name ? normalizeText(album.name) : "";
      const desc = album.description ? normalizeText(album.description) : "";
      return name.includes(query) || desc.includes(query);
    });

    return {
      albums: filteredAlbums,
      songs: filteredSongs,
    };
  }, [searchQuery, songsData, albumsData]);

  const value = useMemo(
    () => ({
      clearSearch,
      isSearchActive,
      searchQuery,
      searchResults,
      setIsSearchActive,
      setSearchQuery,
    }),
    [clearSearch, isSearchActive, searchQuery, searchResults],
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export default SearchProvider;
