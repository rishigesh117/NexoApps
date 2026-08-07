import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { engineeringAnalyticsService } from '../../services/engineeringAnalyticsService';

interface ApiDesignerProps {
  projectId?: string;
}

export const ApiDesigner: React.FC<ApiDesignerProps> = ({ projectId = 'proj-demo-1' }) => {
  const [apiSpec, setApiSpec] = useState<any>(null);

  useEffect(() => {
    fetchApi();
  }, [projectId]);

  const fetchApi = async () => {
    try {
      const res = await engineeringAnalyticsService.getApiSpec(projectId);
      if (res.success) setApiSpec(res.data);
    } catch (err) {
      console.error('Failed to load API spec', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-brand-cyan" />
            OpenAPI / REST API Specification Studio
          </h3>
          <p className="text-xs text-text-muted mt-1">Endpoints Count: {apiSpec?.endpointsCount || 8}</p>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">OpenAPI 3.0 YAML Specification</h4>
        <pre className="p-4 rounded-2xl bg-background/80 border border-white/10 text-xs font-mono text-emerald-400 whitespace-pre-wrap">
          {apiSpec?.openapiSpec}
        </pre>
      </div>
    </div>
  );
};
