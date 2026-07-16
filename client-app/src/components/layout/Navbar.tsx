"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Smartphone, Wrench, Printer, Search, User, Clock, Home } from "lucide-react";
import Image from "next/image";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { ThemeToggle } from "@/components/ThemeToggle";

const formatTime = (timeStr: string) => {
  if (!timeStr) return "";
  const [hours, minutes] = timeStr.split(':');
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const formattedHours = h % 12 || 12;
  return `${formattedHours}:${minutes} ${ampm}`;
};

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Phones", href: "/phones", icon: Smartphone },
  { name: "Accessories", href: "/accessories", icon: ShoppingBag },
  { name: "Repairs", href: "/repairs", icon: Wrench },
  { name: "Glass", href: "/glass-replacement", icon: Smartphone },
  { name: "Printing", href: "/printing", icon: Printer },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [shopSettings, setShopSettings] = useState({
    isShopOpen: true,
    openTime: "10:00",
    closeTime: "23:00"
  });
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every minute to check if shop status changed automatically
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Compute if shop is open based on manual toggle AND current time
  const isShopCurrentlyOpen = useMemo(() => {
    // If admin explicitly set it to false, it stays closed
    if (shopSettings.isShopOpen === false) return false; 

    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentTotalMinutes = currentHour * 60 + currentMinute;

    const [openH, openM] = (shopSettings.openTime || "10:00").split(':').map(Number);
    const openTotalMinutes = openH * 60 + (openM || 0);

    const [closeH, closeM] = (shopSettings.closeTime || "23:00").split(':').map(Number);
    const closeTotalMinutes = closeH * 60 + (closeM || 0);

    // Normal logic (e.g., 10:00 to 23:00)
    if (closeTotalMinutes > openTotalMinutes) {
      return currentTotalMinutes >= openTotalMinutes && currentTotalMinutes < closeTotalMinutes;
    } 
    // Handles cases where closing time is past midnight (e.g., 10:00 to 01:00)
    else {
      return currentTotalMinutes >= openTotalMinutes || currentTotalMinutes < closeTotalMinutes;
    }
  }, [currentTime, shopSettings]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    // Listen to global shop settings
    const docRef = doc(db, "settings", "shop");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setShopSettings({
          isShopOpen: data.isShopOpen ?? true,
          openTime: data.openTime || "10:00",
          closeTime: data.closeTime || "23:00"
        });
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex flex-col">
      {/* Global Status Banner */}
      <div className={`w-full py-1.5 px-4 text-center text-xs md:text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm ${
        isShopCurrentlyOpen ? 'bg-[#25D366] text-white' : 'bg-red-500 text-white'
      }`}>
        <Clock className="w-4 h-4" />
        {isShopCurrentlyOpen 
          ? `Shop is currently OPEN (Closes at ${formatTime(shopSettings.closeTime)})`
          : `Shop is currently CLOSED (Opens at ${formatTime(shopSettings.openTime)})`}
      </div>

      <div
        className={`w-full transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-sm py-3" : "bg-background/80 backdrop-blur-md py-4 md:py-5"
        }`}
      >
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center transition-transform duration-500 group-hover:rotate-[360deg]">
              <Image src="/logo.jpg" alt="Suraj Phone Care Logo" fill sizes="48px" className="object-contain rounded-xl" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight hidden sm:block">Suraj<span className="text-primary-600">PhoneCare</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-foreground/5 backdrop-blur-md rounded-full px-2 py-1 border border-border/50">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-white bg-foreground shadow-sm"
                      : "text-foreground/70 hover:text-foreground hover:bg-foreground/10"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle className="p-2.5 rounded-full text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-colors" />
            <button className="p-2.5 rounded-full text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-colors hidden sm:block">
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/phones"
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg bg-gradient-to-r from-primary-600 to-accent text-white hover:-translate-y-0.5 ml-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Products</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2.5 text-foreground rounded-full hover:bg-foreground/10"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border md:hidden overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-4 rounded-xl text-base font-semibold transition-colors ${
                      isActive
                        ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20"
                        : "text-foreground/80 hover:bg-foreground/5 hover:text-foreground"
                    }`}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                );
              })}
              <div className="mt-6 pt-6 border-t border-border">
                <Link
                  href="/phones"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary-600 to-accent text-white px-4 py-4 rounded-xl font-bold shadow-md"
                >
                  <ShoppingBag className="w-5 h-5" />
                  View Products
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </header>
  );
}
