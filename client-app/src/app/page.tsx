"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, ShieldCheck, Zap, Smartphone, Wrench, Printer, MapPin, Loader2, Sparkles, User, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

const services = [
  {
    title: "Expert Mobile Repair",
    description: "Fast, reliable repairs with warranty for all major smartphone brands.",
    icon: Wrench,
    href: "/repairs",
  },
  {
    title: "Glass Replacement",
    description: "Affordable and seamless screen glass replacement without changing the display.",
    icon: Smartphone,
    href: "/glass-replacement",
  },
  {
    title: "Pro Printing Services",
    description: "High-quality document printing, lamination, and binding services.",
    icon: Printer,
    href: "/printing",
  },
];

const marqueeItems = [
  "Expert Mobile Repair",
  "Apple",
  "Glass Replacement",
  "Samsung",
  "Pro Printing Services",
  "OnePlus",
  "Premium Accessories",
  "Google Pixel",
  "Fast Service",
  "1 Year Warranty"
];

const heroWords = [
  { text: "Mobile Experience.", class: "text-gradient" },
  { text: "Digital Lifestyle.", class: "bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-400" },
  { text: "Tech Journey.", class: "bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400" },
  { text: "Smart World.", class: "bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500" },
];

const backgroundImages = [
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1601784551446-20c9e07cdbc3?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1592899677974-ec69c6fc29b7?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1585399000684-d2f72660f092?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1550009158-9ff16d7a7837?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1616077168079-7e09a6a38f4d?auto=format&fit=crop&w=1920&q=80",
];

