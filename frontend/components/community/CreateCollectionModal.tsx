import React, { useState } from 'react';
import { Collection } from '../../types';
import { Layers, Plus, Save, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Collection>) => void;
  editCollection?: Collection | null;
}

export const CreateCollectionModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  editCollection,
}) => {
  const [title, setTitle] = useState(editCollection?.title || '');
  const [description, setDescription] = useState(editCollection?.description || '');
  const [visibility, setVisibility] = useState<'Public' | 'Private' | 'Unlisted'>(editCollection?.visibility || 'Public');
  const [category, setCategory] = useState(editCollection?.category || 'Favorites');
  const [coverImage, setCoverImage] = useState(editCollection?.coverImage || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=600&auto=format&fit=crop');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: editCollection?.id,
      title,
      description,
      visibility,
      category,
      coverImage,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-white/15 shadow-2xl space-y-4 text-xs text-left">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-cyan" />
            {editCollection ? 'Edit Collection' : 'Create Custom App Collection'}
          </h4>
          <button onClick={onClose} className="p-1 rounded-full text-text-muted hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-text-secondary font-semibold block">Collection Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Essential AI Utilities"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-3 py-2 text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-text-secondary font-semibold block">Visibility</label>
              <select
                value={visibility}
                onChange={(e: any) => setVisibility(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-2xl px-3 py-2 text-white"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="Unlisted">Unlisted</option>
              </select>
            </div>

            <div>
              <label className="text-text-secondary font-semibold block">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-2xl px-3 py-2 text-white"
              >
                <option value="Favorites">Favorites</option>
                <option value="AI Apps">AI Apps</option>
                <option value="Utilities">Utilities</option>
                <option value="Games">Games</option>
                <option value="Education">Education</option>
                <option value="Sports">Sports</option>
                <option value="College Projects">College Projects</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-text-secondary font-semibold block">Cover Image URL</label>
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-text-secondary font-semibold block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Describe your collection playlist..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 text-white resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-full text-text-muted hover:text-white">
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full text-slate-950 font-bold bg-gradient-to-r from-brand-cyan to-brand-violet"
            >
              {editCollection ? 'Save Changes' : 'Create Collection'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
