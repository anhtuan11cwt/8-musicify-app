import { Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import apiService from "../services/apiService";

const ListSongs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSongs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiService.get("/songs");
      setSongs(response.data.songs || []);
    } catch (error) {
      console.error(error);
      toast.error("Không thể tải danh sách bài hát");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSongs();
  }, [fetchSongs]);

  const deleteSong = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bài hát này không?")) return;
    try {
      await apiService.delete(`/songs/${id}`);
      toast.success("Đã xóa bài hát");
      fetchSongs();
    } catch (error) {
      console.error(error);
      toast.error("Không thể xóa bài hát");
    }
  };

  const formatDuration = (duration) => {
    if (!duration) return "00:00";
    return duration;
  };

  return (
    <div className="bg-zinc-900 p-6 border border-zinc-800 rounded-2xl">
      <h2 className="mb-6 font-bold text-white text-2xl">Danh sách bài hát</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-zinc-800 border-b text-zinc-400">
              <th className="py-4 text-left">Ảnh bìa</th>
              <th className="py-4 text-left">Bài hát</th>
              <th className="py-4 text-left">Album</th>
              <th className="py-4 text-left">Thời lượng</th>
              <th className="py-4 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="py-10 text-zinc-400 text-center" colSpan="5">
                  Đang tải...
                </td>
              </tr>
            ) : (
              songs.map((song) => (
                <tr
                  className="hover:bg-zinc-800/40 border-zinc-800 border-b transition"
                  key={song._id}
                >
                  <td className="py-4">
                    <img
                      alt={song.name}
                      className="rounded-lg w-16 h-16 object-cover"
                      src={song.image}
                    />
                  </td>
                  <td className="font-medium text-white">{song.name}</td>
                  <td className="text-zinc-400">{song.album}</td>
                  <td className="text-zinc-400">
                    {formatDuration(song.duration)}
                  </td>
                  <td>
                    <button
                      className="text-red-500 hover:text-red-400 transition"
                      onClick={() => deleteSong(song._id)}
                      type="button"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-6 text-zinc-400">
        Tổng số bài hát:{" "}
        <span className="font-semibold text-white">{songs.length}</span>
      </div>
    </div>
  );
};

export default ListSongs;
