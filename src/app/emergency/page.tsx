'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, MessageSquare, AlertTriangle, ShieldCheck, Zap, Share2, Navigation } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function EmergencyPage() {
  const [sharingLocation, setSharingLocation] = React.useState(false);

  const handleShareLocation = () => {
    setSharingLocation(true);
    setTimeout(() => {
       toast.success("Location shared with emergency teams!");
       setSharingLocation(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen pt-32 pb-20 bg-brand-charcoal overflow-hidden relative">
      <div className="absolute inset-0 -z-10">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.05)_0%,transparent_70%)] animate-pulse" />
      </div>

      <div className="container mx-auto px-6">
        {/* Urgent Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-red-600/10 border border-red-600/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce"
          >
             <AlertTriangle className="text-red-600" size={40} />
          </motion.div>
          <motion.h1
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter mb-6"
          >
            Emergency <span className="text-red-600">Support</span>
          </motion.h1>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-white/50 text-xl"
          >
            Your safety is our priority. Our 24/7 Roadside Assistance team is ready to help wherever you are.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {/* Main Action Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white/5 border border-white/10 rounded-[3rem] p-12 backdrop-blur-2xl relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[100px] rounded-full" />
             
             <div className="relative z-10">
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-8">Quick Assistance</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                   <a 
                     href="tel:+1800-DRIVE-SAFE" 
                     className="group flex flex-col items-center justify-center p-10 bg-red-600 rounded-3xl text-center hover:bg-red-700 transition-all shadow-xl shadow-red-600/20"
                   >
                      <Phone className="mb-4 group-hover:rotate-12 transition-transform" size={40} />
                      <span className="text-2xl font-black uppercase tracking-tighter">Call Now</span>
                      <span className="text-sm font-bold opacity-70 mt-1">1-800-DRIVE-SAFE</span>
                   </a>
                   <button 
                     onClick={handleShareLocation}
                     disabled={sharingLocation}
                     className="group flex flex-col items-center justify-center p-10 bg-white/5 border border-white/10 rounded-3xl text-center hover:bg-white/10 transition-all disabled:opacity-50"
                   >
                      <Share2 className={cn("mb-4 text-brand-neon", sharingLocation && "animate-spin")} size={40} />
                      <span className="text-2xl font-black uppercase tracking-tighter text-white">Share Location</span>
                      <span className="text-sm font-bold text-white/40 mt-1">Send GPS coordinates</span>
                   </button>
                </div>

                <div className="space-y-6">
                   <h3 className="text-xl font-bold text-white">Roadside Services Included:</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { icon: ShieldCheck, text: '24/7 Towing Service' },
                        { icon: Zap, text: 'Battery Jumpstart' },
                        { icon: MapPin, text: 'Flat Tire Change' },
                        { icon: Navigation, text: 'Fuel Delivery' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                           <item.icon className="text-brand-neon" size={20} />
                           <span className="text-white font-medium">{item.text}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </motion.div>

          {/* Sidebar Info */}
          <motion.div
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             className="space-y-8"
          >
             <div className="bg-brand-neon p-8 rounded-[2.5rem] text-brand-charcoal">
                <MessageSquare className="mb-4" size={32} />
                <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4 leading-none">Live Chat Support</h3>
                <p className="font-bold opacity-70 mb-8">Our agents are online to help you with immediate technical support.</p>
                <button className="w-full bg-brand-charcoal text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform">
                   Start Chat
                </button>
             </div>

             <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
                <h3 className="text-xl font-bold text-white mb-6">Emergency Checklist</h3>
                <ul className="space-y-4">
                   {[
                     'Move vehicle to a safe spot if possible',
                     'Turn on hazard lights',
                     'Contact our support via the app or call',
                     'Stay inside the vehicle in high traffic areas',
                   ].map((text, i) => (
                     <li key={i} className="flex items-start gap-3 text-sm text-white/40">
                        <div className="w-5 h-5 rounded-full bg-red-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                           <div className="w-2 h-2 rounded-full bg-red-600" />
                        </div>
                        {text}
                     </li>
                   ))}
                </ul>
             </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
