"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Smartphone, Package, Users, TrendingUp, Wrench, Printer, Settings } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ phones: 0, accessories: 0, repairs: 0, glass: 0, printing: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [phonesRes, accRes, repairsRes, glassRes, printingRes] = await Promise.all([
          supabase.from("phones").select("*", { count: "exact", head: true }),
          supabase.from("accessories").select("*", { count: "exact", head: true }),
          supabase.from("repairs").select("*", { count: "exact", head: true }),
          supabase.from("glass").select("*", { count: "exact", head: true }),
          supabase.from("printing").select("*", { count: "exact", head: true }),
        ]);
        
        setStats({
          phones: phonesRes.count || 0,
          accessories: accRes.count || 0,
          repairs: repairsRes.count || 0,
          glass: glassRes.count || 0,
          printing: printingRes.count || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Stat Cards */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <p className="text-zinc-500 text-sm font-medium">Total Phones</p>
            <p className="text-2xl font-bold">{stats.phones}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-zinc-500 text-sm font-medium">Accessories</p>
            <p className="text-2xl font-bold">{stats.accessories}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <p className="text-zinc-500 text-sm font-medium">Repairs</p>
            <p className="text-2xl font-bold">{stats.repairs}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <p className="text-zinc-500 text-sm font-medium">Glass Items</p>
            <p className="text-2xl font-bold">{stats.glass}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <Printer className="w-6 h-6" />
          </div>
          <div>
            <p className="text-zinc-500 text-sm font-medium">Printing Services</p>
            <p className="text-2xl font-bold">{stats.printing}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="font-heading font-bold text-lg mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Link href="/phones" className="p-4 rounded-xl border border-border hover:border-primary-500 hover:bg-primary-50 transition-all text-center group">
              <Smartphone className="w-6 h-6 mx-auto mb-2 text-zinc-400 group-hover:text-primary-600" />
              <span className="font-medium text-sm">Manage Phones</span>
            </Link>
            <Link href="/accessories" className="p-4 rounded-xl border border-border hover:border-primary-500 hover:bg-primary-50 transition-all text-center group">
              <Package className="w-6 h-6 mx-auto mb-2 text-zinc-400 group-hover:text-primary-600" />
              <span className="font-medium text-sm">Manage Accessories</span>
            </Link>
            <Link href="/repairs" className="p-4 rounded-xl border border-border hover:border-primary-500 hover:bg-primary-50 transition-all text-center group">
              <Wrench className="w-6 h-6 mx-auto mb-2 text-zinc-400 group-hover:text-primary-600" />
              <span className="font-medium text-sm">Manage Repairs</span>
            </Link>
            <Link href="/glass" className="p-4 rounded-xl border border-border hover:border-primary-500 hover:bg-primary-50 transition-all text-center group">
              <Smartphone className="w-6 h-6 mx-auto mb-2 text-zinc-400 group-hover:text-primary-600" />
              <span className="font-medium text-sm">Manage Glass</span>
            </Link>
            <Link href="/printing" className="p-4 rounded-xl border border-border hover:border-primary-500 hover:bg-primary-50 transition-all text-center group">
              <Printer className="w-6 h-6 mx-auto mb-2 text-zinc-400 group-hover:text-primary-600" />
              <span className="font-medium text-sm">Manage Printing</span>
            </Link>
            <Link href="/settings" className="p-4 rounded-xl border border-border hover:border-primary-500 hover:bg-primary-50 transition-all text-center group">
              <Settings className="w-6 h-6 mx-auto mb-2 text-zinc-400 group-hover:text-primary-600" />
              <span className="font-medium text-sm">Shop Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
