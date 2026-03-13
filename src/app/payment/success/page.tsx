'use client';

import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle, Calendar, MapPin, ArrowRight, Download } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <main className="min-h-screen bg-brand-charcoal flex items-center justify-center pt-32 pb-20 px-6">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-brand-neon/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-[3rem] p-12 backdrop-blur-2xl shadow-3xl text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.2 }}
          className="w-24 h-24 bg-brand-neon rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-brand-neon/40"
        >
          <CheckCircle size={48} className="text-brand-charcoal" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-4">
          Booking <span className="text-brand-neon">Confirmed!</span>
        </h1>
        <p className="text-white/50 text-lg mb-12">
          Your adventure with LET'S DRIVE is all set. We've sent the confirmation details to your email.
        </p>

        <div className="bg-white/5 rounded-3xl p-8 border border-white/5 mb-12 text-left space-y-6">
           <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-white/30 text-xs font-bold uppercase tracking-widest">Transaction ID</span>
              <span className="text-white font-mono text-sm">{sessionId?.slice(0, 20)}...</span>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                 <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                   <MapPin size={12} className="text-brand-neon" /> Delivery Location
                 </p>
                 <p className="text-white font-bold">Main City Airport, Terminal 2</p>
              </div>
              <div className="space-y-1">
                 <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                   <Calendar size={12} className="text-brand-neon" /> Pick-up Time
                 </p>
                 <p className="text-white font-bold">Tomorrow, 10:00 AM</p>
              </div>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="bg-brand-neon text-brand-charcoal px-8 py-4 rounded-full font-black flex items-center justify-center gap-2 hover:bg-brand-lime transition-all shadow-xl shadow-brand-neon/20">
            Go to Home <ArrowRight size={20} />
          </Link>
          <button className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-black flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
            Download Invoice <Download size={20} />
          </button>
        </div>
      </motion.div>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-brand-charcoal flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-brand-neon animate-spin" />
      </div>
    }>
      <PaymentSuccessContent />
    </React.Suspense>
  );
}
