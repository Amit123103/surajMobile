"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Wrench, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function RepairsPage() {
  const [repairs, setRepairs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const q = query(collection(db, "repairs"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRepairs(data);
      } catch (error) {
        console.error("Error fetching repairs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepairs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-primary-600 transition-colors mb-6 font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
      </Link>
      
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Mobile Repairs</h1>
        <p className="text-lg text-foreground/70">Expert repairs with genuine parts and up to 1-year warranty.</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-20 w-full">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
        </div>
      ) : repairs.length === 0 ? (
        <div className="text-center py-20 text-zinc-500 w-full glass-panel rounded-2xl flex flex-col items-center">
          <Wrench className="w-16 h-16 text-zinc-300 mb-4" />
          <p>No repairs available at the moment.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {repairs.map((repair) => (
            <div key={repair.id} className="glass-card p-6 md:p-8 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-primary-500/50 transition-colors">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-primary-600 shrink-0 overflow-hidden relative">
                  {repair.imageUrl ? (
                    <Image src={repair.imageUrl} alt={repair.name} fill className="object-cover" />
                  ) : (
                    <Wrench className="w-8 h-8" />
                  )}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl mb-1">{repair.name}</h3>
                  <p className="text-sm text-foreground/60 mb-1">Est. Time: {repair.time}</p>
                  {repair.details && (
                    <p className="text-sm text-foreground/50 mb-2 italic line-clamp-2">{repair.details}</p>
                  )}
                  <p className="font-bold text-lg text-primary-600">Starts at ₹{repair.price.toLocaleString()}</p>
                </div>
              </div>
              <Link href="/checkout" className="shrink-0 mt-4 sm:mt-0 w-full sm:w-auto">
                <Button className="w-full">Book Repair</Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
