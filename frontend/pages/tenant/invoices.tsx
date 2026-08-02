import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { TenantSidebar } from '../../components/saas/TenantSidebar';
import { getInvoices } from '../../services/invoiceService';
import { Invoice } from '../../types';
import { FileText, Download, CheckCircle2 } from 'lucide-react';

export default function TenantInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    getInvoices().then((data) => setInvoices(data)).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="Invoices & Payment Receipts | NexoApps SaaS Console"
        description="View past subscription billing invoices, payment receipts, and download PDF statements."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <TenantSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <FileText className="w-6 h-6 text-amber-400" /> Invoices & Payment Receipts
              </h1>
              <p className="text-xs text-text-secondary">
                Download PDF billing statements and inspect transaction history for your organization.
              </p>
            </div>

            <div className="space-y-4">
              {invoices.map((inv) => (
                <div key={inv.id} className="glass-panel p-5 rounded-3xl border border-white/10 flex items-center justify-between gap-4 shadow-2xl">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-white text-sm">{inv.invoiceNumber}</h4>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> {inv.status}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted">{new Date(inv.createdAt).toLocaleDateString()}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-base font-black text-white">${inv.amountPaid.toFixed(2)}</span>
                    <button
                      type="button"
                      onClick={() => alert(`Downloading PDF for ${inv.invoiceNumber}`)}
                      className="px-4 py-2 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-all shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" /> PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