export default function Home() {
  const [featuredPhones, setFeaturedPhones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % heroWords.length);
    }, 3000);
    
    const bgInterval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 1000);
    
    return () => {
      clearInterval(wordInterval);
      clearInterval(bgInterval);
    };
  }, []);

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
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-48 lg:pb-32">
        {/* Slideshow Background */}
        <div className="absolute inset-0 -z-10 bg-background overflow-hidden">
          <AnimatePresence>
            <motion.div
              key={currentBgIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundImages[currentBgIndex]})` }}
            />
          </AnimatePresence>
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-500/20 blur-[120px] mix-blend-normal"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[100px] mix-blend-normal"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 dark:opacity-10"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-foreground/80">Next-Gen Mobile Solutions</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-heading font-extrabold tracking-tight mb-4 sm:mb-6 leading-tight flex flex-col items-center"
            >
              <span>Upgrade Your</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`inline-block mt-2 ${heroWords[currentWordIndex].class}`}
                >
                  {heroWords[currentWordIndex].text}
                </motion.span>
              </AnimatePresence>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-foreground/70 mb-8 sm:mb-10 leading-relaxed max-w-2xl px-2"
            >
              The ultimate destination for premium smartphones, expert device repairs, and high-quality digital printing services.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Button size="lg" variant="gradient" className="gap-2 group w-full sm:w-auto">
                Explore Products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                <Wrench className="w-4 h-4" />
                Book a Repair
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
              className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full"
            >
              {[
                { title: "Same Day Repair", desc: "Quick turnaround", icon: Clock },
                { title: "Genuine Parts", desc: "100% original", icon: ShieldCheck },
                { title: "Expert Techs", desc: "Certified team", icon: Wrench },
                { title: "90-Day Warranty", desc: "Peace of mind", icon: Award },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 md:gap-4 glass-panel bg-white/70 dark:bg-zinc-900/60 p-3 sm:p-4 rounded-2xl text-left border-white/40 dark:border-white/10 hover:-translate-y-1 transition-transform cursor-default">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-400 shrink-0">
                    <feature.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm md:text-base leading-tight">{feature.title}</h3>
                    <p className="text-xs text-foreground/70 mt-1">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="w-full bg-primary-600 py-5 overflow-hidden flex border-y border-primary-500 shadow-inner relative z-10">
        <div className="flex animate-marquee whitespace-nowrap items-center w-max">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <div key={index} className="flex items-center mx-4 sm:mx-10">
              <span className="text-white font-heading font-bold text-sm sm:text-lg md:text-xl tracking-widest uppercase">
                {item}
              </span>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-accent opacity-80 ml-4 sm:ml-10" />
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-primary-50/30 dark:from-zinc-950 dark:to-primary-950/20">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-zinc-900 dark:text-white">Premium Services, <br className="hidden sm:block" />Delivered With Care.</h2>
            <p className="text-zinc-600 dark:text-zinc-300 text-lg">From the latest devices to expert repairs, we provide everything you need to stay connected.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link href={service.href} className="block h-full group">
                  <div className="h-full bg-white dark:bg-zinc-900/90 border border-primary-100 dark:border-primary-900/50 rounded-3xl p-8 shadow-xl shadow-primary-500/5 dark:shadow-primary-500/10 hover:shadow-2xl hover:shadow-primary-500/10 dark:hover:shadow-primary-500/20 transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:bg-primary-500/20 dark:group-hover:bg-primary-500/10"></div>
                    <div className="w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mb-6 shadow-sm border border-primary-100 dark:border-primary-800">
                      <service.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold mb-3 text-zinc-900 dark:text-white">{service.title}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-8">{service.description}</p>
                    <div className="flex items-center text-primary-600 dark:text-primary-400 font-bold mt-auto group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                      Explore Service <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Maa Sati Mobile Repairing Centre Promo */}
      <section className="py-20 relative overflow-hidden bg-primary-900 text-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-600/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto glass-panel bg-white/10 border-white/20 p-8 md:p-12 rounded-3xl backdrop-blur-md">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-white">Maa Sati Mobile Repairing Centre</h2>
              <p className="text-primary-100 text-lg md:text-xl font-medium">Hmare yaha sabhi company ka mobile repair hota hai</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 text-primary-50">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-accent mb-4 border-b border-white/10 pb-2">Brands We Repair</h3>
                <p className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-accent" /> Vivo, Oppo, Realme, Samsung</p>
                <p className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-accent" /> Techno, Itel, Infinix, and more...</p>
                
                <h3 className="text-xl font-bold text-accent mb-4 border-b border-white/10 pb-2 mt-8">Hardware Fixes</h3>
                <p className="flex items-center gap-2"><Wrench className="w-4 h-4 text-accent shrink-0" /> Folder & Display Change</p>
                <p className="flex items-center gap-2"><Wrench className="w-4 h-4 text-accent shrink-0" /> Dead Mobile Repair</p>
                <p className="flex items-center gap-2"><Wrench className="w-4 h-4 text-accent shrink-0" /> Network Problem Repair</p>
                <p className="flex items-center gap-2"><Wrench className="w-4 h-4 text-accent shrink-0" /> Charging Problem Fixes</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-accent mb-4 border-b border-white/10 pb-2">Components & Software</h3>
                <p className="flex items-start gap-2">
                  <Smartphone className="w-4 h-4 text-accent shrink-0 mt-1" /> 
                  <span>Mic, Speaker, Fingerprint sensor, Ringer, Backpanel, etc. thik kiya jata hai aur naya lagaya jata hai.</span>
                </p>
                <p className="flex items-center gap-2 mt-4"><Smartphone className="w-4 h-4 text-accent shrink-0" /> Software Update</p>
                <p className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-accent shrink-0" /> Mobile and Tablet Flashing</p>

                <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10 flex items-start gap-4">
                  <div className="p-3 bg-primary-600 rounded-xl">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-white">Visit Us At:</p>
                    <p className="text-primary-100">Green Valley BB Tower 1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Latest & Greatest</h2>
              <p className="text-foreground/70 max-w-2xl text-lg">Discover our handpicked selection of the most premium smartphones available today.</p>
            </div>
            <Link href="/phones">
              <Button variant="outline" className="hidden md:flex rounded-full">View All Phones</Button>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20 w-full">
              <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
            </div>
          ) : featuredPhones.length === 0 ? (
            <div className="text-center py-20 text-zinc-500 w-full glass-panel rounded-2xl">
              No featured phones available at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 w-full">
              {featuredPhones.map((phone, i) => (
                <motion.div
                  key={phone.id}
                  initial={{ opacity: 0, scale: 0.95, x: -40 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="group cursor-pointer h-full"
                >
                  <Link href={`/phones/${phone.id}`} className="block h-full">
                    <div className="glass-panel bg-white/60 dark:bg-slate-900/60 rounded-2xl p-3 sm:p-4 h-full flex flex-col relative transition-all duration-300 hover:shadow-xl hover:border-primary-500/30">
                      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-gradient-to-r from-accent to-primary-600 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-sm">New</div>
                      <div className="aspect-[4/5] rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50 mb-3 sm:mb-5 p-3 sm:p-6 flex items-center justify-center overflow-hidden">
                        {phone.imageUrl ? (
                          <Image
                            src={phone.imageUrl}
                            alt={phone.name}
                            width={200}
                            height={300}
                            className="object-contain w-full h-full drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <Smartphone className="w-16 h-16 text-zinc-300 group-hover:scale-110 transition-transform duration-500" />
                        )}
                      </div>
                      <div className="flex flex-col flex-1 px-2 pb-2">
                        <h3 className="font-heading font-bold text-lg line-clamp-1 mb-1 group-hover:text-primary-600 transition-colors">{phone.name}</h3>
                        <p className="text-sm text-foreground/50 mb-4">{phone.storage} • {phone.brand}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <span className="font-bold text-xl">₹{phone.price.toLocaleString()}</span>
                          <div className="w-8 h-8 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
          <div className="mt-10 text-center md:hidden">
            <Link href="/phones">
              <Button variant="outline" className="w-full rounded-full">View All Phones</Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Location Banner */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-slate-900 to-black -z-10"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/20 blur-[120px] -z-10 mix-blend-screen"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="glass-panel border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 premium-shadow">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="text-white text-center lg:text-left max-w-xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Premium Service Centers</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">Visit Our Stores</h2>
              <p className="text-white/70 text-lg">Get hands-on with the latest technology or drop off your device for a quick, professional repair at our conveniently located service centers.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto"
            >
              <div className="flex items-center gap-4 bg-white/10 hover:bg-white/15 transition-colors backdrop-blur-md px-6 py-5 rounded-2xl border border-white/10 text-white flex-1 lg:flex-none">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-bold text-lg">Green Valley</p>
                  <p className="text-sm text-white/60">Main Market Area</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/10 hover:bg-white/15 transition-colors backdrop-blur-md px-6 py-5 rounded-2xl border border-white/10 text-white flex-1 lg:flex-none">
                <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <p className="font-bold text-lg">Law Gate</p>
                  <p className="text-sm text-white/60">University Road</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
