import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SEOHead } from '../../../components/SEOHead';
import { Navbar } from '../../../components/Navbar';
import { Footer } from '../../../components/Footer';
import { MarketplaceSidebar } from '../../../components/marketplace/MarketplaceSidebar';
import { getMarketplaceItemById } from '../../../services/marketplaceService';
import { MarketplaceItem } from '../../../types';
import { Download, Star, ShieldCheck, ArrowLeft, Heart, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function MarketplaceItemDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState<MarketplaceItem | null>(null);

  useEffect(() => {
    if (id && typeof id === 'string') {
      getMarketplaceItemById(id).then((data) => setItem(data)).catch(() => {});
    }
  }, [id]);

  if (!item) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-sans">
        <p className="text-sm text-text-muted">Loading Marketplace Item...</p>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${item.title} | NexoApps AI Marketplace`}
        description={item.shortDescription}
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <MarketplaceSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <Link href="/marketplace" className="inline-flex items-center gap-1.5 text-xs text-brand-cyan hover:underline font-bold">
              <ArrowLeft className="w-4 h-4" /> Back to Marketplace
            </Link>

            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                    {item.type}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-white">{item.title}</h1>
                  <p className="text-xs text-text-muted">
                    Published by{' '}
                    <Link href={`/creator/${item.creatorUsername || 'rishigesh'}`} className="text-brand-cyan hover:underline font-bold">
                      {item.creatorName || 'Nexo Creator'}
                    </Link>
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-2xl font-black text-emerald-400">
                    {item.price > 0 ? `$${item.price.toFixed(2)}` : 'FREE'}
                  </span>
                  <button
                    type="button"
                    onClick={() => alert(`Purchased ${item.title}!`)}
                    className="px-6 py-3 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Get Asset Now</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3 text-xs text-text-secondary leading-relaxed">
                <h3 className="font-bold text-white text-sm">Asset Overview</h3>
                <p>{item.fullDescription || item.shortDescription}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-6 text-xs text-text-muted">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>Rating: <strong className="text-white">{item.ratingAvg.toFixed(1)} / 5.0</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-brand-cyan" />
                  <span>Downloads: <strong className="text-white">{item.downloadsCount}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>License: <strong className="text-white">Commercial Royalty-Free</strong></span>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
