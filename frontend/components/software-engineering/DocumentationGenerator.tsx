import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { documentationService } from '../../services/documentationService';

interface DocumentationGeneratorProps {
  projectId?: string;
}

export const DocumentationGenerator: React.FC<DocumentationGeneratorProps> = ({ projectId = 'proj-demo-1' }) => {
  const [docs, setDocs] = useState<any>(null);

  useEffect(() => {
    fetchDocs();
  }, [projectId]);

  const fetchDocs = async () => {
    try {
      const res = await documentationService.getDocs(projectId);
      if (res.success) setDocs(res.data);
    } catch (err) {
      console.error('Failed to load documentation', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center justify-between">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-brand-cyan" />
          Auto Documentation Studio & Technical Specs
        </h3>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Project README.md</h4>
        <pre className="p-4 rounded-2xl bg-background/80 border border-white/10 text-xs font-mono text-text-secondary whitespace-pre-wrap">
          {docs?.readmeMd}
        </pre>
      </div>
    </div>
  );
};
