import React, { useState, useEffect } from 'react';
import { Check, Zap, Layers } from 'lucide-react';
import { subscriptionService } from '../../services/subscriptionService';
import { SubscriptionPlan, Subscription } from '../../../shared/types';

export const SubscriptionManager: React.FC = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [currentSub, setCurrentSub] = useState<Subscription | null>(null);

  useEffect(() => {
    subscriptionService.getPlans().then(setPlans);
    subscriptionService.getCurrentSubscription().then(setCurrentSub);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-2">Subscription & Tier Manager</h2>
      <p className="text-slate-400 mb-8">Manage API quotas, workspace billing cycles, and plan upgrades.</p>

      {currentSub && (
        <div className="bg-slate-800 p-5 rounded-xl border border-blue-500/40 mb-8 flex justify-between items-center">
          <div>
            <span className="text-xs text-blue-400 uppercase font-semibold">Active Plan</span>
            <h3 className="text-xl font-bold text-white">Pro Developer Plan ($49/mo)</h3>
          </div>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-medium">Active</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(plan => (
          <div key={plan.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="text-3xl font-extrabold text-white mb-4">${plan.price}<span className="text-sm text-slate-400 font-normal">/mo</span></div>
              <ul className="space-y-2 text-sm text-slate-300 mb-6">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> {feat}
                  </li>
                ))}
              </ul>
            </div>
            <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition">
              {currentSub?.planId === plan.id ? 'Current Plan' : 'Upgrade Plan'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
