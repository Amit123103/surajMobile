"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Save, Store, Truck, Clock, Loader2 } from "lucide-react";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [isShopOpen, setIsShopOpen] = useState(true);
  const [openTime, setOpenTime] = useState("10:00");
  const [closeTime, setCloseTime] = useState("23:00");
  const [isDeliveryAvailable, setIsDeliveryAvailable] = useState(true);
  const [adminPhone, setAdminPhone] = useState("+91 7492892235");
  const [adminEmail, setAdminEmail] = useState("doctorsurajmobile@gmail.com");
  
  const [store1Name, setStore1Name] = useState("Green Valley");
  const [store1Address, setStore1Address] = useState("Main Market Area");
  const [store2Name, setStore2Name] = useState("Law Gate");
  const [store2Address, setStore2Address] = useState("University Road");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, "settings", "shop");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.isShopOpen !== undefined) setIsShopOpen(data.isShopOpen);
          if (data.openTime) setOpenTime(data.openTime);
          if (data.closeTime) setCloseTime(data.closeTime);
          if (data.isDeliveryAvailable !== undefined) setIsDeliveryAvailable(data.isDeliveryAvailable);
          if (data.adminPhone) setAdminPhone(data.adminPhone);
          if (data.adminEmail) setAdminEmail(data.adminEmail);
          
          if (data.store1Name) setStore1Name(data.store1Name);
          if (data.store1Address) setStore1Address(data.store1Address);
          if (data.store2Name) setStore2Name(data.store2Name);
          if (data.store2Address) setStore2Address(data.store2Address);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const docRef = doc(db, "settings", "shop");
      await setDoc(docRef, {
        isShopOpen,
        openTime,
        closeTime,
        isDeliveryAvailable,
        adminPhone,
        adminEmail,
        store1Name,
        store1Address,
        store2Name,
        store2Address
      }, { merge: true });
      
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-heading">Global Shop Settings</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage store hours, open status, and delivery availability.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-zinc-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Store Status */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg">Shop Status</h2>
              <p className="text-xs text-zinc-500">Is your physical shop open right now?</p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer p-4 rounded-xl border border-border hover:bg-zinc-50 transition-colors">
              <div>
                <p className="font-medium">Currently Open</p>
                <p className="text-xs text-zinc-500 mt-0.5">Customers will see a green Open banner.</p>
              </div>
              <div className="relative inline-block w-12 h-6 rounded-full bg-zinc-200">
                <input 
                  type="checkbox" 
                  className="peer sr-only" 
                  checked={isShopOpen}
                  onChange={(e) => setIsShopOpen(e.target.checked)}
                />
                <span className="absolute inset-y-1 left-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:left-7 peer-checked:bg-primary-600"></span>
                <span className="absolute inset-0 rounded-full border-2 border-transparent peer-checked:border-primary-600 transition-all"></span>
              </div>
            </label>
          </div>
        </div>

        {/* Operating Hours & Contact */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg">Operating Hours & Contact</h2>
              <p className="text-xs text-zinc-500">Set open times and the main WhatsApp number.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Opening Time</label>
              <input 
                type="time" 
                value={openTime}
                onChange={(e) => setOpenTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Closing Time</label>
              <input 
                type="time" 
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none" 
              />
            </div>
          </div>
          
          <div className="space-y-4 pt-2 border-t border-border mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Admin WhatsApp Number</label>
              <input 
                type="tel" 
                value={adminPhone}
                onChange={(e) => setAdminPhone(e.target.value)}
                placeholder="+91 7492892235"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none" 
              />
              <p className="text-xs text-zinc-500">All checkout and printing orders will be sent to this number.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Admin Support Email</label>
              <input 
                type="email" 
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="doctorsurajmobile@gmail.com"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none" 
              />
              <p className="text-xs text-zinc-500">This email will be displayed on the website for customer support.</p>
            </div>
          </div>
        </div>

        {/* Delivery Status */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6 md:col-span-2">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg">Delivery Availability</h2>
              <p className="text-xs text-zinc-500">Toggle whether you are currently accepting delivery orders.</p>
            </div>
          </div>

          <div className="space-y-4 max-w-md">
            <label className="flex items-center justify-between cursor-pointer p-4 rounded-xl border border-border hover:bg-zinc-50 transition-colors">
              <div>
                <p className="font-medium">Delivery Active</p>
                <p className="text-xs text-zinc-500 mt-0.5">If disabled, customers must choose Store Pickup (Walkaway).</p>
              </div>
              <div className="relative inline-block w-12 h-6 rounded-full bg-zinc-200">
                <input 
                  type="checkbox" 
                  className="peer sr-only" 
                  checked={isDeliveryAvailable}
                  onChange={(e) => setIsDeliveryAvailable(e.target.checked)}
                />
                <span className="absolute inset-y-1 left-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:left-7 peer-checked:bg-primary-600"></span>
                <span className="absolute inset-0 rounded-full border-2 border-transparent peer-checked:border-primary-600 transition-all"></span>
              </div>
            </label>
          </div>
        </div>
        {/* Store Locations */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg">Store Locations</h2>
              <p className="text-xs text-zinc-500">Update the names and addresses of your physical stores.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-sm border-b border-border pb-2">Store 1</h3>
              <div className="space-y-2">
                <label className="text-sm font-medium">Store Name</label>
                <input 
                  type="text" 
                  value={store1Name}
                  onChange={(e) => setStore1Name(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Store Address / Area</label>
                <input 
                  type="text" 
                  value={store1Address}
                  onChange={(e) => setStore1Address(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none" 
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-sm border-b border-border pb-2">Store 2</h3>
              <div className="space-y-2">
                <label className="text-sm font-medium">Store Name</label>
                <input 
                  type="text" 
                  value={store2Name}
                  onChange={(e) => setStore2Name(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Store Address / Area</label>
                <input 
                  type="text" 
                  value={store2Address}
                  onChange={(e) => setStore2Address(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
