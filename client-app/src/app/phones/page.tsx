"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, Smartphone, ArrowLeft } from "lucide-react";

export default function PhonesPage() {
  const [phones, setPhones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "phones"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPhones(data);
      } catch (error) {
        console.error("Error fetching phones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-primary-600 transition-colors mb-6 font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
      </Link>
      <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8">Smartphones</h1>
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-primary-600" />
        </div>
      ) : phones.length === 0 ? (
        <div className="text-center py-20 text-zinc-500">
          No smartphones available at the moment.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {phones.map((phone) => (
            <div key={phone.id} className="glass-card p-4 rounded-3xl flex flex-col h-full group hover:-translate-y-1 transition-all duration-300">
              <div className="aspect-[4/5] bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl mb-4 p-6 flex items-center justify-center overflow-hidden">
                {phone.imageUrl ? (
                  <Image 
                    src={phone.imageUrl} 
                    alt={phone.name} 
                    width={200} 
                    height={300} 
                    className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <Smartphone className="w-16 h-16 text-zinc-400" />
                )}
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="font-heading font-bold text-lg line-clamp-1">{phone.name}</h3>
                <p className="text-sm text-foreground/60 mb-4">{phone.brand} • {phone.storage}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-bold text-lg">₹{phone.price.toLocaleString()}</span>
                  <Link href="/checkout"><Button size="sm" className="rounded-full">Buy</Button></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
