"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Smartphone, Wrench, Printer, Search, User } from "lucide-react";
import Image from "next/image";

import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
  { name: "Phones", href: "/phones", icon: Smartphone },
  { name: "Accessories", href: "/accessories", icon: ShoppingBag },
  { name: "Repairs", href: "/repairs", icon: Wrench },
  { name: "Glass", href: "/glass-replacement", icon: Smartphone },
  { name: "Printing", href: "/printing", icon: Printer },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled ? "translate-y-0" : "translate-y-2"
      }`}
    >
      <div className="container max-w-5xl mx-auto px-4 md:px-6">
        <div
          className={`flex items-center justify-between rounded-full transition-all duration-500 shadow-lg ${
            isScrolled
              ? "bg-zinc-300/95 backdrop-blur-md border border-zinc-400 px-6 py-2"
              : "bg-black border border-transparent px-6 py-3 md:py-4"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Image src="/logo.jpg" alt="Suraj Phone Care Logo" fill className="object-contain" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? isScrolled ? "text-black bg-zinc-400" : "text-white bg-zinc-800"
                      : isScrolled ? "text-zinc-700 hover:text-black hover:bg-zinc-400/50" : "text-zinc-400 hover:text-white hover:bg-zinc-800/80"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle className={`p-2 rounded-full transition-colors relative ${isScrolled ? "text-zinc-700 hover:text-black hover:bg-zinc-400/50" : "text-zinc-400 hover:text-white hover:bg-zinc-800/80"}`} />
            <button className={`p-2 rounded-full transition-colors hidden sm:block ${isScrolled ? "text-zinc-700 hover:text-black hover:bg-zinc-400/50" : "text-zinc-400 hover:text-white hover:bg-zinc-800/80"}`}>
              <Search className="w-5 h-5" />
            </button>
            <button className={`p-2 rounded-full transition-colors hidden sm:block ${isScrolled ? "text-zinc-700 hover:text-black hover:bg-zinc-400/50" : "text-zinc-400 hover:text-white hover:bg-zinc-800/80"}`}>
              <User className="w-5 h-5" />
            </button>
            <Link
              href="/checkout"
              className={`hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-xl ${isScrolled ? "bg-black text-zinc-300 hover:bg-black/80" : "bg-zinc-300 text-black hover:bg-zinc-200"}`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className={`md:hidden p-2 ${isScrolled ? "text-black" : "text-zinc-300"}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-4 px-4 md:hidden"
          >
            <div className="glass-card rounded-2xl p-4 flex flex-col gap-2 shadow-2xl">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20"
                        : "hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                    }`}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                );
              })}
              <div className="mt-4 pt-4 border-t border-border">
                <Link
                  href="/checkout"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-foreground text-background px-4 py-3 rounded-xl font-medium"
                >
                  <ShoppingBag className="w-5 h-5" />
                  View Cart
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
