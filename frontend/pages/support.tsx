import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SupportTicketForm } from '../components/assistant/SupportTicketForm';
import { SupportTicketList } from '../components/assistant/SupportTicketList';
import { fetchApi } from '../services/apiClient';
import { SupportTicket } from '../types';
import { LifeBuoy, Plus, MessageSquare } from 'lucide-react';

export default function SupportCenterPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      const res = await fetchApi<{ success: boolean; data: SupportTicket[] }>('/support/tickets');
      setTickets(res.data || []);
    } catch {
      setTickets([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <>
      <SEOHead
        title="Support Ticket Center | NexoApps"
        description="Open support tickets, report technical issues, and track resolutions with NexoApps Support Staff."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
          {/* Hero Banner */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <LifeBuoy className="w-6 h-6 text-brand-cyan" /> Support Ticket Center
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary mt-1">
                Submit technical inquiries, report account/publishing issues, and receive dedicated staff responses.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet hover:shadow-glow-cyan flex items-center gap-2 transition-all shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{showForm ? 'Close Form' : 'New Ticket'}</span>
            </button>
          </div>

          {/* New Ticket Form Modal/Panel */}
          {showForm && (
            <SupportTicketForm
              onSuccess={(newTicket) => {
                setShowForm(false);
                fetchTickets();
              }}
              onCancel={() => setShowForm(false)}
            />
          )}

          {/* Ticket List Stream */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-2">
              <MessageSquare className="w-4 h-4 text-brand-cyan" /> Active & Archived Tickets ({tickets.length})
            </h3>

            <SupportTicketList tickets={tickets} onRefresh={fetchTickets} />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
