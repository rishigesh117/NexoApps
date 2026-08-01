import React, { useState } from 'react';
import { fetchApi } from '../../services/apiClient';
import { SupportTicket } from '../../types';
import { Send, LifeBuoy, X } from 'lucide-react';

interface SupportTicketFormProps {
  onSuccess: (ticket: SupportTicket) => void;
  onCancel?: () => void;
}

export const SupportTicketForm: React.FC<SupportTicketFormProps> = ({ onSuccess, onCancel }) => {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<'Account' | 'Publishing' | 'Downloads' | 'Security' | 'Billing' | 'General'>('General');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High' | 'Urgent'>('Medium');
  const [description, setDescription] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetchApi<{ success: boolean; data: SupportTicket }>('/support/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, category, priority, description, userEmail }),
      });
      onSuccess(res.data);
    } catch {
      alert('Failed to submit ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 text-left shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <LifeBuoy className="w-5 h-5 text-brand-cyan" />
          <h3 className="text-base font-bold text-white">Create New Support Ticket</h3>
        </div>
        {onCancel && (
          <button type="button" onClick={onCancel} className="text-text-muted hover:text-white">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-white">Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          placeholder="Brief summary of your issue..."
          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-white">Category</label>
          <select
            value={category}
            onChange={(e: any) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
          >
            <option value="General">General Inquiry</option>
            <option value="Publishing">Publishing & APK Upload</option>
            <option value="Downloads">Downloads & Installation</option>
            <option value="Account">Account & Security</option>
            <option value="Billing">Billing & Revenue</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-white">Priority Level</label>
          <select
            value={priority}
            onChange={(e: any) => setPriority(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-white">Contact Email</label>
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Your email address for ticket updates..."
          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-white">Issue Description</label>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Detailed description of the issue or feature request..."
          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet hover:shadow-glow-cyan flex items-center justify-center gap-2 transition-all"
      >
        <Send className="w-4 h-4" />
        <span>{isSubmitting ? 'Submitting Ticket...' : 'Submit Support Ticket'}</span>
      </button>
    </form>
  );
};
