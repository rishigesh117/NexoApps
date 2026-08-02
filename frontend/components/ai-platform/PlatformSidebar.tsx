import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Cpu,
  Boxes,
  Rocket,
  Database,
  FlaskConical,
  Activity,
  Key,
} from 'lucide-react';

export const PlatformSidebar: React.FC = () => {
  const router = useRouter();

  const navItems = [
    { href: '/ai-platform', label: 'Overview', icon: <Cpu className="w-4 h-4 text-brand-cyan" /> },
    { href: '/ai-platform/models', label: 'Model Registry', icon: <Boxes className="w-4 h-4 text-brand-violet" /> },
    { href: '/ai-platform/deployments', label: 'Deployments', icon: <Rocket className="w-4 h-4 text-emerald-400" /> },
    { href: '/ai-platform/datasets', label: 'Dataset Library', icon: <Database className="w-4 h-4 text-amber-400" /> },
    { href: '/ai-platform/experiments', label: 'Experiments', icon: <FlaskConical className="w-4 h-4 text-rose-400" /> },
    { href: '/ai-platform/runtime', label: 'Runtime Telemetry', icon: <Activity className="w-4 h-4 text-brand-cyan" /> },
    { href: '/ai-platform/endpoints', label: 'Endpoint Keys', icon: <Key className="w-4 h-4 text-amber-400" /> },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 text-left">
      <div className="glass-panel p-3 rounded-3xl border border-white/10 flex lg:flex-col overflow-x-auto lg:overflow-visible gap-1.5 scrollbar-none sticky top-20">
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 border-b border-white/10 mb-1">
          <Cpu className="w-4 h-4 text-brand-cyan" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">AI Platform Menu</span>
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
