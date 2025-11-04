import { Button } from "@/components/ui/button";
import {
  Film,
  Music,
  Users,
  Mic,
  Camera,
  Palette,
  ArrowUpRight,
} from "lucide-react";

export default function CategoriesSection() {
  const categories = [
    {
      name: "Actors",
      icon: Film,
      count: 150,
      color: "from-blue-500 to-cyan-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      name: "Musicians",
      icon: Music,
      count: 120,
      color: "from-purple-500 to-pink-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      name: "Dancers",
      icon: Users,
      count: 85,
      color: "from-orange-500 to-red-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
    },
    {
      name: "Voice Artists",
      icon: Mic,
      count: 65,
      color: "from-green-500 to-emerald-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
    },
    {
      name: "Models",
      icon: Camera,
      count: 95,
      color: "from-pink-500 to-rose-400",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/20",
    },
    {
      name: "Artists",
      icon: Palette,
      count: 45,
      color: "from-cyan-500 to-blue-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-linear-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                className="group relative"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                {/* Card */}
                <div
                  className={`relative p-8 rounded-2xl bg-slate-900/50 border ${category.borderColor} backdrop-blur-sm hover:bg-slate-900/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden`}
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${category.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}
                  />

                  {/* Icon Container */}
                  <div
                    className={`relative w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                  >
                    <Icon
                      className={`w-8 h-8 bg-linear-to-br ${category.color} bg-clip-text text-transparent`}
                      style={{ fill: "url(#gradient)" }}
                    />
                    <svg width="0" height="0">
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#22d3ee" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="relative space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {category.name}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                    </div>

                    <p className="text-slate-400">
                      {category.count}+ talented professionals
                    </p>

                    {/* Progress Bar */}
                    <div className="pt-4">
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-linear-to-r ${category.color} rounded-full transition-all duration-1000 group-hover:w-full`}
                          style={{ width: "60%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12 lg:mt-16">
          <Button className="group px-8 py-4 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 inline-flex items-center gap-2">
            Browse All Categories
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
