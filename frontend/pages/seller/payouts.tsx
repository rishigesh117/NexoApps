import React from 'react';
import { DollarSign } from 'lucide-react';

export default function SellerPayoutsPage() {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Seller Payouts & Transfers</h2>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <span className="text-slate-400">Available Balance</span>
          <span className="text-2xl font-bold text-white">$1,450.00</span>
        </div>
        <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold">
          Request Payout Transfer
        </button>
      </div>
    </div>
  );
}
