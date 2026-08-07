import React, { useState, useEffect } from 'react';
import { Database } from 'lucide-react';
import { engineeringAnalyticsService } from '../../services/engineeringAnalyticsService';

interface DatabaseDesignerProps {
  projectId?: string;
}

export const DatabaseDesigner: React.FC<DatabaseDesignerProps> = ({ projectId = 'proj-demo-1' }) => {
  const [dbDesign, setDbDesign] = useState<any>(null);

  useEffect(() => {
    fetchDb();
  }, [projectId]);

  const fetchDb = async () => {
    try {
      const res = await engineeringAnalyticsService.getDatabaseDesign(projectId);
      if (res.success) setDbDesign(res.data);
    } catch (err) {
      console.error('Failed to load database design', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-brand-cyan" />
            Visual ER Diagram & SQL Schema Designer
          </h3>
          <p className="text-xs text-text-muted mt-1">Tables Count: {dbDesign?.tablesCount || 2}</p>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">SQL DDL Schema Migration</h4>
        <pre className="p-4 rounded-2xl bg-background/80 border border-white/10 text-xs font-mono text-text-secondary whitespace-pre-wrap">
          {dbDesign?.schemaSql}
        </pre>
      </div>
    </div>
  );
};
