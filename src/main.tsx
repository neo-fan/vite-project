import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./store";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./index.css";

function BootLoading() {
  return (
    <div className="min-h-screen grid place-items-center bg-[#0b1020] text-white/80">
      正在恢复登录态...
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<BootLoading />} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>,
);


/** 启动遮罩：淡出后移除 */
function hideBootLoading() {
  const el = document.getElementById("boot-loading");
  if (!el) return;

  // 触发淡出
  el.classList.add("is-hiding");
  el.classList.remove("is-visible");

  // 等过渡结束后移除
  const remove = () => {
    el.removeEventListener("transitionend", remove);
    el.remove();
  };
  el.addEventListener("transitionend", remove);

  // 兜底：万一 transitionend 不触发（比如被打断）
  window.setTimeout(() => el.remove(), 600);
}

hideBootLoading();

