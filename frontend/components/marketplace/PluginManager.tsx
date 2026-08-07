import React, { useState, useEffect } from 'react';
import { Boxes, Check, Plus, RefreshCw } from 'lucide-react';
import { pluginService } from '../../services/pluginService';

export const PluginManager: React.FC = () => {
  const [plugins, setPlugins] = useState<any[]>([]);
  const [installations, setInstallations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlugins();
  }, []);

  const fetchPlugins = async () => {
    setLoading(true);
    try {
      const [pRes, iRes] = await Promise.all([
        pluginService.listPlugins(),
        pluginService.listInstallations()
      ]);
      if (pRes.success) setPlugins(pRes.data);
      if (iRes.success) setInstallations(iRes.data);
    } catch (err) {
      console.error('Failed to load plugin manager', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Boxes className="w-5 h-5 text-brand-cyan" />
            Installed Plugin Registry & Security Permissions
          </h2>
          <p className="text-xs text-text-muted mt-1">Manage active enterprise plugins and entrypoint connectors.</p>
        </div>
      </div>

      <div className="space-y-4">
        {plugins.map((p) => {
          const isInstalled = installations.some(i => i.pluginId === p.id);
          return (
            <div key={p.id} className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  {p.name}
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-cyan/10 text-brand-cyan">v{p.version}</span>
                </h3>
                <p className="text-xs text-text-muted mt-0.5">{p.description}</p>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-xl ${isInstalled ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-surface-100 text-text-muted'}`}>
                {isInstalled ? 'Active & Installed' : 'Available'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
