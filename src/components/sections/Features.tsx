'use client';

import { motion } from 'framer-motion';
import { Search, CalendarCheck, ShieldCheck, Key } from 'lucide-react';

const features = [
  {
    title: 'Easy Search',
    description: 'Find your perfect ride from our extensive collection of premium vehicles.',
    icon: Search,
  },
  {
    title: 'Fast Booking',
    description: 'Book your dream car in just a few clicks with our smart booking system.',
    icon: CalendarCheck,
  },
  {
    title: 'Secure & Reliable',
    description: 'Every ride is protected and maintained to the highest safety standards.',
    icon: ShieldCheck,
  },
  {
    title: 'Pick Up & Drive',
    description: 'Get your keys and start your journey instantly from your nearest location.',
    icon: Key,
  },
];

export function Features() {
  return (
    <section className="py-32 bg-brand-charcoal relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-6 uppercase italic tracking-tighter"
          >
            How it <span className="text-brand-neon">Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg"
          >
            Getting behind the wheel of your dream car has never been simpler. Follow these easy steps to start your adventure.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-16 h-16 rounded-2xl bg-brand-neon flex items-center justify-center mb-8 shadow-lg shadow-brand-neon/20 group-hover:rotate-6 transition-transform">
                <feature.icon className="text-brand-charcoal" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-neon transition-colors">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
