import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 glass-panel p-4 rounded-3xl border border-brand-cyan/40 shadow-2xl max-w-sm w-full space-y-3 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-brand-cyan" />
          <span className="font-bold text-white text-xs">Install NexoApps PWA App</span>
        </div>
        <button onClick={() => setShowPrompt(false)} className="p-1 rounded-full text-text-muted hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-[11px] text-text-secondary leading-relaxed">
        Install NexoApps on your Android device or desktop for offline catalog access and fast updates.
      </p>

      <button
        onClick={handleInstallClick}
        className="w-full py-2.5 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center justify-center gap-1.5 transition-all"
      >
        <Download className="w-4 h-4" /> Install App
      </button>
    </div>
  );
};
