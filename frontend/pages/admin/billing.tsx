import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { CreditCard, DollarSign, Wallet } from 'lucide-react';

export default function AdminBillingPage() {
  return (
    <AdminLayout title="Admin Platform Billing Console | NexoApps Admin">
      <div className="space-y-8 text-left">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-emerald-400" /> Platform SaaS Revenue & Billing Operations
          </h1>
          <p className="text-xs text-text-secondary">
            Global monthly recurring revenue (MRR), subscription renewals, and invoice ledger.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
            <span className="text-xs text-text-muted flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-emerald-400" /> Monthly Recurring Revenue (MRR)
            </span>
            <p className="text-3xl font-black text-white">$42,850.00</p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
            <span className="text-xs text-text-muted flex items-center gap-1">
              <Wallet className="w-4 h-4 text-brand-cyan" /> Active Enterprise Subscriptions
            </span>
            <p className="text-3xl font-black text-brand-cyan">215 Accounts</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
