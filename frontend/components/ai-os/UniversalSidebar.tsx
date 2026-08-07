import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Cpu, Boxes, Layout, Store, Terminal, BookOpen, Shield, Search, Bell, Activity } from 'lucide-react';

export const UniversalSidebar: React.FC = () => {
  const router = useRouter();

  const navItems = [
    { href: '/workspace', label: 'AI OS Workspace', icon: <Cpu className="w-4 h-4 text-brand-cyan" /> },
    { href: '/workspace/dashboard', label: 'Telemetry Central', icon: <Activity className="w-4 h-4 text-emerald-400" /> },
    { href: '/workspace/search', label: 'Universal Search', icon: <Search className="w-4 h-4 text-blue-400" /> },
    { href: '/workspace/activity', label: 'Activity Center', icon: <Activity className="w-4 h-4 text-amber-400" /> },
    { href: '/workspace/notifications', label: 'Notification Hub', icon: <Bell className="w-4 h-4 text-rose-400" /> },
    { href: '/workspace/modules', label: 'Module Explorer', icon: <Boxes className="w-4 h-4 text-brand-violet" /> },
    { href: '/ai-gateway', label: 'AI Gateway', icon: <Cpu className="w-4 h-4 text-brand-cyan" /> },
    { href: '/app-builder', label: 'App Builder', icon: <Layout className="w-4 h-4 text-brand-cyan" /> },
    { href: '/marketplace', label: 'AI Marketplace', icon: <Store className="w-4 h-4 text-brand-violet" /> },
    { href: '/software-engineering', label: 'Software Engineering', icon: <Terminal className="w-4 h-4 text-emerald-400" /> },
  ];

  return (
    <aside className="w-full lg:w-64 glass-panel p-4 rounded-3xl border border-white/10 space-y-2">
      <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider px-3 mb-2">AI OS Unified Sidebar</h3>
      <div className="space-y-1">
        {navItems.map((item) => {
          const active = router.pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                active ? 'bg-brand-cyan/20 text-brand-cyan font-bold border border-brand-cyan/30' : 'text-text-secondary hover:bg-surface-100 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};
