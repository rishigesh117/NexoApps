import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  LayoutDashboard,
  Grid,
  BarChart3,
  Settings,
  UserCheck,
  Code2,
  ExternalLink,
} from 'lucide-react';

export const DeveloperSidebar: React.FC = () => {
  const router = useRouter();

  const navItems = [
    { href: '/developer', label: 'Console Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { href: '/developer/apps', label: 'My Apps & Submissions', icon: <Grid className="w-4 h-4" /> },
    { href: '/developer/analytics', label: 'Developer Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { href: '/developer/settings', label: 'Studio Settings', icon: <Settings className="w-4 h-4" /> },
    { href: '/developer/batlytics', label: 'Public Profile Page', icon: <UserCheck className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="glass-panel p-3 rounded-3xl border border-white/10 flex lg:flex-col overflow-x-auto lg:overflow-visible gap-1.5 scrollbar-none sticky top-20">
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 border-b border-white/10 mb-1">
          <Code2 className="w-4 h-4 text-brand-cyan" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Developer Menu</span>
        </div>

        {navItems.map((item) => {
          const isActive = router.pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-brand-cyan/20 to-brand-violet/20 text-white border border-brand-cyan/30 shadow-glow-cyan'
                  : 'text-text-secondary hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <span className={isActive ? 'text-brand-cyan' : 'text-text-muted'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};
