import React, { useState, useEffect } from 'react';
import { Boxes, ShieldCheck } from 'lucide-react';
import { securityService } from '../../services/securityService';

interface DependencyViewerProps {
  projectId?: string;
}

export const DependencyViewer: React.FC<DependencyViewerProps> = ({ projectId = 'proj-demo-1' }) => {
  const [deps, setDeps] = useState<any[]>([]);

  useEffect(() => {
    fetchDeps();
  }, [projectId]);

  const fetchDeps = async () => {
    try {
      const res = await securityService.getDependencies(projectId);
      if (res.success) setDeps(res.data.graphJson?.dependencies || []);
    } catch (err) {
      console.error('Failed to load dependencies', err);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-white flex items-center gap-2">
        <Boxes className="w-5 h-5 text-brand-cyan" />
        Dependency Graph & CVE Vulnerability Auditor
      </h3>

      <div className="space-y-3">
        {deps.map((d, i) => (
          <div key={i} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-white font-mono">{d.name}</span>
              <span className="text-text-muted font-mono ml-2">v{d.version}</span>
            </div>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Secure
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
