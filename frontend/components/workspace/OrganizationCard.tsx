import React from 'react';
import { Organization } from '../../types';
import { Building2, Users, FolderGit2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface OrganizationCardProps {
  organization: Organization;
}

export const OrganizationCard: React.FC<OrganizationCardProps> = ({ organization }) => {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-brand-cyan/40 transition-all flex flex-col justify-between space-y-4 text-left shadow-2xl">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/15 flex items-center justify-center text-3xl shrink-0">
          {organization.logoUrl || '🏢'}
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-white text-base leading-tight">{organization.name}</h3>
            {organization.isVerified && (
              <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
            )}
          </div>
          <span className="text-[11px] text-brand-cyan font-mono block">@{organization.slug}</span>
          <p className="text-xs text-text-secondary line-clamp-2">{organization.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs">
        <div className="flex items-center gap-4 text-text-muted">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-brand-cyan" /> {organization.membersCount || 1} Members
          </span>
          <span className="flex items-center gap-1">
            <FolderGit2 className="w-3.5 h-3.5 text-brand-violet" /> {organization.projectsCount || 0} Projects
          </span>
        </div>

        <Link
          href={`/organization/${organization.slug}`}
          className="px-4 py-1.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan transition-all"
        >
          View Org
        </Link>
      </div>
    </div>
  );
};
