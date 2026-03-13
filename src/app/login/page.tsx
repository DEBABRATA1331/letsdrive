'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Car, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

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
        toast.success('Logged in successfully!');
        router.push('/');
        router.refresh();
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-brand-charcoal flex items-center justify-center p-6 pt-32">
      <div className="absolute inset-0 -z-10 bg-brand-charcoal">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-neon/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-teal/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-2xl shadow-2xl overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/10 blur-3xl rounded-full" />
        
        <div className="flex flex-col items-center mb-10">
          <Link href="/" className="mb-8">
            <div className="w-16 h-16 bg-brand-neon rounded-2xl flex items-center justify-center shadow-2xl shadow-brand-neon/30">
              <Car className="text-brand-charcoal" size={32} />
            </div>
          </Link>
          <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">Welcome <span className="text-brand-neon">Back</span></h1>
          <p className="text-white/40 text-sm mt-2">Enter your details to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-14 py-4 text-white placeholder:text-white/10 focus:border-brand-neon transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-14 py-4 text-white placeholder:text-white/10 focus:border-brand-neon transition-all outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-neon text-brand-charcoal py-5 rounded-2xl font-black text-lg uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-brand-lime transition-all shadow-xl shadow-brand-neon/20 group disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : (
              <>
                Sign In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-10 text-white/40 text-sm">
          Don't have an account?{' '}
          <Link href="/register" className="text-brand-neon font-bold hover:underline">
            Register Now
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
