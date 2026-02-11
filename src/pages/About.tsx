import React from 'react';

interface ContactInfo {
  label: string;
  value: string;
  icon: string;
}

interface TeamMember {
  name: string;
  position: string;
  description: string;
}

const About: React.FC = () => {
  const contactInfo: ContactInfo[] = [
    {
      label: '电子邮箱',
      value: 'info@example.com',
      icon: '✉️'
    },
    {
      label: '联系电话',
      value: '+86 123-4567-8900',
      icon: '📞'
    },
    {
      label: '公司地址',
      value: '中国某市某区某街道123号',
      icon: '📍'
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      name: '技术团队',
      position: '研发部门',
      description: '由经验丰富的工程师组成，专注于技术创新和产品开发。'
    },
    {
      name: '市场团队',
      position: '市场部门',
      description: '负责品牌推广和市场策略，连接产品与用户。'
    },
    {
      name: '客服团队',
      position: '服务部门',
      description: '提供7×24小时优质服务，确保客户满意度。'
    }
  ];

  return (
    <div className="p-8 animate-fadeIn">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">关于我们</h1>
      
      {/* 公司简介 */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600 flex items-center">
          <span className="mr-2">🏢</span>
          公司简介
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          我们是一家致力于创新和卓越的科技公司。自2020年成立以来，我们一直专注于为客户提供最优质的服务和产品。
          通过不断的技术创新和团队协作，我们已经成为行业内的领先企业之一。
        </p>
        <p className="text-gray-700 leading-relaxed">
          我们相信技术的力量能够改变世界，我们的团队致力于开发创新的解决方案，帮助客户实现他们的目标。
        </p>
      </div>

      {/* 使命与愿景 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700 flex items-center">
            <span className="mr-2">🎯</span>
            我们的使命
          </h2>
          <p className="text-gray-700 leading-relaxed">
            通过技术创新和优质服务，为客户创造价值，推动行业发展，成为值得信赖的合作伙伴。
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-purple-700 flex items-center">
            <span className="mr-2">🚀</span>
            我们的愿景
          </h2>
          <p className="text-gray-700 leading-relaxed">
            成为行业领先的创新型企业，引领技术发展方向，为社会创造更大价值。
          </p>
        </div>
      </div>

      {/* 团队介绍 */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-blue-600 flex items-center">
          <span className="mr-2">👥</span>
          我们的团队
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-sm text-blue-600 mb-2">{member.position}</p>
              <p className="text-gray-600 text-sm">{member.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 联系方式 */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-blue-600 flex items-center">
          <span className="mr-2">📧</span>
          联系我们
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactInfo.map((info, index) => (
            <div key={index} className="flex items-start space-x-3">
              <span className="text-2xl">{info.icon}</span>
              <div>
                <p className="font-semibold text-gray-800">{info.label}</p>
                <p className="text-gray-600">{info.value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            工作时间: 周一至周五 9:00-18:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;