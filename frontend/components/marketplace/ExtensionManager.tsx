import React, { useState, useEffect } from 'react';
import { Globe, ShieldCheck } from 'lucide-react';
import { extensionService } from '../../services/extensionService';

export const ExtensionManager: React.FC = () => {
  const [extensions, setExtensions] = useState<any[]>([]);

  useEffect(() => {
    fetchExtensions();
  }, []);

  const fetchExtensions = async () => {
    try {
      const res = await extensionService.listExtensions();
      if (res.success) setExtensions(res.data);
    } catch (err) {
      console.error('Failed to load extensions', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-white/10">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-brand-cyan" />
          Enterprise Extension SDK Packages
        </h2>
        <p className="text-xs text-text-muted mt-1">SDK packages & enterprise extension bundles.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {extensions.map((ext) => (
          <div key={ext.id} className="p-5 rounded-2xl bg-surface-100 border border-white/10 space-y-2">
            <h3 className="text-sm font-bold text-white font-mono">{ext.packageId}</h3>
            <p className="text-xs text-text-muted">Author: {ext.author} • SDK v{ext.sdkVersion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
