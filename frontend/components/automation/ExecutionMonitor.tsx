import React from 'react';

export const ExecutionMonitor: React.FC = () => {
  const executions = [
    { id: 'exec-9901', workflow: 'Invoice Processing Pipeline', status: 'completed', duration: '1.42s', time: '2 mins ago' },
    { id: 'exec-9902', workflow: 'Multi-Cloud Provisioning', status: 'completed', duration: '5.10s', time: '14 mins ago' },
    { id: 'exec-9903', workflow: 'ITSM Auto-Triage', status: 'running', duration: '0.85s', time: 'Just now' },
  ];

  return (
    <div className="p-6 space-y-6 text-slate-100">
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white">Live Execution Monitor</h2>
        <p className="text-slate-400 text-sm">Real-time workflow step execution tracking and telemetry logs</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase text-xs">
            <tr>
              <th className="p-4">Execution ID</th>
              <th className="p-4">Workflow</th>
              <th className="p-4">Status</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Triggered</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {executions.map((exec) => (
              <tr key={exec.id} className="hover:bg-slate-800/50">
                <td className="p-4 font-mono text-indigo-400">{exec.id}</td>
                <td className="p-4 font-bold text-white">{exec.workflow}</td>
                <td className="p-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${exec.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400 animate-pulse'}`}>
                    {exec.status}
                  </span>
                </td>
                <td className="p-4 font-mono">{exec.duration}</td>
                <td className="p-4 text-slate-400">{exec.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
