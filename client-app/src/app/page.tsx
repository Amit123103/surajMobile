"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, ShieldCheck, Zap, Smartphone, Wrench, Printer, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

const services = [
  {
    title: "Expert Mobile Repair",
    description: "Fast, reliable repairs with warranty for all major smartphone brands.",
    icon: Wrench,
    href: "/repairs",
    color: "bg-blue-500",
  },
  {
    title: "Glass Replacement",
    description: "Affordable and seamless screen glass replacement without changing the display.",
    icon: Smartphone,
    href: "/glass-replacement",
    color: "bg-purple-500",
  },
  {
    title: "Pro Printing Services",
    description: "High-quality document printing, lamination, and binding services.",
    icon: Printer,
    href: "/printing",
    color: "bg-amber-500",
  },
];

export default function Home() {
  const [featuredPhones, setFeaturedPhones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPhones = async () => {
      try {
        const q = query(collection(db, "phones"), limit(4));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeaturedPhones(data);
      } catch (error) {
        console.error("Error fetching featured phones:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedPhones();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-primary-50">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 bg-primary-50">
          {/* Brutalist shapes in background */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-primary-500 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-12"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 bg-accent border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-6 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <div className="hidden items-center gap-2 px-3 py-1 bg-primary-50 border-4 border-black font-bold text-sm mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Zap className="w-4 h-4" />
                <span>Next-Gen Mobile Solutions</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight mb-6 leading-tight pixel-text text-black">
                Upgrade Your <br />
                <span className="text-primary-600">Mobile Life.</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 mb-8 leading-relaxed max-w-xl">
                Experience the ultimate destination for premium smartphones, expert repair services, and high-quality printing solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button size="lg" variant="default" className="gap-2 group">
                  Explore Products
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Wrench className="w-4 h-4" />
                  Book Repair
                </Button>
              </div>
              
              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                       <span className="text-xs font-bold text-zinc-500">U{i}</span>
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1 text-amber-500 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-medium text-foreground">Trusted by 10,000+</span>
                  <span className="text-foreground/60"> happy customers</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative lg:ml-auto w-full max-w-lg"
            >
              <div className="relative overflow-hidden brutalist-card aspect-[4/5] sm:aspect-square flex items-center justify-center p-8 bg-white">
                <Image
                  src="/images/pixel_bee.png"
                  alt="Pixel Bee Mascot"
                  width={600}
                  height={600}
                  className="w-full h-full object-contain pixel-text"
                  priority
                />
              </div>
              
              {/* Floating Badge */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 brutalist-card px-6 py-4 flex items-center gap-4 bg-primary-100"
              >
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">1 Year Warranty</p>
                  <p className="text-xs text-foreground/60">On all repairs</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Everything You Need. <br className="hidden sm:block" />All in One Place.</h2>
            <p className="text-foreground/70">From the latest devices to expert repairs and professional printing, we've got you covered with premium service.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link href={service.href} className="block h-full group">
                  <div className="h-full brutalist-card p-8 hover:bg-primary-50 transition-colors duration-300 relative overflow-hidden group/card">
                    <div className={`w-14 h-14 border-4 border-black bg-white flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover/card:-translate-y-1 transition-transform duration-300`}>
                      <service.icon className={`w-6 h-6 text-black`} />
                    </div>
                    <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary-600 transition-colors">{service.title}</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed mb-6">{service.description}</p>
                    <div className="flex items-center text-primary-600 text-sm font-medium">
                      Explore Service <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Latest & Greatest</h2>
              <p className="text-foreground/70 max-w-2xl">Discover our handpicked selection of the most premium smartphones available today.</p>
            </div>
            <Button variant="outline" className="hidden md:flex">View All Phones</Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12 w-full">
              <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
            </div>
          ) : featuredPhones.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 w-full">
              No featured phones available at the moment.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {featuredPhones.map((phone, i) => (
                <motion.div
                  key={phone.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="brutalist-card p-4 h-full flex flex-col relative bg-white">
                    <div className="absolute -top-4 -right-4 z-10 bg-accent text-black text-xs font-bold font-heading px-3 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wider rotate-12">New</div>
                    <div className="aspect-[4/5] border-4 border-black bg-primary-50 mb-4 p-6 flex items-center justify-center overflow-hidden">
                      {phone.imageUrl ? (
                        <Image
                          src={phone.imageUrl}
                          alt={phone.name}
                          width={200}
                          height={300}
                          className="object-contain w-full h-full drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <Smartphone className="w-16 h-16 text-zinc-400 group-hover:scale-110 transition-transform duration-500" />
                      )}
                    </div>
                    <div className="flex flex-col flex-1 px-2 pb-2">
                      <h3 className="font-heading font-bold text-lg line-clamp-1 mb-1 group-hover:text-primary-600 transition-colors">{phone.name}</h3>
                      <p className="text-sm text-foreground/50 mb-3">{phone.storage} • {phone.brand}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="font-bold text-lg">₹{phone.price.toLocaleString()}</span>
                        <Link href={`/phones/${phone.id}`}><Button size="sm" variant="secondary" className="rounded-full">View</Button></Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" className="w-full">View All Phones</Button>
          </div>
        </div>
      </section>
      
      {/* Location Banner */}
      <section className="py-16 md:py-20 bg-primary-600 border-y-4 border-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-multiply"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="brutalist-card bg-primary-50 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-black">
              <h2 className="text-xl md:text-2xl font-heading font-bold mb-4 pixel-text">Visit Our Stores</h2>
              <p className="text-black/80 max-w-lg font-bold">Get hands-on with the latest tech or drop off your device for a quick repair.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-white flex-1 md:flex-none">
                <MapPin className="w-6 h-6 text-accent" />
                <div>
                  <p className="font-bold">Green Valley</p>
                  <p className="text-xs text-white/70">Main Market Area</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-white flex-1 md:flex-none">
                <MapPin className="w-6 h-6 text-accent" />
                <div>
                  <p className="font-bold">Law Gate</p>
                  <p className="text-xs text-white/70">University Road</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
