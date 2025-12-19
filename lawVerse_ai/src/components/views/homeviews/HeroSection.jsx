const HeroSection = () => {
  return (
    <section className="relative overflow-hidden animated-gradient rounded-lg p-12 md:p-20 lg:p-24 text-center mb-8 border border-cyan-500/30 min-h-[500px] flex flex-col items-center justify-center">
      {/* Floating particles background animation */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Globe icon */}
      <div className="absolute bottom-8 left-8 text-5xl opacity-40 animate-bounce">
        🌍
      </div>
      
      {/* Main heading with animation */}
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight text-fade-in">
        Pakistan's No.1 AI Legal Solution
      </h1>
      
      {/* Subheading with highlighted text and staggered animation */}
      <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-8">
        <span className="text-white text-slide-right animate-delay-200">Your </span>
        <span className="text-cyan-400 text-slide-left animate-delay-400">Legal Assistant</span>
      </h2>
      
      {/* Description with fade-in animation */}
      <p className="text-white/90 text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-10 leading-relaxed px-4 text-fade-in animate-delay-600">
        LawVerse AI is leading the transformation of legal practice in Pakistan with its innovative AI-driven technology. By blending traditional eDiscovery methods with cutting-edge AI, our platform offers a streamlined, accurate, and efficient discovery process. Embrace the future of legal expertise with LawVerse AI, your dedicated digital legal assistant.
      </p>
      
      {/* CTA Buttons with scale-in animation */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center text-scale-in animate-delay-800">
        <button className="bg-cyan-500 hover:bg-cyan-400 text-[#051b3d] font-bold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 min-w-[160px]">
          Register Now
        </button>
        <button className="bg-transparent border-2 border-white/50 hover:border-cyan-400 text-white hover:text-cyan-400 font-semibold px-8 py-3 rounded-full transition-all duration-300 min-w-[160px]">
          Show Demo
        </button>
      </div>
    </section>
  )
}

export default HeroSection
