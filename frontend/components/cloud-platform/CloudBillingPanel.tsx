import React from 'react';
import { DollarSign } from 'lucide-react';

export const CloudBillingPanel: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Cloud Infrastructure Billing & Cost Allocation</h2>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-xl">
        <span className="text-slate-400 text-sm">Monthly Spend (Enterprise Account)</span>
        <div className="text-3xl font-extrabold text-white mt-1 mb-4">$1,240.50 / $5,000.00 Budget</div>
        <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden">
          <div className="bg-cyan-500 h-full w-1/4"></div>
        </div>
      </div>
    </div>
  );
};
