'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye,
  CheckCircle2,
  XCircle,
  Car as CarIcon
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

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
  isAvailable: boolean;
}

export default function AdminFleet() {
  const [cars, setCars] = React.useState<Car[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');

  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/cars');
      const data = await res.json();
      setCars(data);
    } catch (err) {
      toast.error("Failed to load fleet");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this vehicle from the fleet?")) return;
    
    try {
      // Assuming a DELETE method on /api/cars/[id] or similar
      // For now, let's simulate
      setCars(prev => prev.filter(c => c._id !== id));
      toast.success("Vehicle removed successfully");
    } catch (err) {
      toast.error("Deletion failed");
    }
  };

  const filteredCars = cars.filter(car => 
    car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex justify-between items-end">
         <div>
            <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-2">Manage <span className="text-brand-neon">Fleet</span></h1>
            <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Total: {cars.length} premium vehicles</p>
         </div>
         <button className="bg-brand-neon text-brand-charcoal px-8 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-2 hover:bg-brand-lime transition-all shadow-xl shadow-brand-neon/20">
            <Plus size={20} /> Add New Vehicle
         </button>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
         <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input 
              type="text" 
              placeholder="Search by brand or model..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-14 py-4 text-sm focus:border-brand-neon outline-none transition-all"
            />
         </div>
         <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 border border-white/10 px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
               <Filter size={16} /> Filter
            </button>
            <select className="flex-1 md:flex-none bg-white/5 border border-white/10 px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest text-white/40 focus:outline-none focus:border-brand-neon appearance-none">
               <option>Sort: Latest First</option>
               <option>Price: Low to High</option>
               <option>Price: High to Low</option>
            </select>
         </div>
      </div>

      {/* Fleet Table/Grid */}
      <div className="bg-white/[0.03] border border-white/5 rounded-[3rem] overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-white/5">
                     <th className="px-10 py-8 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Vehicle Details</th>
                     <th className="px-10 py-8 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Category</th>
                     <th className="px-10 py-8 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Price / Day</th>
                     <th className="px-10 py-8 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Status</th>
                     <th className="px-10 py-8 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {loading ? (
                    [1,2,3,4,5].map(i => (
                      <tr key={i} className="animate-pulse">
                         <td colSpan={5} className="px-10 py-8"><div className="h-12 bg-white/5 rounded-2xl w-full" /></td>
                      </tr>
                    ))
                  ) : filteredCars.map((car) => (
                    <motion.tr 
                      key={car._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="group hover:bg-white/[0.02] transition-colors"
                    >
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-6">
                             <div className="w-24 aspect-[16/10] bg-white/5 rounded-xl border border-white/10 overflow-hidden relative shadow-lg">
                                <Image src={car.images[0]} alt={car.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                             </div>
                             <div>
                                <h4 className="font-black text-white italic uppercase tracking-tighter leading-none mb-1">{car.name}</h4>
                                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{car.brand} • {car.fuelType}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <span className="px-4 py-1.5 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-brand-neon text-[10px] font-black uppercase tracking-widest">
                             {car.type}
                          </span>
                       </td>
                       <td className="px-10 py-8">
                          <span className="text-lg font-black text-white italic">{formatPrice(car.pricePerDay)}</span>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-2">
                             <div className={cn("w-2 h-2 rounded-full shadow-lg", car.isAvailable !== false ? "bg-brand-neon shadow-brand-neon/50" : "bg-red-500 shadow-red-500/50")} />
                             <span className={cn("text-xs font-bold uppercase tracking-widest", car.isAvailable !== false ? "text-brand-neon" : "text-red-500")}>
                                {car.isAvailable !== false ? "Available" : "On Trip"}
                             </span>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex items-center justify-end gap-3 text-white/20">
                             <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all">
                                <Eye size={18} />
                             </button>
                             <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 hover:text-brand-neon transition-all">
                                <Edit2 size={18} />
                             </button>
                             <button 
                               onClick={() => handleDelete(car._id)}
                               className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-red-500/10 hover:text-red-500 transition-all"
                             >
                                <Trash2 size={18} />
                             </button>
                          </div>
                       </td>
                    </motion.tr>
                  ))}
               </tbody>
            </table>
         </div>
         {!loading && filteredCars.length === 0 && (
           <div className="py-20 text-center">
              <CarIcon className="mx-auto text-white/5 mb-6" size={64} />
              <h3 className="text-xl font-bold text-white mb-2">No vehicles found</h3>
              <p className="text-white/20 text-sm">Try adjusting your search or filters.</p>
           </div>
         )}
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
