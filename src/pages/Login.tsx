import { useSearchParams, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hook";
import { setUser } from "../store/userSlice";
import { useEffect } from "react";

export default function Login() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const from = params.get("from") || "/";

  const handleLogin = () => {
    dispatch(setUser({ name: "Neo", token: "demo-token" }));
    navigate(from, { replace: true });
  };

  useEffect(() => {
    document.title = "请登录"
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-[640px] p-8 bg-white rounded-md shadow-sm">
        <h2 className="mb-4 text-center text-xl font-normal text-gray-800">
          登录
        </h2>
        <p className="mb-6 text-center text-sm text-gray-500">
          登录后前往：<span className="text-gray-700">{from}</span>
        </p>
        {/* 外层div实现按钮水平居中，按钮保留窄版宽度+原有样式 */}
        <div className="text-center">
          <button
            onClick={handleLogin}
            className="w-[150px] rounded-md bg-gray-800 py-1 text-white hover:bg-gray-700 transition-colors text-sm"
          >
            登录
          </button>
        </div>
        <p className="mt-4 text-center text-xs text-gray-400">
          Redux + 路由守卫演示
        </p>
      </div>
    </div>
  );
}
