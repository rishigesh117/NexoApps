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
  Terminal,
  Clock,
  Server,
  Shield,
  Wand2,
  CalendarDays,
  FileCheck,
  BookOpen,
  Boxes,
  Database,
  FlaskConical,
  Key,
  Cpu,
  Store,
  Building2,
  CreditCard,
  Sparkles,
  Globe,
  Webhook,
  Layers,
  Link2,
  BrainCircuit,
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const router = useRouter();

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { href: '/admin/platform', label: 'Unified OS Console', icon: <Cpu className="w-4 h-4 text-emerald-400" /> },
    { href: '/admin/integrations', label: 'Integrations Console', icon: <Globe className="w-4 h-4 text-emerald-400" /> },
    { href: '/admin/api', label: 'API Gateway Admin', icon: <Cpu className="w-4 h-4 text-brand-cyan" /> },
    { href: '/admin/webhooks', label: 'Webhooks Monitor', icon: <Webhook className="w-4 h-4 text-amber-400" /> },
    { href: '/admin/oauth', label: 'OAuth Applications', icon: <Shield className="w-4 h-4 text-brand-violet" /> },
    { href: '/admin/data-platform', label: 'Data Platform Console', icon: <Database className="w-4 h-4 text-blue-400" /> },
    { href: '/admin/lts', label: 'v4.0 LTS Center', icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> },
    { href: '/admin/agent-cloud', label: 'Agent Cloud Console', icon: <Bot className="w-4 h-4 text-brand-cyan" /> },
    { href: '/admin/runtime-v2', label: 'AI Runtime Console v2', icon: <Cpu className="w-4 h-4 text-emerald-400" /> },
    { href: '/admin/knowledge', label: 'Knowledge Cloud', icon: <Database className="w-4 h-4 text-brand-cyan" /> },
    { href: '/knowledge/chat', label: 'Enterprise RAG', icon: <Bot className="w-4 h-4 text-emerald-400" /> },
    { href: '/admin/vector-indexes', label: 'Vector Database', icon: <Layers className="w-4 h-4 text-violet-400" /> },
    { href: '/admin/connectors', label: 'Knowledge Connectors', icon: <Link2 className="w-4 h-4 text-blue-400" /> },
    { href: '/knowledge/memory', label: 'Conversation Memory', icon: <BrainCircuit className="w-4 h-4 text-amber-400" /> },
    { href: '/admin/cloud', label: 'Enterprise Cloud Console', icon: <Server className="w-4 h-4 text-emerald-400" /> },
    { href: '/admin/workflows', label: 'Workflow Operations', icon: <Layers className="w-4 h-4 text-brand-cyan" /> },
    { href: '/admin/clusters', label: 'Cluster Management', icon: <Boxes className="w-4 h-4 text-amber-400" /> },
    { href: '/admin/tenants', label: 'SaaS Tenants', icon: <Building2 className="w-4 h-4 text-brand-cyan" /> },
    { href: '/admin/billing', label: 'SaaS Billing', icon: <CreditCard className="w-4 h-4 text-emerald-400" /> },
    { href: '/admin/plans', label: 'Plans Manager', icon: <Sparkles className="w-4 h-4 text-rose-400" /> },
    { href: '/admin/payments', label: 'Payment Ledger', icon: <CreditCard className="w-4 h-4 text-amber-400" /> },
    { href: '/admin/testing', label: 'Testing Dashboard', icon: <Activity className="w-4 h-4 text-amber-400" /> },
    { href: '/admin/submissions', label: 'Submission Queue', icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> },
    { href: '/admin/upload', label: 'Owner Upload Portal', icon: <Rocket className="w-4 h-4 text-brand-cyan" /> },
    { href: '/admin/marketplace', label: 'AI Marketplace Admin', icon: <Store className="w-4 h-4 text-brand-cyan" /> },
    { href: '/admin/models', label: 'AI Models Registry', icon: <Boxes className="w-4 h-4 text-brand-violet" /> },
    { href: '/ai-platform/deployments', label: 'Model Deployments', icon: <Rocket className="w-4 h-4 text-emerald-400" /> },
    { href: '/admin/runtime', label: 'AI Runtime Telemetry', icon: <Cpu className="w-4 h-4 text-brand-cyan" /> },
    { href: '/ai-platform/datasets', label: 'Datasets Library', icon: <Database className="w-4 h-4 text-amber-400" /> },
    { href: '/ai-platform/experiments', label: 'Experiments', icon: <FlaskConical className="w-4 h-4 text-rose-400" /> },
    { href: '/ai-platform/endpoints', label: 'Endpoints & API Keys', icon: <Key className="w-4 h-4 text-amber-400" /> },
    { href: '/admin/agents', label: 'AI Agents Console', icon: <Bot className="w-4 h-4 text-brand-cyan" /> },
    { href: '/admin/planner', label: 'Sprint Planner', icon: <CalendarDays className="w-4 h-4 text-amber-400" /> },
    { href: '/agents/reviews', label: 'Code Review', icon: <FileCheck className="w-4 h-4 text-rose-400" /> },
    { href: '/agents/documentation', label: 'Documentation Generator', icon: <BookOpen className="w-4 h-4 text-brand-cyan" /> },
    { href: '/builder', label: 'AI Builder Console', icon: <Wand2 className="w-4 h-4 text-brand-cyan" /> },
    { href: '/admin/operations', label: 'Operations Console', icon: <Activity className="w-4 h-4 text-brand-cyan" /> },
    { href: '/admin/system', label: 'System Telemetry', icon: <Server className="w-4 h-4 text-brand-violet" /> },
    { href: '/admin/audit', label: 'Audit Logs', icon: <Shield className="w-4 h-4 text-emerald-400" /> },
    { href: '/admin/logs', label: 'System Log Stream', icon: <Terminal className="w-4 h-4 text-amber-400" /> },
    { href: '/admin/deployments', label: 'Deployments', icon: <Rocket className="w-4 h-4 text-brand-cyan" /> },
    { href: '/admin/jobs', label: 'Job Scheduler', icon: <Clock className="w-4 h-4 text-amber-400" /> },
    { href: '/admin/organizations', label: 'Organizations', icon: <Building2 className="w-4 h-4 text-emerald-400" /> },
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
