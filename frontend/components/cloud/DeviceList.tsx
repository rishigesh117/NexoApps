import React from 'react';
import { UserDevice } from '../../types';
import { Smartphone, Monitor, Trash2, CheckCircle2, Globe } from 'lucide-react';

interface DeviceListProps {
  devices: UserDevice[];
  onRemoveDevice: (id: string) => void;
}

export const DeviceList: React.FC<DeviceListProps> = ({ devices, onRemoveDevice }) => {
  return (
    <div className="space-y-4 text-left">
      {devices.map((d) => (
        <div
          key={d.id}
          className={`glass-panel p-5 rounded-3xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            d.isCurrentDevice ? 'border-brand-cyan/40 bg-brand-cyan/5' : 'border-white/10'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-brand-cyan shrink-0">
              {d.deviceType.includes('Android') ? <Smartphone className="w-6 h-6" /> : <Monitor className="w-6 h-6" />}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-white text-sm">{d.deviceName}</h4>
                {d.isCurrentDevice && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Current Device
                  </span>
                )}
              </div>
              <p className="text-xs text-text-muted">
                {d.os} • {d.browser} • IP: {d.ipAddress}
              </p>
              <span className="text-[11px] text-text-secondary block">
                Last Active: {new Date(d.lastActiveAt).toLocaleString()}
              </span>
            </div>
          </div>

          {!d.isCurrentDevice && (
            <button
              type="button"
              onClick={() => onRemoveDevice(d.id)}
              className="px-4 py-2 rounded-full text-xs font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-all flex items-center gap-1.5 shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Revoke Access</span>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
