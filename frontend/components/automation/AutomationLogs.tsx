import React from 'react';

export const AutomationLogs: React.FC = () => {
  const logs = [
    { time: '17:04:12', level: 'INFO', msg: 'Workflow [Invoice Processing Pipeline] initialized by Webhook', id: 'log-101' },
    { time: '17:04:13', level: 'INFO', msg: 'RPA Bot [Invoice OCR Extractor Bot] extracted 14 fields with 99.1% confidence', id: 'log-102' },
    { time: '17:04:14', level: 'INFO', msg: 'Business Rule [High Value Threshold] evaluated: PASSED ($12,500 < $50,000)', id: 'log-103' },
    { time: '17:04:15', level: 'INFO', msg: 'SAP S/4HANA Ledger Post connection verified. Document posted: DOC-88192', id: 'log-104' },
  ];

  return (
    <div className="p-6 space-y-6 text-slate-100">
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white">Automation System Audit Logs</h2>
        <p className="text-slate-400 text-sm">Detailed system execution traces and step audit records</p>
      </div>

      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs space-y-2">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-4 p-2 hover:bg-slate-900 rounded">
            <span className="text-slate-500">{log.time}</span>
            <span className="text-emerald-400 font-bold">{log.level}</span>
            <span className="text-slate-300">{log.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
