import AboutView1 from '../views/homeviews/aboutviews/aboutview1'
import AboutView2 from '../views/homeviews/aboutviews/aboutview2'
import TeamGrid from '../views/TeamGrid'
import TimelineSection from '../views/TimelineSection'
import CTASection from '../views/CTASection'
import DocumentCounter from '../commons/DocumentCounter'

const About = () => {
  return (
    <main className="relative overflow-hidden animated-gradient rounded-lg py-8 px-4">
      {/* Floating particles background animation */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-8 text-fade-in">About LawVerse AI</h1>
        <AboutView1 />
        <AboutView2 />
        <div className="my-10">
          <DocumentCounter />
        </div>
        <TimelineSection />
        <TeamGrid />
        <CTASection />
      </div>
    </main>
  )
}

export default About
