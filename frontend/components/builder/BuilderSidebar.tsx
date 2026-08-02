import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Wand2,
  FolderGit2,
  LayoutGrid,
  Zap,
  History,
  DownloadCloud,
  Layers,
} from 'lucide-react';

export const BuilderSidebar: React.FC = () => {
  const router = useRouter();

  const navItems = [
    { href: '/builder', label: 'Overview', icon: <Wand2 className="w-4 h-4 text-brand-cyan" /> },
    { href: '/builder/projects', label: 'AI Projects', icon: <FolderGit2 className="w-4 h-4 text-brand-violet" /> },
    { href: '/builder/templates', label: 'Template Gallery', icon: <LayoutGrid className="w-4 h-4 text-emerald-400" /> },
    { href: '/builder/workflows', label: 'Workflows', icon: <Zap className="w-4 h-4 text-amber-400" /> },
    { href: '/builder/history', label: 'Prompt History', icon: <History className="w-4 h-4" /> },
    { href: '/builder/export', label: 'Export Center', icon: <DownloadCloud className="w-4 h-4 text-brand-cyan" /> },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 text-left">
      <div className="glass-panel p-3 rounded-3xl border border-white/10 flex lg:flex-col overflow-x-auto lg:overflow-visible gap-1.5 scrollbar-none sticky top-20">
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 border-b border-white/10 mb-1">
          <Wand2 className="w-4 h-4 text-brand-cyan" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">AI Builder Menu</span>
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
