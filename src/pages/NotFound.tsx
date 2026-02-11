import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h2 className="text-6xl text-gray-800 mb-2">404</h2>
      <p className="text-gray-500 mb-6">页面不存在或已被移除</p>
      <Link
        to="/"
        className="rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 transition-colors"
      >
        回到首页
      </Link>
    </div>
  );
}