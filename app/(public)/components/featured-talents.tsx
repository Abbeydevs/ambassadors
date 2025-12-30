import { Talent } from "@prisma/client";
import { Star, ArrowRight, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type FeaturedTalentsProps = {
  talents: Talent[];
};

export default function FeaturedTalents({ talents }: FeaturedTalentsProps) {
  return (
    <section className="py-20 lg:py-32 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <Star className="w-4 h-4 text-blue-400 fill-blue-400" />
              <span className="text-sm font-medium text-blue-300">
                Featured Talents
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Meet Our Stars
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl">
              Discover exceptional professionals who bring passion, skill, and
              creativity to every project.
            </p>
          </div>

          <Link
            href="/talents"
            className="group flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          >
            View All Talents
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {talents.length === 0 ? (
            <p className="text-slate-400 col-span-full text-center">
              No featured talents available right now.
            </p>
          ) : (
            talents.map((talent, index) => (
              <Link
                href={`/talents/${talent.slug}`}
                key={talent.id}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-slate-900 border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/25">
                  <Image
                    src={talent.profileImage}
                    alt={talent.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    width="600"
                    height="800"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-blue-600/90 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-blue-400/50">
                    Featured
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {talent.name}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                        <Eye className="w-4 h-4" />
                        <span>{talent.views.toLocaleString()}</span>
                      </div>

                      <button className="px-4 py-2 bg-white/10 hover:bg-blue-600 backdrop-blur-sm rounded-lg text-white text-sm font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
