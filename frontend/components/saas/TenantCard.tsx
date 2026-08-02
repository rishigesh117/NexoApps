import React from 'react';
import { Tenant } from '../../types';
import { Building2, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface TenantCardProps {
  tenant: Tenant;
}

export const TenantCard: React.FC<TenantCardProps> = ({ tenant }) => {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-brand-cyan/40 transition-all space-y-4 flex flex-col justify-between text-left shadow-2xl">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
            {tenant.planTier}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
            {tenant.status}
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="font-extrabold text-white text-base leading-tight">{tenant.name}</h3>
          <p className="text-xs font-mono text-text-muted">{tenant.slug}.nexoapps.dev</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs text-text-muted">
        <span className="flex items-center gap-1 font-bold text-white">
          <Users className="w-3.5 h-3.5 text-brand-cyan" /> {tenant.membersCount || 1} Members
        </span>

        <Link
          href={`/tenant?tenantId=${tenant.id}`}
          className="px-4 py-1.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center gap-1 transition-all"
        >
          Switch Tenant <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
