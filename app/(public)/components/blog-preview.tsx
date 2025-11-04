import { Calendar, Clock, ArrowRight, Bookmark } from "lucide-react";
import Image from "next/image";

export default function BlogPreview() {
  const posts = [
    {
      id: 1,
      title: "Breaking Into the Entertainment Industry: A Complete Guide",
      excerpt:
        "Discover the essential steps and insider tips for launching your career in entertainment...",
      image:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop",
      author: "John Doe",
      date: "Nov 1, 2025",
      readTime: "8 min read",
      category: "Career Advice",
    },
    {
      id: 2,
      title: "Spotlight: Rising Stars of 2025",
      excerpt:
        "Meet the talented individuals making waves in the industry this year...",
      image:
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop",
      author: "Sarah Smith",
      date: "Oct 28, 2025",
      readTime: "6 min read",
      category: "Talent Spotlight",
    },
    {
      id: 3,
      title: "The Art of Audition Preparation",
      excerpt:
        "Professional tips to help you nail your next audition and stand out from the crowd...",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      author: "Mike Johnson",
      date: "Oct 25, 2025",
      readTime: "10 min read",
      category: "Tips & Tricks",
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <Bookmark className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">
                Latest Insights
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              From Our Blog
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl">
              Industry insights, career tips, and inspiring stories from the
              world of entertainment.
            </p>
          </div>

          <button className="group flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors">
            View All Posts
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Blog Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className="group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card */}
              <div className="relative h-full rounded-2xl bg-slate-900/50 border border-white/10 hover:border-blue-500/50 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20">
                {/* Image Container */}
                <div className="relative aspect-16/10 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    width="100"
                    height="100"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-blue-600/90 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-blue-400/50">
                    {post.category}
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900 to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-400 line-clamp-2">{post.excerpt}</p>

                  {/* Author & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-sm text-slate-400">
                      By {post.author}
                    </span>

                    <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
