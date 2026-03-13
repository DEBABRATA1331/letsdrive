'use client';

import { motion } from 'framer-motion';
import { PhoneCall } from 'lucide-react';
import Link from 'next/link';

export function EmergencyButton() {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      className="fixed bottom-24 right-6 z-40"
    >
      <Link href="/emergency">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center gap-3 bg-red-600 text-white px-4 py-3 rounded-full shadow-2xl shadow-red-600/40 border border-red-500/50 backdrop-blur-md"
        >
          <div className="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-20 pointer-events-none" />
          <PhoneCall size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="font-bold text-sm hidden md:block">Emergency Help</span>
        </motion.button>
      </Link>
    </motion.div>
  );
}
