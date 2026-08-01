import React from 'react';
import { CommunityFeedItem } from '../../types';
import { Rocket, ShieldCheck, Star, Sparkles, MessageSquare, Clock } from 'lucide-react';
import Link from 'next/link';

interface Props {
  feed: CommunityFeedItem[];
}

export const ActivityFeed: React.FC<Props> = ({ feed }) => {
  const getFeedIcon = (type: string) => {
    switch (type) {
      case 'new_release':
        return <Rocket className="w-4 h-4 text-emerald-400" />;
      case 'featured_promotion':
        return <ShieldCheck className="w-4 h-4 text-brand-cyan" />;
      case 'review_milestone':
        return <Star className="w-4 h-4 text-amber-400 fill-amber-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-brand-violet" />;
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-brand-cyan" /> Community Activity & Developer Updates
        </h3>
        <span className="text-xs text-text-muted">Live Stream</span>
      </div>

      <div className="space-y-3">
        {feed.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2 hover:border-white/15 transition-all text-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-white">
                {getFeedIcon(item.type)}
                <span>{item.title}</span>
              </div>
              <span className="text-[10px] text-text-muted flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <p className="text-text-secondary leading-relaxed text-[11px]">{item.content}</p>

            {item.app && (
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[10px] text-brand-cyan font-semibold">Studio: {item.developer?.studioName}</span>
                <Link href={`/app/${item.app.slug}`} className="text-[11px] text-brand-cyan hover:underline font-bold">
                  View Update →
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
