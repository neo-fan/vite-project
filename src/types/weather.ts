// ========== 天气图标映射 ==========
export const WEATHER_ICONS: Record<string, string> = {
  '100': '☀️', // 晴
  '101': '🌤️', // 多云
  '102': '⛅', // 少云
  '103': '🌥️', // 晴间多云
  '104': '☁️', // 阴
  '200': '🌀', // 有风
  '201': '🍃', // 微风
  '202': '💨', // 大风
  '203': '🌪️', // 烈风
  '204': '🌬️', // 狂风
  '205': '🌪️', // 飓风
  '206': '💨', // 龙卷风
  '207': '💨', // 疾风
  '300': '☂️', // 阵雨
  '301': '🌧️', // 强阵雨
  '302': '🌧️', // 雷阵雨
  '303': '⛈️', // 强雷阵雨
  '304': '⛈️', // 雷阵雨伴有冰雹
  '305': '🌧️', // 小雨
  '306': '🌧️', // 中雨
  '307': '🌧️', // 大雨
  '308': '🌧️', // 极端降雨
  '309': '🌧️', // 毛毛雨/细雨
  '310': '🌧️', // 暴雨
  '311': '🌧️', // 大暴雨
  '312': '🌧️', // 特大暴雨
  '313': '🌧️', // 冻雨
  '314': '🌧️', // 小到中雨
  '315': '🌧️', // 中到大雨
  '316': '🌧️', // 大到暴雨
  '317': '🌧️', // 暴雨到大暴雨
  '318': '🌧️', // 大暴雨到特大暴雨
  '399': '🌧️', // 雨
  '400': '❄️', // 小雪
  '401': '❄️', // 中雪
  '402': '❄️', // 大雪
  '403': '❄️', // 暴雪
  '404': '🌨️', // 雨夹雪
  '405': '🌨️', // 雨雪天气
  '406': '🌨️', // 阵雨夹雪
  '407': '🌨️', // 阵雪
  '408': '❄️', // 小到中雪
  '409': '❄️', // 中到大雪
  '410': '❄️', // 大到暴雪
  '499': '❄️', // 雪
  '500': '🌫️', // 薄雾
  '501': '🌫️', // 雾
  '502': '🌫️', // 霾
  '503': '🌫️', // 扬沙
  '504': '🌫️', // 浮尘
  '507': '🌫️', // 沙尘暴
  '508': '🌫️', // 强沙尘暴
  '509': '🌫️', // 浓雾
  '510': '🌫️', // 强浓雾
  '511': '🌫️', // 中度霾
  '512': '🌫️', // 重度霾
  '513': '🌫️', // 严重霾
  '514': '🌫️', // 大雾
  '515': '🌫️', // 特强浓雾
  '900': '🌫️', // 热
  '901': '❄️', // 冷
  '999': '❓', // 未知
};

// ========== 天气数据类型 ==========
export interface WeatherNow {
  obsTime: string;           // 观测时间
  temp: string;              // 温度（℃）
  feelsLike: string;         // 体感温度（℃）
  icon: string;              // 天气图标代码
  text: string;              // 天气状况文字描述
  wind360: string;           // 风向 360 角度
  windDir: string;           // 风向
  windScale: string;         // 风力等级
  windSpeed: string;         // 风速（公里/小时）
  humidity: string;          // 相对湿度（%）
  precip: string;            // 降水量（毫米）
  pressure: string;          // 大气压强（百帕）
  vis: string;               // 能见度（公里）
  cloud: string;             // 云量（%）
  dew: string;               // 露点温度（℃）
}

// ========== API 响应类型 ==========
export interface WeatherResponse {
  code: string;              // API 状态码
  updateTime: string;        // 当前 API 最近更新时间
  fxLink: string;            // 当前数据的响应式页面
  now: WeatherNow;           // 实时天气数据
  refer: {
    sources: string[];       // 原始数据来源
    license: string[];       // 数据许可
  };
}
// ========== API 请求参数 ==========
export interface WeatherQueryParams {
  location: string;          // 地区/城市，支持多种格式
}

export interface LocationItem {
  /** 地区/城市名称 */
  name: string;

  /** 地区 ID（核心关键字段） */
  id: string;

  /** 纬度 */
  lat: string;

  /** 经度 */
  lon: string;

  /** 上级行政区（市/区） */
  adm2: string;

  /** 省级行政区 */
  adm1: string;

  /** 国家 */
  country: string;

  /** 时区 */
  tz: string;

  /** UTC 偏移，如 +08:00 */
  utcOffset: string;

  /** 是否夏令时（0/1） */
  isDst: string;

  /** 地区类型，如 city */
  type: string;

  /** 地区等级 */
  rank: string;

  /** 和风天气页面链接 */
  fxLink: string;
}

export interface Refer {
  /** 数据来源 */
  sources: string[];

  /** 授权信息 */
  license: string[];
}

export interface CityLookupResponse {
  /** 接口状态码，成功通常为 "200" */
  code: string;

  /** 匹配到的城市列表 */
  location: LocationItem[];

  /** 数据来源与授权 */
  refer: Refer;
}
