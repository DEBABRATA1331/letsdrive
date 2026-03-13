'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Car, PhoneCall } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Fleet', href: '/fleet' },
  { name: 'Booking', href: '/booking' },
  { name: 'About', href: '/about' },
  { name: 'Emergency', href: '/emergency' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-brand-charcoal/80 backdrop-blur-xl border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-10 h-10 bg-brand-neon rounded-lg flex items-center justify-center shadow-lg shadow-brand-neon/30"
          >
            <Car className="text-brand-charcoal w-6 h-6" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tighter text-white group-hover:text-brand-neon transition-colors">
              LET'S <span className="text-brand-neon">DRIVE</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-white/50 leading-none">
              One Stop Travel Solution
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-brand-neon transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-neon transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <div className="flex items-center gap-4 border-l border-white/10 pl-8">
            <ThemeToggle />
            <Link
              href="/booking"
              className="bg-brand-neon text-brand-charcoal px-6 py-2.5 rounded-full font-bold text-sm hover:bg-brand-lime transition-all duration-300 shadow-lg shadow-brand-neon/20 hover:shadow-brand-neon/40 hover:-translate-y-0.5"
            >
              Book Now
            </Link>
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-brand-charcoal/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-bold text-white hover:text-brand-neon transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/booking"
                onClick={() => setIsOpen(false)}
                className="bg-brand-neon text-brand-charcoal text-center py-4 rounded-xl font-bold text-lg"
              >
                Book Your Ride
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
