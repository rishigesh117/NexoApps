import React, { useState } from 'react';
import { UserPreference } from '../../types';
import { Sliders, Check } from 'lucide-react';

interface PreferencesSyncProps {
  preferences: UserPreference;
  onSave: (updated: Partial<UserPreference>) => void;
}

export const PreferencesSync: React.FC<PreferencesSyncProps> = ({ preferences, onSave }) => {
  const [prefs, setPrefs] = useState<UserPreference>(preferences);
  const [saved, setSaved] = useState(false);

  const toggle = (key: keyof UserPreference) => {
    const updated = { ...prefs, [key]: !prefs[key] };
    setPrefs(updated);
    onSave(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6 text-left shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-brand-cyan" />
          <h3 className="text-base font-extrabold text-white">Cross-Device Synchronization Preferences</h3>
        </div>
        {saved && (
          <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
            <Check className="w-4 h-4" /> Preferences Saved
          </span>
        )}
      </div>

      <div className="space-y-4 text-xs">
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/5">
          <div>
            <h4 className="font-bold text-white">Sync Favorite Applications</h4>
            <p className="text-text-muted">Keep your favorited apps list synchronized across mobile and desktop.</p>
          </div>
          <input
            type="checkbox"
            checked={prefs.syncFavorites}
            onChange={() => toggle('syncFavorites')}
            className="w-5 h-5 accent-brand-cyan cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/5">
          <div>
            <h4 className="font-bold text-white">Sync Custom App Playlists & Collections</h4>
            <p className="text-text-muted">Synchronize custom app collections seamlessly.</p>
          </div>
          <input
            type="checkbox"
            checked={prefs.syncCollections}
            onChange={() => toggle('syncCollections')}
            className="w-5 h-5 accent-brand-cyan cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/5">
          <div>
            <h4 className="font-bold text-white">Automatic Encrypted Daily Backups</h4>
            <p className="text-text-muted">Create daily encrypted state snapshots automatically.</p>
          </div>
          <input
            type="checkbox"
            checked={prefs.autoBackup}
            onChange={() => toggle('autoBackup')}
            className="w-5 h-5 accent-brand-cyan cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/5">
          <div>
            <h4 className="font-bold text-white">Cross-Device Push Notifications</h4>
            <p className="text-text-muted">Sync notification read status across all signed-in devices.</p>
          </div>
          <input
            type="checkbox"
            checked={prefs.pushNotifications}
            onChange={() => toggle('pushNotifications')}
            className="w-5 h-5 accent-brand-cyan cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
