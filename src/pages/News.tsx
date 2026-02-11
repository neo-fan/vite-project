import React from 'react';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  summary: string;
  category: string;
}

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
          {news.category}
        </span>
        <span className="text-sm text-gray-500">{news.date}</span>
      </div>
      <h2 className="text-2xl font-semibold mb-3 text-gray-800 hover:text-blue-600 cursor-pointer">
        {news.title}
      </h2>
      <p className="text-gray-700 leading-relaxed">
        {news.summary}
      </p>
      <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium transition-colors">
        阅读更多 →
      </button>
    </div>
  );
};

const News: React.FC = () => {
  const newsData: NewsItem[] = [
    {
      id: 1,
      title: '公司推出全新产品线',
      date: '2026年1月30日',
      summary: '我们很高兴地宣布推出全新的产品线，这将为客户带来更多选择和更好的体验。新产品采用了最先进的技术，致力于解决行业痛点。',
      category: '产品发布'
    },
    {
      id: 2,
      title: '荣获行业创新奖',
      date: '2026年1月28日',
      summary: '在本年度的行业大会上，我们的创新项目获得了"最佳创新奖"。这一荣誉是对团队努力和创新精神的肯定。',
      category: '公司动态'
    },
    {
      id: 3,
      title: '与知名企业达成战略合作',
      date: '2026年1月25日',
      summary: '我们与行业领先企业签署了战略合作协议，双方将在技术研发、市场拓展等多个领域展开深度合作。',
      category: '合作伙伴'
    },
    {
      id: 4,
      title: '年度技术峰会成功举办',
      date: '2026年1月20日',
      summary: '我们成功举办了年度技术峰会，吸引了来自全国各地的技术专家和行业领袖参与，共同探讨行业未来发展趋势。',
      category: '活动'
    }
  ];

  return (
    <div className="p-8 animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">最新新闻</h1>
        <p className="text-gray-600">了解我们的最新动态和行业资讯</p>
      </div>
      <div className="space-y-6">
        {newsData.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </div>
  );
};

export default News;