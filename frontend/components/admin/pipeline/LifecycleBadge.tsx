import React from 'react';
import { LifecycleState } from '../../../types';
import { CheckCircle2, Clock, FileEdit, Archive, AlertTriangle, Trash2 } from 'lucide-react';

interface LifecycleBadgeProps {
  state?: LifecycleState | string;
}

export const LifecycleBadge: React.FC<LifecycleBadgeProps> = ({ state = 'Published' }) => {
  switch (state) {
    case 'Draft':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
          <FileEdit className="w-3 h-3" /> Draft
        </span>
      );
    case 'Pending Validation':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 animate-pulse">
          <Clock className="w-3 h-3" /> Pending Validation
        </span>
      );
    case 'Ready':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
          <CheckCircle2 className="w-3 h-3" /> Ready to Publish
        </span>
      );
    case 'Published':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          <CheckCircle2 className="w-3 h-3" /> Published Live
        </span>
      );
    case 'Archived':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
          <Archive className="w-3 h-3" /> Archived
        </span>
      );
    case 'Deleted':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
          <Trash2 className="w-3 h-3" /> Deleted
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-white border border-white/20">
          {state}
        </span>
      );
  }
};
