const Featured = () => {
  const features = [
    { icon: '📄', title: 'Smart Contract Review', desc: 'Automated analysis of legal documents with AI precision' },
    { icon: '🔍', title: 'Legal Research Engine', desc: 'Fast, accurate legal precedent and case law discovery' },
    { icon: '⚖️', title: 'Compliance Check', desc: 'Ensure regulatory compliance across jurisdictions' },
    { icon: '💼', title: 'Due Diligence', desc: 'Comprehensive document analysis for M&A transactions' },
  ]

  return (
    <section className="pop-in bg-[#1a2a42] rounded-lg p-8 md:p-12 mb-8">
      <h2 className="text-center text-cyan-400 text-2xl md:text-3xl font-bold mb-8">Core Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-[#0f1c2e] border-l-4 border-cyan-400 rounded p-6 hover:bg-[#0f1c2e]/80 hover:-translate-y-1 transition-transform">
            <div className="text-2xl mb-4">{feature.icon}</div>
            <h3 className="text-cyan-400 font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Featured
