/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import {
  Film,
  Music,
  Users,
  Mic,
  Camera,
  Palette,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { Category } from "@prisma/client";

type CategoryWithCount = Category & {
  _count: {
    talents: number;
  };
};

const styleMap: { [key: string]: any } = {
  actor: {
    icon: Film,
    color: "from-blue-500 to-cyan-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  artiste: {
    icon: Music,
    color: "from-purple-500 to-pink-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
  dancers: {
    icon: Users,
    color: "from-orange-500 to-red-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
  },
  "voice-over-artiste": {
    icon: Mic,
    color: "from-green-500 to-emerald-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
  },
  model: {
    icon: Camera,
    color: "from-pink-500 to-rose-400",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/20",
  },
  artists: {
    icon: Palette,
    color: "from-cyan-500 to-blue-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
  },
};

const defaultStyle = {
  icon: Sparkles,
  color: "from-gray-500 to-gray-400",
  bgColor: "bg-gray-500/10",
  borderColor: "border-gray-500/20",
};

type CardProps = {
  category: CategoryWithCount;
  index: number;
};

export function CategoryCard({ category, index }: CardProps) {
  const style = styleMap[category.slug] || defaultStyle;
  const Icon = style.icon;
  const count = category._count.talents;

  return (
    <Link
      href={`/talents?category=${category.slug}`}
      key={category.id}
      className="group relative"
      style={{ animationDelay: `${index * 75}ms` }}
    >
      <div
        className={`relative p-8 h-full rounded-2xl bg-slate-900/50 border ${style.borderColor} backdrop-blur-sm hover:bg-slate-900/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden`}
      >
        <div
          className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${style.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}
        />

        <div
          className={`relative w-16 h-16 ${style.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
        >
          <Icon
            className={`w-8 h-8 bg-linear-to-br ${style.color} bg-clip-text text-transparent`}
            style={{ fill: "url(#gradient)" }}
          />
          <svg width="0" height="0">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
              {category.name}
            </h3>
            <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
          </div>

          <p className="text-slate-400">{count}+ talented professionals</p>

          <div className="pt-4">
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full bg-linear-to-r ${style.color} rounded-full transition-all duration-1000 group-hover:w-full`}
                style={{ width: "60%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
