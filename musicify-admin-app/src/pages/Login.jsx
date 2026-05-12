import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("admin@musify.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);

    if (success) {
      navigate("/add-song");
    }
  };

  return (
    <div className="flex justify-center items-center bg-black px-4 min-h-screen">
      <form
        className="bg-zinc-900 p-8 border border-zinc-800 rounded-2xl w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-6 font-bold text-white text-3xl">Đăng Nhập Admin</h1>
        <div className="mb-4">
          <label className="block mb-2 text-zinc-400 text-sm" htmlFor="email">
            Email
          </label>
          <input
            className="bg-zinc-800 px-4 py-3 border border-zinc-700 focus:border-green-500 rounded-lg outline-none w-full text-white transition"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email"
            required
            type="email"
            value={email}
          />
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-zinc-400 text-sm"
            htmlFor="password"
          >
            Mật khẩu
          </label>
          <div className="relative">
            <input
              className="bg-zinc-800 px-4 py-3 border border-zinc-700 focus:border-green-500 rounded-lg outline-none w-full text-white transition"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
              type={showPassword ? "text" : "password"}
              value={password}
            />
            <button
              className="top-1/2 right-4 absolute text-zinc-400 hover:text-white -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 disabled:opacity-50 py-3 rounded-lg w-full font-semibold text-white transition-all cursor-pointer"
          disabled={loading}
          type="submit"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
};

export default Login;
