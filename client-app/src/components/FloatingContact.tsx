"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Phone, Mail } from "lucide-react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function FloatingContact() {
  const [shopSettings, setShopSettings] = useState({
    adminPhone: "+91 7492892235",
    adminEmail: "doctorsurajmobile@gmail.com"
  });

  useEffect(() => {
    const docRef = doc(db, "settings", "shop");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setShopSettings(prev => ({
          adminPhone: data.adminPhone || prev.adminPhone,
          adminEmail: data.adminEmail || prev.adminEmail
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  const cleanPhone = shopSettings.adminPhone.replace(/[\s\+\-]/g, '');
  const waPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone.replace(/^0+/, '')}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2 sm:gap-3 items-center scale-90 sm:scale-100 origin-bottom-right">
      <a
        href={`mailto:${shopSettings.adminEmail}`}
        className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-primary-600 dark:hover:text-primary-400 hover:scale-110 transition-all premium-shadow border border-zinc-200 dark:border-zinc-700"
        title="Email Us"
      >
        <Mail className="w-5 h-5" />
      </a>
      <a
        href={`tel:${shopSettings.adminPhone}`}
        className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-primary-600 dark:hover:text-primary-400 hover:scale-110 transition-all premium-shadow border border-zinc-200 dark:border-zinc-700"
        title="Call Us"
      >
        <Phone className="w-5 h-5" />
      </a>
      <a
        href={`https://wa.me/${waPhone}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-white hover:bg-emerald-600 hover:scale-110 transition-all premium-shadow shadow-emerald-500/30 mt-2"
        title="WhatsApp Us"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}
