import React, { useState } from 'react';
import { SubmissionItemRecord } from '../../types';
import { SubmissionStatusBadge } from '../developer/SubmissionStatusBadge';
import { ReviewCommentsPanel } from './ReviewCommentsPanel';
import { developerService } from '../../services/developerService';
import { CheckCircle2, XCircle, AlertTriangle, Eye, ShieldCheck, Clock } from 'lucide-react';

interface QueueProps {
  submissions: SubmissionItemRecord[];
  onRefresh: () => void;
}

export const SubmissionQueueTable: React.FC<QueueProps> = ({ submissions, onRefresh }) => {
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);

  const handleReviewAction = async (id: string, action: 'approve' | 'reject' | 'changes_requested') => {
    let reason = '';
    if (action === 'reject' || action === 'changes_requested') {
      reason = prompt(`Enter reason for ${action.replace('_', ' ')}:`) || '';
      if (!reason.trim()) return;
    }

    try {
      await developerService.reviewSubmission(id, action, reason);
      onRefresh();
    } catch (err: any) {
      alert(err.message || 'Action failed');
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-cyan" /> App Store Submission Review Queue
          </h3>
          <p className="text-xs text-text-secondary">
            Review submitted applications and version updates from registered developers prior to public publication.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
          {submissions.length} Submissions
        </span>
      </div>

      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        {submissions.length === 0 ? (
          <p className="text-xs text-text-muted py-8 text-center">No pending app submissions in queue.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-white/5 text-text-muted border-b border-white/10 uppercase text-[10px] tracking-wider">
                  <th className="p-4 font-semibold">Application & Type</th>
                  <th className="p-4 font-semibold">Developer Studio</th>
                  <th className="p-4 font-semibold">Version & Build</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Submitted Date</th>
                  <th className="p-4 font-semibold text-right">Review Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {submissions.map((item) => (
                  <React.Fragment key={item.id}>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-bold text-white">
                        {item.appTitle}
                        <span className="block text-[10px] text-brand-cyan font-normal">{item.category} ({item.submissionType})</span>
                      </td>

                      <td className="p-4 font-semibold text-text-secondary">
                        {item.developer?.studioName || 'Studio'}
                        <span className="block text-[10px] text-text-muted font-normal">{item.developer?.email}</span>
                      </td>

                      <td className="p-4 font-mono">
                        v{item.versionName}
                        <span className="block text-[10px] text-text-muted font-normal">Build #{item.buildNumber}</span>
                      </td>

                      <td className="p-4">
                        <SubmissionStatusBadge status={item.status} />
                      </td>

                      <td className="p-4 text-text-muted font-mono text-[11px]">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>

                      <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setSelectedSubId(selectedSubId === item.id ? null : item.id)}
                          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-all inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5 text-brand-cyan" />
                          <span>Comments</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleReviewAction(item.id, 'approve')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 text-xs font-bold transition-all inline-flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                        </button>

                        <button
                          type="button"
                          onClick={() => handleReviewAction(item.id, 'changes_requested')}
                          className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 text-xs font-bold transition-all inline-flex items-center gap-1"
                        >
                          <AlertTriangle className="w-3.5 h-3.5" /> Changes
                        </button>

                        <button
                          type="button"
                          onClick={() => handleReviewAction(item.id, 'reject')}
                          className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30 text-xs font-bold transition-all inline-flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </button>
                      </td>
                    </tr>

                    {/* Comments Thread Expanded Row */}
                    {selectedSubId === item.id && (
                      <tr className="bg-slate-900/80">
                        <td colSpan={6} className="p-4">
                          <ReviewCommentsPanel submissionId={item.id} />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
