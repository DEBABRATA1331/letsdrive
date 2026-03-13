'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Car, 
  CalendarCheck, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  Activity
} from 'lucide-react';
import { formatPrice, cn } from '@/lib/utils';

const stats = [
  { label: 'Total Revenue', value: '₹1,24,500', icon: TrendingUp, change: '+12.5%', isUp: true },
  { label: 'Active Bookings', value: '42', icon: CalendarCheck, change: '+5.2%', isUp: true },
  { label: 'Fleet Status', value: '85%', icon: Car, change: '-2.1%', isUp: false },
  { label: 'New Customers', value: '12', icon: Users, change: '+18.7%', isUp: true },
];

export default function AdminOverview() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex justify-between items-end">
         <div>
            <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-2">Dashboard <span className="text-brand-neon">Overview</span></h1>
            <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Real-time performance analytics</p>
         </div>
         <div className="flex gap-4">
            <button className="bg-white/5 border border-white/10 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">Download Report</button>
            <button className="bg-brand-neon text-brand-charcoal px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-brand-lime transition-all shadow-xl shadow-brand-neon/20">+ Add Car</button>
         </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {stats.map((stat, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: i * 0.1 }}
             className="bg-white/[0.03] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group"
           >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-start mb-6">
                 <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-brand-neon transition-colors">
                    <stat.icon className="text-brand-neon" size={24} />
                 </div>
                 <div className={cn(
                   "flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full",
                   stat.isUp ? "text-brand-neon bg-brand-neon/10" : "text-red-500 bg-red-500/10"
                 )}>
                    {stat.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {stat.change}
                 </div>
              </div>
              <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-white italic tracking-tighter">{stat.value}</h3>
           </motion.div>
         ))}
      </div>

      {/* Chart & Activity Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Recent Analytics */}
         <div className="lg:col-span-2 bg-white/[0.03] border border-white/5 rounded-[3rem] p-10">
            <div className="flex justify-between items-center mb-10">
               <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <Activity className="text-brand-neon" /> Revenue Trends
               </h3>
               <select className="bg-white/5 border border-white/10 text-xs font-bold text-white/40 px-4 py-2 rounded-xl focus:outline-none focus:border-brand-neon transition-all">
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Yearly</option>
               </select>
            </div>
            
            {/* Visual Placeholder for Chart */}
            <div className="h-64 flex items-end justify-between gap-4 px-4 border-b border-white/5">
               {Array.from({ length: 12 }).map((_, i) => (
                 <motion.div 
                   key={i}
                   initial={{ height: 0 }}
                   animate={{ height: `${Math.random() * 80 + 20}%` }}
                   className="flex-1 bg-gradient-to-t from-brand-neon/40 to-brand-neon rounded-t-lg relative group cursor-pointer"
                 >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-brand-charcoal px-2 py-1 rounded-md text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity">
                       ₹{Math.floor(Math.random() * 10000)}
                    </div>
                 </motion.div>
               ))}
            </div>
            <div className="flex justify-between mt-6 px-2">
               {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                 <span key={m} className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{m}</span>
               ))}
            </div>
         </div>

         {/* Recent Bookings Sidebar */}
         <div className="bg-white/[0.03] border border-white/5 rounded-[3rem] p-10">
            <h3 className="text-xl font-bold text-white mb-8">Recent Bookings</h3>
            <div className="space-y-6">
               {[
                 { name: 'Tesla Model S Plaid', user: 'Amit Sharma', date: 'Just now', price: '₹12,000' },
                 { name: 'Porsche 911 GT3', user: 'Rahul V.', date: '2h ago', price: '₹25,000' },
                 { name: 'Land Rover Defender', user: 'Vikram S.', date: '5h ago', price: '₹18,000' },
                 { name: 'Audi RS e-tron GT', user: 'Sneha P.', date: '1d ago', price: '₹15,000' },
               ].map((item, i) => (
                 <div key={i} className="flex justify-between items-center group">
                    <div className="flex gap-4">
                       <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          <Car size={18} className="text-white/20 group-hover:text-brand-neon transition-colors" />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-white leading-none mb-1">{item.name}</p>
                          <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{item.user} • {item.date}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-xs font-black text-brand-neon">{item.price}</p>
                    </div>
                 </div>
               ))}
            </div>
            <button className="w-full mt-10 text-xs font-black text-white/20 hover:text-white uppercase tracking-widest transition-all">View All Bookings</button>
         </div>
      </div>
    </div>
  );
}

