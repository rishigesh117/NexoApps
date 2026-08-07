import React, { useState, useEffect } from 'react';
import { Boxes, Tag } from 'lucide-react';
import { resourceService } from '../../services/resourceService';
import { ResourceGroup } from '../../../shared/types';

export const ResourceGroupManager: React.FC = () => {
  const [groups, setGroups] = useState<ResourceGroup[]>([]);

  useEffect(() => {
    resourceService.getResourceGroups().then(setGroups);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Resource Group & Tagging Manager</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map(g => (
          <div key={g.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <Boxes className="w-6 h-6 text-purple-400" />
              <h3 className="font-semibold text-white">{g.name}</h3>
            </div>
            <p className="text-sm text-slate-400">{g.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
