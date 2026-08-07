import React, { useState, useEffect } from 'react';
import { Cpu, HardDrive } from 'lucide-react';
import { resourceService } from '../../services/resourceService';
import { ResourceAllocation } from '../../../shared/types';

export const ResourceAllocationViewer: React.FC = () => {
  const [allocations, setAllocations] = useState<ResourceAllocation[]>([]);

  useEffect(() => {
    resourceService.getAllocations().then(setAllocations);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Tenant Resource Quotas & Allocations</h2>
      <div className="space-y-4 max-w-2xl">
        {allocations.map(a => (
          <div key={a.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
            <span className="font-semibold text-white uppercase">{a.resourceType}</span>
            <span className="font-mono text-cyan-400 font-bold">{a.allocatedUnits} {a.unitName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
