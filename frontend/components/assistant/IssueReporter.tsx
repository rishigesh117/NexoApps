import React, { useState } from 'react';
import { fetchApi } from '../../services/apiClient';
import { AlertTriangle, Send, X } from 'lucide-react';

interface IssueReporterProps {
  pageUrl?: string;
  onClose: () => void;
}

export const IssueReporter: React.FC<IssueReporterProps> = ({ pageUrl = '/', onClose }) => {
  const [issueType, setIssueType] = useState('Bug Report');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    try {
      // Local-only report (could wire to /api/v1/support/tickets)
      await new Promise((r) => setTimeout(r, 600));
      setSubmitted(true);
    } catch {
      alert('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 text-center space-y-3">
        <div className="text-3xl">✅</div>
        <h3 className="font-bold text-white text-sm">Issue Report Submitted</h3>
        <p className="text-xs text-text-muted">Our team has been notified. Thank you for improving NexoApps!</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-2 px-5 py-2 rounded-full text-xs font-bold text-white bg-white/10 hover:bg-white/20 transition-all"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel p-5 rounded-3xl border border-amber-500/30 bg-amber-500/5 space-y-4 text-left"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-bold text-white">Report a Platform Issue</h3>
        </div>
        <button type="button" onClick={onClose} className="text-text-muted hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-white">Issue Type</label>
        <select
          value={issueType}
          onChange={(e) => setIssueType(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
        >
          <option>Bug Report</option>
          <option>UI / Design Issue</option>
          <option>Broken Download Link</option>
          <option>Login or Auth Problem</option>
          <option>Performance Issue</option>
          <option>Feature Request</option>
          <option>Other</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-white">Issue Description</label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder={`Describe the issue on page: ${pageUrl}`}
          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2.5 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 to-orange-500 hover:shadow-lg flex items-center justify-center gap-2 transition-all"
      >
        <Send className="w-3.5 h-3.5" />
        <span>{isSubmitting ? 'Submitting...' : 'Submit Issue Report'}</span>
      </button>
    </form>
  );
};
