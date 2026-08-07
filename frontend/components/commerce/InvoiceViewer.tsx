import React from 'react';
import { FileText, Download } from 'lucide-react';

export const InvoiceViewer: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Billing Invoices & Receipts</h2>
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/60 text-slate-400 font-semibold uppercase text-xs">
            <tr>
              <th className="p-4">Invoice #</th>
              <th className="p-4">Date</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            <tr>
              <td className="p-4 font-mono text-white">INV-2026-0001</td>
              <td className="p-4">Aug 06, 2026</td>
              <td className="p-4 font-bold text-white">$149.00</td>
              <td className="p-4"><span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs">Paid</span></td>
              <td className="p-4"><button className="text-blue-400 hover:underline flex items-center gap-1"><Download className="w-4 h-4" /> PDF</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
