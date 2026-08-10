import React, { useEffect, useState } from 'react';
import { Download, ExternalLink, PackageX, Loader2 } from 'lucide-react';
import { downloadService, DownloadRecord } from '../../services/downloadService';
import { FEATURED_BATLYTICS_APP } from '../../services/appService';
import Link from 'next/link';

export const DownloadsTab: React.FC = () => {
  const [downloads, setDownloads] = useState<DownloadRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    downloadService.getDownloadHistory().then((data) => {
      if (data && data.length > 0) {
        setDownloads(data);
      } else {
        // Default record for Batlytics initial store app
        setDownloads([
          {
            id: 'dl-initial-001',
            userId: 'user-001',
            appId: FEATURED_BATLYTICS_APP.id,
            appSlug: FEATURED_BATLYTICS_APP.slug,
            appTitle: FEATURED_BATLYTICS_APP.title,
            iconUrl: FEATURED_BATLYTICS_APP.iconUrl,
            tagline: FEATURED_BATLYTICS_APP.tagline,
            version: FEATURED_BATLYTICS_APP.version,
            fileSize: FEATURED_BATLYTICS_APP.fileSize || '42 MB',
            downloadToken: 'token-initial-001',
            deviceInfo: 'Chrome on Windows',
            browser: 'Chrome',
            os: 'Windows',
            ipAddress: '127.0.0.1',
            status: 'Completed',
            createdAt: new Date().toISOString(),
            completedAt: new Date().toISOString(),
            downloadUrl: `/download/${FEATURED_BATLYTICS_APP.slug}`,
          },
        ]);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 text-left">
      <div className="pb-4 border-b border-white/10">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Download className="w-5 h-5 text-brand-cyan" /> My Download History
        </h3>
        <p className="text-xs text-text-muted mt-0.5">
          Applications and Android APKs you have downloaded from NexoApps
        </p>
      </div>

      {isLoading ? (
        <div className="py-12 flex justify-center text-brand-cyan">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : downloads.length > 0 ? (
        <div className="space-y-3">
          {downloads.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-surface-100/80 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-200 border border-white/10 flex items-center justify-center text-2xl shadow-inner shrink-0">
                  {item.iconUrl || '📱'}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    {item.appTitle}
                    <span className="text-[10px] text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded-full border border-brand-cyan/20">
                      v{item.version}
                    </span>
                  </h4>
                  <p className="text-xs text-text-muted">
                    {item.tagline || `Downloaded on ${new Date(item.createdAt).toLocaleDateString()}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/download/${item.appSlug}`}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-emerald to-brand-cyan text-slate-950 text-xs font-extrabold shadow-glow-emerald hover:opacity-95 transition-all flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Download Again
                </Link>

                <Link
                  href={`/app/${item.appSlug}`}
                  className="p-2 rounded-xl bg-surface-200 hover:bg-surface-100 text-text-muted hover:text-white border border-white/10 transition-colors"
                  title="View App Details"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State UI */
        <div className="py-12 flex flex-col items-center text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-surface-200 border border-white/10 flex items-center justify-center text-text-muted">
            <PackageX className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-white">No Downloads Yet</h4>
          <p className="text-xs text-text-muted max-w-xs">
            Browse our store and download applications to see your history here.
          </p>
          <Link
            href="/apps"
            className="mt-2 px-5 py-2.5 rounded-xl bg-brand-cyan text-slate-950 font-bold text-xs hover:bg-brand-cyan/90 transition-colors"
          >
            Explore Applications
          </Link>
        </div>
      )}
    </div>
  );
};
