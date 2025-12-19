import React from 'react';

const CTASection = () => {
  return (
    <section className="relative overflow-hidden py-20 px-4 bg-gradient-to-r from-[#0a0e17] to-[#0d2a52]">
      <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,#00d4ff_0,#00d4ff_10px,transparent_10px,transparent_20px)] pointer-events-none" />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Legal Practice?</h2>
        <p className="text-gray-300 text-base md:text-lg mb-8">Join thousands of legal professionals using LawVerse AI to streamline their workflow and deliver better results.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-3 bg-cyan-500 text-slate-900 rounded-md font-bold hover:bg-cyan-400 hover:shadow-lg transition">Start Free Trial</button>
          <button className="px-8 py-3 border border-cyan-400 text-cyan-400 rounded-md font-bold hover:bg-cyan-400/10 transition">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
