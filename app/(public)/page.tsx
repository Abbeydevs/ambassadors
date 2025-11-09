import BlogPreview from "./components/blog-preview";
import CategoriesSection from "./components/categories-section";
import CTASection from "./components/cta-section";
import FeaturedTalents from "./components/featured-talents";
import Footer from "./components/footer";
import HeroSection from "./components/hero-section";
import Navbar from "./components/navbar";
import StatsSection from "./components/stats-section";
import TestimonialsSection from "./components/testimonial-section";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const featuredTalents = await prisma.talent.findMany({
    where: {
      featured: true,
      published: true,
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  const recentPosts = await prisma.blogPost.findMany({
    where: {
      published: true,
    },
    take: 3,
    orderBy: {
      publishedAt: "desc",
    },
  });

  const heroTalent = await prisma.talent.findFirst({
    where: {
      isHero: true,
      published: true,
    },
  });

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main>
        <HeroSection heroImageUrl={heroTalent?.profileImage} />
        <FeaturedTalents talents={featuredTalents} />
        <CategoriesSection />
        <StatsSection />
        <TestimonialsSection />
        <BlogPreview posts={recentPosts} />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
