import React, { useEffect, useState } from 'react';
import { Cpu, Bot, Zap, CheckCircle2 } from 'lucide-react';
import { getEnterpriseAIHub } from '../../services/enterpriseAIService';
import { EnterpriseAIService as AIServiceType, EnterpriseAIAgent as AIAgentType } from '../../../shared/types';

export const EnterpriseAIHub: React.FC = () => {
  const [data, setData] = useState<{ aiServices: AIServiceType[]; aiAgents: AIAgentType[] } | null>(null);

  useEffect(() => {
    getEnterpriseAIHub().then(setData);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Cpu className="w-6 h-6 text-brand-cyan" /> Enterprise AI Hub & Digital Agents
        </h2>
        <p className="text-text-muted text-sm">Central AI model orchestration and autonomous enterprise digital workers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Zap className="w-5 h-5 text-brand-cyan" /> Enterprise AI Engine Gateway
          </h3>
          <div className="space-y-3">
            {data?.aiServices.map((srv) => (
              <div key={srv.id} className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white text-sm">{srv.serviceName}</h4>
                  <span className="text-xs text-text-muted">Provider: {srv.modelProvider}</span>
                </div>
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {srv.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-400" /> Autonomous AI Agents
          </h3>
          <div className="space-y-3">
            {data?.aiAgents.map((ag) => (
              <div key={ag.id} className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white text-sm">{ag.agentName}</h4>
                  <span className="text-xs text-text-muted">Role: {ag.roleType}</span>
                </div>
                <span className="px-2.5 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded-lg flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {ag.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
