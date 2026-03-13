'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Car, 
  CalendarCheck, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarLinks = [
  { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Manage Fleet', href: '/admin/fleet', icon: Car },
  { name: 'Bookings', href: '/admin/bookings', icon: CalendarCheck },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (status === 'unauthenticated' || (status === 'authenticated' && session?.user?.role !== 'admin')) {
      router.push('/admin/login');
    }
  }, [status, session, router]);

  if (status === 'loading') return null;
  if (!session || session.user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-[#050505] flex text-white font-sans">
      {/* Sidebar */}
      <aside className="w-80 border-r border-white/5 bg-[#080808] flex flex-col p-8 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12 px-4">
           <div className="w-10 h-10 bg-brand-neon rounded-xl flex items-center justify-center shadow-2xl shadow-brand-neon/20">
              <Car className="text-brand-charcoal" size={24} />
           </div>
           <div>
              <span className="font-black text-xl italic uppercase tracking-tighter">Admin <span className="text-brand-neon italic">Panel</span></span>
           </div>
        </div>

        <nav className="flex-1 space-y-2">
           {sidebarLinks.map((link) => (
             <Link 
               key={link.name} 
               href={link.href}
               className={cn(
                 "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm group",
                 pathname === link.href 
                   ? "bg-brand-neon text-brand-charcoal shadow-xl shadow-brand-neon/10" 
                   : "text-white/40 hover:text-white hover:bg-white/5"
               )}
             >
                <link.icon size={20} className={cn(pathname === link.href ? "" : "group-hover:text-brand-neon")} />
                {link.name}
             </Link>
           ))}
        </nav>

        <button 
          onClick={() => router.push('/api/auth/signout')}
          className="mt-auto flex items-center gap-4 px-6 py-4 text-white/40 hover:text-red-500 transition-colors font-bold text-sm"
        >
           <LogOut size={20} /> Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-24 border-b border-white/5 flex items-center justify-between px-12 bg-transparent backdrop-blur-md sticky top-0 z-10">
           <div className="relative w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="text" 
                placeholder="Search analytics, cars, or users..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-sm focus:outline-none focus:border-brand-neon transition-all"
              />
           </div>

           <div className="flex items-center gap-6">
              <button className="relative w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-brand-neon transition-all">
                 <Bell size={20} />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-brand-neon rounded-full" />
              </button>
              <div className="flex items-center gap-4 pl-6 border-l border-white/10">
                  <div className="text-right">
                    <p className="text-xs font-black text-white">{session?.user?.name || 'Admin'}</p>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-none">Super Admin</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-neon to-brand-teal border border-white/10 shadow-lg" />
              </div>
           </div>
        </header>

        <main className="flex-1 overflow-y-auto p-12 custom-scrollbar">
           {children}
        </main>
      </div>
    </div>
  );
}
