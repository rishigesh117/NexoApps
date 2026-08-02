import React from 'react';
import { Building2, Users, Cpu, Activity } from 'lucide-react';

export const OrganizationDashboard: React.FC = () => {
  const overview = [
    { label: 'Active Digital Employees', value: '14', status: '100% Operational' },
    { label: 'Enterprise Departments', value: '3', status: 'Eng / Fin / Sec' },
    { label: 'Automated Process Runs Today', value: '480', status: 'Sub-2s Latency' },
    { label: 'Approval Turnaround Time', value: '1.4s', status: '99.8% Automated' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <h3 className="text-lg font-bold text-white">Organization Operational Dashboard</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {overview.map((o) => (
          <div key={o.label} className="p-4 rounded-2xl bg-surface-100 border border-white/10 text-center space-y-1">
            <p className="text-2xl font-bold text-white">{o.value}</p>
            <p className="text-xs text-text-muted font-semibold">{o.label}</p>
            <span className="inline-block text-[10px] text-brand-cyan font-medium bg-brand-cyan/10 px-2 py-0.5 rounded-full mt-1">
              {o.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
