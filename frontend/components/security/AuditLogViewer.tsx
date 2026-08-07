import React, { useState, useEffect } from 'react';
import { Eye, Lock } from 'lucide-react';
import { complianceService } from '../../services/complianceService';

export const AuditLogViewer: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    complianceService.getAuditLogs().then(setLogs);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Immutable Security Audit Trail</h2>
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/60 text-slate-400 font-semibold uppercase text-xs">
            <tr>
              <th className="p-4">Action</th>
              <th className="p-4">Actor</th>
              <th className="p-4">IP Address</th>
              <th className="p-4">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {logs.map(l => (
              <tr key={l.id}>
                <td className="p-4 font-mono text-cyan-400 font-bold">{l.action}</td>
                <td className="p-4">{l.actor}</td>
                <td className="p-4 font-mono text-slate-400">{l.ipAddress}</td>
                <td className="p-4 text-xs text-slate-400">{l.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
