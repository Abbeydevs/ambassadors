import Link from "next/link";
import Image from "next/image";
import { Eye } from "lucide-react";
import { Talent } from "@prisma/client";

type TalentCardProps = {
  talent: Talent;
  index: number;
};

export function TalentCard({ talent, index }: TalentCardProps) {
  return (
    <Link
      href={`/talents/${talent.slug}`}
      className="group relative"
      style={{ animationDelay: `${index * 75}ms` }}
    >
      <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-slate-900 border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/25">
        <Image
          src={talent.profileImage}
          alt={talent.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 bg-slate-800"
          width={600}
          height={800}
        />

        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {talent.featured && (
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-blue-600/90 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-blue-400/50">
            Featured
          </div>
        )}

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

            <div className="px-4 py-2 bg-white/10 hover:bg-blue-600 backdrop-blur-sm rounded-lg text-white text-sm font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
              View Profile
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
