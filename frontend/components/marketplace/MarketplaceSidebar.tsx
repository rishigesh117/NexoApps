import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Store,
  Bot,
  Boxes,
  LayoutTemplate,
  Workflow,
  Sparkles,
  FolderHeart,
  DollarSign,
} from 'lucide-react';

export const MarketplaceSidebar: React.FC = () => {
  const router = useRouter();

  const navItems = [
    { href: '/marketplace', label: 'All AI Assets', icon: <Store className="w-4 h-4 text-brand-cyan" /> },
    { href: '/marketplace/agents', label: 'AI Agents', icon: <Bot className="w-4 h-4 text-brand-cyan" /> },
    { href: '/marketplace/models', label: 'AI Models', icon: <Boxes className="w-4 h-4 text-brand-violet" /> },
    { href: '/marketplace/templates', label: 'App Templates', icon: <LayoutTemplate className="w-4 h-4 text-emerald-400" /> },
    { href: '/marketplace/workflows', label: 'Workflows', icon: <Workflow className="w-4 h-4 text-amber-400" /> },
    { href: '/marketplace/prompts', label: 'Prompt Packs', icon: <Sparkles className="w-4 h-4 text-rose-400" /> },
    { href: '/marketplace/collections', label: 'Collections', icon: <FolderHeart className="w-4 h-4 text-brand-cyan" /> },
    { href: '/dashboard/payouts', label: 'Revenue & Payouts', icon: <DollarSign className="w-4 h-4 text-emerald-400" /> },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 text-left">
      <div className="glass-panel p-3 rounded-3xl border border-white/10 flex lg:flex-col overflow-x-auto lg:overflow-visible gap-1.5 scrollbar-none sticky top-20">
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 border-b border-white/10 mb-1">
          <Store className="w-4 h-4 text-brand-cyan" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Marketplace Menu</span>
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
