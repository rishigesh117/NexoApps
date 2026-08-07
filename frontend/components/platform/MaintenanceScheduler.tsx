import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { maintenanceService } from '../../services/maintenanceService';
import { MaintenanceWindow } from '../../../shared/types';

export const MaintenanceScheduler: React.FC = () => {
  const [windows, setWindows] = useState<MaintenanceWindow[]>([]);

  useEffect(() => {
    maintenanceService.getWindows().then(setWindows);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Zero-Downtime Maintenance Scheduler</h2>
      <div className="space-y-4 max-w-4xl">
        {windows.map(w => (
          <div key={w.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="font-semibold text-white">{w.title}</h3>
                <p className="text-xs text-slate-400 font-mono">Start: {w.startTime}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded text-xs font-semibold uppercase">{w.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
