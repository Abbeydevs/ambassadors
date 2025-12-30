import { TrendingUp, Award, Globe, Zap } from "lucide-react";

function Users(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Professional Talents",
      description: "Vetted and verified",
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: Award,
      value: "150+",
      label: "Awards Won",
      description: "Industry recognition",
      color: "from-purple-500 to-pink-400",
    },
    {
      icon: Globe,
      value: "50+",
      label: "Countries Served",
      description: "Global reach",
      color: "from-orange-500 to-red-400",
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: "Client Satisfaction",
      description: "Happy clients",
      color: "from-green-500 to-emerald-400",
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a08_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a08_1px,transparent_1px)] bg-size-[3rem_3rem]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">
              Trusted by Thousands
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Excellence in Numbers
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card */}
                <div className="relative p-8 rounded-2xl bg-slate-950/50 border border-white/10 backdrop-blur-sm hover:bg-slate-950/80 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20">
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}
                  />

                  {/* Icon */}
                  <div
                    className={`relative w-14 h-14 bg-linear-to-br ${stat.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <div className="relative space-y-2">
                    <div
                      className={`text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r ${stat.color}`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-white font-semibold text-lg">
                      {stat.label}
                    </div>
                    <div className="text-slate-400 text-sm">
                      {stat.description}
                    </div>
                  </div>

                  {/* Decorative Line */}
                  <div
                    className={`absolute bottom-0 left-8 right-8 h-1 bg-linear-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
