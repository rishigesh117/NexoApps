import React, { useEffect, useState } from 'react';
import { RotateCcw, CheckCircle2 } from 'lucide-react';
import { getDatabaseRestores } from '../../services/restoreService';
import { RestorePoint } from '../../../shared/types';

export const RestoreCenter: React.FC = () => {
  const [points, setPoints] = useState<RestorePoint[]>([]);

  useEffect(() => {
    getDatabaseRestores().then((res) => setPoints(res.points));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <RotateCcw className="w-6 h-6 text-brand-cyan" /> Point-in-Time Restore (PITR) Center
        </h2>
        <p className="text-text-muted text-sm">Disaster recovery restore targets and point-in-time state recovery</p>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
        {points.map((p) => (
          <div key={p.id} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white text-sm">Restore Point: {p.pointInTime}</h4>
              <p className="text-text-muted text-xs">Cluster Ref: {p.clusterId}</p>
            </div>
            <button className="px-3 py-1.5 bg-brand-cyan/20 text-brand-cyan rounded-lg text-xs font-semibold hover:bg-brand-cyan/30 transition flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5" /> Restore Target
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
