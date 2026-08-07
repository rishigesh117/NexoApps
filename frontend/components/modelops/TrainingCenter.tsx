import React, { useState, useEffect } from 'react';
import { Cpu, Play } from 'lucide-react';
import { trainingService } from '../../services/trainingService';
import { TrainingJob } from '../../../shared/types';

export const TrainingCenter: React.FC = () => {
  const [jobs, setJobs] = useState<TrainingJob[]>([]);

  useEffect(() => {
    trainingService.getJobs().then(setJobs);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Automated Model Training & Fine-Tuning Center</h2>
      <div className="space-y-4 max-w-4xl">
        {jobs.map(j => (
          <div key={j.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Cpu className="w-5 h-5 text-purple-400" />
              <div>
                <h3 className="font-semibold text-white">{j.jobName}</h3>
                <p className="text-xs text-slate-400 font-mono">Framework: {j.framework} | Dataset: {j.datasetVersionId}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold uppercase">{j.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
