"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, Package } from "lucide-react";

export default function AccessoriesPage() {
  const [accessories, setAccessories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const q = query(collection(db, "accessories"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAccessories(data);
      } catch (error) {
        console.error("Error fetching accessories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAccessories();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8 pixel-text">Premium Accessories</h1>
      
      {loading ? (
        <div className="flex justify-center items-center py-20 w-full">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
        </div>
      ) : accessories.length === 0 ? (
        <div className="text-center py-20 text-zinc-500 w-full glass-panel rounded-2xl flex flex-col items-center">
          <Package className="w-16 h-16 text-zinc-300 mb-4" />
          <p>No accessories available at the moment.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {accessories.map((item) => (
            <div key={item.id} className="brutalist-card p-6 bg-white flex flex-col h-full hover:-translate-y-1 transition-transform group">
              <div className="w-full aspect-square border-4 border-black bg-primary-50 mb-4 flex items-center justify-center overflow-hidden relative">
                {item.imageUrl ? (
                  <Image 
                    src={item.imageUrl} 
                    alt={item.name}
                    fill
                    className="w-full h-full object-contain pixel-text group-hover:scale-110 transition-transform p-4"
                  />
                ) : (
                  <Package className="w-16 h-16 text-zinc-300 group-hover:scale-110 transition-transform" />
                )}
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="font-heading font-bold text-lg mb-1">{item.name}</h3>
                <p className="text-sm font-bold mb-4 uppercase tracking-wider">{item.category}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-bold text-lg">₹{item.price.toLocaleString()}</span>
                  <Link href="/checkout"><Button size="sm" variant="default" className="shadow-none">Buy</Button></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
