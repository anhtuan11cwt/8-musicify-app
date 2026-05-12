import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContextValue";

const Player = () => {
  const {
    track,
    playStatus,
    play,
    pause,
    previous,
    next,
    seekSong,
    audioRef,
    seekBgRef,
    seekBarRef,
  } = useContext(PlayerContext);

  const [currentTime, setCurrentTime] = useState({ minute: 0, second: 0 });
  const [totalTime, setTotalTime] = useState({ minute: 0, second: 0 });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      const current = audio.currentTime;
      const duration = audio.duration || 1;

      setCurrentTime({
        minute: Math.floor(current / 60),
        second: Math.floor(current % 60),
      });

      setTotalTime({
        minute: Math.floor(duration / 60),
        second: Math.floor(duration % 60),
      });

      if (seekBarRef.current) {
        seekBarRef.current.style.width = `${(current / duration) * 100}%`;
      }
    };

    audio.addEventListener("timeupdate", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, [audioRef, seekBarRef]);

  return (
    <div className="flex justify-between items-center bg-black px-4 border-zinc-800 border-t h-20 text-white shrink-0">
      <div className="hidden lg:flex items-center gap-4">
        <img alt="" className="w-12" src={track?.image || assets.img1} />
        <div>
          <p>{track?.name || "Chưa phát"}</p>
          <p className="text-slate-400 text-sm">{track?.album || "..."}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex items-center gap-4">
          <button
            className="cursor-pointer flex flex-col items-center gap-1"
            type="button"
          >
            <img alt="" className="w-5" src={assets.shuffle_icon} />
            <span className="text-xs">Phát ngẫu nhiên</span>
          </button>
          <button
            className="cursor-pointer flex flex-col items-center gap-1"
            onClick={previous}
            type="button"
          >
            <img alt="" className="w-5" src={assets.prev_icon} />
            <span className="text-xs">Trước</span>
          </button>
          {playStatus ? (
            <button
              className="cursor-pointer flex flex-col items-center gap-1"
              onClick={pause}
              type="button"
            >
              <img alt="" className="w-5" src={assets.pause_icon} />
              <span className="text-xs">Tạm dừng</span>
            </button>
          ) : (
            <button
              className="cursor-pointer flex flex-col items-center gap-1"
              onClick={play}
              type="button"
            >
              <img alt="" className="w-5" src={assets.play_icon} />
              <span className="text-xs">Phát</span>
            </button>
          )}
          <button
            className="cursor-pointer flex flex-col items-center gap-1"
            onClick={next}
            type="button"
          >
            <img alt="" className="w-5" src={assets.next_icon} />
            <span className="text-xs">Tiếp theo</span>
          </button>
          <button
            className="cursor-pointer flex flex-col items-center gap-1"
            type="button"
          >
            <img alt="" className="w-5" src={assets.loop_icon} />
            <span className="text-xs">Lặp lại</span>
          </button>
        </div>
        <div className="flex items-center gap-5">
          <p className="text-xs">
            {String(currentTime.minute).padStart(2, "0")}:
            {String(currentTime.second).padStart(2, "0")}
          </p>
          <button
            className="bg-gray-300 border-none rounded-full w-[60vw] max-w-[500px] h-1 cursor-pointer relative"
            onClick={seekSong}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                seekSong(e);
              }
            }}
            ref={seekBgRef}
            type="button"
          >
            <div
              className="bg-green-500 absolute top-0 left-0 h-1 rounded-full"
              ref={seekBarRef}
              style={{ width: "0%" }}
            />
          </button>
          <p className="text-xs">
            {String(totalTime.minute).padStart(2, "0")}:
            {String(totalTime.second).padStart(2, "0")}
          </p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-3 opacity-75">
        <button
          className="cursor-pointer flex flex-col items-center gap-1"
          type="button"
        >
          <img alt="" className="w-5" src={assets.mic_icon} />
          <span className="text-xs">Micro</span>
        </button>
        <button
          className="cursor-pointer flex flex-col items-center gap-1"
          type="button"
        >
          <img alt="" className="w-5" src={assets.queue_icon} />
          <span className="text-xs">Danh sách</span>
        </button>
        <button
          className="cursor-pointer flex flex-col items-center gap-1"
          type="button"
        >
          <img alt="" className="w-5" src={assets.speaker_icon} />
          <span className="text-xs">Âm lượng</span>
        </button>
      </div>
      <audio ref={audioRef} src={track?.file}>
        <track kind="captions" />
      </audio>
    </div>
  );
};

export default Player;
