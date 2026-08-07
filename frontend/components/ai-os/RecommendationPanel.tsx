import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { workspaceOsService } from '../../services/workspaceOsService';

export const RecommendationPanel: React.FC = () => {
  const [recs, setRecs] = useState<any[]>([]);

  useEffect(() => {
    fetchRecs();
  }, []);

  const fetchRecs = async () => {
    try {
      const res = await workspaceOsService.getRecommendations();
      if (res.success) setRecs(res.data);
    } catch (err) {
      console.error('Failed to load recommendations', err);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
      <h3 className="text-base font-bold text-white flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-brand-cyan" />
        AI Proactive System Recommendations
      </h3>

      <div className="space-y-3">
        {recs.map((r) => (
          <div key={r.id} className="p-4 rounded-2xl bg-surface-100 border border-white/10 text-xs space-y-2">
            <h4 className="font-bold text-white">{r.title}</h4>
            <p className="text-text-secondary">{r.description}</p>
            {r.actionUrl && (
              <Link href={r.actionUrl} className="inline-flex items-center gap-1 font-bold text-brand-cyan hover:underline">
                <span>{r.actionLabel || 'View Action'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
