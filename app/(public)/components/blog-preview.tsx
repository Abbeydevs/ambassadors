import { BlogPost } from "@prisma/client";
import { Calendar, Clock, ArrowRight, Bookmark } from "lucide-react";
import Image from "next/image";

type BlogPreviewProps = {
  posts: BlogPost[];
};

function estimateReadTime(content: string) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min read`;
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <section className="py-20 lg:py-32 bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid lg:grid-cols-3 gap-8">
          {posts.length === 0 ? (
            <p className="text-slate-400 col-span-full text-center">
              No blog posts available right now.
            </p>
          ) : (
            posts.map((post, index) => (
              <article
                key={post.slug}
                className="group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-full rounded-2xl bg-slate-900/50 border border-white/10 hover:border-blue-500/50 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20">
                  <div className="relative aspect-16/10 overflow-hidden">
                    <Image
                      src={post.featuredImage || "/placeholder-blog.png"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      width="800"
                      height="600"
                    />

                    {/* <div className="absolute top-4 left-4 px-3 py-1.5 bg-blue-600/90 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-blue-400/50">
                      {post.category}
                    </div> */}

                    <div className="absolute inset-0 bg-linear-to-t from-slate-900 to-transparent opacity-60" />
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{estimateReadTime(post.content)}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-slate-400 line-clamp-2">
                      {post.excerpt}
                    </p>

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
            ))
          )}
        </div>
      </div>
    </section>
  );
}
