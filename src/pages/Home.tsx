import React from 'react';
import HelloWorld from '../components/HelloWorld';

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
      <h3 className="text-xl font-semibold mb-2 text-blue-600">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Home: React.FC = () => {
  const features: FeatureCardProps[] = [
    {
      title: '快速响应',
      description: '我们提供快速、高效的服务响应，确保您的需求得到及时满足。'
    },
    {
      title: '专业团队',
      description: '拥有经验丰富的专业团队，为您提供最优质的解决方案。'
    },
    {
      title: '创新技术',
      description: '采用最新的技术和方法，持续创新，引领行业发展。'
    }
  ];

  return (
    <div className="p-8 animate-fadeIn">
      <HelloWorld name='Neo' />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">欢迎来到首页</h1>
      <p className="text-lg text-gray-600 mb-4">
        这是一个使用React + TypeScript + React Router构建的现代化网站示例。
      </p>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <p className="text-blue-700">
          探索我们的服务，了解我们如何帮助您实现目标。
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;