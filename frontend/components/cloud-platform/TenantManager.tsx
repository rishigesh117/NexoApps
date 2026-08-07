import React, { useState, useEffect } from 'react';
import { Building2, ShieldCheck, Plus } from 'lucide-react';
import { tenantService } from '../../services/tenantService';
import { CloudTenant } from '../../../shared/types';

export const TenantManager: React.FC = () => {
  const [tenants, setTenants] = useState<CloudTenant[]>([]);

  useEffect(() => {
    tenantService.getTenants().then(setTenants);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Multi-Tenant Architecture Manager</h2>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold flex items-center gap-2">
          <Plus className="w-4 h-4" /> Provision Tenant
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tenants.map(t => (
          <div key={t.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <Building2 className="w-6 h-6 text-blue-400" />
                <h3 className="font-bold text-white text-lg">{t.name}</h3>
              </div>
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs uppercase font-semibold">
                {t.tier}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-slate-300 pt-4 border-t border-slate-700">
              <div><span className="text-slate-400 block">vCPUs</span>{t.maxVcpus} Cores</div>
              <div><span className="text-slate-400 block">RAM</span>{t.maxRamGb} GB</div>
              <div><span className="text-slate-400 block">Storage</span>{t.maxStorageTb} TB</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
