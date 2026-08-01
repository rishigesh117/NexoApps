import React from 'react';
import { DeviceViewMode, ThemePreviewMode } from '../../../types';
import { Smartphone, Tablet, Moon, Sun } from 'lucide-react';

interface SwitcherProps {
  deviceMode: DeviceViewMode;
  themeMode: ThemePreviewMode;
  onDeviceChange: (mode: DeviceViewMode) => void;
  onThemeChange: (theme: ThemePreviewMode) => void;
}

export const PreviewDeviceSwitcher: React.FC<SwitcherProps> = ({
  deviceMode,
  themeMode,
  onDeviceChange,
  onThemeChange,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs">
      
      {/* Device Viewport Toggle */}
      <div className="flex items-center gap-1.5">
        <span className="text-text-muted font-semibold mr-1">Viewport:</span>
        
        <button
          type="button"
          onClick={() => onDeviceChange('phone')}
          className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
            deviceMode === 'phone'
              ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 shadow-glow-cyan'
              : 'bg-white/5 text-text-muted hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Phone</span>
        </button>

        <button
          type="button"
          onClick={() => onDeviceChange('tablet')}
          className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
            deviceMode === 'tablet'
              ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 shadow-glow-cyan'
              : 'bg-white/5 text-text-muted hover:text-white'
          }`}
        >
          <Tablet className="w-3.5 h-3.5" />
          <span>Tablet</span>
        </button>
      </div>

      {/* Theme Mode Toggle */}
      <div className="flex items-center gap-1.5">
        <span className="text-text-muted font-semibold mr-1">Theme Preview:</span>

        <button
          type="button"
          onClick={() => onThemeChange('dark')}
          className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
            themeMode === 'dark'
              ? 'bg-brand-violet/20 text-brand-violet border border-brand-violet/40'
              : 'bg-white/5 text-text-muted hover:text-white'
          }`}
        >
          <Moon className="w-3.5 h-3.5 text-brand-violet" />
          <span>Dark Mode</span>
        </button>

        <button
          type="button"
          onClick={() => onThemeChange('light')}
          className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
            themeMode === 'light'
              ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
              : 'bg-white/5 text-text-muted hover:text-white'
          }`}
        >
          <Sun className="w-3.5 h-3.5 text-amber-400" />
          <span>Light Mode</span>
        </button>
      </div>
    </div>
  );
};
