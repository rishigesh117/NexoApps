import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { telemetryService } from '../../services/telemetryService';
import { PlatformTelemetry as TelemetryType } from '../../../shared/types';

export const PlatformTelemetry: React.FC = () => {
  const [telemetry, setTelemetry] = useState<TelemetryType[]>([]);

  useEffect(() => {
    telemetryService.getTelemetry().then(setTelemetry);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Platform Usage Telemetry & Logging</h2>
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 max-w-4xl space-y-3">
        {telemetry.map(t => (
          <div key={t.id} className="p-3 bg-slate-900 rounded flex justify-between items-center text-sm font-mono">
            <span className="text-cyan-400 font-bold">{t.eventType}</span>
            <span className="text-slate-400">{t.createdAt}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
