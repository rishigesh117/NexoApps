import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { CreditCard, CheckCircle2 } from 'lucide-react';

export default function AdminPaymentsPage() {
  const transactions = [
    { id: 'tx-1', tenantName: 'Batlytics Sports Inc.', amount: 299.00, status: 'SUCCEEDED', date: new Date().toISOString() },
    { id: 'tx-2', tenantName: 'Nexo AI Developer Org', amount: 99.00, status: 'SUCCEEDED', date: new Date(Date.now() - 86400000).toISOString() },
  ];

  return (
    <AdminLayout title="Admin Payment Transactions Ledger | NexoApps Admin">
      <div className="space-y-8 text-left">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-brand-cyan" /> Payment Transactions Audit Ledger
          </h1>
          <p className="text-xs text-text-secondary">
            Inspect live credit card payments, Stripe transactions, and settlement status.
          </p>
        </div>

        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="glass-panel p-5 rounded-3xl border border-white/10 flex items-center justify-between gap-4 shadow-2xl">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-white text-sm">{tx.tenantName}</h4>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {tx.status}
                  </span>
                </div>
                <p className="text-xs text-text-muted">{new Date(tx.date).toLocaleDateString()}</p>
              </div>
              <span className="text-base font-black text-white">${tx.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
