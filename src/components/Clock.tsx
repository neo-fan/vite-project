import { useEffect, useMemo, useState } from "react";

type ClockProps = {
  /** 语言/地区：影响星期、日期格式（如 zh-CN / en-US / ja-JP） */
  locale?: string;
  /** 时区：决定显示哪个时区的时间（如 Asia/Shanghai） */
  timeZone?: string;
  /** 是否显示时区名字（如 GMT+8 / CST 等） */
  showTimeZoneName?: boolean;
  /** 自定义容器 className（可选） */
  className?: string;
};

const DEFAULT_TIMEZONE_BY_LOCALE: Record<string, string> = {
  "zh-CN": "Asia/Shanghai",
  "en-US": "America/New_York",
  "en-GB": "Europe/London",
  "ja-JP": "Asia/Tokyo",
  "ko-KR": "Asia/Seoul",
};

export default function Clock({
  locale = "zh-CN",
  timeZone,
  showTimeZoneName = true,
  className = "",
}: ClockProps) {
  const [now, setNow] = useState(() => Date.now());

  // 选用时区：优先 props.timeZone，其次按 locale 映射，最后用系统时区
  const resolvedTimeZone =
    timeZone ||
    DEFAULT_TIMEZONE_BY_LOCALE[locale] ||
    Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const date = useMemo(() => new Date(now), [now]);

  // 时间格式化器（缓存优化，仅依赖项变化时重建）
  const timeFormatter = useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: resolvedTimeZone,
      ...(showTimeZoneName ? { timeZoneName: "short" } : {}),
    });
  }, [locale, resolvedTimeZone, showTimeZoneName]);

  // 日期格式化器（缓存优化）
  const dateFormatter = useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "long",
      timeZone: resolvedTimeZone,
    });
  }, [locale, resolvedTimeZone]);

  return (
    <div
      className={[
        "inline-flex w-fit flex-col items-center justify-center p-4 rounded-md bg-white shadow-sm",
        className,
      ].join(" ")}
      aria-label={`Clock ${locale} ${resolvedTimeZone}`}
    >
      {/* 时间：等宽字体保证对齐，中性深色主视觉 */}
      <div className="text-2xl font-mono text-gray-800 tracking-wide">
        {timeFormatter.format(date)}
      </div>
      {/* 日期：小字号低饱和色，弱化次要信息 */}
      <div className="mt-1 text-sm text-gray-500">
        {dateFormatter.format(date)}
      </div>
      {/* 时区/语言角标：极简小字号，不抢焦点 */}
      <div className="mt-2 text-xs text-gray-400">
        {locale} · {resolvedTimeZone}
      </div>
    </div>
  );
}