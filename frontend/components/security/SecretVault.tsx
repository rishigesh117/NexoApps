import React, { useState, useEffect } from 'react';
import { Lock, Plus, Eye, EyeOff } from 'lucide-react';
import { vaultService } from '../../services/vaultService';
import { Secret } from '../../../shared/types';

export const SecretVault: React.FC = () => {
  const [secrets, setSecrets] = useState<Secret[]>([]);

  useEffect(() => {
    vaultService.getSecrets().then(setSecrets);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">AES-256 Secret Vault & KMS</h2>
        <button className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-sm font-semibold flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Secret
        </button>
      </div>

      <div className="space-y-4 max-w-4xl">
        {secrets.map(s => (
          <div key={s.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-rose-400" />
              <div>
                <h3 className="font-semibold text-white font-mono">{s.secretName}</h3>
                <p className="text-xs text-slate-400 font-mono">Payload: {s.encryptedPayload}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs font-semibold">v{s.version}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
