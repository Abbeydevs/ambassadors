import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a10_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a10_1px,transparent_1px)] bg-size-[4rem_4rem]" />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6 lg:space-y-8 order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">
                Premier Talent Agency
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                Discover
                <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
                  Exceptional Talent
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 max-w-xl">
                We represent the finest actors, musicians, dancers, and
                entertainers. Bringing your vision to life with world-class
                professionals.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 flex items-center justify-center gap-2">
                Browse Talents
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/20">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-400">
                  500+
                </div>
                <div className="text-sm text-slate-400">Talents</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-400">
                  1000+
                </div>
                <div className="text-sm text-slate-400">Projects</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-400">
                  15+
                </div>
                <div className="text-sm text-slate-400">Years</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative order-1 lg:order-2">
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-700" />

            {/* Main Image Container */}
            <div className="relative aspect-3/4 max-w-md mx-auto lg:max-w-none">
              {/* Image Frame */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl backdrop-blur-sm border border-white/10" />

              {/* Placeholder Image - Replace with actual talent image */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/25 transform hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1000&fit=crop"
                  alt="Featured Talent"
                  className="w-full h-full object-cover"
                  width="100"
                  height="100"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">
                        Featured Talent
                      </div>
                      <div className="text-blue-300 text-sm">
                        Award-Winning Artist
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
