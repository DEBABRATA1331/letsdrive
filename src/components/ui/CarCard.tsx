'use client';

import { motion } from 'framer-motion';
import { Fuel, Users, Gauge, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn, formatPrice } from '@/lib/utils';

interface CarCardProps {
  car: {
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
  };
  idx: number;
}

export function CarCard({ car, idx }: CarCardProps) {
  const imageUrl = car.images?.[0] || '/images/hero-car.png';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="group bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-xl flex flex-col hover:border-brand-neon/40 transition-all duration-500 shadow-2xl hover:shadow-brand-neon/20"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={car.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-brand-charcoal/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-bold text-white">{car.rating}</span>
        </div>
        <div className="absolute top-4 left-4 bg-brand-neon text-brand-charcoal px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
          {car.type}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-8 flex flex-1 flex-col">
        <div className="mb-6">
          <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold mb-1">{car.brand}</p>
          <h3 className="text-2xl font-black text-white group-hover:text-brand-neon transition-colors leading-tight">{car.name}</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-2 text-white/50 bg-white/5 rounded-2xl p-3 border border-white/5 group-hover:border-white/10 transition-colors">
            <Fuel size={16} className="text-brand-neon" />
            <span className="text-xs font-medium">{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-2 text-white/50 bg-white/5 rounded-2xl p-3 border border-white/5 group-hover:border-white/10 transition-colors">
            <Gauge size={16} className="text-brand-neon" />
            <span className="text-xs font-medium">{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2 text-white/50 bg-white/5 rounded-2xl p-3 border border-white/5 group-hover:border-white/10 transition-colors col-span-2">
            <Users size={16} className="text-brand-neon" />
            <span className="text-xs font-medium">{car.seatingCapacity} Seater</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/10">
          <div>
            <p className="text-white/30 text-[10px] uppercase tracking-widest leading-none mb-1">Price / Day</p>
            <p className="text-xl font-black text-brand-neon">
              {formatPrice(car.pricePerDay)}
            </p>
          </div>
          <Link href={`/booking?carId=${car._id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-neon hover:text-brand-charcoal transition-all border border-white/10 group-hover:border-brand-neon/50"
            >
              <ArrowRight size={20} />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
