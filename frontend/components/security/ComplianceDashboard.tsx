import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { complianceService } from '../../services/complianceService';
import { ComplianceFramework } from '../../../shared/types';

export const ComplianceDashboard: React.FC = () => {
  const [frameworks, setFrameworks] = useState<ComplianceFramework[]>([]);

  useEffect(() => {
    complianceService.getFrameworks().then(setFrameworks);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Continuous Compliance Automation Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {frameworks.map(f => (
          <div key={f.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <h3 className="font-semibold text-white">{f.frameworkName}</h3>
            </div>
            <div className="text-2xl font-extrabold text-emerald-400 mt-2">{f.passingPct}% Compliant</div>
          </div>
        ))}
      </div>
    </div>
  );
};
