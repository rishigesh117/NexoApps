import React, { useState, useEffect } from 'react';
import { DeveloperLayout } from '../../components/developer/DeveloperLayout';
import { developerService } from '../../services/developerService';
import { AppItem, SubmissionItemRecord } from '../../types';
import { SubmissionStatusBadge } from '../../components/developer/SubmissionStatusBadge';
import { Grid, Plus, Send, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function DeveloperAppsPage() {
  const [myApps, setMyApps] = useState<AppItem[]>([]);
  const [submissions, setSubmissions] = useState<SubmissionItemRecord[]>([]);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const [appTitle, setAppTitle] = useState('');
  const [versionName, setVersionName] = useState('1.0.0');
  const [category, setCategory] = useState<'Android Apps' | 'AI Apps' | 'Utilities' | 'College Projects'>('Android Apps');
  const [changesSummary, setChangesSummary] = useState('');

  const fetchApps = async () => {
    try {
      const res = await developerService.getDashboard();
      setMyApps(res.myApps || []);
    } catch {
      setMyApps([]);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleSubmitForReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const sub = await developerService.submitApp({
        appTitle,
        versionName,
        buildNumber: 1,
        category,
        changesSummary,
        submissionType: 'New Release',
      });
      setSubmissions((prev) => [sub, ...prev]);
      setIsSubmitModalOpen(false);
      setAppTitle('');
      setChangesSummary('');
      alert('Application submitted to Owner Review Panel successfully!');
    } catch (err: any) {
      alert(err.message || 'Submission failed');
    }
  };

  return (
    <DeveloperLayout title="My Apps & Submissions | NexoApps Console">
      <div className="space-y-6 text-left">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Grid className="w-5 h-5 text-brand-cyan" /> My Registered Apps & Submission Requests
            </h3>
            <p className="text-xs text-text-secondary">
              Submit new applications or version update requests to the Owner review panel for public publication.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-5 py-2.5 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" /> Submit App for Review
          </button>
        </div>

        {/* Submissions Track Queue */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
            <Clock className="w-4 h-4 text-brand-cyan" /> Active Submission Requests
          </h4>

          {submissions.length === 0 ? (
            <p className="text-xs text-text-muted py-4 text-center">No pending submissions submitted recently.</p>
          ) : (
            <div className="space-y-3">
              {submissions.map((sub) => (
                <div key={sub.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                  <div className="space-y-1">
                    <h5 className="font-bold text-white">{sub.appTitle} (v{sub.versionName})</h5>
                    <p className="text-text-secondary text-[11px]">{sub.changesSummary}</p>
                  </div>
                  <SubmissionStatusBadge status={sub.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Submit App */}
        {isSubmitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-white/15 shadow-2xl space-y-4 text-xs">
              <h4 className="text-base font-bold text-white">Submit New App for Owner Review</h4>
              <form onSubmit={handleSubmitForReview} className="space-y-3">
                <div>
                  <label className="text-text-secondary font-semibold block">Application Title</label>
                  <input
                    type="text"
                    value={appTitle}
                    onChange={(e) => setAppTitle(e.target.value)}
                    placeholder="e.g. Cricket Scoring Pro"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-3 py-2 text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-text-secondary font-semibold block">Version</label>
                    <input
                      type="text"
                      value={versionName}
                      onChange={(e) => setVersionName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-3 py-2 text-white font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-text-secondary font-semibold block">Category</label>
                    <select
                      value={category}
                      onChange={(e: any) => setCategory(e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-2xl px-3 py-2 text-white"
                    >
                      <option value="Android Apps">Android Apps</option>
                      <option value="AI Apps">AI Apps</option>
                      <option value="Utilities">Utilities</option>
                      <option value="College Projects">College Projects</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-text-secondary font-semibold block">Release Notes & Changes Summary</label>
                  <textarea
                    value={changesSummary}
                    onChange={(e) => setChangesSummary(e.target.value)}
                    rows={3}
                    placeholder="Brief description of application features..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 text-white resize-none"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="px-4 py-2 rounded-full text-text-muted hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-full text-slate-950 font-bold bg-gradient-to-r from-brand-cyan to-brand-violet"
                  >
                    Submit for Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DeveloperLayout>
  );
}
