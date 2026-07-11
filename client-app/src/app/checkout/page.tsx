"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, MapPin, CreditCard, ShoppingBag, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

const WHATSAPP_NUMBER = "919876543210"; // Editable in admin panel later

const mockCart = {
  items: [
    { id: 1, name: "Premium Phone Model X - 256GB", price: 79999, qty: 1, type: "product" },
    { id: 2, name: "Screen Glass Replacement (iPhone 13)", price: 4500, qty: 1, type: "service" },
  ],
  subtotal: 84499,
  gst: 15209.82,
  total: 99708.82,
};

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    alternateNumber: "",
    email: "",
    storeLocation: "Green Valley",
    buildingName: "",
    roomNumber: "",
    floor: "",
    landmark: "",
    address: "",
    pinCode: "",
    specialInstructions: "",
    paymentMethod: "UPI",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate WhatsApp Message
    let message = `*New Order Details*\n\n`;
    message += `*Customer Info:*\n`;
    message += `Name: ${formData.fullName}\n`;
    message += `Mobile: ${formData.mobileNumber}\n`;
    if (formData.alternateNumber) message += `Alternate No: ${formData.alternateNumber}\n`;
    if (formData.email) message += `Email: ${formData.email}\n\n`;

    message += `*Delivery Details:*\n`;
    message += `Store Location: ${formData.storeLocation}\n`;
    message += `Building: ${formData.buildingName}, Room: ${formData.roomNumber}, Floor: ${formData.floor}\n`;
    message += `Landmark: ${formData.landmark}\n`;
    message += `Address: ${formData.address}\n`;
    message += `PIN: ${formData.pinCode}\n\n`;

    message += `*Order Summary:*\n`;
    mockCart.items.forEach(item => {
      message += `- ${item.qty}x ${item.name} (₹${item.price})\n`;
    });
    message += `\nSubtotal: ₹${mockCart.subtotal}\n`;
    message += `GST: ₹${mockCart.gst.toFixed(2)}\n`;
    message += `*Total: ₹${mockCart.total.toFixed(2)}*\n\n`;

    message += `*Payment Method:* ${formData.paymentMethod}\n`;
    if (formData.specialInstructions) message += `*Instructions:* ${formData.specialInstructions}\n`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 max-w-7xl">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Checkout</h1>
        <p className="text-foreground/70">Complete your order details below. You will be redirected to WhatsApp to confirm.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <form onSubmit={handlePlaceOrder} className="space-y-10">
            {/* 1. Contact Information */}
            <div className="glass-card p-6 md:p-8 rounded-3xl">
              <h2 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/30 text-sm">1</span>
                Contact Information
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name <span className="text-red-500">*</span></label>
                  <input required name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mobile Number <span className="text-red-500">*</span></label>
                  <input required name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} type="tel" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Alternate Number</label>
                  <input name="alternateNumber" value={formData.alternateNumber} onChange={handleInputChange} type="tel" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="Optional" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="john@example.com" />
                </div>
              </div>
            </div>

            {/* 2. Delivery & Address */}
            <div className="glass-card p-6 md:p-8 rounded-3xl">
              <h2 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/30 text-sm">2</span>
                Delivery Details
              </h2>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Preferred Store Location <span className="text-red-500">*</span></label>
                  <select name="storeLocation" value={formData.storeLocation} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all appearance-none cursor-pointer">
                    <option value="Green Valley">Green Valley (Main Market)</option>
                    <option value="Law Gate">Law Gate (University Road)</option>
                  </select>
                </div>
                
                <div className="grid md:grid-cols-3 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Building Name <span className="text-red-500">*</span></label>
                    <input required name="buildingName" value={formData.buildingName} onChange={handleInputChange} type="text" className="w-full px-4 py-3 rounded-xl border border-border bg-background" placeholder="Building/Tower" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Room Number <span className="text-red-500">*</span></label>
                    <input required name="roomNumber" value={formData.roomNumber} onChange={handleInputChange} type="text" className="w-full px-4 py-3 rounded-xl border border-border bg-background" placeholder="A-101" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Floor <span className="text-red-500">*</span></label>
                    <input required name="floor" value={formData.floor} onChange={handleInputChange} type="text" className="w-full px-4 py-3 rounded-xl border border-border bg-background" placeholder="1st Floor" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Complete Address <span className="text-red-500">*</span></label>
                    <input required name="address" value={formData.address} onChange={handleInputChange} type="text" className="w-full px-4 py-3 rounded-xl border border-border bg-background" placeholder="Street name, Area" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Landmark</label>
                    <input name="landmark" value={formData.landmark} onChange={handleInputChange} type="text" className="w-full px-4 py-3 rounded-xl border border-border bg-background" placeholder="Near Hospital" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">PIN Code <span className="text-red-500">*</span></label>
                    <input required name="pinCode" value={formData.pinCode} onChange={handleInputChange} type="text" className="w-full px-4 py-3 rounded-xl border border-border bg-background" placeholder="123456" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Special Instructions</label>
                    <input name="specialInstructions" value={formData.specialInstructions} onChange={handleInputChange} type="text" className="w-full px-4 py-3 rounded-xl border border-border bg-background" placeholder="E.g., Call before delivery" />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="glass-card p-6 md:p-8 rounded-3xl">
              <h2 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/30 text-sm">3</span>
                Payment Method
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {["UPI", "Google Pay", "PhonePe", "Paytm", "Cash on Delivery"].map((method) => (
                  <label key={method} className={`relative flex items-center justify-center px-4 py-4 rounded-xl border cursor-pointer transition-all ${formData.paymentMethod === method ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium' : 'border-border bg-background hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`}>
                    <input type="radio" name="paymentMethod" value={method} checked={formData.paymentMethod === method} onChange={handleInputChange} className="sr-only" />
                    <span>{method}</span>
                    {formData.paymentMethod === method && (
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary-500"></div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full h-14 text-lg">
              Place Order via WhatsApp <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="order-1 lg:order-2">
          <div className="glass-card p-6 rounded-3xl sticky top-24">
            <h3 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" /> Order Summary
            </h3>
            
            <div className="space-y-4 mb-6">
              {mockCart.items.map(item => (
                <div key={item.id} className="flex gap-4 items-start">
                  <div className="w-16 h-16 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden shrink-0">
                    <Image src="/images/phone.png" alt={item.name} width={64} height={64} className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm leading-tight mb-1">{item.name}</h4>
                    <p className="text-xs text-foreground/60 mb-1">Qty: {item.qty}</p>
                    <p className="font-bold text-sm">₹{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3 text-sm">
              <div className="flex justify-between text-foreground/70">
                <span>Subtotal</span>
                <span>₹{mockCart.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-foreground/70">
                <span>Estimated GST (18%)</span>
                <span>₹{mockCart.gst.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="border-t border-border pt-3 mt-3 flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-primary-600">₹{mockCart.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <div className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-border">
              <ShieldCheck className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Safe & Secure Ordering</p>
                <p className="text-xs text-foreground/60 mt-1">Your details are sent directly to our official WhatsApp business number for fast processing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
