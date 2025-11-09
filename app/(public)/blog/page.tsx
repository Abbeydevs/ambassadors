/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { BlogPostCard } from "../components/blog-post-card";
import { BlogSearch } from "../components/blog-search";
import { BlogFilters } from "../components/blog-filters";

type BlogPageProps = {
  searchParams: Promise<{
    query?: string;
    category?: string;
    sort?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const query = params?.query;
  const categorySlug = params?.category;
  const sort = params?.sort;

  const where: any = {
    published: true,
  };
  if (query) {
    where.title = {
      contains: query,
      mode: "insensitive",
    };
  }
  if (categorySlug) {
    where.categories = {
      some: {
        slug: categorySlug,
      },
    };
  }

  let orderBy: any = [{ publishedAt: "desc" }];
  if (sort === "oldest") {
    orderBy = [{ publishedAt: "asc" }];
  } else if (sort === "title-asc") {
    orderBy = [{ title: "asc" }];
  } else if (sort === "title-desc") {
    orderBy = [{ title: "desc" }];
  }

  const postsPromise = prisma.blogPost.findMany({
    where,
    orderBy,
    include: {
      categories: true,
    },
  });

  const categoriesPromise = prisma.blogCategory.findMany({
    orderBy: { name: "asc" },
  });

  const [posts, categories] = await Promise.all([
    postsPromise,
    categoriesPromise,
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white">
              Our Blog
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
              Industry insights, career tips, and inspiring stories from the
              world of entertainment.
            </p>
          </div>
        </section>

        <section className="py-8 bg-slate-950 border-y border-slate-800 sticky top-16 z-30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <BlogSearch />
              </div>
              <div className="md:col-span-2">
                <BlogFilters categories={categories} />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
              <p className="text-slate-400 text-center text-lg">
                No blog posts found matching your criteria.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
