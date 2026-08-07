import React from 'react';
import { Sliders } from 'lucide-react';

export const HyperparameterTuner: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Automated Hyperparameter Tuning (Optuna / Ray Tune)</h2>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-xl">
        <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
          <Sliders className="w-5 h-5 text-amber-400" /> Bayesian Optimization Trial Pool
        </h3>
        <p className="text-xs text-slate-400">Best Trial: Learning Rate = 2e-5 | Batch Size = 32 | Perplexity = 1.14</p>
      </div>
    </div>
  );
};
