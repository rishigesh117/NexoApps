import React, { useState } from 'react';
import { Download, Check, RefreshCw } from 'lucide-react';
import { pluginService } from '../../services/pluginService';

interface PluginInstallerProps {
  pluginId: string;
}

export const PluginInstaller: React.FC<PluginInstallerProps> = ({ pluginId }) => {
  const [installing, setInstalling] = useState(false);
  const [installed, setInstalled] = useState(false);

  const handleInstall = async () => {
    setInstalling(true);
    try {
      const res = await pluginService.installPlugin(pluginId);
      if (res.success) setInstalled(true);
    } catch (err) {
      console.error('Failed to install plugin', err);
    } finally {
      setInstalling(false);
    }
  };

  return (
    <button
      onClick={handleInstall}
      disabled={installing || installed}
      className="px-4 py-2 rounded-xl bg-brand-cyan text-slate-950 font-bold text-xs shadow-glow-cyan hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-2"
    >
      {installing ? <RefreshCw className="w-4 h-4 animate-spin" /> : installed ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
      <span>{installing ? 'Installing...' : installed ? 'Installed' : 'Install Plugin'}</span>
    </button>
  );
};
