import React, { useState } from 'react';
import { createOrganization } from '../../services/organizationService';
import { Organization } from '../../types';
import { Building2, X, Plus } from 'lucide-react';

interface CreateOrganizationModalProps {
  onSuccess: (org: Organization) => void;
  onClose: () => void;
}

export const CreateOrganizationModal: React.FC<CreateOrganizationModalProps> = ({ onSuccess, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [country, setCountry] = useState('India');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      const newOrg = await createOrganization({ name, description, websiteUrl, country });
      onSuccess(newOrg);
    } catch {
      alert('Failed to create organization.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <form onSubmit={handleSubmit} className="w-full max-w-md glass-panel p-6 rounded-3xl border border-white/10 space-y-4 text-left shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-brand-cyan" />
            <h3 className="text-base font-bold text-white">Create New Organization</h3>
          </div>
          <button type="button" onClick={onClose} className="text-text-muted hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-white">Organization Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g. Batlytics Studio Org"
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-white">Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief team description..."
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-white">Website</label>
            <input
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-white">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center justify-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{isSubmitting ? 'Creating...' : 'Create Organization Workspace'}</span>
        </button>
      </form>
    </div>
  );
};
