import React, { useState } from 'react';
import { SupportTicket } from '../../types';
import { fetchApi } from '../../services/apiClient';
import { LifeBuoy, MessageSquare, CheckCircle2, Clock, AlertTriangle, Send } from 'lucide-react';

interface SupportTicketListProps {
  tickets: SupportTicket[];
  onRefresh: () => void;
}

export const SupportTicketList: React.FC<SupportTicketListProps> = ({ tickets, onRefresh }) => {
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [replyMsg, setReplyMsg] = useState('');

  const handleSendReply = async (ticketId: string) => {
    if (!replyMsg.trim()) return;
    try {
      await fetchApi(`/support/tickets/${ticketId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: replyMsg }),
      });
      setReplyMsg('');
      onRefresh();
    } catch {
      alert('Failed to send reply.');
    }
  };

  if (tickets.length === 0) {
    return (
      <div className="glass-panel p-8 rounded-3xl border border-white/10 text-center space-y-2">
        <p className="text-xs text-text-muted">No support tickets found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-left">
      {tickets.map((t) => {
        const isExpanded = activeTicketId === t.id;

        return (
          <div key={t.id} className="glass-panel p-5 rounded-3xl border border-white/10 space-y-4 transition-all">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-sm">{t.subject}</span>
                  <span className="text-[10px] font-mono text-text-muted">#{t.id}</span>
                </div>
                <span className="text-[11px] text-text-muted">
                  Submitted by {t.userName} ({t.userEmail}) • {new Date(t.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    t.status === 'Resolved'
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : t.status === 'In Progress'
                      ? 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/40'
                      : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  }`}
                >
                  {t.status}
                </span>

                <button
                  type="button"
                  onClick={() => setActiveTicketId(isExpanded ? null : t.id)}
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all"
                >
                  {isExpanded ? 'Hide Conversation' : `Replies (${t.replies?.length || 0})`}
                </button>
              </div>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed">{t.description}</p>

            {/* Replies Thread */}
            {isExpanded && (
              <div className="pt-3 space-y-3 border-t border-white/5">
                {t.replies && t.replies.length > 0 && (
                  <div className="space-y-2">
                    {t.replies.map((r) => (
                      <div key={r.id} className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className={`font-bold ${r.isAdmin ? 'text-brand-cyan' : 'text-white'}`}>
                            {r.senderName} {r.isAdmin && '(Support Staff)'}
                          </span>
                          <span className="text-[10px] text-text-muted">{new Date(r.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="text-text-secondary">{r.message}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Form */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={replyMsg}
                    onChange={(e) => setReplyMsg(e.target.value)}
                    placeholder="Type your reply message..."
                    className="flex-1 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
                  />
                  <button
                    type="button"
                    onClick={() => handleSendReply(t.id)}
                    className="px-4 py-2 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan transition-all"
                  >
                    Send Reply
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
