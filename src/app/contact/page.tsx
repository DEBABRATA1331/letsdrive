'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ChevronDown, MessageSquare, Twitter, Instagram, Facebook } from 'lucide-react';
import { toast } from 'react-hot-toast';

const faqs = [
  {
    q: 'How do I book a car?',
    a: 'Simply select your desired car from our fleet, choose your dates and locations, and complete the secure payment process.'
  },
  {
    q: 'What documents are required?',
    a: 'You will need a valid driving license, an ID proof (Passport/Aadhar), and a credit card for the security deposit.'
  },
  {
    q: 'Is there a mileage limit?',
    a: 'We offer both limited and unlimited mileage plans depending on your selection. Check the car details for specific limits.'
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Cancellations made 48 hours before the pickup time are eligible for a full refund. Late cancellations may incur a fee.'
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
       toast.success("Message sent! We'll get back to you soon.");
       setLoading(false);
       (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <main className="min-h-screen pt-32 pb-20 bg-brand-charcoal">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter mb-6"
          >
            Get In <span className="text-brand-neon">Touch</span>
          </motion.h1>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-white/50 text-lg"
          >
            Have questions or need assistance? Our 24/7 team is here to ensure your journey is flawless.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/5 blur-3xl rounded-full" />
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Your Name</label>
                     <input required type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-neon transition-all outline-none" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Email Address</label>
                     <input required type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-neon transition-all outline-none" />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Subject</label>
                  <input required type="text" placeholder="Inquiry about Tesla Model S" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-neon transition-all outline-none" />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Message</label>
                  <textarea required rows={5} placeholder="Tell us how we can help..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-neon transition-all outline-none resize-none"></textarea>
               </div>
               <button 
                 disabled={loading}
                 className="w-full bg-brand-neon text-brand-charcoal py-5 rounded-2xl font-black text-lg uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-brand-lime transition-all shadow-xl shadow-brand-neon/20 group disabled:opacity-50"
               >
                 {loading ? "Sending..." : <>Send Message <Send size={20} className="group-hover:translate-x-1 transition-transform" /></>}
               </button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { icon: Phone, title: 'Call Us', val: '+1 (234) 567-890' },
                  { icon: Mail, title: 'Email Us', val: 'support@letsdrive.com' },
                  { icon: MapPin, title: 'Our Office', val: 'Elite Plaza, Block 4, New York' },
                  { icon: MessageSquare, title: 'Live Chat', val: 'Available 24/7' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 bg-white/5 border border-white/10 rounded-3xl"
                  >
                    <item.icon className="text-brand-neon mb-4" size={24} />
                    <h3 className="text-white font-bold mb-1">{item.title}</h3>
                    <p className="text-white/40 text-sm">{item.val}</p>
                  </motion.div>
                ))}
             </div>

             {/* Map Placeholder */}
             <div className="aspect-video bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden relative group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center grayscale opacity-30 group-hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-12 h-12 bg-brand-neon rounded-full flex items-center justify-center animate-bounce shadow-2xl shadow-brand-neon">
                      <MapPin className="text-brand-charcoal" />
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-12 text-center">
            Frequently Asked <span className="text-brand-neon">Questions</span>
          </h2>
          <div className="space-y-4">
             {faqs.map((faq, i) => (
               <div key={i} className="border border-white/5 rounded-3xl bg-white/2 backdrop-blur-sm overflow-hidden transition-all">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left"
                  >
                    <span className="text-lg font-bold text-white">{faq.q}</span>
                    <ChevronDown className={cn("text-brand-neon transition-transform duration-300", openFaq === i && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-8 pb-6 text-white/40 leading-relaxed"
                      >
                         {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
             ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
