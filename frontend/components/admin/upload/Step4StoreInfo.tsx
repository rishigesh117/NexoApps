import React from 'react';
import { UploadWizardState, AndroidPermission } from '../../../types';
import { Store, ShieldCheck, CheckSquare, Square } from 'lucide-react';

interface Step4Props {
  formData: UploadWizardState;
  onChange: (field: keyof UploadWizardState, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const ALL_PERMISSIONS: AndroidPermission[] = [
  'Internet',
  'Storage',
  'Camera',
  'Microphone',
  'Notifications',
  'Location',
  'Bluetooth',
];

export const Step4StoreInfo: React.FC<Step4Props> = ({
  formData,
  onChange,
  onNext,
  onBack,
}) => {
  const togglePermission = (perm: AndroidPermission) => {
    const current = [...formData.permissions];
    const index = current.indexOf(perm);
    if (index !== -1) {
      current.splice(index, 1);
    } else {
      current.push(perm);
    }
    onChange('permissions', current);
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 text-left">
      <div className="border-b border-white/10 pb-4">
        <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
          <Store className="w-5 h-5 text-brand-cyan" /> Step 4: Store Contact & Android Permissions
        </h3>
        <p className="text-xs text-text-secondary">
          Configure developer credentials, support links, target Android OS levels, and permission declarations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        
        {/* Developer Name */}
        <div className="space-y-1">
          <label className="text-text-secondary font-semibold">Developer Studio Name</label>
          <input
            type="text"
            value={formData.developerName}
            onChange={(e) => onChange('developerName', e.target.value)}
            placeholder="Batlytics Studio"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-white"
            required
          />
        </div>

        {/* Developer Email */}
        <div className="space-y-1">
          <label className="text-text-secondary font-semibold">Developer Email</label>
          <input
            type="email"
            value={formData.developerEmail}
            onChange={(e) => onChange('developerEmail', e.target.value)}
            placeholder="developer@batlytics.com"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-white"
            required
          />
        </div>

        {/* Developer Website */}
        <div className="space-y-1">
          <label className="text-text-secondary font-semibold">Developer Website</label>
          <input
            type="url"
            value={formData.developerWebsite}
            onChange={(e) => onChange('developerWebsite', e.target.value)}
            placeholder="https://batlytics.com"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-white"
          />
        </div>

        {/* Support Email */}
        <div className="space-y-1">
          <label className="text-text-secondary font-semibold">Customer Support Email</label>
          <input
            type="email"
            value={formData.supportEmail}
            onChange={(e) => onChange('supportEmail', e.target.value)}
            placeholder="support@nexoapps.com"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-white"
          />
        </div>

        {/* Privacy Policy URL */}
        <div className="space-y-1 md:col-span-2">
          <label className="text-text-secondary font-semibold">Privacy Policy URL</label>
          <input
            type="url"
            value={formData.privacyPolicyUrl}
            onChange={(e) => onChange('privacyPolicyUrl', e.target.value)}
            placeholder="https://nexoapps.com/privacy"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-white"
          />
        </div>

        {/* Minimum Android Version */}
        <div className="space-y-1">
          <label className="text-text-secondary font-semibold">Minimum Required Android OS</label>
          <select
            value={formData.minAndroidVersion}
            onChange={(e) => onChange('minAndroidVersion', e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-2xl px-4 py-2.5 text-white"
          >
            <option value="Android 7.0 (Nougat)">Android 7.0 (Nougat)</option>
            <option value="Android 8.0 (Oreo)">Android 8.0 (Oreo)</option>
            <option value="Android 9.0 (Pie)">Android 9.0 (Pie)</option>
            <option value="Android 10.0">Android 10.0</option>
            <option value="Android 11.0">Android 11.0</option>
            <option value="Android 12.0">Android 12.0</option>
            <option value="Android 13.0">Android 13.0</option>
            <option value="Android 14.0">Android 14.0</option>
          </select>
        </div>

        {/* Target Android Version */}
        <div className="space-y-1">
          <label className="text-text-secondary font-semibold">Target SDK Android OS</label>
          <select
            value={formData.targetAndroidVersion}
            onChange={(e) => onChange('targetAndroidVersion', e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-2xl px-4 py-2.5 text-white"
          >
            <option value="Android 14.0 (API 34)">Android 14.0 (API 34)</option>
            <option value="Android 13.0 (API 33)">Android 13.0 (API 33)</option>
            <option value="Android 12.0 (API 31)">Android 12.0 (API 31)</option>
          </select>
        </div>
      </div>

      {/* Selectable Android Permissions */}
      <div className="space-y-3 pt-2">
        <label className="text-xs font-bold text-white block">Required Android Device Permissions</label>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ALL_PERMISSIONS.map((perm) => {
            const isSelected = formData.permissions.includes(perm);

            return (
              <button
                key={perm}
                type="button"
                onClick={() => togglePermission(perm)}
                className={`p-3 rounded-2xl border text-xs font-semibold flex items-center gap-2.5 transition-all text-left ${
                  isSelected
                    ? 'bg-brand-cyan/15 border-brand-cyan/40 text-brand-cyan shadow-glow-cyan'
                    : 'bg-white/5 border border-white/10 text-text-secondary hover:text-white'
                }`}
              >
                {isSelected ? (
                  <CheckSquare className="w-4 h-4 text-brand-cyan shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-text-muted shrink-0" />
                )}
                <span>{perm}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-full text-xs font-semibold text-text-secondary hover:text-white bg-white/5 border border-white/10"
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan transition-all"
        >
          Next: App Features →
        </button>
      </div>
    </div>
  );
};
