"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Smartphone, Mail, MapPin, Phone, Clock } from "lucide-react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

const formatTime = (timeStr: string) => {
  if (!timeStr) return "";
  const [hours, minutes] = timeStr.split(':');
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const formattedHours = h % 12 || 12;
  return `${formattedHours}:${minutes} ${ampm}`;
};

const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
  </svg>
);

const Twitter = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);

export function Footer() {
  const [shopSettings, setShopSettings] = useState({
    openTime: "10:00",
    closeTime: "23:00",
    adminPhone: "+91 7492892235",
    adminEmail: "support@surajphonecare.in",
    store1Name: "Main Market Area",
    store1Address: "Green Valley BB Tower 1",
    store2Name: "University Road",
    store2Address: "Law Gate Complex, Shop #12"
  });

  useEffect(() => {
    const docRef = doc(db, "settings", "shop");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setShopSettings({
          openTime: data.openTime || "10:00",
          closeTime: data.closeTime || "23:00",
          adminPhone: data.adminPhone || "+91 7492892235",
          adminEmail: data.adminEmail || "support@surajphonecare.in",
          store1Name: data.store1Name || "Main Market Area",
          store1Address: data.store1Address || "Green Valley BB Tower 1",
          store2Name: data.store2Name || "University Road",
          store2Address: data.store2Address || "Law Gate Complex, Shop #12"
        });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <footer className="bg-gradient-to-br from-primary-50 to-white border-t border-primary-100 pt-16 pb-8 text-zinc-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <Image src="/logo.jpg" alt="Suraj Phone Care Logo" fill sizes="48px" className="object-contain" />
              </div>
            </Link>
            <p className="text-zinc-600 text-sm leading-relaxed">
              Your one-stop destination for premium smartphones, accessories, expert repairs, and professional printing services. Experience technology at its best.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-primary-200 flex items-center justify-center text-primary-600 hover:text-white hover:bg-primary-600 transition-colors shadow-sm">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-primary-200 flex items-center justify-center text-primary-600 hover:text-white hover:bg-primary-600 transition-colors shadow-sm">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-primary-200 flex items-center justify-center text-primary-600 hover:text-white hover:bg-primary-600 transition-colors shadow-sm">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-primary-600 to-accent rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/phones" className="text-zinc-600 hover:text-primary-600 transition-colors text-sm">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link href="/accessories" className="text-zinc-600 hover:text-primary-600 transition-colors text-sm">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/repairs" className="text-zinc-600 hover:text-primary-600 transition-colors text-sm">
                  Repairs
                </Link>
              </li>
              <li>
                <Link href="/printing" className="text-zinc-600 hover:text-primary-600 transition-colors text-sm">
                  Printing Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 relative inline-block">
              Our Services
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-primary-600 to-accent rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Mobile Repair', href: '/repairs' },
                { name: 'Glass Replacement', href: '/glass-replacement' },
                { name: 'Printing Services', href: '/printing' },
                { name: 'Software Update', href: '/repairs' },
                { name: 'Battery Replacement', href: '/repairs' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-zinc-600 hover:text-primary-600 transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 group-hover:bg-primary-600 transition-colors"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-primary-600 to-accent rounded-full"></span>
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3 text-zinc-600 text-sm">
                <MapPin className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold text-zinc-900 block">{shopSettings.store1Name}</span>
                    {shopSettings.store1Address}
                  </p>
                  <p>
                    <span className="font-semibold text-zinc-900 block">{shopSettings.store2Name}</span>
                    {shopSettings.store2Address}
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-zinc-600 text-sm">
                <Phone className="w-5 h-5 text-primary-600 shrink-0" />
                <span>{shopSettings.adminPhone}</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-600 text-sm">
                <Mail className="w-5 h-5 text-primary-600 shrink-0" />
                <span>{shopSettings.adminEmail}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Suraj Phone Care. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="#" className="text-zinc-500 hover:text-primary-600 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-zinc-500 hover:text-primary-600 transition-colors">Terms of Service</Link>
            <Link href="#" className="text-zinc-500 hover:text-primary-600 transition-colors">Refund Policy</Link>
          </div>
        </div>
        {/* Developer Credit */}
        <div className="mt-6 text-center">
          <p className="text-zinc-400 text-xs">
            Developed by{" "}
            <a
              href="https://amit123103.github.io/SmartPortfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 font-semibold transition-colors hover:underline"
            >
              Amit
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
