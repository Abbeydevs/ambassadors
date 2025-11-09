import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { BlogPost, BlogCategory } from "@prisma/client";

type PostWithCategories = BlogPost & {
  categories: BlogCategory[];
};

type BlogPostCardProps = {
  post: PostWithCategories;
};

function estimateReadTime(content: string) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min read`;
}

function formatDate(date: Date | null) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const category = post.categories[0];

  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <div className="relative h-full rounded-2xl bg-slate-900/50 border border-white/10 hover:border-blue-500/50 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20">
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={post.featuredImage || "/placeholder-blog.png"}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 bg-slate-800"
            width={800}
            height={600}
          />

          {category && (
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-blue-600/90 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-blue-400/50">
              {category.name}
            </div>
          )}

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

          <p className="text-slate-400 line-clamp-2">{post.excerpt}</p>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-sm text-slate-400">By {post.author}</span>
            <div className="flex items-center gap-2 text-blue-400 font-medium text-sm transition-colors">
              Read More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
