import React from 'react';
import { AuditLogEntry } from '../../types';
import { ShieldCheck, UserCheck, ShieldAlert, Key, Rocket, Lock } from 'lucide-react';

interface AuditTableProps {
  logs: AuditLogEntry[];
}

export const AuditTable: React.FC<AuditTableProps> = ({ logs }) => {
  return (
    <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden text-left shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-white/5 border-b border-white/10 text-text-muted font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Actor</th>
              <th className="px-6 py-4">Action Event</th>
              <th className="px-6 py-4">Resource</th>
              <th className="px-6 py-4">IP Address</th>
              <th className="px-6 py-4">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-white/5 transition-all">
                <td className="px-6 py-4 font-bold text-white">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{log.actorEmail}</span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      {log.actorRole}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono font-bold text-brand-cyan">{log.actionType}</td>
                <td className="px-6 py-4 text-text-secondary">{log.resource}</td>
                <td className="px-6 py-4 font-mono text-text-muted">{log.ipAddress}</td>
                <td className="px-6 py-4 text-text-muted">{new Date(log.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
