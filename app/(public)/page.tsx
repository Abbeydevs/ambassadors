import BlogPreview from "./components/blog-preview";
import CategoriesSection from "./components/categories-section";
import CTASection from "./components/cta-section";
import FeaturedTalents from "./components/featured-talents";
import Footer from "./components/footer";
import HeroSection from "./components/hero-section";
import Navbar from "./components/navbar";
import StatsSection from "./components/stats-section";
import TestimonialsSection from "./components/testimonial-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedTalents />
        <CategoriesSection />
        <StatsSection />
        <TestimonialsSection />
        <BlogPreview />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
