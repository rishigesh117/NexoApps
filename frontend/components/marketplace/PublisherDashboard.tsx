import React, { useState, useEffect } from 'react';
import { Store, DollarSign, Download, ShieldCheck } from 'lucide-react';
import { publisherService } from '../../services/publisherService';

export const PublisherDashboard: React.FC = () => {
  const [publisher, setPublisher] = useState<any>(null);

  useEffect(() => {
    fetchPub();
  }, []);

  const fetchPub = async () => {
    try {
      const res = await publisherService.getDashboard();
      if (res.success) setPublisher(res.data);
    } catch (err) {
      console.error('Failed to load publisher dashboard', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Store className="w-5 h-5 text-brand-cyan" />
            Publisher Creator Hub & Revenue Console
          </h2>
          <p className="text-xs text-text-muted mt-1">{publisher?.publisherName || 'Nexo Partner Publisher'}</p>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          Revenue Share: {publisher?.revenueSharePct || 85}%
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-white/10">
          <p className="text-xs text-text-muted font-bold uppercase">Total Creator Earnings</p>
          <h3 className="text-3xl font-extrabold text-emerald-400 mt-1">$4,850.00</h3>
        </div>
        <div className="glass-panel p-6 rounded-3xl border border-white/10">
          <p className="text-xs text-text-muted font-bold uppercase">Package Downloads</p>
          <h3 className="text-3xl font-extrabold text-brand-cyan mt-1">6,070</h3>
        </div>
        <div className="glass-panel p-6 rounded-3xl border border-white/10">
          <p className="text-xs text-text-muted font-bold uppercase">Verification Status</p>
          <h3 className="text-2xl font-extrabold text-white mt-1 capitalize">{publisher?.verificationStatus || 'verified'}</h3>
        </div>
      </div>
    </div>
  );
};
