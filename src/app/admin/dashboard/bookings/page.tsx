'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  User, 
  Clock, 
  MapPin, 
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
  CreditCard,
  Search,
  Filter
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const bookings = [
  { id: 'BK-9021', car: 'Tesla Model S Plaid', user: 'Amit Sharma', date: 'Oct 24 - Oct 28', status: 'Active', amount: '₹1,44,000', payment: 'Paid' },
  { id: 'BK-8842', car: 'Porsche 911 GT3', user: 'Rajiv Malhotra', date: 'Oct 25 - Oct 26', status: 'Pending', amount: '₹2,50,000', payment: 'Unpaid' },
  { id: 'BK-7751', car: 'Range Rover Sport', user: 'Sanya Mirza', date: 'Oct 20 - Oct 22', status: 'Completed', amount: '₹88,000', payment: 'Paid' },
  { id: 'BK-6632', car: 'Audi RS e-tron GT', user: 'Kevin Peterson', date: 'Oct 22 - Oct 25', status: 'Cancelled', amount: '₹1,20,000', payment: 'Refunded' },
];

export default function AdminBookings() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-brand-neon bg-brand-neon/10 border-brand-neon/20';
      case 'Completed': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Cancelled': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-white/40 bg-white/5 border-white/10';
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex justify-between items-end">
         <div>
            <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-2">Bookings <span className="text-brand-neon">History</span></h1>
            <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Managing 152 total reservations</p>
         </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
         <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input 
              type="text" 
              placeholder="Search by ID, car, or customer..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-14 py-4 text-sm focus:border-brand-neon outline-none transition-all"
            />
         </div>
         <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
               <Filter size={16} /> Filter
            </button>
            <button className="bg-white/5 border border-white/10 px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">Export CSV</button>
         </div>
      </div>

      {/* Bookings List */}
      <div className="bg-white/[0.03] border border-white/5 rounded-[3rem] overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-white/5">
                     <th className="px-10 py-8 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Booking ID</th>
                     <th className="px-10 py-8 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Vehicle & Customer</th>
                     <th className="px-10 py-8 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Rental Period</th>
                     <th className="px-10 py-8 text-[10px) font-black text-white/20 uppercase tracking-[0.2em]">Total Amount</th>
                     <th className="px-10 py-8 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Status</th>
                     <th className="px-10 py-8 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] text-right">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {bookings.map((booking) => (
                    <motion.tr 
                      key={booking.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="group hover:bg-white/[0.02] transition-colors"
                    >
                       <td className="px-10 py-8">
                          <span className="text-sm font-black text-white/40 font-mono">{booking.id}</span>
                       </td>
                       <td className="px-10 py-8">
                          <div>
                             <h4 className="font-bold text-white mb-1">{booking.car}</h4>
                             <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest flex items-center gap-1">
                                <User size={10} className="text-brand-neon" /> {booking.user}
                             </p>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-2 text-white/60">
                             <Calendar size={14} className="text-brand-neon" />
                             <span className="text-xs font-bold">{booking.date}</span>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex flex-col">
                             <span className="text-sm font-black text-white italic">{booking.amount}</span>
                             <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{booking.payment}</span>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <span className={cn(
                            "px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest",
                            getStatusColor(booking.status)
                          )}>
                             {booking.status}
                          </span>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex items-center justify-end text-white/20">
                             <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all">
                                <MoreVertical size={18} />
                             </button>
                          </div>
                       </td>
                    </motion.tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
