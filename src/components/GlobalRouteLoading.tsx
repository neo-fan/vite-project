import { useEffect, useRef, useState } from "react";
import { useNavigation } from "react-router-dom";

/**
 * 全局路由加载遮罩：
 * - delayMs: 延迟显示毫秒数（防闪烁）
 * - minDurationMs: 最小展示毫秒数（稳体验）
 * - text: 自定义加载文案
 */
export default function GlobalRouteLoading({
  delayMs = 150,
  minDurationMs = 300,
  text = "加载中...",
}: {
  delayMs?: number;
  minDurationMs?: number;
  text?: string;
}) {
  const navigation = useNavigation();
  const isBusy = navigation.state !== "idle"; // 监听路由loading/submitting状态

  const [visible, setVisible] = useState(false);
  // 定时器与时间戳Ref：避免闭包问题，安全管理定时器
  const showTimer = useRef<number | null>(null);
  const shownAt = useRef<number | null>(null);
  const hideTimer = useRef<number | null>(null);

  useEffect(() => {
    // 统一清理定时器：组件卸载/状态变化时执行，防止内存泄漏
    const clearTimers = () => {
      if (showTimer.current) {
        window.clearTimeout(showTimer.current);
        showTimer.current = null;
      }
      if (hideTimer.current) {
        window.clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
    };

    if (isBusy) {
      // 路由开始加载：先清所有定时器，再延迟显示（避免多个定时器叠加）
      clearTimers();
      showTimer.current = window.setTimeout(() => {
        shownAt.current = Date.now();
        setVisible(true);
      }, delayMs);
    } else {
      // 路由加载完成：未显示则直接清定时器；已显示则保证最小展示时长
      if (showTimer.current) {
        clearTimeout(showTimer.current);
        showTimer.current = null;
        setVisible(false); // 关键修复：未显示时直接置为false，避免状态残留
        shownAt.current = null;
        return;
      }

      if (!visible) return;

      // 计算剩余展示时长，确保至少显示minDurationMs
      const elapsed = shownAt.current ? Date.now() - shownAt.current : 0;
      const remainTime = Math.max(0, minDurationMs - elapsed);

      // 先清旧的隐藏定时器，再创建新的（核心修复：避免定时器叠加）
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => {
        setVisible(false);
        shownAt.current = null;
        hideTimer.current = null; // 执行后清空，避免引用残留
      }, remainTime);
    }

    // 组件卸载/依赖变化时，强制清理所有定时器+重置状态（终极兜底）
    return () => {
      clearTimers();
      setVisible(false);
      shownAt.current = null;
    };
  }, [isBusy, delayMs, minDurationMs]); // 依赖完整，消除ESLint警告

  // 未显示时直接返回null，不渲染任何元素
  if (!visible) return null;

  return (
    /* 全屏遮罩：最高层级+居中+浅白半透，低视觉干扰 */
    <div className="fixed inset-0 z-50 grid place-items-center bg-white/80 backdrop-blur-sm">
      {/* 加载卡片：项目通用圆角+纯白+轻阴影，与其他组件风格统一 */}
      <div className="flex items-center gap-2 rounded-md bg-white px-3 py-1.5 shadow-sm">
        {/* 加载动画：极简灰系旋转圈，尺寸适配文字，无炫效 */}
        <div
          className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-gray-200 border-t-gray-700"
          aria-label="加载中"
        />
        {/* 加载文案：中性深灰+小字号，清晰不抢焦点 */}
        <span className="text-sm text-gray-700">{text}</span>
      </div>
    </div>
  );
}