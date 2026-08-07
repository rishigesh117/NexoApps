import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';
import { engineeringAnalyticsService } from '../../services/engineeringAnalyticsService';

interface ArchitectureDesignerProps {
  projectId?: string;
}

export const ArchitectureDesigner: React.FC<ArchitectureDesignerProps> = ({ projectId = 'proj-demo-1' }) => {
  const [arch, setArch] = useState<any>(null);

  useEffect(() => {
    fetchArch();
  }, [projectId]);

  const fetchArch = async () => {
    try {
      const res = await engineeringAnalyticsService.getArchitecture(projectId);
      if (res.success) setArch(res.data);
    } catch (err) {
      console.error('Failed to load architecture design', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-cyan" />
            Microservices System Architecture Designer
          </h3>
          <p className="text-xs text-text-muted mt-1">Pattern: {arch?.patternType || 'microservices'}</p>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Mermaid System Topology</h4>
        <pre className="p-4 rounded-2xl bg-background/80 border border-white/10 text-xs font-mono text-brand-cyan whitespace-pre-wrap">
          {arch?.diagramMermaid}
        </pre>
      </div>
    </div>
  );
};
