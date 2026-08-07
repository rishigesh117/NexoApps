import React from 'react';
import { Tag, Plus } from 'lucide-react';

export const CouponManager: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Coupon & Discount Campaign Manager</h2>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Coupon Code
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono font-bold text-lg text-blue-400">WELCOME10</span>
            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs">Active</span>
          </div>
          <p className="text-sm text-slate-300">10% Off Digital Products & AI Models</p>
          <span className="text-xs text-slate-400 mt-2 block">42 / 500 Redeemed</span>
        </div>
      </div>
    </div>
  );
};
