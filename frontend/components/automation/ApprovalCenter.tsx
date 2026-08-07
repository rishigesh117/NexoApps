import React, { useState } from 'react';

export const ApprovalCenter: React.FC = () => {
  const [requests, setRequests] = useState([
    { id: 'req-1', title: 'Cloud Infrastructure Expansion ($45,000)', requester: 'Alex Vance', status: 'pending', time: '1 hour ago' },
    { id: 'req-2', title: 'Quarterly Compliance Audit Sign-off', requester: 'Felix Baum', status: 'approved', time: 'Yesterday' },
  ]);

  const handleAction = (id: string, status: string) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  return (
    <div className="p-6 space-y-6 text-slate-100">
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white">Enterprise Approval Center</h2>
        <p className="text-slate-400 text-sm">Review, approve, or reject multi-tier workflow approval requests</p>
      </div>

      <div className="space-y-4">
        {requests.map((req) => (
          <div key={req.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-bold text-white text-base">{req.title}</span>
                <span className={`text-xs px-2 py-0.5 rounded font-semibold uppercase ${req.status === 'pending' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  {req.status}
                </span>
              </div>
              <p className="text-slate-400 text-xs">Requested by <span className="text-slate-200">{req.requester}</span> &bull; {req.time}</p>
            </div>

            {req.status === 'pending' && (
              <div className="flex gap-2">
                <button onClick={() => handleAction(req.id, 'rejected')} className="px-4 py-2 bg-rose-600/20 text-rose-300 hover:bg-rose-600/30 rounded-xl text-xs font-semibold border border-rose-500/30">
                  Reject
                </button>
                <button onClick={() => handleAction(req.id, 'approved')} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-lg">
                  Approve Request
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
