import { Image as ImageIcon, UploadCloud, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import apiService from "../services/apiService";

const AddAlbum = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [bgColor, setBgColor] = useState("#121212");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setImage(null);
    setPreview("");
    setName("");
    setDescription("");
    setBgColor("#121212");
  };

  const removeImage = () => {
    setImage(null);
    setPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !name || !description) {
      return toast.error("Vui lòng điền tất cả các trường");
    }

    try {
      setLoading(true);
      const albumData = { bgColor, description, name };
      const formData = new FormData();
      formData.append("request", JSON.stringify(albumData));
      formData.append("file", image);

      await apiService.post("/albums", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Đã thêm album thành công");
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Không thể thêm album");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 shadow-2xl mx-auto p-8 border border-zinc-800 rounded-2xl max-w-3xl">
      <h2 className="mb-8 font-bold text-white text-3xl">Thêm Album Mới</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <span className="block mb-2 text-zinc-400 text-sm">
            Tải ảnh bìa album
          </span>
          {preview ? (
            <div className="bg-zinc-800 p-4 border border-zinc-700 rounded-2xl">
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
                alt="preview"
                className="rounded-xl w-full h-48 object-cover"
                src={preview}
              />
            </div>
          ) : (
            <label
              className={`flex justify-center items-center border-2 border-zinc-700 ${loading ? "cursor-not-allowed opacity-50" : "hover:border-green-500"} border-dashed rounded-2xl w-full h-56 overflow-hidden transition ${loading ? "" : "cursor-pointer"}`}
            >
              <div className="flex flex-col items-center text-zinc-400">
                <UploadCloud size={40} />
                <span className="mt-3">Nhấn để tải lên</span>
              </div>
              <input
                accept="image/*"
                disabled={loading}
                hidden
                onChange={handleImageChange}
                type="file"
              />
            </label>
          )}
        </div>
        <div>
          <label
            className="block mb-2 text-zinc-400 text-sm"
            htmlFor="album-name"
          >
            Tên album
          </label>
          <input
            className="bg-zinc-800 disabled:opacity-50 px-4 py-3 border border-zinc-700 focus:border-green-500 rounded-xl outline-none w-full text-white disabled:cursor-not-allowed"
            disabled={loading}
            id="album-name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên album"
            type="text"
            value={name}
          />
        </div>
        <div>
          <label
            className="block mb-2 text-zinc-400 text-sm"
            htmlFor="album-description"
          >
            Mô tả
          </label>
          <textarea
            className="bg-zinc-800 disabled:opacity-50 px-4 py-3 border border-zinc-700 focus:border-green-500 rounded-xl outline-none w-full text-white resize-none disabled:cursor-not-allowed"
            disabled={loading}
            id="album-description"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Nhập mô tả album"
            rows="4"
            value={description}
          />
        </div>
        <div>
          <label
            className="block mb-2 text-zinc-400 text-sm"
            htmlFor="album-theme"
          >
            Màu chủ đề
          </label>
          <input
            className="bg-zinc-800 disabled:opacity-50 rounded w-20 h-12 cursor-pointer disabled:cursor-not-allowed"
            disabled={loading}
            id="album-theme"
            onChange={(e) => setBgColor(e.target.value)}
            type="color"
            value={bgColor}
          />
        </div>
        <button
          className={`flex justify-center items-center gap-2 bg-green-500 hover:bg-green-600 py-3 rounded-xl w-full font-bold text-black transition ${loading ? "pointer-events-none opacity-50" : ""}`}
          disabled={loading}
          type="submit"
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <LoadingSpinner />
              <span>Đang xử lý...</span>
            </div>
          ) : (
            "Thêm album"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddAlbum;
