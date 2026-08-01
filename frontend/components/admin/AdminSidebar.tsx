import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  LayoutDashboard,
  Grid,
  Users,
  Code2,
  Star,
  Download,
  Settings,
  ShieldCheck,
  Rocket,
  Activity,
  Bot,
  BarChart3,
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const router = useRouter();

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { href: '/admin/testing', label: 'Testing Dashboard', icon: <Activity className="w-4 h-4 text-amber-400" /> },
    { href: '/admin/submissions', label: 'Submission Queue', icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> },
    { href: '/admin/upload', label: 'Owner Upload Portal', icon: <Rocket className="w-4 h-4 text-brand-cyan" /> },
    { href: '/admin/apps', label: 'App Management', icon: <Grid className="w-4 h-4" /> },
    { href: '/admin/users', label: 'Users & Roles', icon: <Users className="w-4 h-4" /> },
    { href: '/admin/developers', label: 'Developers', icon: <Code2 className="w-4 h-4" /> },
    { href: '/admin/reviews', label: 'Reviews Moderation', icon: <Star className="w-4 h-4" /> },
    { href: '/admin/downloads', label: 'Download Logs', icon: <Download className="w-4 h-4" /> },
    { href: '/admin/analytics', label: 'Enterprise Analytics', icon: <BarChart3 className="w-4 h-4 text-brand-cyan" /> },
    { href: '/admin/automation', label: 'AI Automation', icon: <Bot className="w-4 h-4 text-brand-violet" /> },
    { href: '/admin/settings', label: 'System Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="glass-panel p-3 rounded-3xl border border-white/10 flex lg:flex-col overflow-x-auto lg:overflow-visible gap-1.5 scrollbar-none sticky top-20">
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 border-b border-white/10 mb-1">
          <ShieldCheck className="w-4 h-4 text-brand-cyan" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Console Menu</span>
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
