import React, { useState, useEffect } from 'react';
import { Network, Shield, Lock } from 'lucide-react';
import { networkService } from '../../services/networkService';
import { VirtualNetwork } from '../../../shared/types';

export const NetworkDesigner: React.FC = () => {
  const [vnets, setVnets] = useState<VirtualNetwork[]>([]);

  useEffect(() => {
    networkService.getVnets().then(setVnets);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Virtual Network Designer & VPC Isolation</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vnets.map(v => (
          <div key={v.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-white text-lg flex items-center gap-2">
                <Network className="w-5 h-5 text-purple-400" /> {v.name}
              </h3>
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold uppercase">{v.status}</span>
            </div>
            <p className="text-sm font-mono text-cyan-400">CIDR Block: {v.cidrBlock}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
