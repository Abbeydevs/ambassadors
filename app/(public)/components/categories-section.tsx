import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Category } from "@prisma/client";
import { CategoryCard } from "./category-card";

type CategoryWithCount = Category & {
  _count: {
    talents: number;
  };
};

type CategoriesSectionProps = {
  categories: CategoryWithCount[];
};

export default function CategoriesSection({
  categories,
}: CategoriesSectionProps) {
  const homepageCategories = categories.slice(0, 6);

  return (
    <section className="py-20 lg:py-32 bg-linear-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-20 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Explore Our
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
              Talent Categories
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From award-winning actors to chart-topping musicians, we represent
            the best in entertainment.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {homepageCategories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>

        <div className="text-center mt-12 lg:mt-16">
          <Button
            asChild
            className="group px-8 py-4 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 inline-flex items-center gap-2"
          >
            <Link href="/categories">
              Browse All Categories
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
