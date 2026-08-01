import React, { useState } from 'react';
import { inviteOrganizationMember } from '../../services/organizationService';
import { WorkspaceRole } from '../../types';
import { UserPlus, X, Send } from 'lucide-react';

interface InviteMemberModalProps {
  orgId: string;
  onSuccess: () => void;
  onClose: () => void;
}

export const InviteMemberModal: React.FC<InviteMemberModalProps> = ({ orgId, onSuccess, onClose }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<WorkspaceRole>('developer');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      await inviteOrganizationMember(orgId, email, role);
      onSuccess();
    } catch {
      alert('Failed to send invitation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <form onSubmit={handleSubmit} className="w-full max-w-md glass-panel p-6 rounded-3xl border border-white/10 space-y-4 text-left shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-brand-cyan" />
            <h3 className="text-base font-bold text-white">Invite Team Member</h3>
          </div>
          <button type="button" onClick={onClose} className="text-text-muted hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-white">Member Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="colleague@company.com"
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-white">Role Assignment</label>
          <select
            value={role}
            onChange={(e: any) => setRole(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
          >
            <option value="admin">Admin — Full organization management</option>
            <option value="pm">Project Manager — Manage projects & team</option>
            <option value="developer">Developer — Upload builds & view analytics</option>
            <option value="reviewer">Reviewer — Review APK submissions & audits</option>
            <option value="viewer">Viewer — Read-only access</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center justify-center gap-2 transition-all"
        >
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? 'Sending Invitation...' : 'Send Workspace Invitation'}</span>
        </button>
      </form>
    </div>
  );
};
