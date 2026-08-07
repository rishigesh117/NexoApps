import React, { useState, useEffect } from 'react';
import { ShoppingBag, TrendingUp, DollarSign, Users, CreditCard, Tag, Layers, ArrowUpRight } from 'lucide-react';
import { commerceService } from '../../services/commerceService';

export const MarketplaceDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    commerceService.getAnalytics().then(setMetrics);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            AI Commerce Platform & Marketplace Hub
          </h1>
          <p className="text-slate-400 mt-1">Enterprise monetization, products, subscriptions, and revenue analytics (v7.1)</p>
        </div>
        <div className="flex gap-3">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 text-sm font-medium">
            Version 7.1 Production Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Gross Volume</span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">${metrics?.grossMerchandiseVolume?.toLocaleString() || '124,500'}</div>
          <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +14.2% this month
          </div>
        </div>

        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Monthly Recurring Revenue</span>
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">${metrics?.monthlyRecurringRevenue?.toLocaleString() || '34,200'}</div>
          <div className="text-xs text-blue-400 mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +8.6% subscriptions
          </div>
        </div>

        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Total Orders</span>
            <ShoppingBag className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white">{metrics?.totalOrders?.toLocaleString() || '1,480'}</div>
          <div className="text-xs text-indigo-400 mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> 98.4% fulfillment
          </div>
        </div>

        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Active Subscriptions</span>
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">{metrics?.activeSubscriptions?.toLocaleString() || '890'}</div>
          <div className="text-xs text-purple-400 mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +24 new accounts today
          </div>
        </div>
      </div>
    </div>
  );
};
