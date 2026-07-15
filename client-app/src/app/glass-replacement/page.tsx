"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Smartphone, ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function GlassReplacementPage() {
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  useEffect(() => {
    const fetchGlassModels = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "glass"));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setModels(data);
        
        if (data.length > 0) {
          const uniqueBrands = Array.from(new Set(data.map((m) => m.brand)));
          const initialBrand = uniqueBrands[0] as string;
          setSelectedBrand(initialBrand);
          
          const initialModels = data.filter((m) => m.brand === initialBrand);
          if (initialModels.length > 0) {
            setSelectedModel(initialModels[0].modelName);
          }
        }
      } catch (error) {
        console.error("Error fetching glass models:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGlassModels();
  }, []);

  const uniqueBrands = Array.from(new Set(models.map((m) => m.brand)));
  const filteredModels = models.filter((m) => m.brand === selectedBrand);
  const currentModel = models.find((m) => m.modelName === selectedModel && m.brand === selectedBrand) || filteredModels[0];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary-600" />
      </div>
    );
  }

  if (models.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Smartphone className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-zinc-500">No glass models available yet.</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
      <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-primary-600 transition-colors mb-6 font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
      </Link>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Glass Replacement</h1>
        <p className="text-lg text-foreground/70">Original quality glass replacement without changing your original display panel.</p>
      </div>

      <div className="glass-card p-6 md:p-10 rounded-3xl grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Brand</label>
            <select
              value={selectedBrand}
              onChange={(e) => {
                const newBrand = e.target.value;
                setSelectedBrand(newBrand);
                const newModels = models.filter(m => m.brand === newBrand);
                if (newModels.length > 0) {
                  setSelectedModel(newModels[0].modelName);
                }
              }}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background outline-none"
            >
              {uniqueBrands.map((brand: any) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select Model</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background outline-none"
            >
              {filteredModels.map((model) => (
                <option key={model.modelName} value={model.modelName}>{model.modelName}</option>
              ))}
            </select>
          </div>
        </div>

        {currentModel && (
          <div className="bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-2xl border border-border text-center flex flex-col items-center justify-center h-full relative overflow-hidden">
            {currentModel.isOutOfStock && (
              <div className="absolute top-4 right-4 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Out of Stock
              </div>
            )}
            
            <div className="w-32 h-32 mb-6 flex items-center justify-center">
              {currentModel.imageUrl ? (
                <Image 
                  src={currentModel.imageUrl} 
                  alt={currentModel.modelName} 
                  width={128} 
                  height={128} 
                  className="object-contain w-full h-full"
                />
              ) : (
                <Smartphone className="w-16 h-16 text-primary-600" />
              )}
            </div>
            
            <h3 className="font-heading font-bold text-2xl mb-1">{currentModel.modelName}</h3>
            <p className="text-sm text-foreground/60 mb-6">Estimated Repair Time: 2-3 Hours</p>
            <p className="text-4xl font-bold text-primary-600 mb-8">₹{currentModel.price?.toLocaleString()}</p>
            
            {currentModel.isOutOfStock ? (
              <Button size="lg" className="w-full opacity-50 cursor-not-allowed" disabled>
                Currently Unavailable
              </Button>
            ) : (
              <Link href="/checkout" className="w-full">
                <Button size="lg" className="w-full shadow-lg shadow-primary-500/25">
                  Book Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
