import { Quote, Star } from "lucide-react";
import Image from "next/image";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Jennifer Mitchell",
      role: "Casting Director",
      company: "Paramount Pictures",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      content:
        "Ambassadors has been our go-to agency for finding exceptional talent. Their roster is diverse, professional, and always delivers outstanding performances.",
      rating: 5,
    },
    {
      id: 2,
      name: "Robert Chen",
      role: "Event Producer",
      company: "Elite Events Co.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      content:
        "Working with Ambassadors is always a pleasure. They understand our needs and consistently provide top-tier entertainers who exceed expectations.",
      rating: 5,
    },
    {
      id: 3,
      name: "Amanda Foster",
      role: "Creative Director",
      company: "Brand Vision Studio",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      content:
        "The level of professionalism and talent quality at Ambassadors is unmatched. They make every project a success with their incredible roster.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-linear-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <Quote className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">
              Client Stories
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            What Our Clients Say
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Trusted by leading production companies, event organizers, and
            creative agencies worldwide.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl bg-slate-900/50 border border-white/10 backdrop-blur-sm hover:bg-slate-900/80 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20">
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                  <Quote className="w-6 h-6 text-white" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                  &quot;{testimonial.content}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-500/30 group-hover:border-blue-500/60 transition-colors"
                    width="100"
                    height="100"
                  />
                  <div>
                    <div className="text-white font-semibold">
                      {testimonial.name}
                    </div>
                    <div className="text-blue-400 text-sm">
                      {testimonial.role}
                    </div>
                    <div className="text-slate-500 text-sm">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <p className="text-center text-slate-400 mb-8">
            Trusted by Industry Leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            <div className="text-2xl font-bold text-white">NETFLIX</div>
            <div className="text-2xl font-bold text-white">HBO</div>
            <div className="text-2xl font-bold text-white">WARNER BROS</div>
            <div className="text-2xl font-bold text-white">UNIVERSAL</div>
            <div className="text-2xl font-bold text-white">SONY</div>
          </div>
        </div>
      </div>
    </section>
  );
}
