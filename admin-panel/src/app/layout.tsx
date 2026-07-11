"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { LogOut, LayoutDashboard, Smartphone, Package, ShieldCheck, Wrench, Printer } from "lucide-react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (!user && pathname !== "/login") {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" forcedTheme="light" disableTransitionOnChange>
          {loading ? (
          <div className="min-h-screen flex items-center justify-center bg-zinc-50 ">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : !user && pathname === "/login" ? (
          <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">{children}</div>
        ) : (
          <div className="min-h-screen flex bg-zinc-50  text-foreground">
            {/* Sidebar */}
            <aside className="w-64 bg-white  border-r border-border flex flex-col">
              <div className="p-6 border-b border-border flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-primary-600" />
                <h1 className="font-heading font-bold text-xl">Admin Panel</h1>
              </div>
              <nav className="flex-1 p-4 space-y-2">
                <Link
                  href="/"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    pathname === "/"
                      ? "bg-primary-50 text-primary-600 "
                      : "hover:bg-zinc-100 "
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </Link>
                <Link
                  href="/phones"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    pathname.startsWith("/phones")
                      ? "bg-primary-50 text-primary-600 "
                      : "hover:bg-zinc-100 "
                  }`}
                >
                  <Smartphone className="w-5 h-5" />
                  Phones
                </Link>
                <Link
                  href="/accessories"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    pathname.startsWith("/accessories")
                      ? "bg-primary-50 text-primary-600 "
                      : "hover:bg-zinc-100 "
                  }`}
                >
                  <Package className="w-5 h-5" />
                  Accessories
                </Link>
                <Link
                  href="/repairs"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    pathname.startsWith("/repairs")
                      ? "bg-primary-50 text-primary-600 "
                      : "hover:bg-zinc-100 "
                  }`}
                >
                  <Wrench className="w-5 h-5" />
                  Repairs
                </Link>
                <Link
                  href="/glass"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    pathname.startsWith("/glass")
                      ? "bg-primary-50 text-primary-600 "
                      : "hover:bg-zinc-100 "
                  }`}
                >
                  <Smartphone className="w-5 h-5" />
                  Glass
                </Link>
                <Link
                  href="/printing"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    pathname.startsWith("/printing")
                      ? "bg-primary-50 text-primary-600 "
                      : "hover:bg-zinc-100 "
                  }`}
                >
                  <Printer className="w-5 h-5" />
                  Printing
                </Link>
              </nav>
              <div className="p-4 border-t border-border">
                <div className="text-sm text-zinc-500 mb-4 px-4 overflow-hidden text-ellipsis">
                  {user?.email}
                </div>
                <button
                  onClick={() => signOut(auth)}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50  transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
              <header className="bg-white  border-b border-border p-6 flex justify-between items-center">
                <h2 className="text-2xl font-heading font-bold">
                  {pathname === "/"
                    ? "Overview"
                    : pathname.includes("phones")
                    ? "Manage Phones"
                    : pathname.includes("accessories")
                    ? "Manage Accessories"
                    : pathname.includes("repairs")
                    ? "Manage Repairs"
                    : pathname.includes("glass")
                    ? "Manage Glass"
                    : pathname.includes("printing")
                    ? "Manage Printing"
                    : "Admin Panel"}
                </h2>
                <div className="flex items-center gap-4">
                  <Link href="/" className="text-sm text-primary-600 hover:underline">
                    View Live Site &rarr;
                  </Link>
                </div>
              </header>
              <div className="p-6">{children}</div>
            </main>
          </div>
        )}
        </ThemeProvider>
      </body>
    </html>
  );
}
