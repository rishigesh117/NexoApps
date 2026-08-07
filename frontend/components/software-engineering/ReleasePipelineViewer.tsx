import React, { useState, useEffect } from 'react';
import { Rocket, CheckCircle2 } from 'lucide-react';
import { engineeringAnalyticsService } from '../../services/engineeringAnalyticsService';

interface ReleasePipelineViewerProps {
  projectId?: string;
}

export const ReleasePipelineViewer: React.FC<ReleasePipelineViewerProps> = ({ projectId = 'proj-demo-1' }) => {
  const [pipelines, setPipelines] = useState<any[]>([]);

  useEffect(() => {
    fetchPipes();
  }, [projectId]);

  const fetchPipes = async () => {
    try {
      const res = await engineeringAnalyticsService.getPipelines(projectId);
      if (res.success) setPipelines(res.data);
    } catch (err) {
      console.error('Failed to load release pipelines', err);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-white flex items-center gap-2">
        <Rocket className="w-5 h-5 text-amber-400" />
        SDLC Release Pipeline & Deployment History
      </h3>

      <div className="space-y-3">
        {pipelines.map((p) => (
          <div key={p.id} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between text-xs">
            <div>
              <h4 className="font-bold text-white">{p.pipelineName}</h4>
              <p className="text-text-muted font-mono mt-0.5">Automated Production Deploy</p>
            </div>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> {p.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
