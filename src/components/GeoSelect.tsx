import { useEffect, useMemo, useRef, useState } from "react";

type GeoItem = {
  id: string;
  name: string;
  adm1: string;
  adm2: string;
  rank: string;
};

type GeoSelectProps = {
  value: string;
  onChange: (v: string) => void;
  loading: boolean;
  error: Error | null;
  options: GeoItem[];
  onSelect: (item: GeoItem) => void;
};

export function GeoSelect({
  value,
  onChange,
  loading,
  error,
  options,
  onSelect,
}: GeoSelectProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // 排序：rank 越小一般越靠前（rank 是字符串，转数字）
  const sortedOptions = useMemo(() => {
    return [...options].sort((a, b) => Number(a.rank) - Number(b.rank));
  }, [options]);

  const shown = useMemo(() => sortedOptions.slice(0, 10), [sortedOptions]);

  // 点击外部关闭下拉
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // value 改变时，重置 activeIndex
  useEffect(() => {
    setActiveIndex(-1);
  }, [value]);

  const labelOf = (item: GeoItem) =>
    item.adm1 === item.adm2
      ? `${item.adm1}·${item.name}`
      : `${item.adm1}·${item.adm2}·${item.name}`;

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      return;
    }

    if (e.key === "Escape") {
      setOpen(false);
      return;
    }

    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, shown.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < shown.length) {
        e.preventDefault();
        const item = shown[activeIndex];
        onSelect(item);
        setOpen(false);
      }
    }
  };

  return (
    <div ref={wrapRef} className="relative w-full">
      <input
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="输入城市/区县，如：北京、海淀、合肥"
        className="w-full px-3 py-2 rounded-lg bg-white/20 text-white placeholder:text-white/70 outline-none focus:bg-white/25"
        aria-autocomplete="list"
        aria-expanded={open}
        role="combobox"
      />

      {open && value.trim() && (
        <div className="absolute z-20 mt-2 w-full rounded-lg overflow-hidden bg-white/95 text-gray-800 shadow-lg backdrop-blur">
          {/* 状态区 */}
          {loading && (
            <div className="px-3 py-2 text-sm text-gray-600 flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
              查询中...
            </div>
          )}

          {!loading && error && (
            <div className="px-3 py-2 text-sm text-red-600">
              查询失败：{error.message}
            </div>
          )}

          {!loading && !error && shown.length === 0 && (
            <div className="px-3 py-2 text-sm text-gray-600">无匹配结果</div>
          )}

          {!loading && !error && shown.length > 0 && (
            <ul role="listbox" className="max-h-64 overflow-auto">
              {shown.map((item, idx) => (
                <li key={item.id} role="option" aria-selected={idx === activeIndex}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => {
                      onSelect(item);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 transition flex items-center justify-between ${
                      idx === activeIndex ? "bg-gray-100" : "hover:bg-gray-100"
                    }`}
                  >
                    <span className="font-medium">{labelOf(item)}</span>
                    <span className="text-xs text-gray-500">id: {item.id}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}