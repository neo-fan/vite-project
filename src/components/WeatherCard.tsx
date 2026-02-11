import { useEffect, useMemo, useState } from "react";
import { useWeather } from "../hooks/useWeather";
import { useGeo } from "../hooks/useGeo";
import {
  getWeatherIcon,
  formatTemperature,
  formatWind,
  formatHumidity,
  isDayTime,
  getWeatherBgColor,
} from "../services/weatherUtils";
import { GeoSelect } from "./GeoSelect"; // 如果你放在同文件可去掉这行，直接使用组件

interface WeatherCardProps {
  location?: string; // 默认传入 locationId
  className?: string;
}

export default function WeatherCard({
  location = "101010100",
  className = "",
}: WeatherCardProps) {
  // 当前展示的 locationId（会被选择更新）
  const [locationId, setLocationId] = useState(location);

  // 输入框显示内容
  const [cityInput, setCityInput] = useState("北京");
  // 用于查询的 keyword（防抖后更新）
  const [geoKeyword, setGeoKeyword] = useState("北京");

  // 天气
  const { data, loading, error, refetch } = useWeather(locationId);

  // 地理查询
  const {
    data: geoData,
    loading: geoLoading,
    error: geoError,
  } = useGeo(geoKeyword);

  // 刷新按钮状态
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 父组件传入 location 变化时同步
  useEffect(() => {
    setLocationId(location);
  }, [location]);

  // ✅ 防抖：输入停顿 300ms 才查询
  useEffect(() => {
    const kw = cityInput.trim();
    if (!kw) {
      setGeoKeyword("");
      return;
    }
    const t = setTimeout(() => setGeoKeyword(kw), 300);
    return () => clearTimeout(t);
  }, [cityInput]);

  // 候选列表
  const options = useMemo(() => {
    return geoData?.location ?? [];
  }, [geoData]);

  // 选择地址：更新 locationId => useWeather 自动拉新
  const handleSelectGeo = (item: any) => {
    setLocationId(item.id);

    // 输入框显示更清晰（可按喜好改成只显示 name）
    const label =
      item.adm1 === item.adm2
        ? `${item.adm1}·${item.name}`
        : `${item.adm1}·${item.adm2}·${item.name}`;
    setCityInput(label);
  };

  // 手动刷新天气（不改变 locationId）
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  const now = data?.now;
  const isDay = now ? isDayTime(now.obsTime) : true;
  const bgColor = now
    ? getWeatherBgColor(now.icon, isDay)
    : "bg-gradient-to-br from-blue-400 to-indigo-600";

  return (
    <div className={`rounded-xl p-6 ${bgColor} ${className} relative`}>
      {/* 顶部工具栏：地址选择 + 刷新（不会重叠） */}
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start">
        <div className="w-full sm:flex-1">
          <GeoSelect
            value={cityInput}
            onChange={setCityInput}
            loading={geoLoading}
            error={geoError}
            options={options}
            onSelect={handleSelectGeo}
          />
          <div className="mt-2 text-white/90 text-sm">
            当前 locationId：<span className="text-white/80">{locationId}</span>
          </div>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="shrink-0 px-4 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition disabled:opacity-50"
          title="刷新天气"
        >
          {isRefreshing ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <span className="text-lg">🔄</span>
          )}
        </button>
      </div>

      {/* 天气内容（保持原逻辑） */}
      {loading && !data ? (
        <div className="flex flex-col items-center justify-center h-48">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4" />
          <p className="text-white">加载中...</p>
        </div>
      ) : error || !data ? (
        <div className="flex flex-col items-center justify-center h-48 text-white">
          <div className="text-5xl mb-4">☁️</div>
          <p className="mb-2">获取天气失败</p>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 bg-white/20 rounded hover:bg-white/30 transition disabled:opacity-50"
          >
            {isRefreshing ? "刷新中..." : "重试"}
          </button>
        </div>
      ) : (
        <div className="text-center pt-2">
          <div className="text-6xl mb-2">{now && getWeatherIcon(now.icon)}</div>
          <div className="text-white text-4xl font-bold mb-1">
            {now && formatTemperature(now.temp)}
          </div>
          <div className="text-white/90 text-lg mb-4">{now?.text}</div>

          <div className="grid grid-cols-3 gap-4 text-white/90 text-sm">
            <div>
              <div>💨</div>
              <div>{now && formatWind(now.windDir, now.windScale)}</div>
            </div>
            <div>
              <div>💧</div>
              <div>{now && formatHumidity(now.humidity)}</div>
            </div>
            <div>
              <div>🌡️</div>
              <div>{now && formatTemperature(now.feelsLike)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}