'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Grid, List, X } from 'lucide-react';
import { CarCard } from '@/components/ui/CarCard';
import { cn } from '@/lib/utils';

const carTypes = ['All', 'Luxury', 'SUV', 'Sedan', 'Sport', 'Electric', 'Convertible'];

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

export default function FleetPage() {
  const [cars, setCars] = React.useState<Car[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [activeType, setActiveType] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const url = activeType === 'All' 
          ? '/api/cars' 
          : `/api/cars?type=${activeType}`;
        const res = await fetch(url);
        const data = await res.json();
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [activeType]);

  const filteredCars = cars.filter(car => 
    car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen pt-32 pb-20 bg-brand-charcoal overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-brand-neon text-[10px] font-black uppercase tracking-widest mb-6"
            >
              Ultimate Collection
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none"
            >
              Explore Our <br />
              <span className="text-brand-neon">Elite Fleet</span>
            </motion.h1>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full lg:w-[400px]"
          >
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30" size={20} />
            <input
              type="text"
              placeholder="Search by brand or model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full px-16 py-5 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-neon/50 transition-all font-medium backdrop-blur-md"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                <X size={20} />
              </button>
            )}
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center gap-3 mb-12"
        >
          {carTypes.map((type: string) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={cn(
                "px-8 py-3 rounded-full text-sm font-bold border transition-all duration-300",
                activeType === type
                  ? "bg-brand-neon border-brand-neon text-brand-charcoal shadow-lg shadow-brand-neon/20"
                  : "bg-white/5 border-white/10 text-white/50 hover:border-white/20 hover:text-white"
              )}
            >
              {type}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[16/20] bg-white/5 border border-white/10 rounded-[2.5rem] animate-pulse" />
              ))}
            </motion.div>
          ) : filteredCars.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCars.map((car, idx) => (
                <CarCard key={car._id} car={car} idx={idx} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-40 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                <Search className="text-white/20" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Cars Found</h3>
              <p className="text-white/40">Try adjusting your filters or search query.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
