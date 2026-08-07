import React from 'react';
import { Users } from 'lucide-react';

export default function TeamsMembersPage() {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Engineering Team Members & Collaborators</h2>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-xl">
        <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-400" /> Platform DevOps & SRE Team
        </h3>
        <p className="text-xs text-slate-400">8 Senior Engineers, 2 Lead Architects with Admin SCM permissions.</p>
      </div>
    </div>
  );
}
