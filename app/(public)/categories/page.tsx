import { prisma } from "@/lib/prisma";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { CategoryCard } from "../components/category-card";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      _count: {
        select: {
          talents: { where: { published: true } },
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white">
              Talent Categories
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
              Explore our diverse range of professional talents.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {categories.length === 0 ? (
              <p className="text-slate-400 text-center text-lg">
                No categories have been created yet.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {categories.map((category, index) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    index={index}
                  />
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
