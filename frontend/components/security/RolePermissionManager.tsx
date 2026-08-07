import React, { useState, useEffect } from 'react';
import { Shield, Key } from 'lucide-react';
import { identityService } from '../../services/identityService';
import { Role } from '../../../shared/types';

export const RolePermissionManager: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    identityService.getRoles().then(setRoles);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">RBAC & ABAC Role Permission Manager</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map(r => (
          <div key={r.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-white text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-400" /> {r.roleName}
              </h3>
              <span className="px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded text-xs font-semibold">System Role</span>
            </div>
            <p className="text-sm text-slate-400">{r.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
