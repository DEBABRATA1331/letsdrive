'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Car } from 'lucide-react';

const footerLinks = [
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Fleet', href: '/fleet' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'Help Center', href: '/help' },
      { name: 'Emergency', href: '/emergency' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  },
  {
    title: 'Services',
    links: [
      { name: 'Self Drive', href: '/services/self-drive' },
      { name: 'Chauffeur Driven', href: '/services/chauffeur' },
      { name: 'Airport Transfer', href: '/services/airport' },
      { name: 'Corporate', href: '/services/corporate' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-brand-charcoal border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 bg-brand-neon rounded-lg flex items-center justify-center shadow-lg shadow-brand-neon/30">
                <Car className="text-brand-charcoal w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tighter text-white">
                  LET'S <span className="text-brand-neon">DRIVE</span>
                </span>
              </div>
            </Link>
            <p className="text-white/60 mb-8 max-w-sm">
              Your premium travel partner in providing seamless, reliable, and adventure-driven car rental solutions across the country.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ y: -5, color: '#7CFF00' }}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 transition-colors"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-bold mb-6">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/50 hover:text-brand-neon transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} LET'S DRIVE - One Stop Travel Solution. All rights reserved.
          </p>
          <div className="flex gap-8 text-white/30 text-xs">
            <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
            <Link href="#" className="hover:text-white transition-colors">Security</Link>
            <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
