import React, { useEffect, useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { getQueryAnalytics } from '../../services/databasePlatformService';
import { QueryStatistic } from '../../../shared/types';

export const QueryAnalytics: React.FC = () => {
  const [stats, setStats] = useState<QueryStatistic[]>([]);

  useEffect(() => {
    getQueryAnalytics().then(setStats);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-brand-cyan" /> Query Performance Analytics (pg_stat_statements)
        </h2>
        <p className="text-text-muted text-sm">Slow query detector, execution times, index scan efficiency & lock contention</p>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
        {stats.map((s) => (
          <div key={s.id} className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
            <span className="text-xs text-brand-cyan font-mono font-bold">Hash: {s.queryHash}</span>
            <p className="text-xs text-white font-mono bg-black/40 p-2 rounded border border-white/5">{s.queryText}</p>
            <div className="flex justify-between text-xs text-text-muted pt-1">
              <span>Calls: <strong>{s.callsCount.toLocaleString()}</strong></span>
              <span>Mean Execution: <strong className="text-emerald-400">{s.meanExecTimeMs} ms</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
