import React from 'react';
import { Users, DollarSign, Link as LinkIcon, Share2 } from 'lucide-react';

export const AffiliateDashboard: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Affiliate Program Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
          <span className="text-slate-400 text-sm">Total Referral Earnings</span>
          <div className="text-2xl font-bold text-white mt-1">$1,420.00</div>
        </div>
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
          <span className="text-slate-400 text-sm">Total Referrals</span>
          <div className="text-2xl font-bold text-white mt-1">18 Users</div>
        </div>
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
          <span className="text-slate-400 text-sm">Commission Rate</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">20.0%</div>
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h3 className="text-base font-semibold text-white mb-2">Your Unique Referral Link</h3>
        <div className="bg-slate-900 p-3.5 rounded-lg font-mono text-sm text-blue-400 flex justify-between items-center">
          <span>https://nexoapps.com/ref?aff=user-admin</span>
          <button className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs">Copy Link</button>
        </div>
      </div>
    </div>
  );
};
