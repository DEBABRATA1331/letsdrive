'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Shield, Award, Users, Car } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const timeline = [
  { year: '2018', title: 'The Spark', description: 'Founded with a vision to redefine travel freedom.' },
  { year: '2020', title: 'Elite Expansion', description: 'Launched our premium fleet focusing on luxury and performance.' },
  { year: '2022', title: 'Digital First', description: 'Fully automated booking system and AI integration.' },
  { year: '2024', title: 'Global Reach', description: 'Now serving 50+ cities with over 500 premium vehicles.' },
];

const values = [
  { title: 'Premium Quality', icon: Award, desc: 'We only offer top-tier, well-maintained vehicles.' },
  { title: 'User First', icon: Users, desc: 'Your comfort and experience are our primary goals.' },
  { title: 'Reliability', icon: Shield, desc: '24/7 support and guaranteed vehicle availability.' },
  { title: 'Innovation', icon: Target, desc: 'Using technology to make renting seamless and fast.' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-brand-charcoal overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter mb-8">
              Our <span className="text-brand-neon">Story</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              At LET'S DRIVE, we believe that every journey should be as remarkable as the destination itself. Born from a passion for automotive excellence and a commitment to service, we've grown from a small local fleet to the nation's premier car rental solution.
            </p>
            <div className="grid grid-cols-2 gap-8">
               <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                  <h3 className="text-brand-neon text-3xl font-black mb-2">500+</h3>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Premium Cars</p>
               </div>
               <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                  <h3 className="text-brand-neon text-3xl font-black mb-2">50+</h3>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Cities Served</p>
               </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 relative aspect-square lg:aspect-video rounded-[3rem] overflow-hidden border border-white/10"
          >
             <Image 
               src="/images/about-story.png" 
               alt="Brand Experience" 
               fill 
               className="object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal to-transparent" />
          </motion.div>
        </div>

        {/* Timeline */}
        <section className="mb-32">
          <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-20 text-center">
            The <span className="text-brand-neon">Evolution</span>
          </h2>
          <div className="relative max-w-4xl mx-auto">
             <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/10 hidden md:block" />
             <div className="space-y-12">
                {timeline.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={cn(
                      "flex flex-col md:flex-row items-center gap-8 w-full",
                      idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    )}
                  >
                    <div className="flex-1 md:text-right text-center p-8 bg-white/5 rounded-[2rem] border border-white/5 backdrop-blur-md">
                       <span className="text-brand-neon font-black text-2xl mb-2 block">{item.year}</span>
                       <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                       <p className="text-white/40 text-sm leading-relaxed">{item.description}</p>
                    </div>
                    <div className="w-4 h-4 rounded-full bg-brand-neon shadow-lg shadow-brand-neon/50 z-10 hidden md:block" />
                    <div className="flex-1" />
                  </motion.div>
                ))}
             </div>
          </div>
        </section>

        {/* Values */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {values.map((v, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] group hover:border-brand-neon transition-colors"
               >
                 <v.icon className="text-brand-neon mb-6 transition-transform group-hover:scale-110" size={32} />
                 <h3 className="text-xl font-bold text-white mb-4">{v.title}</h3>
                 <p className="text-white/40 text-sm leading-relaxed">{v.desc}</p>
               </motion.div>
             ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-32 pb-20 text-center">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="p-12 md:p-20 bg-brand-neon rounded-[3rem] shadow-2xl shadow-brand-neon/20"
           >
              <h2 className="text-4xl md:text-6xl font-black text-brand-charcoal mb-8 uppercase italic tracking-tighter">
                Ready to <span className="text-white drop-shadow-md">Drive?</span>
              </h2>
              <p className="text-brand-charcoal/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium">
                Experience the future of travel today. Your premium autonomous journey starts with a single click.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                 <Link 
                   href="/" 
                   className="bg-brand-charcoal text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white hover:text-brand-charcoal transition-all duration-500 shadow-xl"
                 >
                    Back to Home
                 </Link>
                 <Link 
                   href="/fleet" 
                   className="bg-white text-brand-charcoal px-10 py-5 rounded-2xl font-black text-lg hover:bg-brand-charcoal hover:text-white transition-all duration-500 shadow-xl"
                 >
                    Explore Fleet
                 </Link>
              </div>
           </motion.div>
        </section>
      </div>
    </main>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
