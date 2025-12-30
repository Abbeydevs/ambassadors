import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Heart,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Story", href: "/story" },
      { name: "Team", href: "/team" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
    ],
    talents: [
      { name: "Browse All", href: "/talents" },
      { name: "Actors", href: "/talents?category=actors" },
      { name: "Musicians", href: "/talents?category=musicians" },
      { name: "Dancers", href: "/talents?category=dancers" },
      { name: "Models", href: "/talents?category=models" },
    ],
    resources: [
      { name: "Blog", href: "/blog" },
      { name: "FAQs", href: "/faq" },
      { name: "Casting Tips", href: "/resources/casting-tips" },
      { name: "Industry News", href: "/news" },
      { name: "Guidelines", href: "/guidelines" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-slate-950 border-t border-white/10">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center font-bold text-white text-2xl">
                A
              </div>
              <span className="text-2xl font-bold text-white">Ambassadors</span>
            </div>

            {/* Description */}
            <p className="text-slate-400 leading-relaxed">
              Your premier destination for discovering exceptional entertainment
              talent. We represent the finest actors, musicians, dancers, and
              artists from around the world.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:info@ambassadors.com"
                className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span>info@ambassadors.com</span>
              </a>

              <a
                href="tel:+1234567890"
                className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span>+1 (234) 567-890</span>
              </a>

              <div className="flex items-start gap-3 text-slate-400">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <span>
                  123 Entertainment Blvd,
                  <br />
                  Lagos, Nigeria
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/5 hover:bg-blue-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Talents</h3>
            <ul className="space-y-3">
              {footerLinks.talents.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-slate-400 text-sm flex items-center gap-2">
              © {currentYear} Ambassadors. Made with
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
