import React, { useEffect, useState } from 'react';
import { Key, CheckCircle2 } from 'lucide-react';
import { cloudControlService } from '../../services/cloudControlService';
import { CloudAccount } from '../../../shared/types';

export const CloudAccountManager: React.FC = () => {
  const [accounts, setAccounts] = useState<CloudAccount[]>([]);

  useEffect(() => {
    cloudControlService.getAccounts().then((res) => setAccounts(res));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Key className="w-5 h-5 text-brand-cyan" /> Cloud Account Governance & Isolation
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map((acc) => (
          <div key={acc.id} className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded">
                Env: {acc.environment}
              </span>
              <span className="text-xs text-emerald-400 font-bold uppercase">{acc.status}</span>
            </div>
            <h3 className="font-bold text-white text-base font-display">{acc.accountName}</h3>
            <div className="text-xs text-text-muted font-mono pt-2 border-t border-white/10">
              Account ID: <strong className="text-white">{acc.accountIdNumber}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
