import React from 'react';
import { WorkspaceRole } from '../../types';
import { ShieldCheck, ShieldAlert, Code2, Eye, UserCheck } from 'lucide-react';

interface RoleBadgeProps {
  role: WorkspaceRole;
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role }) => {
  const getBadgeStyle = () => {
    switch (role) {
      case 'owner':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'admin':
        return 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/40';
      case 'pm':
        return 'bg-brand-violet/20 text-brand-violet border-brand-violet/40';
      case 'developer':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'reviewer':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
      default:
        return 'bg-white/10 text-text-muted border-white/10';
    }
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${getBadgeStyle()} inline-flex items-center gap-1`}>
      {role === 'owner' && <ShieldAlert className="w-3 h-3 text-amber-300" />}
      {role === 'admin' && <ShieldCheck className="w-3 h-3 text-brand-cyan" />}
      {role === 'developer' && <Code2 className="w-3 h-3 text-emerald-400" />}
      {role}
    </span>
  );
};
