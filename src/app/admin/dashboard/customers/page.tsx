'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Phone, Calendar, MoreVertical, Search, Filter } from 'lucide-react';

const customers = [
  { id: 'C-001', name: 'Amit Sharma', email: 'amit@example.com', bookings: 5, totalSpent: '₹4,50,000', joined: 'Jan 2024' },
  { id: 'C-002', name: 'Rahul V.', email: 'rahul@example.com', bookings: 2, totalSpent: '₹1,20,000', joined: 'Feb 2024' },
  { id: 'C-003', name: 'Sneha P.', email: 'sneha@example.com', bookings: 1, totalSpent: '₹45,000', joined: 'Mar 2024' },
  { id: 'C-004', name: 'Vikram S.', email: 'vikram@example.com', bookings: 8, totalSpent: '₹9,80,000', joined: 'Jan 2024' },
];

export default function AdminCustomers() {
  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
         <div>
            <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-2">Customer <span className="text-brand-neon">Directory</span></h1>
            <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Total: 1,204 registered users</p>
         </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
         <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email, or ID..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-14 py-4 text-sm focus:border-brand-neon outline-none transition-all"
            />
         </div>
      </div>

      <div className="bg-white/[0.03] border border-white/5 rounded-[3rem] overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-white/5">
                     <th className="px-10 py-8 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Customer Name</th>
                     <th className="px-10 py-8 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Contact</th>
                     <th className="px-10 py-8 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Bookings</th>
                     <th className="px-10 py-8 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Total Value</th>
                     <th className="px-10 py-8 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {customers.map((c) => (
                    <motion.tr 
                      key={c.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="group hover:bg-white/[0.02] transition-colors"
                    >
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-brand-neon/10 flex items-center justify-center font-black text-brand-neon">
                                {c.name.charAt(0)}
                             </div>
                             <div>
                                <h4 className="font-bold text-white mb-0.5">{c.name}</h4>
                                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">ID: {c.id} • Joined {c.joined}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="space-y-1">
                             <p className="text-xs text-white/60 flex items-center gap-2 font-medium">
                                <Mail size={12} className="text-brand-neon" /> {c.email}
                             </p>
                          </div>
                       </td>
                       <td className="px-10 py-8 text-sm font-bold text-white">
                          {c.bookings} Reservations
                       </td>
                       <td className="px-10 py-8">
                          <span className="text-sm font-black text-brand-neon italic">{c.totalSpent}</span>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex justify-end">
                             <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 text-white/20 hover:text-white transition-all">
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
