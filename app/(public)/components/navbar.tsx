"use client";

import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Talents", href: "/talents" },
    { name: "Categories", href: "/categories" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center font-bold text-white text-xl">
              A
            </div>
            <span className="text-xl lg:text-2xl font-bold text-white">
              Ambassadors
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-white transition-colors duration-200 font-medium relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Button className="p-2 text-slate-300 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </Button>
            <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-slate-900/95 backdrop-blur-lg border-t border-white/10">
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-3 px-4 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 font-medium"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <button className="w-full py-3 px-4 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 font-medium flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search
              </button>
              <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
