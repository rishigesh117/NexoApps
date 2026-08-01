import React from 'react';
import { Collection } from '../../types';
import { Layers, Lock, Globe, Grid, Trash2, Edit3, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Props {
  collection: Collection;
  onDelete?: (id: string) => void;
  onEdit?: (collection: Collection) => void;
}

export const CollectionCard: React.FC<Props> = ({ collection, onDelete, onEdit }) => {
  return (
    <div className="glass-card rounded-3xl border border-white/10 overflow-hidden shadow-xl hover:border-white/20 transition-all flex flex-col justify-between text-left space-y-4 pb-5">
      <div className="space-y-3">
        {/* Cover Image */}
        <div className="h-36 w-full relative overflow-hidden bg-gradient-to-r from-brand-cyan/20 to-brand-violet/20">
          <img
            src={collection.coverImage || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=600&auto=format&fit=crop'}
            alt={collection.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/80 text-brand-cyan border border-white/15 backdrop-blur-md flex items-center gap-1">
              {collection.visibility === 'Private' ? <Lock className="w-3 h-3 text-amber-400" /> : <Globe className="w-3 h-3" />}
              <span>{collection.visibility}</span>
            </span>
          </div>
        </div>

        <div className="px-5 space-y-2">
          <h4 className="text-base font-black text-white leading-snug">{collection.title}</h4>
          <p className="text-xs text-text-secondary line-clamp-2">{collection.description || 'Custom app collection.'}</p>
        </div>
      </div>

      <div className="px-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
        <span className="font-bold text-white flex items-center gap-1.5 font-mono">
          <Grid className="w-3.5 h-3.5 text-brand-cyan" /> {collection.itemCount || collection.apps?.length || 0} Apps
        </span>

        <div className="flex items-center gap-1.5">
          {onEdit && (
            <button
              onClick={() => onEdit(collection)}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-text-muted hover:text-white transition-all"
              title="Edit Collection"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(collection.id)}
              className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-all"
              title="Delete Collection"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
