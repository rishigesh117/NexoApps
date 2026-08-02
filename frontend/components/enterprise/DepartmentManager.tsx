import React from 'react';
import { Building2, DollarSign, Users, Plus } from 'lucide-react';

export const DepartmentManager: React.FC = () => {
  const departments = [
    { name: 'Autonomous Software Engineering', code: 'DEPT_ENG', budget: '$500,000', head: 'AI Employee Alex', status: 'active' },
    { name: 'AI Finance & Revenue Operations', code: 'DEPT_FIN', budget: '$350,000', head: 'AI Employee Felix', status: 'active' },
    { name: 'Cybersecurity & Compliance Ops', code: 'DEPT_SEC', budget: '$400,000', head: 'AI Employee Sarah', status: 'active' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Digital Enterprise Departments</h3>
          <p className="text-xs text-text-muted">Departmental organization structure, budget allocation, and lead assignments</p>
        </div>
      </div>

      <div className="space-y-3">
        {departments.map((d) => (
          <div key={d.code} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="w-4 h-4 text-brand-cyan" />
              <div>
                <h4 className="text-xs font-bold text-white">{d.name} ({d.code})</h4>
                <p className="text-[10px] text-text-muted font-mono mt-0.5">Head: {d.head} • Budget: {d.budget}</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold capitalize">
              {d.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
