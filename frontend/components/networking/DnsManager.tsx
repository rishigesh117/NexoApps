import React, { useEffect, useState } from 'react';
import { Globe, FileText } from 'lucide-react';
import { dnsService } from '../../services/dnsService';
import { DnsZone, DnsRecord } from '../../../shared/types';

export const DnsManager: React.FC = () => {
  const [zones, setZones] = useState<DnsZone[]>([]);
  const [records, setRecords] = useState<DnsRecord[]>([]);

  useEffect(() => {
    Promise.all([dnsService.getZones(), dnsService.getRecords()]).then(([z, r]) => {
      setZones(z);
      setRecords(r);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-brand-cyan" /> Enterprise DNS Zone & Record Manager
        </h2>
        <span className="text-xs text-text-muted">{zones.length} active DNS zones</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {zones.map((z) => (
          <div key={z.id} className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                {z.zoneType}
              </span>
              <span className="text-xs text-emerald-400 font-bold">{z.recordsCount} Records</span>
            </div>
            <h3 className="font-bold text-white text-base font-display">{z.zoneName}</h3>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
        <h3 className="text-xs font-semibold uppercase text-text-muted">Managed DNS Records</h3>
        <div className="space-y-2">
          {records.map((r) => (
            <div key={r.id} className="p-3 rounded-lg bg-black/20 border border-white/5 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-brand-cyan/20 text-brand-cyan font-bold">{r.recordType}</span>
                <span className="text-white font-bold">{r.recordName}</span>
              </div>
              <span className="text-purple-300">{r.recordValue} (TTL: {r.ttl}s)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
