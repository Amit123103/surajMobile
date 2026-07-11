"use client";

import { useState } from "react";
import Link from "next/link";
import { UploadCloud, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function PrintingPage() {
  const [pages, setPages] = useState(1);
  const [colorMode, setColorMode] = useState("bw");
  const [paperSize, setPaperSize] = useState("A4");
  const [copies, setCopies] = useState(1);
  const [files, setFiles] = useState<File[]>([]);

  // Simple pricing logic
  const basePrice = colorMode === "color" ? 10 : 2;
  const sizeMultiplier = paperSize === "A3" ? 2 : 1;
  const totalCost = pages * copies * basePrice * sizeMultiplier;

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Professional Printing</h1>
        <p className="text-lg text-foreground/70">Upload your documents (PDF, DOCX, Images) and get them printed with premium quality.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Upload & Config */}
        <div className="space-y-6">
          <div className="glass-card p-8 rounded-3xl border-dashed border-2 border-primary-500/50 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors">
            <UploadCloud className="w-12 h-12 text-primary-600 mb-4" />
            <p className="font-heading font-bold text-lg mb-2">Click to Upload Documents</p>
            <p className="text-sm text-foreground/60 mb-6">Supports PDF, DOCX, PPT, JPG, PNG up to 50MB</p>
            <Button variant="outline" size="sm">Select Files</Button>
            <input type="file" multiple className="hidden" />
          </div>

          <div className="glass-card p-6 rounded-3xl space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Color Mode</label>
                <select value={colorMode} onChange={(e) => setColorMode(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background outline-none text-sm">
                  <option value="bw">Black & White (₹2/page)</option>
                  <option value="color">Color (₹10/page)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Paper Size</label>
                <select value={paperSize} onChange={(e) => setPaperSize(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background outline-none text-sm">
                  <option value="A4">A4 Standard</option>
                  <option value="A3">A3 Large</option>
                  <option value="Legal">Legal Size</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Total Pages per Copy</label>
                <input type="number" min="1" value={pages} onChange={(e) => setPages(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background outline-none text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Number of Copies</label>
                <input type="number" min="1" value={copies} onChange={(e) => setCopies(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background outline-none text-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Calculator & Checkout */}
        <div className="glass-card p-8 rounded-3xl h-fit sticky top-24">
          <h3 className="font-heading font-bold text-xl mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-600" /> Print Summary
          </h3>
          
          <div className="space-y-4 text-sm mb-8">
            <div className="flex justify-between pb-4 border-b border-border">
              <span className="text-foreground/70">Configuration</span>
              <span className="font-medium text-right">{paperSize}, {colorMode === 'bw' ? 'B&W' : 'Color'}</span>
            </div>
            <div className="flex justify-between pb-4 border-b border-border">
              <span className="text-foreground/70">Pages x Copies</span>
              <span className="font-medium">{pages} x {copies} = {pages * copies} total pages</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="font-bold text-lg">Total Cost</span>
              <span className="font-bold text-2xl text-primary-600">₹{totalCost}</span>
            </div>
          </div>

          <Link href="/checkout" className="block">
            <Button size="lg" className="w-full">
              Proceed to Checkout <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
