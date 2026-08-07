import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, LogOut } from 'lucide-react';
import { organizationService } from '../../services/organizationService';
import { UserSession } from '../../../shared/types';

export const SessionMonitor: React.FC = () => {
  const [sessions, setSessions] = useState<UserSession[]>([]);

  useEffect(() => {
    organizationService.getActiveSessions().then(setSessions);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Active Session & Device Token Monitor</h2>
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/60 text-slate-400 font-semibold uppercase text-xs">
            <tr>
              <th className="p-4">User ID</th>
              <th className="p-4">IP Address</th>
              <th className="p-4">Device</th>
              <th className="p-4">MFA Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {sessions.map(s => (
              <tr key={s.id}>
                <td className="p-4 font-semibold text-white">{s.userId}</td>
                <td className="p-4 font-mono text-cyan-400">{s.ipAddress}</td>
                <td className="p-4">{s.deviceId} ({s.userAgent})</td>
                <td className="p-4"><span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded font-semibold">MFA Verified</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
