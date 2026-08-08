import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { networkAnalyticsService } from '../../services/networkAnalyticsService';

export const GatewayAnalytics: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    networkAnalyticsService.getAnalytics().then((res) => setData(res));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-cyan" /> Gateway Metrics & Request Throughput Analytics
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center font-mono">
        <div className="p-4 rounded-xl glass-panel border border-white/10 bg-white/5">
          <span className="text-[10px] text-text-muted uppercase">Total Requests</span>
          <div className="text-2xl font-bold text-white mt-1">{(data?.summary?.totalRequests / 1000000)?.toFixed(2)}M</div>
        </div>
        <div className="p-4 rounded-xl glass-panel border border-white/10 bg-white/5">
          <span className="text-[10px] text-text-muted uppercase">Ingress Traffic</span>
          <div className="text-2xl font-bold text-brand-cyan mt-1">{data?.summary?.totalBytesInGb} GB</div>
        </div>
        <div className="p-4 rounded-xl glass-panel border border-white/10 bg-white/5">
          <span className="text-[10px] text-text-muted uppercase">Egress Traffic</span>
          <div className="text-2xl font-bold text-purple-400 mt-1">{data?.summary?.totalBytesOutGb} GB</div>
        </div>
      </div>
    </div>
  );
};
