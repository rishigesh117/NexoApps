import React from 'react';
import Link from 'next/link';
import { Rocket, Cpu, Layout, Store, Terminal, BookOpen, Shield, Globe } from 'lucide-react';

export const WorkspaceLauncher: React.FC = () => {
  const modules = [
    { title: 'AI Gateway', href: '/ai-gateway', icon: <Cpu className="w-6 h-6 text-brand-cyan" />, desc: 'Universal LLM Router & Provider Gateway' },
    { title: 'App Builder Studio', href: '/app-builder', icon: <Layout className="w-6 h-6 text-brand-cyan" />, desc: 'Low-Code Visual AI Application Builder' },
    { title: 'AI Marketplace', href: '/marketplace', icon: <Store className="w-6 h-6 text-brand-violet" />, desc: 'Agents, Plugins & Extension Ecosystem' },
    { title: 'Software Engineering', href: '/software-engineering', icon: <Terminal className="w-6 h-6 text-emerald-400" />, desc: 'Autonomous AI Code Generator & SDLC Studio' },
    { title: 'Knowledge Cloud', href: '/knowledge', icon: <BookOpen className="w-6 h-6 text-blue-400" />, desc: 'RAG Vector Index & Knowledge Base' },
    { title: 'Enterprise Governance', href: '/enterprise', icon: <Shield className="w-6 h-6 text-amber-400" />, desc: 'RBAC, Audit Logs & Enterprise Compliance' }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-white flex items-center gap-2">
        <Rocket className="w-5 h-5 text-brand-cyan" />
        AI OS Module Workspace Launcher
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modules.map((m, i) => (
          <Link key={i} href={m.href} className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-brand-cyan/50 transition-all space-y-2 group">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-surface-100 border border-white/10 group-hover:scale-105 transition-transform">
                {m.icon}
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors">{m.title}</h4>
            </div>
            <p className="text-xs text-text-muted">{m.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
