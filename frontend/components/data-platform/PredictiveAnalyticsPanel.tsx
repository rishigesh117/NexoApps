import React, { useState, useEffect } from 'react';
import { Cpu, CheckCircle } from 'lucide-react';
import { analyticsService } from '../../services/analyticsService';
import { PredictiveModel } from '../../../shared/types';

export const PredictiveAnalyticsPanel: React.FC = () => {
  const [models, setModels] = useState<PredictiveModel[]>([]);

  useEffect(() => {
    analyticsService.getPredictiveModels().then(setModels);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Predictive Analytics & AutoML Model Panel</h2>
      <div className="space-y-4 max-w-3xl">
        {models.map(m => (
          <div key={m.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-white">{m.modelName}</h3>
              <p className="text-xs text-slate-400 font-mono">Target Column: {m.targetColumn}</p>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-emerald-400">{m.accuracyPct}% Accuracy</span>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-xs rounded font-semibold block uppercase mt-1">{m.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
