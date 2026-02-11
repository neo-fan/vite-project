import Clock from "../components/Clock";

export default function WorldClocks() {
  return (
    <div className="flex flex-wrap gap-6 p-6">
      <Clock locale="zh-CN" timeZone="Asia/Shanghai" />
      <Clock locale="en-US" timeZone="America/New_York" />
      <Clock locale="en-GB" timeZone="Europe/London" />
      <Clock locale="ja-JP" timeZone="Asia/Tokyo" />
    </div>
  );
}
