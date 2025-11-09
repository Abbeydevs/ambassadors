/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { TalentCard } from "../components/talent-card";
import { TalentSearch } from "../components/talent-search";
import { TalentFilters } from "../components/talent-filters";

type TalentsPageProps = {
  searchParams?: {
    query?: string;
    category?: string;
    sort?: string;
  };
};

export default async function TalentsPage({ searchParams }: TalentsPageProps) {
  const query = searchParams?.query;
  const categorySlug = searchParams?.category;
  const sort = searchParams?.sort;

  const where: any = {
    published: true,
  };
  if (query) {
    where.name = {
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

  let orderBy: any = [{ featured: "desc" }, { createdAt: "desc" }];
  if (sort === "newest") {
    orderBy = [{ createdAt: "desc" }];
  } else if (sort === "name-asc") {
    orderBy = [{ name: "asc" }];
  } else if (sort === "name-desc") {
    orderBy = [{ name: "desc" }];
  }

  const talentsPromise = prisma.talent.findMany({
    where,
    orderBy,
  });

  const categoriesPromise = prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  const [talents, categories] = await Promise.all([
    talentsPromise,
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
              Our Talents
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
              Browse our full roster of world-class actors, musicians, dancers,
              and more.
            </p>
          </div>
        </section>

        <section className="py-8 bg-slate-950 border-y border-slate-800 sticky top-16 z-30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <TalentSearch />
              </div>
              <div className="md:col-span-2">
                <TalentFilters categories={categories} />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {talents.length === 0 ? (
              <p className="text-slate-400 text-center text-lg">
                No talents found matching your criteria.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {talents.map((talent, index) => (
                  <TalentCard key={talent.id} talent={talent} index={index} />
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
