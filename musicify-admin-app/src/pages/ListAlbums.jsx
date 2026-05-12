import { Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import apiService from "../services/apiService";

const ListAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAlbums = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiService.get("/albums");
      setAlbums(response.data.albums || []);
    } catch (error) {
      console.error(error);
      toast.error("Không thể tải danh sách album");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAlbums();
  }, [fetchAlbums]);

  const deleteAlbum = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa album này không?")) return;
    try {
      await apiService.delete(`/albums/${id}`);
      toast.success("Đã xóa album");
      fetchAlbums();
    } catch (error) {
      console.error(error);
      toast.error("Không thể xóa album");
    }
  };

  return (
    <div className="bg-zinc-900 p-6 border border-zinc-800 rounded-2xl">
      <h2 className="mb-6 font-bold text-white text-2xl">Danh sách album</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-zinc-800 border-b text-zinc-400">
              <th className="py-4 text-left">Ảnh bìa</th>
              <th className="py-4 text-left">Tên</th>
              <th className="py-4 text-left">Mô tả</th>
              <th className="py-4 text-left">Chủ đề</th>
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
              albums.map((album) => (
                <tr
                  className="hover:bg-zinc-800/40 border-zinc-800 border-b transition"
                  key={album._id}
                >
                  <td className="py-4">
                    <img
                      alt={album.name}
                      className="rounded-lg w-16 h-16 object-cover"
                      src={album.image}
                    />
                  </td>
                  <td className="font-medium text-white">{album.name}</td>
                  <td className="max-w-[200px] text-zinc-400 truncate">
                    {album.description}
                  </td>
                  <td>
                    <div
                      className="border border-zinc-700 rounded-full w-8 h-8"
                      style={{ background: album.bgColor }}
                    />
                  </td>
                  <td>
                    <button
                      className="text-red-500 hover:text-red-400 transition"
                      onClick={() => deleteAlbum(album._id)}
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
        Tổng số album:{" "}
        <span className="font-semibold text-white">{albums.length}</span>
      </div>
    </div>
  );
};

export default ListAlbums;
