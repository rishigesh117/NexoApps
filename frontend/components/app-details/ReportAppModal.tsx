import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, CheckCircle2, Loader2 } from 'lucide-react';
import { PrimaryButton } from '../ui/PrimaryButton';

interface ReportAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  appTitle: string;
}

export const ReportAppModal: React.FC<ReportAppModalProps> = ({
  isOpen,
  onClose,
  appTitle,
}) => {
  const [reason, setReason] = useState('Malware / Security Risk');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-4 text-left relative"
        >
          <button
            onClick={onClose}
            className="absolute right-5 top-5 p-2 rounded-xl bg-surface-200 text-text-muted hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Report Application</h3>
              <p className="text-xs text-text-muted">{appTitle}</p>
            </div>
          </div>

          {isSuccess ? (
            <div className="py-6 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-white">Report Submitted</h4>
              <p className="text-xs text-text-muted">Thank you for helping keep NexoApps safe.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">Reason for Report</label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white focus:outline-none focus:border-brand-cyan"
                >
                  <option value="Malware / Security Risk">Malware / Security Risk</option>
                  <option value="Broken Download Link">Broken Download Link</option>
                  <option value="Inappropriate Content">Inappropriate Content</option>
                  <option value="Copyright Infringement">Copyright Infringement</option>
                  <option value="Other Issue">Other Issue</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">Details & Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide additional details regarding your report..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white focus:outline-none focus:border-brand-cyan placeholder-text-muted"
                />
              </div>

              <PrimaryButton
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 text-xs font-bold bg-gradient-to-r from-red-500 to-rose-600 border-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting Report...
                  </span>
                ) : (
                  'Submit Security Report'
                )}
              </PrimaryButton>
            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
