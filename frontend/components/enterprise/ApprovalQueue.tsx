import React from 'react';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

export const ApprovalQueue: React.FC = () => {
  const requests = [
    { id: 'req-1', requester: 'AI Employee Alex', details: 'Budget approval for $45,000 cloud infrastructure expansion', status: 'pending', time: '1 hr ago' },
    { id: 'req-2', requester: 'AI Employee Felix', details: 'Quarterly compliance audit sign-off', status: 'approved', time: '1 day ago' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <h3 className="text-lg font-bold text-white">Enterprise Approval Queue & Sign-Offs</h3>
      <div className="space-y-3">
        {requests.map((r) => (
          <div key={r.id} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-amber-400" />
              <div>
                <h4 className="text-xs font-bold text-white">{r.details}</h4>
                <p className="text-[10px] text-text-muted mt-0.5">Requester: {r.requester} • {r.time}</p>
              </div>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${r.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
