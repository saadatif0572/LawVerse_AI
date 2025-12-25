import HeroSection from "../views/homeviews/HeroSection";
import Featured from "../views/homeviews/featured";
import Faqs from "../views/homeviews/Faqs";
import StatsSection from "../views/StatsSection";
import FeaturesGrid from "../views/FeaturesGrid";
import TestimonialCarousel from "../views/TestimonialCarousel";
import CTASection from "../views/CTASection";
import BlogCards from "../views/BlogCards";

const Home = () => {
  // Set your law-related image URL here; leave empty to show the placeholder
  const lawImageUrl = "https://static.vecteezy.com/system/resources/thumbnails/048/745/787/small_2x/a-wooden-gavel-lies-on-a-sound-block-beside-balanced-scales-of-justice-in-a-law-library-photo.jpg";

  return (
    <main className="bg-[#051b3d] min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <HeroSection />

        {/* Law image slot */}
        <section className="mt-10 mb-6 bg-[#0d2a52] border border-cyan-500/40 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-cyan-100">LawVerse AI simplifies the Pakistani legal system with real-time analysis and automated support. Legal clarity is now just a click away.</h2>
            <p className="text-gray-300">Empowering citizens, lawyers, and students with instant, constitutionally-grounded legal assistance. Experience the future of Pakistani law—accessible, transparent, and efficient.</p>
          </div>
          <div className="relative w-full h-full min-h-[220px] rounded-xl border-2 border-dashed border-cyan-500/60 bg-[#051b3d] flex items-center justify-center overflow-hidden">
            {lawImageUrl ? (
              <img src={lawImageUrl} alt="Law related" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center space-y-1 text-cyan-200">
                <p className="font-semibold">Place your law image here</p>
                <p className="text-sm text-gray-300">Set `lawImageUrl` in Home to swap this placeholder.</p>
              </div>
            )}
          </div>
        </section>

        <Featured />
        <StatsSection />
        <FeaturesGrid />
        <TestimonialCarousel />
        <BlogCards />
        <CTASection />
        <Faqs />
      </div>
    </main>
  );
};

export default Home;
