import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Code2,
  Key,
  Webhook,
  Shield,
  BookOpen,
  Download,
  BarChart3,
  Globe,
} from 'lucide-react';

export const DeveloperApiSidebar: React.FC = () => {
  const router = useRouter();

  const navItems = [
    { href: '/developer/api', label: 'API Portal', icon: <Code2 className="w-4 h-4 text-brand-cyan" /> },
    { href: '/developer/api/keys', label: 'API Keys', icon: <Key className="w-4 h-4 text-amber-400" /> },
    { href: '/developer/api/webhooks', label: 'Webhooks', icon: <Webhook className="w-4 h-4 text-emerald-400" /> },
    { href: '/developer/api/oauth', label: 'OAuth2 Apps', icon: <Shield className="w-4 h-4 text-brand-violet" /> },
    { href: '/developer/api/docs', label: 'OpenAPI Docs', icon: <BookOpen className="w-4 h-4 text-rose-400" /> },
    { href: '/developer/api/sdk', label: 'SDK Downloads', icon: <Download className="w-4 h-4 text-brand-cyan" /> },
    { href: '/developer/api/usage', label: 'API Rate Limits', icon: <BarChart3 className="w-4 h-4 text-amber-400" /> },
    { href: '/integrations', label: 'Integrations Hub', icon: <Globe className="w-4 h-4 text-emerald-400" /> },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 text-left">
      <div className="glass-panel p-3 rounded-3xl border border-white/10 flex lg:flex-col overflow-x-auto lg:overflow-visible gap-1.5 scrollbar-none sticky top-20">
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 border-b border-white/10 mb-1">
          <Code2 className="w-4 h-4 text-brand-cyan" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Developer Portal</span>
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
