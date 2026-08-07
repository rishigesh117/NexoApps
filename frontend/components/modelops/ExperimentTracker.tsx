import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { experimentService } from '../../services/experimentService';
import { Experiment } from '../../../shared/types';

export const ExperimentTracker: React.FC = () => {
  const [experiments, setExperiments] = useState<Experiment[]>([]);

  useEffect(() => {
    experimentService.getExperiments().then(setExperiments);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Experiment Tracking & Loss Metric Curves</h2>
      <div className="space-y-4 max-w-4xl">
        {experiments.map(e => (
          <div key={e.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="font-semibold text-white text-lg flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-cyan-400" /> {e.experimentName}
            </h3>
            <p className="text-xs text-slate-400 font-mono">Objective: {e.objective}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
