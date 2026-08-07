import React, { useState, useEffect } from 'react';
import { Building, ShieldCheck } from 'lucide-react';
import { organizationService } from '../../services/organizationService';
import { Organization } from '../../../shared/types';

export const OrganizationManager: React.FC = () => {
  const [orgs, setOrgs] = useState<Organization[]>([]);

  useEffect(() => {
    organizationService.getOrganizations().then(setOrgs);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Enterprise Organization Hierarchy</h2>
      <div className="space-y-4 max-w-3xl">
        {orgs.map(o => (
          <div key={o.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Building className="w-6 h-6 text-blue-400" />
              <div>
                <h3 className="font-semibold text-white">{o.name}</h3>
                <p className="text-xs text-slate-400 font-mono">Slug: {o.slug} | Tenant: {o.tenantId}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold uppercase">{o.securityTier}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
