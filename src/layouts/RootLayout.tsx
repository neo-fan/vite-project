import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { clearUser } from "../store/userSlice";
import { persistor, type RootState } from "../store";
import GlobalRouteLoading from "../components/GlobalRouteLoading";
import { AuthGuard } from "../components/Guards/AuthGuard";
import { useEffect, useState } from "react";
import { Container } from "../components/Container";

const RootLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state: RootState) => state.user.name);
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      dispatch(clearUser());
      await persistor.purge();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("登出失败:", error);
      setIsLoggingOut(false);
    }
  };

  useEffect(() => {
    document.title = "Vite";
  }, []);

  const navItem = (isActive: boolean) =>
    `text-sm transition-colors relative pb-1 ${
      isActive
        ? "text-neutral-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-neutral-900"
        : "text-neutral-500 hover:text-neutral-900"
    }`;

  return (
    // ✅ 1. 整个应用锁定一屏高度，禁止页面滚动
    <div className="h-screen w-full bg-neutral-50 flex flex-col overflow-hidden">
      <GlobalRouteLoading delayMs={100} minDurationMs={300} text="loading..." />

      {/* ✅ 2. Header 固定高度，不参与压缩、不滚动 */}
      <header className="border-b border-neutral-200 shrink-0">
        <Container>
          <div className="flex items-center justify-between h-20 gap-6">
            <div className="flex items-center gap-8 flex-1 min-w-0">
              <h1 className="text-2xl font-light tracking-tight text-neutral-900 shrink-0">
                Neo
              </h1>

              <nav className="hidden md:flex items-center gap-8 min-w-0 whitespace-nowrap">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) => navItem(isActive)}
                >
                  首页
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) => navItem(isActive)}
                >
                  关于
                </NavLink>
                <NavLink
                  to="/news/42"
                  className={({ isActive }) => navItem(isActive)}
                >
                  新闻
                </NavLink>
                <NavLink
                  to="/clock"
                  className={({ isActive }) => navItem(isActive)}
                >
                  时钟
                </NavLink>
                <NavLink
                  to="/weather"
                  className={({ isActive }) => navItem(isActive)}
                >
                  天气
                </NavLink>
              </nav>
            </div>

            <div className="flex items-center gap-6 shrink-0">
              {userName && (
                <span className="text-sm text-neutral-600 hidden md:inline">
                  {userName}
                </span>
              )}
              <button
                onClick={logout}
                disabled={isLoggingOut}
                className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors disabled:opacity-50"
              >
                {isLoggingOut ? "登出中..." : "退出"}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* ✅ 3. Main：唯一滚动区域 */}
      <AuthGuard>
        <main className="flex-1 overflow-y-auto">
          {/* padding 放在 Container 外层，避免滚动条“吃掉” padding */}
          <Container className="py-16 min-w-0 bg-white rounded-xl shadow-sm">
            <div className="min-w-0 break-words [&_pre]:overflow-x-auto [&_code]:break-words">
              <Outlet />
            </div>
          </Container>
        </main>
      </AuthGuard>

      {/* ✅ 4. Footer 固定，不滚动 */}
      <footer className="border-t border-neutral-200 shrink-0">
        <Container className="py-6">
          <p className="text-xs text-neutral-400 text-center">
            © 2026 React App
          </p>
        </Container>
      </footer>
    </div>
  );
};

export default RootLayout;
