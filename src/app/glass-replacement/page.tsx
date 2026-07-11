"use client";

import { useState } from "react";
import Link from "next/link";
import { Smartphone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const models = [
  { brand: "Apple", name: "iPhone 13", price: 4500 },
  { brand: "Apple", name: "iPhone 14 Pro", price: 6500 },
  { brand: "Samsung", name: "Galaxy S23 Ultra", price: 8900 },
  { brand: "OnePlus", name: "OnePlus 11", price: 3500 },
];

export default function GlassReplacementPage() {
  const [selectedBrand, setSelectedBrand] = useState("Apple");
  const [selectedModel, setSelectedModel] = useState(models[0].name);

  const filteredModels = models.filter((m) => m.brand === selectedBrand);
  const currentModel = models.find((m) => m.name === selectedModel) || models[0];

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
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
                setSelectedBrand(e.target.value);
                setSelectedModel(models.find((m) => m.brand === e.target.value)?.name || "");
              }}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background outline-none"
            >
              {Array.from(new Set(models.map((m) => m.brand))).map((brand) => (
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
                <option key={model.name} value={model.name}>{model.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-2xl border border-border text-center flex flex-col items-center justify-center h-full">
          <Smartphone className="w-12 h-12 text-primary-600 mb-4" />
          <h3 className="font-heading font-bold text-xl mb-1">{currentModel.name}</h3>
          <p className="text-sm text-foreground/60 mb-6">Estimated Repair Time: 2-3 Hours</p>
          <p className="text-3xl font-bold text-primary-600 mb-8">₹{currentModel.price.toLocaleString()}</p>
          
          <Link href="/checkout" className="w-full">
            <Button size="lg" className="w-full">
              Book Now <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
