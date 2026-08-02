import React from 'react';
import { Lock, Key, RotateCw, Plus } from 'lucide-react';

export const SecretVault: React.FC = () => {
  const secrets = [
    { name: 'STRIPE_SECRET_KEY', type: 'api_key', version: 2, value: 'sk_live_********************' },
    { name: 'JWT_PRIMARY_SECRET', type: 'token', version: 1, value: 'enc_sec_********************' },
    { name: 'AWS_ACCESS_KEY_SECRET', type: 'credentials', version: 3, value: 'enc_aws_********************' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Secrets Vault</h3>
          <p className="text-xs text-text-muted">Encrypted credential store with key rotation and access control</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white text-xs font-bold shadow-glow-cyan hover:opacity-95 transition-all">
          <Plus className="w-3.5 h-3.5" /> Add Secret
        </button>
      </div>

      <div className="space-y-3">
        {secrets.map((s) => (
          <div key={s.name} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="w-4 h-4 text-violet-400" />
              <div>
                <h4 className="font-mono text-xs font-bold text-white">{s.name}</h4>
                <p className="text-[10px] text-text-muted font-mono mt-0.5">{s.value} (v{s.version})</p>
              </div>
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-brand-cyan font-semibold transition-colors">
              <RotateCw className="w-3 h-3" /> Rotate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
