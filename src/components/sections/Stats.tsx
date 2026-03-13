'use client';

import { motion } from 'framer-motion';
import { Users, Car, MapPin, Star } from 'lucide-react';

const stats = [
  { label: 'Vehicles Available', value: '500+', icon: Car },
  { label: 'Cities Served', value: '50+', icon: MapPin },
  { label: 'Happy Customers', value: '12k+', icon: Users },
  { label: 'Average Rating', value: '4.9/5', icon: Star },
];

export function Stats() {
  return (
    <section className="py-20 bg-brand-charcoal relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-brand-neon/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-neon/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <stat.icon className="text-brand-neon" size={24} />
              </div>
              <h3 className="text-4xl font-black text-white mb-2 tracking-tighter">{stat.value}</h3>
              <p className="text-white/40 text-sm font-medium uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
