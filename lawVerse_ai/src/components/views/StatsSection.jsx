import React from 'react';

const StatsSection = () => {
  const stats = [
    { label: 'Cases Resolved', value: '2,500+' },
    { label: 'Happy Clients', value: '1,800+' },
    { label: 'Years Experience', value: '15+' },
    { label: 'Success Rate', value: '98%' },
  ];

  return (
    <section className="py-16 px-4 bg-[#0a0e17] border-t-2 border-b-2 border-cyan-500">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white/5 border border-cyan-400 rounded-xl p-6 text-center hover:border-white hover:bg-cyan-50/10 transform transition hover:-translate-y-1">
            <div className="text-3xl md:text-4xl font-extrabold text-cyan-400 mb-2">{stat.value}</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
