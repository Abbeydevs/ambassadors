import { ArrowRight, Sparkles, Mail } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-slate-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-600/20 via-cyan-600/20 to-blue-600/20 animate-pulse" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a15_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a15_1px,transparent_1px)] bg-size-[4rem_4rem]" />

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main CTA Card */}
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl bg-linear-to-br from-blue-600 to-cyan-600 p-1 shadow-2xl">
            <div className="rounded-3xl bg-slate-950 p-8 lg:p-16 text-center space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-blue-300" />
                <span className="text-sm font-medium text-blue-200">
                  Join Our Network
                </span>
              </div>

              {/* Heading */}
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white">
                  Ready to Find Your
                  <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
                    Perfect Talent?
                  </span>
                </h2>
                <p className="text-slate-300 text-lg lg:text-xl max-w-2xl mx-auto">
                  Connect with exceptional professionals who will bring your
                  vision to life. Let&apos;s create something extraordinary
                  together.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group px-8 py-4 bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 flex items-center gap-2 w-full sm:w-auto justify-center">
                  Browse Talents
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-300 hover:border-white/40 flex items-center gap-2 w-full sm:w-auto justify-center">
                  <Mail className="w-5 h-5" />
                  Contact Us
                </button>
              </div>

              {/* Features List */}
              <div className="grid sm:grid-cols-3 gap-6 pt-12 border-t border-white/10">
                <div className="space-y-2">
                  <div className="text-blue-400 font-semibold">
                    ✓ Verified Talents
                  </div>
                  <div className="text-slate-400 text-sm">
                    All professionals vetted
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-blue-400 font-semibold">
                    ✓ Quick Response
                  </div>
                  <div className="text-slate-400 text-sm">
                    24-hour reply guarantee
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-blue-400 font-semibold">
                    ✓ Best Rates
                  </div>
                  <div className="text-slate-400 text-sm">
                    Competitive pricing
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
