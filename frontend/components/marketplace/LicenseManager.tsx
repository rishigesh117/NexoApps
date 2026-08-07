import React, { useState, useEffect } from 'react';
import { Key, Shield, Check } from 'lucide-react';
import { licenseService } from '../../services/licenseService';

export const LicenseManager: React.FC = () => {
  const [licenses, setLicenses] = useState<any[]>([]);

  useEffect(() => {
    fetchLicenses();
  }, []);

  const fetchLicenses = async () => {
    try {
      const res = await licenseService.listLicenses();
      if (res.success) setLicenses(res.data);
    } catch (err) {
      console.error('Failed to load licenses', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-white/10">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Key className="w-5 h-5 text-brand-cyan" />
          Enterprise License Keys & Entitlements
        </h2>
        <p className="text-xs text-text-muted mt-1">Manage active software keys and activation limits.</p>
      </div>

      <div className="space-y-4">
        {licenses.map((lic) => (
          <div key={lic.id} className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-violet/10 border border-brand-violet/30 text-brand-violet">
                {lic.licenseType}
              </span>
              <h3 className="text-sm font-bold text-white font-mono mt-1">{lic.licenseKey}</h3>
              <p className="text-xs text-text-muted mt-0.5">Activations: {lic.activationCount} / {lic.maxActivations}</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <Check className="w-4 h-4" /> Active
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
