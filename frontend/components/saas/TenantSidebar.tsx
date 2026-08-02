import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Building2,
  Sliders,
  CreditCard,
  FileText,
  Sparkles,
  Globe,
  Palette,
} from 'lucide-react';

export const TenantSidebar: React.FC = () => {
  const router = useRouter();

  const navItems = [
    { href: '/tenant', label: 'Tenant Overview', icon: <Building2 className="w-4 h-4 text-brand-cyan" /> },
    { href: '/tenant/settings', label: 'Organization Settings', icon: <Sliders className="w-4 h-4 text-brand-violet" /> },
    { href: '/tenant/billing', label: 'Billing & Usage', icon: <CreditCard className="w-4 h-4 text-emerald-400" /> },
    { href: '/tenant/invoices', label: 'Invoices & Receipts', icon: <FileText className="w-4 h-4 text-amber-400" /> },
    { href: '/tenant/subscription', label: 'Plan Upgrades', icon: <Sparkles className="w-4 h-4 text-rose-400" /> },
    { href: '/tenant/domains', label: 'Custom Domains', icon: <Globe className="w-4 h-4 text-brand-cyan" /> },
    { href: '/tenant/branding', label: 'White-Label Branding', icon: <Palette className="w-4 h-4 text-brand-violet" /> },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 text-left">
      <div className="glass-panel p-3 rounded-3xl border border-white/10 flex lg:flex-col overflow-x-auto lg:overflow-visible gap-1.5 scrollbar-none sticky top-20">
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 border-b border-white/10 mb-1">
          <Building2 className="w-4 h-4 text-brand-cyan" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Tenant SaaS Menu</span>
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
