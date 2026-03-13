'use client';

import * as React from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Zap, Shield, Star } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  // 3D Interaction Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), { damping: 20, stiffness: 100 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { damping: 20, stiffness: 100 });

  function handleMouseMove(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 -z-10 bg-[#050505]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f1a_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f1a_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-neon/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-teal/10 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Content */}
        <motion.div
          style={{ opacity, scale }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-neon text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-neon opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-neon"></span>
            </span>
            Drive the Future Today
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.8] mb-8 tracking-tighter italic uppercase">
            Let's <br />
            <span className="text-brand-neon">Drive</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/40 mb-12 max-w-xl leading-relaxed italic font-medium">
            The world's first <span className="text-white">completely autonomous</span> premium car rental ecosystem. 
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <Link href="/fleet" className="group relative bg-brand-neon text-brand-charcoal px-12 py-6 rounded-2xl font-black text-xl hover:bg-white transition-all duration-500 shadow-[0_20px_50px_rgba(124,255,0,0.3)] hover:-translate-y-1">
              Explore Fleet
              <div className="absolute inset-0 rounded-2xl border-2 border-brand-neon animate-pulse group-hover:scale-110" />
            </Link>
            <Link href="/booking" className="flex items-center justify-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-white/10 transition-all duration-500">
              Quick Book
            </Link>
          </div>
        </motion.div>

        {/* 3D Interactive Car Container */}
        <div className="relative h-[400px] md:h-[600px] mt-10 md:mt-0 flex items-center justify-center perspective-[2000px]">
          <motion.div
            style={{ 
              rotateX, 
              rotateY,
              transformStyle: "preserve-3d"
            }}
            className="relative w-full max-w-lg aspect-[16/10] bg-white/[0.03] border border-white/10 rounded-[3rem] md:rounded-[4rem] group"
          >
            {/* 3D Layer 1: Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-neon/20 via-transparent to-brand-teal/20 blur-3xl opacity-50 translate-z-[-50px]" />
            
            {/* 3D Layer 2: The Main Image */}
            <div className="absolute inset-4 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-white/5 translate-z-[20px]">
              <div className="absolute inset-0 bg-[url('/images/hero-car.png')] bg-cover bg-center brightness-75 transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent" />
            </div>

            {/* 3D Layer 3: Floating Stats */}
            <motion.div 
              style={{ translateZ: 100 }}
              className="absolute -top-5 -right-2 md:-top-10 md:-right-10 bg-black/60 backdrop-blur-3xl border border-white/10 p-4 md:p-6 rounded-2xl md:rounded-[2.5rem] shadow-3xl scale-75 md:scale-100 origin-bottom-left"
            >
               <Zap className="text-brand-neon mb-1 md:mb-2" size={24} />
               <p className="text-xl md:text-2xl font-black text-white italic tracking-tighter">1.99s</p>
               <p className="text-[8px] md:text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none">0-60 MPH</p>
            </motion.div>

            <motion.div 
              style={{ translateZ: 80 }}
              className="absolute -bottom-5 -left-2 md:-bottom-10 md:-left-10 bg-brand-neon p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] shadow-[0_20px_60px_rgba(124,255,0,0.4)] scale-75 md:scale-100 origin-top-right"
            >
               <Shield className="text-brand-charcoal mb-1 md:mb-2" size={24} />
               <p className="text-xl md:text-2xl font-black text-brand-charcoal italic tracking-tighter">Safe</p>
               <p className="text-[8px] md:text-[10px] font-black text-brand-charcoal/40 uppercase tracking-widest leading-none">Full Autonomy</p>
            </motion.div>

            {/* 3D Layer 4: Glass UI Element */}
            <motion.div 
              style={{ translateZ: 150 }}
              className="absolute top-1/2 left-[-20%] -translate-y-1/2 p-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl hidden md:block"
            >
               <div className="flex items-center gap-1 mb-2">
                 {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#7CFF00" className="text-brand-neon" />)}
               </div>
               <p className="text-xs font-bold text-white italic">"Absolute perfection."</p>
               <p className="text-[10px] text-white/40 mt-1 uppercase tracking-widest font-bold">— Elon M.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-1 h-12 rounded-full bg-white/5 relative overflow-hidden">
           <motion.div 
             animate={{ top: ["-100%", "100%"] }}
             transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
             className="absolute inset-0 bg-brand-neon" 
           />
        </div>
      </motion.div>
    </section>
  );
}
