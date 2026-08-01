import React from 'react';
import { Download, Laptop, CheckCircle2 } from 'lucide-react';

interface RecentDownloadsProps {
  downloads: any[];
}

export const RecentDownloads: React.FC<RecentDownloadsProps> = ({ downloads }) => {
  const list = downloads.slice(0, 5);

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Download className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-white">Recent APK Downloads</h3>
        </div>
        <span className="text-xs text-text-muted">Live Traffic Log</span>
      </div>

      {list.length === 0 ? (
        <p className="text-xs text-text-muted py-4 text-center">No downloads recorded yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-text-muted border-b border-white/5 uppercase text-[10px] tracking-wider">
                <th className="pb-2 font-semibold">Application</th>
                <th className="pb-2 font-semibold">Device & Browser</th>
                <th className="pb-2 font-semibold">IP Address</th>
                <th className="pb-2 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {list.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 font-bold text-white">
                    {item.appTitle || item.appSlug || 'Batlytics'}
                    <span className="block text-[10px] text-text-muted font-normal">v{item.version || '2.4.0'}</span>
                  </td>
                  <td className="py-3 text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Laptop className="w-3 h-3 text-brand-cyan" />
                      {item.deviceInfo || item.browser || 'Desktop Browser'}
                    </span>
                  </td>
                  <td className="py-3 font-mono text-text-muted">{item.ipAddress || '127.0.0.1'}</td>
                  <td className="py-3 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" />
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
