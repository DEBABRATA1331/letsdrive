'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ShieldAlert, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AdminLoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  React.useEffect(() => {
    if (session?.user?.role === 'admin') {
      router.push('/admin/dashboard');
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error('Invalid credentials');
      } else {
         // After login, we need to check if they are actually an admin
         // Next-auth session update is needed or a hard refresh
         window.location.href = '/admin/dashboard';
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center p-6 px-6">
      <div className="absolute inset-0 -z-10 bg-brand-charcoal">
         <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-brand-neon/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white/[0.02] border border-white/10 rounded-[4rem] p-12 backdrop-blur-3xl shadow-3xl text-center"
      >
        <div className="w-20 h-20 bg-brand-neon/10 border border-brand-neon/20 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-2xl">
           <ShieldAlert className="text-brand-neon" size={40} />
        </div>
        
        <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-2">Admin <span className="text-brand-neon">Portal</span></h1>
        <p className="text-white/30 text-sm mb-12 uppercase tracking-widest font-bold">Secure Access Required</p>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
           <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-2">Administrator Identity</label>
              <div className="relative">
                 <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                 <input 
                   required
                   type="email" 
                   value={email}
                   onChange={e => setEmail(e.target.value)}
                   placeholder="admin@letsdrive.com" 
                   className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-16 py-5 text-white focus:border-brand-neon transition-all outline-none" 
                 />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-2">Security Key</label>
              <div className="relative">
                 <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                 <input 
                   required
                   type="password" 
                   value={password}
                   onChange={e => setPassword(e.target.value)}
                   placeholder="••••••••••••" 
                   className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-16 py-5 text-white focus:border-brand-neon transition-all outline-none" 
                 />
              </div>
           </div>

           <button 
             disabled={loading}
             className="w-full bg-brand-neon text-brand-charcoal py-6 rounded-[2rem] font-black text-xl uppercase tracking-wider flex items-center justify-center gap-3 hover:bg-brand-lime transition-all shadow-2xl shadow-brand-neon/20 group disabled:opacity-50 mt-8"
           >
             {loading ? "Verifying..." : <>Enter Dashboard <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" /></>}
           </button>
        </form>
      </motion.div>
    </main>
  );
}
