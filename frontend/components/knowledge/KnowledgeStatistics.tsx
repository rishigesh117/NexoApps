import React from 'react';
import { Database, Activity, Clock, FileText } from 'lucide-react';

export const KnowledgeStatistics: React.FC = () => {
  const stats = [
    { label: 'Total Indexed Documents', value: '128', unit: 'docs', status: 'Optimal' },
    { label: 'Total Vector Chunks', value: '42,850', unit: 'chunks', status: 'HNSW Index' },
    { label: 'Queries Today', value: '1,420', unit: 'queries', status: 'Active' },
    { label: 'Avg Search Latency', value: '22.4ms', unit: 'milliseconds', status: 'Sub-30ms' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <h3 className="text-lg font-bold text-white">Knowledge Cloud Analytics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="p-4 rounded-2xl bg-surface-100 border border-white/10 text-center space-y-1">
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-text-muted font-semibold">{s.label}</p>
            <span className="inline-block text-[10px] text-brand-cyan font-medium bg-brand-cyan/10 px-2 py-0.5 rounded-full mt-1">
              {s.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
