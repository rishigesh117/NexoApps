import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { modelMonitoringService } from '../../services/modelMonitoringService';
import { ModelDriftReport } from '../../../shared/types';

export const DriftDetectionPanel: React.FC = () => {
  const [reports, setReports] = useState<ModelDriftReport[]>([]);

  useEffect(() => {
    modelMonitoringService.getDriftReports().then(setReports);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Concept Drift & Feature Drift Detection Panel</h2>
      <div className="space-y-4 max-w-4xl">
        {reports.map(r => (
          <div key={r.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="font-semibold text-white font-mono">{r.deploymentId}</h3>
                <p className="text-xs text-slate-400 font-mono">Concept Drift: {r.conceptDriftScore} | Feature Drift: {r.featureDriftScore}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold uppercase">{r.hasDrift ? 'Drift Alert' : 'No Drift'}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
