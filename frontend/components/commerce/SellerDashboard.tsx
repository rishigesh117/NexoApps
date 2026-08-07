import React from 'react';
import { Store, DollarSign, Package, ArrowUpRight } from 'lucide-react';

export const SellerDashboard: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Seller & Creator Studio</h1>
          <p className="text-slate-400 mt-1">Manage marketplace store front, payout requests, and digital product listings.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold">
          + Publish Digital Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
          <span className="text-slate-400 text-sm">Store Revenue</span>
          <div className="text-2xl font-bold text-white mt-1">$14,500.00</div>
        </div>
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
          <span className="text-slate-400 text-sm">Active Products</span>
          <div className="text-2xl font-bold text-white mt-1">12 Models & Apps</div>
        </div>
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
          <span className="text-slate-400 text-sm">Store Rating</span>
          <div className="text-2xl font-bold text-amber-400 mt-1">4.9 / 5.0</div>
        </div>
      </div>
    </div>
  );
};
