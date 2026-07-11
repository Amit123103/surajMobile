import Link from "next/link";
import { Wrench } from "lucide-react";
import { Button } from "@/components/ui/Button";

const repairs = [
  { id: 1, name: "Screen Replacement", time: "1-2 Hours", price: "Starts at ₹1999" },
  { id: 2, name: "Battery Replacement", time: "30 Mins", price: "Starts at ₹999" },
  { id: 3, name: "Charging Port Repair", time: "1 Hour", price: "Starts at ₹799" },
  { id: 4, name: "Software Update & Unlock", time: "1-2 Hours", price: "Starts at ₹499" },
];

export default function RepairsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Mobile Repairs</h1>
        <p className="text-lg text-foreground/70">Expert repairs with genuine parts and up to 1-year warranty.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {repairs.map((repair) => (
          <div key={repair.id} className="glass-card p-6 md:p-8 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-primary-500/50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-primary-600 shrink-0">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl mb-1">{repair.name}</h3>
                <p className="text-sm text-foreground/60 mb-2">Est. Time: {repair.time}</p>
                <p className="font-bold text-lg text-primary-600">{repair.price}</p>
              </div>
            </div>
            <Link href="/checkout" className="shrink-0">
              <Button className="w-full sm:w-auto">Book Repair</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
