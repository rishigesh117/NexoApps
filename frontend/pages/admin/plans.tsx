import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getSubscriptionPlans } from '../../services/saasSubscriptionService';
import { SubscriptionPlan } from '../../types';
import { Sparkles, Check } from 'lucide-react';

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);

  useEffect(() => {
    getSubscriptionPlans().then((data) => setPlans(data)).catch(() => {});
  }, []);

  return (
    <AdminLayout title="Admin Subscription Plans Manager | NexoApps Admin">
      <div className="space-y-8 text-left">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-rose-400" /> Subscription Tier Plans Manager
          </h1>
          <p className="text-xs text-text-secondary">
            Configure pricing tiers, member quotas, storage limits, and feature flags.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((p) => (
            <div key={p.id} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-white text-base">{p.name}</h3>
                <span className="text-xl font-black text-emerald-400 font-mono">${p.priceMonthly}/mo</span>
              </div>
              <p className="text-xs text-text-muted">Storage: {p.storageGb} GB • Members: {p.maxMembers} Seats</p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
