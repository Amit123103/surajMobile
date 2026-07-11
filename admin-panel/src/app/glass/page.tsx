"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { Plus, Edit2, Trash2, Smartphone, Loader2 } from "lucide-react";

export default function AdminPhones() {
  const [glass, setPhones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPhones = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "glass"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPhones(data);
    } catch (error) {
      console.error("Error fetching glass:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhones();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this glassitem?")) return;
    try {
      await deleteDoc(doc(db, "glass", id));
      setPhones((prev) => prev.filter((glassitem) => glassitem.id !== id));
    } catch (error) {
      console.error("Error deleting glassitem:", error);
      alert("Failed to delete glassitem.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-border overflow-hidden">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h3 className="font-heading font-bold text-lg flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-primary-600" />
          All Glass
        </h3>
        <Link
          href="/glass/add"
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New GlassItem
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-border">
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase">Product</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase">GlassQuality</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase">Warranty</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase">Price</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {glass.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                  No glass found. Click &quot;Add New GlassItem&quot; to create one.
                </td>
              </tr>
            ) : (
              glass.map((glassitem) => (
                <tr key={glassitem.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                        {glassitem.imageUrl ? (
                          <img src={glassitem.imageUrl} alt={glassitem.phoneModel} className="w-full h-full object-contain" />
                        ) : (
                          <Smartphone className="w-5 h-5 text-zinc-400" />
                        )}
                      </div>
                      <span className="font-medium text-sm">{glassitem.phoneModel}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{glassitem.glassQuality}</td>
                  <td className="px-6 py-4 text-sm">{glassitem.warranty}</td>
                  <td className="px-6 py-4 text-sm font-medium text-primary-600">₹{glassitem.price.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/glass/${glassitem.id}/edit`}
                        className="p-2 text-zinc-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(glassitem.id)}
                        className="p-2 text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
