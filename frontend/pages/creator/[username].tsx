import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { getCreatorByUsername } from '../../services/creatorService';
import { CreatorProfile } from '../../types';
import { CheckCircle2, Globe, Users, Award } from 'lucide-react';

export default function CreatorPublicProfilePage() {
  const router = useRouter();
  const { username } = router.query;
  const [creator, setCreator] = useState<CreatorProfile | null>(null);

  useEffect(() => {
    if (username && typeof username === 'string') {
      getCreatorByUsername(username).then((data) => setCreator(data)).catch(() => {});
    }
  }, [username]);

  if (!creator) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-sans">
        <p className="text-sm text-text-muted">Loading Creator Profile...</p>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${creator.displayName} (@${creator.username}) | NexoApps Creator`}
        description={creator.bio}
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
          <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col sm:flex-row items-center gap-6">
            <img
              src={creator.avatarUrl}
              alt={creator.displayName}
              className="w-24 h-24 rounded-full object-cover border-2 border-brand-cyan/40 shadow-glow-cyan"
            />
            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-black text-white">{creator.displayName}</h1>
                {creator.isVerified && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified Creator
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-text-muted">@{creator.username}</p>
              <p className="text-xs text-text-secondary leading-relaxed">{creator.bio}</p>

              <div className="flex items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-text-muted font-mono">
                <span className="flex items-center gap-1 text-white">
                  <Users className="w-3.5 h-3.5 text-brand-cyan" /> {creator.followersCount || 1240} Followers
                </span>
                {creator.website && (
                  <a href={creator.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-brand-cyan hover:underline">
                    <Globe className="w-3.5 h-3.5" /> Website
                  </a>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert(`Followed @${creator.username}!`)}
              className="px-6 py-2.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan transition-all shrink-0"
            >
              Follow Creator
            </button>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
