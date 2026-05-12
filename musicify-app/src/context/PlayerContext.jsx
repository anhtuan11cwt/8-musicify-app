import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";

import { AuthContext } from "./AuthContextProvider";
import { PlayerContext } from "./PlayerContextValue";

const PlayerContextProvider = ({ children }) => {
  const { isAuthenticated, token } = useContext(AuthContext);

  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { minute: 0, second: 0 },
    totalTime: { minute: 0, second: 0 },
  });
  const [albumsData, setAlbumsData] = useState([]);
  const [songsData, setSongsData] = useState([]);
  const [dataLoading] = useState(false);

  const audioRef = useRef();
  const seekBgRef = useRef();
  const seekBarRef = useRef();

  const urlRef = useRef(import.meta.env.VITE_API_BASE_URL.replace("/api", ""));

  const play = async () => {
    await audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = async () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playWithId = async (id) => {
    const trackData = songsData.find((item) => item._id === id);
    setTrack(trackData);
    setTimeout(async () => {
      await audioRef.current.play();
      setPlayStatus(true);
    }, 0);
  };

  const previous = async () => {
    const currentIndex = songsData.findIndex((item) => item._id === track._id);
    if (currentIndex > 0) {
      await playWithId(songsData[currentIndex - 1]._id);
    }
  };

  const next = async () => {
    const currentIndex = songsData.findIndex((item) => item._id === track._id);
    if (currentIndex < songsData.length - 1) {
      await playWithId(songsData[currentIndex + 1]._id);
    }
  };

  const seekSong = async (event) => {
    audioRef.current.currentTime =
      (event.nativeEvent.offsetX / seekBgRef.current.offsetWidth) *
      audioRef.current.duration;
  };

  useEffect(() => {
    if (!isAuthenticated || !token) {
      return;
    }

    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [albumsRes, songsRes] = await Promise.all([
          axios.get(`${urlRef.current}/api/albums`, { headers }),
          axios.get(`${urlRef.current}/api/songs`, { headers }),
        ]);
        if (albumsRes.data.success) {
          setAlbumsData(albumsRes.data.albums);
        }
        if (songsRes.data.success) {
          setSongsData(songsRes.data.songs);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [isAuthenticated, token]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.ontimeupdate = () => {
        if (seekBarRef.current) {
          seekBarRef.current.style.width = `${Math.floor((audioRef.current.currentTime / audioRef.current.duration) * 100)}%`;
        }
        setTime({
          currentTime: {
            minute: Math.floor(audioRef.current.currentTime / 60),
            second: Math.floor(audioRef.current.currentTime % 60),
          },
          totalTime: {
            minute: Math.floor(audioRef.current.duration / 60),
            second: Math.floor(audioRef.current.duration % 60),
          },
        });
      };
    }
  }, []);

  const contextValue = {
    albumsData,
    audioRef,
    dataLoading,
    next,
    pause,
    play,
    playStatus,
    playWithId,
    previous,
    seekBarRef,
    seekBgRef,
    seekSong,
    setPlayStatus,
    setTime,
    setTrack,
    songsData,
    time,
    track,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
