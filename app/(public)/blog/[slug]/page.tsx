import { prisma } from "@/lib/prisma";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ViewIncrementer } from "../../components/view-incrementer";
import { incrementBlogView } from "@/lib/action";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) {
    return {
      title: "Post Not Found",
      description: "This blog post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt || "Blog post",
    openGraph: {
      title: post.title,
      description: post.excerpt || "Blog post",
      images: [post.featuredImage || ""],
    },
  };
}

function formatDate(date: Date | null) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: {
      slug: slug,
      published: true,
    },
    include: {
      categories: true,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <ViewIncrementer
          incrementAction={incrementBlogView}
          entityId={post.id}
        />
        <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-slate-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {post.categories.map((category) => (
                <Badge
                  key={category.id}
                  className="bg-blue-600/20 text-blue-300 border-blue-500/30"
                >
                  {category.name}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white max-w-4xl mx-auto">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-slate-400">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>By {post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
            </div>
          </div>
        </section>

        {post.featuredImage && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-12 lg:-mt-16 relative z-20">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-slate-700">
              <Image
                src={post.featuredImage}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
          </div>
        )}

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-8">
                <div
                  className="prose prose-invert prose-slate max-w-none 
                             prose-headings:text-white prose-a:text-blue-400 
                             prose-strong:text-white prose-blockquote:border-blue-500"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              <aside className="lg:col-span-4">
                <div className="sticky top-24 space-y-6">
                  <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4">Related Posts</h3>
                    <p className="text-slate-400 text-sm">
                      (Related posts will be shown here)
                    </p>
                  </div>

                  <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="bg-slate-800 border-slate-700 text-slate-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
