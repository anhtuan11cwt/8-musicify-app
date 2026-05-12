import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Login = ({ switchToRegister }) => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-black px-5 min-h-screen">
      <form
        className="bg-zinc-900 p-8 border border-zinc-800 rounded-3xl w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-2 font-bold text-4xl">Chào mừng trở lại</h1>
        <p className="mb-8 text-zinc-400">Đăng nhập để tiếp tục nghe</p>
        <div className="mb-5">
          <label className="block mb-2 text-sm" htmlFor="email">
            Email
          </label>
          <input
            className="bg-zinc-800 px-4 py-3 border border-zinc-700 focus:border-green-500 rounded-xl outline-none w-full"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email"
            required
            type="email"
            value={email}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm" htmlFor="password">
            Mật khẩu
          </label>
          <div className="relative">
            <input
              className="bg-zinc-800 px-4 py-3 border border-zinc-700 focus:border-green-500 rounded-xl outline-none w-full"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
              type={showPassword ? "text" : "password"}
              value={password}
            />
            <button
              className="top-1/2 right-4 absolute text-zinc-400 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <button
          className="bg-green-500 hover:bg-green-400 disabled:opacity-50 py-3 rounded-xl w-full font-semibold transition cursor-pointer"
          disabled={loading}
          type="submit"
        >
          {loading ? "Đang tải..." : "Đăng nhập"}
        </button>
        <p className="mt-6 text-zinc-400 text-sm">
          Chưa có tài khoản?{" "}
          <button
            className="text-green-400 cursor-pointer"
            onClick={switchToRegister}
            type="button"
          >
            Đăng ký
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
