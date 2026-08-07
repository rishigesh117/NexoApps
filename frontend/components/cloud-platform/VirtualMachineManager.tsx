import React, { useState, useEffect } from 'react';
import { Server, Play, Square, Terminal, Cpu } from 'lucide-react';
import { computeService } from '../../services/computeService';
import { VirtualMachine } from '../../../shared/types';

export const VirtualMachineManager: React.FC = () => {
  const [vms, setVms] = useState<VirtualMachine[]>([]);

  useEffect(() => {
    computeService.getVirtualMachines().then(setVms);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Virtual Machines & AI GPU Instances</h2>
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/60 text-slate-400 font-semibold uppercase text-xs">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Instance Type</th>
              <th className="p-4">Specs</th>
              <th className="p-4">IP Address</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {vms.map(vm => (
              <tr key={vm.id}>
                <td className="p-4 font-semibold text-white">{vm.name}</td>
                <td className="p-4 font-mono text-cyan-400">{vm.instanceType}</td>
                <td className="p-4">{vm.vcpus} vCPUs / {vm.ramGb}GB RAM / {vm.gpus} GPU</td>
                <td className="p-4 font-mono text-slate-400">{vm.privateIp} ({vm.publicIp})</td>
                <td className="p-4"><span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded font-semibold uppercase">{vm.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
