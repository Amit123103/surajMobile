"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, MessageCircle, User, Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function PrintingPage() {
  const [pages, setPages] = useState(1);
  const [colorMode, setColorMode] = useState("bw");
  const [paperSize, setPaperSize] = useState("A4");
  const [copies, setCopies] = useState(1);
  
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [adminPhone, setAdminPhone] = useState("917492892235");

  useEffect(() => {
    const docRef = doc(db, "settings", "shop");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.adminPhone) {
          const cleanPhone = data.adminPhone.replace(/[\s\+\-]/g, '');
          setAdminPhone(cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone.replace(/^0+/, '')}`);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Simple pricing logic
  const basePrice = colorMode === "color" ? 10 : 2;
  const sizeMultiplier = paperSize === "A3" ? 2 : 1;
  const totalCost = pages * copies * basePrice * sizeMultiplier;

  const handleSendToWhatsApp = () => {
    if (!userName || !userPhone) return alert("Please provide your name and phone number.");

    // Construct WhatsApp Message
    const message = `*🖨️ New Print Order!*\n\n*Customer Details:*\nName: ${userName}\nPhone: ${userPhone}\n\n*Print Configuration:*\nColor Mode: ${colorMode === 'bw' ? 'Black & White' : 'Color'}\nPaper Size: ${paperSize}\nPages per copy: ${pages}\nCopies: ${copies}\n*Total Cost: ₹${totalCost}*\n\n*📎 Please attach your document to this chat so we can print it!*`;

    // Open WhatsApp Web / App
    const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-5xl">
      <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-primary-600 transition-colors mb-6 font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
      </Link>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Professional Printing</h1>
        <p className="text-lg text-foreground/70">Configure your print settings below and send us your document securely via WhatsApp.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Config */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl space-y-5">
            <h3 className="font-heading font-bold text-lg border-b border-border pb-3">Contact Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2"><User className="w-4 h-4"/> Full Name</label>
                <input 
                  type="text" 
                  value={userName} 
                  onChange={(e) => setUserName(e.target.value)} 
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background outline-none text-sm focus:border-primary-500" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2"><Phone className="w-4 h-4"/> Phone Number</label>
                <input 
                  type="tel" 
                  value={userPhone} 
                  onChange={(e) => setUserPhone(e.target.value)} 
                  placeholder="e.g. 6394366374"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background outline-none text-sm focus:border-primary-500" 
                />
              </div>
            </div>

            <h3 className="font-heading font-bold text-lg border-b border-border pb-3 mt-4">Print Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Color Mode</label>
                <select value={colorMode} onChange={(e) => setColorMode(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background outline-none text-sm focus:border-primary-500">
                  <option value="bw">Black & White (₹2/page)</option>
                  <option value="color">Color (₹10/page)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Paper Size</label>
                <select value={paperSize} onChange={(e) => setPaperSize(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background outline-none text-sm focus:border-primary-500">
                  <option value="A4">A4 Standard</option>
                  <option value="A3">A3 Large</option>
                  <option value="Legal">Legal Size</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Total Pages per Copy</label>
                <input type="number" min="1" value={pages} onChange={(e) => setPages(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background outline-none text-sm focus:border-primary-500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Number of Copies</label>
                <input type="number" min="1" value={copies} onChange={(e) => setCopies(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background outline-none text-sm focus:border-primary-500" />
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary-500/10 border border-primary-500/20 rounded-xl flex items-start gap-3">
              <MessageCircle className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
              <p className="text-sm text-foreground/80">
                <strong>Important Note:</strong> After filling out these details and clicking the WhatsApp button, 
                <strong> you will need to attach your document directly in the WhatsApp chat.</strong>
              </p>
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

          <Button 
            size="lg" 
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg shadow-[#25D366]/20 transition-all hover:-translate-y-0.5"
            onClick={handleSendToWhatsApp}
          >
            <MessageCircle className="w-5 h-5 mr-2" /> Open WhatsApp
          </Button>
          <p className="text-xs text-center text-foreground/50 mt-4">
            WhatsApp will open with your order details. <strong>You will attach your document directly in the WhatsApp chat.</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
