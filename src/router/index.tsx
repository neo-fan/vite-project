import { Outlet, createHashRouter } from "react-router-dom";
import { Suspense } from "react";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Weather from "../pages/Weather";
// import { requireAuthLoader } from "./guards";

// 懒加载兜底组件
const LazyLoadFallback = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#0b1020] text-white/80">
    <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
    <p>页面加载中...</p>
  </div>
);

// 全局 Suspense 包装组件
const SuspenseWrapper = () => (
  <Suspense fallback={<LazyLoadFallback />}>
    <Outlet />
  </Suspense>
);

// 懒加载辅助函数
const lazyLoad = (
  importFn: () => Promise<{ default: React.ComponentType }>,
) => ({
  lazy: async () => {
    const module = await importFn();
    return { Component: module.default };
  },
});

export const router = createHashRouter([
  {
    // 根路由：全局 Suspense 包装
    element: <SuspenseWrapper />,
    children: [
      // 公共路由
      {
        path: "/login",
        element: <Login />,
      },
      // 私有路由
      {
        path: "/",
        element: <RootLayout />,
        // loader: requireAuthLoader,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "news/:id",
            ...lazyLoad(() => import("../pages/News")),
            loader: async ({ params }: any) => {
              const { id } = params;
              if (!/^\d+$/.test(id)) {
                throw new Response("无效的新闻ID", { status: 400 });
              }
              return { newsId: Number(id) };
            },
          },
          {
            path: "clock",
            ...lazyLoad(() => import("../pages/WorldClocks")),
          },
          {
            path: "weather",
            element: <Weather />,
          },
        ],
      },
      // 404 路由
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
