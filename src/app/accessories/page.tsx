import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const accessories = [
  { id: 1, name: "Wireless Earbuds Pro", category: "Audio", price: 4999, image: "/images/pixel_earbuds.png" },
  { id: 2, name: "Fast Charger 65W", category: "Power", price: 1499, image: "/images/pixel_charger.png" },
  { id: 3, name: "Premium Leather Case", category: "Protection", price: 999, image: "/images/pixel_case.png" },
  { id: 4, name: "Tempered Glass Shield", category: "Protection", price: 499, image: "/images/pixel_glass.png" },
  { id: 5, name: "Power Bank 20000mAh", category: "Power", price: 2499, image: "/images/pixel_powerbank.png" },
];

export default function AccessoriesPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8 pixel-text">Premium Accessories</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {accessories.map((item) => (
          <div key={item.id} className="brutalist-card p-6 bg-white flex flex-col h-full hover:-translate-y-1 transition-transform group">
            <div className="w-full aspect-square border-4 border-black bg-primary-50 mb-4 flex items-center justify-center overflow-hidden">
              <Image 
                src={item.image} 
                alt={item.name}
                width={200}
                height={200}
                className="w-full h-full object-contain pixel-text group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="font-heading font-bold text-lg mb-1">{item.name}</h3>
              <p className="text-sm font-bold mb-4 uppercase tracking-wider">{item.category}</p>
              <div className="mt-auto flex items-center justify-between">
                <span className="font-bold text-lg">₹{item.price.toLocaleString()}</span>
                <Link href="/checkout"><Button size="sm" variant="default" className="shadow-none">Buy</Button></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
