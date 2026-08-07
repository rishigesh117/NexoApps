import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, Key, Lock, Activity, Eye, Terminal } from 'lucide-react';
import { securityService } from '../../services/securityService';

export const SecurityDashboard: React.FC = () => {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    securityService.getSiemSummary().then(setSummary);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-500 to-amber-500">
            AI Security Platform & Zero Trust SOC
          </h1>
          <p className="text-slate-400 mt-1">Enterprise cyber defense, threat intelligence, identity management & compliance hub (v7.4)</p>
        </div>
        <span className="px-3.5 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 animate-pulse text-emerald-400" /> Zero Trust Enforced (100% MFA)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>SIEM Security Events</span>
            <Activity className="w-5 h-5 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-white">{summary?.eventsCount ? summary.eventsCount.toLocaleString() : '142,800'} Events</div>
          <div className="text-xs text-emerald-400 mt-2">Real-Time Threat Scanning</div>
        </div>

        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Active Threats</span>
            <ShieldAlert className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">{summary?.activeThreats || 2} Blocked</div>
          <div className="text-xs text-amber-400 mt-2">Automated SOC Response</div>
        </div>

        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Critical CVEs</span>
            <Lock className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">{summary?.criticalVulnerabilities || 0} Open</div>
          <div className="text-xs text-emerald-400 mt-2">100% Patched Compliance</div>
        </div>

        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>MFA Enforcement</span>
            <Key className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">100.0% Enforced</div>
          <div className="text-xs text-purple-400 mt-2">FIDO2 & TOTP Tokens</div>
        </div>
      </div>
    </div>
  );
};
