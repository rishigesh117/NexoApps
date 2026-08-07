import React, { useState, useEffect } from 'react';
import { Key, Plus, Trash2 } from 'lucide-react';
import { vaultService } from '../../services/vaultService';
import { ApiKey } from '../../../shared/types';

export const ApiKeyManager: React.FC = () => {
  const [keys, setKeys] = useState<ApiKey[]>([]);

  useEffect(() => {
    vaultService.getApiKeys().then(setKeys);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Developer & System API Key Manager</h2>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold flex items-center gap-2">
          <Plus className="w-4 h-4" /> Generate New API Key
        </button>
      </div>

      <div className="space-y-4 max-w-4xl">
        {keys.map(k => (
          <div key={k.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Key className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="font-semibold text-white">{k.keyName}</h3>
                <p className="text-xs text-slate-400 font-mono">Hash: {k.keyHash}</p>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded font-semibold">Active</span>
          </div>
        ))}
      </div>
    </div>
  );
};
