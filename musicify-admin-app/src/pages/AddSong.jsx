import { Image as ImageIcon, Music, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import apiService from "../services/apiService";

const AddSong = () => {
  const [albums, setAlbums] = useState([]);
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const [audioPreview, setAudioPreview] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [album, setAlbum] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await apiService.get("/albums");
        setAlbums(response.data.albums || []);
      } catch (error) {
        console.error(error);
        toast.error("Không thể tải danh sách album");
      }
    };
    fetchAlbums();
  }, []);

  const resetForm = () => {
    setAudio(null);
    setImage(null);
    setAudioPreview("");
    setImagePreview("");
    setName("");
    setDescription("");
    setAlbum("");
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAudio(file);
    setAudioPreview(URL.createObjectURL(file));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeAudio = () => {
    setAudio(null);
    setAudioPreview("");
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!audio || !image || !name || !description || !album) {
      return toast.error("Vui lòng điền tất cả các trường");
    }

    try {
      setLoading(true);
      const request = { album, description, name };
      const formData = new FormData();
      formData.append("request", JSON.stringify(request));
      formData.append("audio", audio);
      formData.append("image", image);

      await apiService.post("/songs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Đã thêm bài hát thành công");
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Không thể thêm bài hát");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-8 font-bold text-white text-3xl">Thêm Bài Hát</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            className="block mb-2 font-medium text-zinc-300 text-sm"
            htmlFor="song-name"
          >
            Tên bài hát
          </label>
          <input
            className="bg-zinc-800 disabled:opacity-50 px-4 py-2 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full text-white disabled:cursor-not-allowed"
            disabled={loading}
            id="song-name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên bài hát"
            type="text"
            value={name}
          />
        </div>

        <div>
          <label
            className="block mb-2 font-medium text-zinc-300 text-sm"
            htmlFor="song-description"
          >
            Mô tả
          </label>
          <textarea
            className="bg-zinc-800 disabled:opacity-50 px-4 py-2 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full h-24 text-white disabled:cursor-not-allowed"
            disabled={loading}
            id="song-description"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Nhập mô tả bài hát"
            value={description}
          />
        </div>

        <div>
          <label
            className="block mb-2 font-medium text-zinc-300 text-sm"
            htmlFor="song-album"
          >
            Album
          </label>
          <select
            className="bg-zinc-800 disabled:opacity-50 px-4 py-2 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full text-white disabled:cursor-not-allowed"
            disabled={loading}
            id="song-album"
            onChange={(e) => setAlbum(e.target.value)}
            value={album}
          >
            <option value="">Chọn album</option>
            {albums.map((album) => (
              <option key={album._id} value={album.name}>
                {album.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className="block mb-2 font-medium text-zinc-300 text-sm"
            htmlFor="song-audio"
          >
            File âm thanh
          </label>
          {audioPreview ? (
            <div className="bg-zinc-800 p-4 border border-zinc-700 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2 text-zinc-300">
                  <Music size={20} />
                  <span className="text-sm truncate">{audio?.name}</span>
                </div>
                <button
                  className="disabled:opacity-50 text-red-400 hover:text-red-300 transition disabled:cursor-not-allowed"
                  disabled={loading}
                  onClick={removeAudio}
                  type="button"
                >
                  <X size={20} />
                </button>
              </div>
              <audio className="w-full" controls src={audioPreview}>
                <track kind="captions" />
              </audio>
            </div>
          ) : (
            <input
              accept="audio/*"
              className="bg-zinc-800 disabled:opacity-50 px-4 py-2 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full text-white disabled:cursor-not-allowed"
              disabled={loading}
              id="song-audio"
              onChange={handleAudioChange}
              type="file"
            />
          )}
        </div>

        <div>
          <label
            className="block mb-2 font-medium text-zinc-300 text-sm"
            htmlFor="song-image"
          >
            Hình ảnh
          </label>
          {imagePreview ? (
            <div className="bg-zinc-800 p-4 border border-zinc-700 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2 text-zinc-300">
                  <ImageIcon size={20} />
                  <span className="text-sm truncate">{image?.name}</span>
                </div>
                <button
                  className="disabled:opacity-50 text-red-400 hover:text-red-300 transition disabled:cursor-not-allowed"
                  disabled={loading}
                  onClick={removeImage}
                  type="button"
                >
                  <X size={20} />
                </button>
              </div>
              <img
                alt="Preview"
                className="rounded-lg w-full h-48 object-cover"
                src={imagePreview}
              />
            </div>
          ) : (
            <input
              accept="image/*"
              className="bg-zinc-800 disabled:opacity-50 px-4 py-2 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full text-white disabled:cursor-not-allowed"
              disabled={loading}
              id="song-image"
              onChange={handleImageChange}
              type="file"
            />
          )}
        </div>

        <div className="flex gap-4">
          <button
            className={`flex-1 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-medium text-white transition ${loading ? "pointer-events-none opacity-50" : ""}`}
            disabled={loading}
            type="submit"
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <LoadingSpinner />
                <span>Đang xử lý...</span>
              </div>
            ) : (
              "Thêm bài hát"
            )}
          </button>
          <button
            className={`flex-1 bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded-lg font-medium text-white transition ${loading ? "pointer-events-none opacity-50" : ""}`}
            disabled={loading}
            onClick={resetForm}
            type="button"
          >
            Đặt lại
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSong;
