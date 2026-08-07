import React, { useState, useEffect } from 'react';
import { Key, Plus, CheckCircle2 } from 'lucide-react';
import { identityService } from '../../services/identityService';
import { IdentityProvider } from '../../../shared/types';

export const IdentityProviderManager: React.FC = () => {
  const [providers, setProviders] = useState<IdentityProvider[]>([]);

  useEffect(() => {
    identityService.getProviders().then(setProviders);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">SSO & Identity Provider Manager</h2>
        <button className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-sm font-semibold flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Identity Provider
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {providers.map(p => (
          <div key={p.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-white text-lg flex items-center gap-2">
                <Key className="w-5 h-5 text-purple-400" /> {p.name}
              </h3>
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs uppercase font-semibold">Enabled</span>
            </div>
            <p className="text-xs font-mono text-cyan-400 mb-2">Issuer: {p.issuerUrl}</p>
            <p className="text-xs font-mono text-slate-400">Client ID: {p.clientId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
