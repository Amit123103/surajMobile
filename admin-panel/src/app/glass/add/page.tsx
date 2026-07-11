"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, UploadCloud, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AddPhone() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    phoneModel: "",
    glassQuality: "",
    warranty: "",
    price: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";
      if (imageFile) {
        const storageRef = ref(storage, `glass/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, "glass"), {
        phoneModel: formData.phoneModel,
        glassQuality: formData.glassQuality,
        warranty: formData.warranty,
        price: Number(formData.price),
        imageUrl: imageUrl,
        createdAt: new Date().toISOString(),
      });

      router.push("/glass");
    } catch (error) {
      console.error("Error adding glassitem:", error);
      alert("Failed to add glassitem. See console for details.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/glass" className="p-2 rounded-xl border border-border hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-heading font-bold">Add New GlassItem</h2>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-border p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1.5">GlassItem PhoneModel</label>
              <input
                type="text"
                required
                value={formData.phoneModel}
                onChange={(e) => setFormData({ ...formData, phoneModel: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-border focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                placeholder="e.g. iPhone 15 Pro Max"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">GlassQuality</label>
              <input
                type="text"
                required
                value={formData.glassQuality}
                onChange={(e) => setFormData({ ...formData, glassQuality: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-border focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                placeholder="e.g. Apple"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Warranty</label>
              <input
                type="text"
                required
                value={formData.warranty}
                onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-border focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                placeholder="e.g. 256GB"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1.5">Price (₹)</label>
              <input
                type="number"
                required
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-border focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                placeholder="e.g. 89999"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1.5">Product Image</label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden group">
                {preview ? (
                  <div className="relative w-full h-48 flex items-center justify-center">
                    <img src={preview} alt="Preview" className="h-full object-contain" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                      <span className="text-white text-sm font-medium">Click to change</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <UploadCloud className="w-10 h-10 text-zinc-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Click to upload an image</p>
                    <p className="text-xs text-zinc-500 mt-1">PNG, JPG up to 5MB</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-4">
            <Link href="/glass">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={loading} className="min-w-[120px]">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save GlassItem"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
