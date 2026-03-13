'use client';

import * as React from 'react';
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Features } from "@/components/sections/Features";
import { CarCard } from "@/components/ui/CarCard";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const dynamic = 'force-dynamic';

interface Car {
  _id: string;
  name: string;
  brand: string;
  type: string;
  pricePerDay: number;
  fuelType: string;
  transmission: string;
  seatingCapacity: number;
  rating: number;
  images: string[];
}

export default function Home() {
  const [featuredCars, setFeaturedCars] = React.useState<Car[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('/api/cars');
        const data = await res.json();
        setFeaturedCars(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching featured cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="bg-brand-charcoal overflow-hidden">
      <Hero />
      <Stats />
      <Features />
      
      {/* Featured Fleet Section */}
      <section className="py-20 bg-brand-charcoal">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-12 uppercase italic tracking-tighter">
              Featured <span className="text-brand-neon">Fleet</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {loading ? (
                    [1, 2, 3].map((i) => (
                        <div key={i} className="aspect-[16/10] bg-white/5 border border-white/10 rounded-[2rem] animate-pulse" />
                    ))
                ) : (
                    featuredCars.map((car, idx) => (
                        <CarCard key={car._id} car={car} idx={idx} />
                    ))
                )}
            </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-24 relative overflow-hidden bg-brand-neon">
         <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-[3rem] overflow-hidden border-8 border-brand-charcoal/5 shadow-2xl order-2 lg:order-1"
            >
                <Image 
                    src="/images/about-story.png"
                    alt="Our Journey"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/40 to-transparent" />
            </motion.div>

            <div className="text-left order-1 lg:order-2">
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-charcoal/10 border border-brand-charcoal/20 text-brand-charcoal text-[10px] font-black uppercase tracking-widest">
                      Beyond Driving
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-brand-charcoal mb-6 uppercase tracking-tight italic leading-[0.9]">
                      Our <br /> <span className="text-white drop-shadow-md">Legacy</span>
                    </h2>
                    <p className="text-brand-charcoal/80 text-lg md:text-xl max-w-lg font-medium leading-relaxed">
                      We didn't just build a rental service; we engineered a movement. Discover the passion, technology, and vision behind the world's first autonomous elite fleet.
                    </p>
                    <Link href="/about" className="inline-flex items-center gap-4 bg-brand-charcoal text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white hover:text-brand-charcoal transition-all duration-500 shadow-xl group">
                        Explore Our Story
                        <motion.span 
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            →
                        </motion.span>
                    </Link>
                </motion.div>
            </div>
         </div>
      </section>
    </div>
  );
}
