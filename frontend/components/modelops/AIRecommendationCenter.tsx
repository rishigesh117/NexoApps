import React from 'react';
import { Cpu, CheckCircle2 } from 'lucide-react';

export const AIRecommendationCenter: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">AI Model Optimization Recommendations</h2>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-xl space-y-3">
        <div className="flex items-center gap-3">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <div>
            <h4 className="font-semibold text-white">Enable INT8 Quantization for Nexo-Llama-70B</h4>
            <p className="text-xs text-slate-400">Will decrease VRAM memory usage by 45% with &lt;0.01% loss in accuracy.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
