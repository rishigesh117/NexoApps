import React from 'react';
import { SubmissionStatus } from '../../types';
import { Clock, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

interface Props {
  status: SubmissionStatus | string;
}

export const SubmissionStatusBadge: React.FC<Props> = ({ status }) => {
  switch (status) {
    case 'Pending Review':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
          <Clock className="w-3 h-3" /> Pending Owner Review
        </span>
      );
    case 'Approved':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          <CheckCircle2 className="w-3 h-3" /> Approved & Published
        </span>
      );
    case 'Rejected':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
          <XCircle className="w-3 h-3" /> Rejected
        </span>
      );
    case 'Changes Requested':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
          <AlertTriangle className="w-3 h-3" /> Action Required (Changes Requested)
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-white border border-white/20">
          {status}
        </span>
      );
  }
};
