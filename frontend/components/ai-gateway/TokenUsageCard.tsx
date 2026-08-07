import React from 'react';
import { Cpu, DollarSign, Zap, Activity } from 'lucide-react';

interface TokenUsageCardProps {
  providerName: string;
  totalTokens: number;
  totalCost: number;
  requestCount: number;
}

export const TokenUsageCard: React.FC<TokenUsageCardProps> = ({
  providerName,
  totalTokens,
  totalCost,
  requestCount,
}) => {
  return (
    <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-brand-cyan/40 transition-all space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Cpu className="w-4 h-4 text-brand-cyan" />
          {providerName}
        </h3>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan">
          Live Telemetry
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
        <div>
          <span className="block text-[10px] text-text-muted uppercase font-semibold">Tokens</span>
          <span className="text-sm font-bold text-white font-mono">{(totalTokens / 1000).toFixed(0)}k</span>
        </div>
        <div>
          <span className="block text-[10px] text-text-muted uppercase font-semibold">Requests</span>
          <span className="text-sm font-bold text-white font-mono">{requestCount}</span>
        </div>
        <div>
          <span className="block text-[10px] text-text-muted uppercase font-semibold">Cost</span>
          <span className="text-sm font-bold text-emerald-400 font-mono">${totalCost.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
