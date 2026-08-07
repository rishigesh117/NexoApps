import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';
import { deploymentService } from '../../services/deploymentService';
import { InfrastructureTemplate } from '../../../shared/types';

export const InfrastructureTemplateCenter: React.FC = () => {
  const [templates, setTemplates] = useState<InfrastructureTemplate[]>([]);

  useEffect(() => {
    deploymentService.getIacTemplates().then(setTemplates);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Infrastructure as Code (IaC) Template Center</h2>
      <div className="space-y-4 max-w-4xl">
        {templates.map(t => (
          <div key={t.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="font-semibold text-white text-lg flex items-center gap-2 mb-2">
              <Layers className="w-5 h-5 text-amber-400" /> {t.templateName || t.name}
            </h3>
            <p className="text-xs text-slate-400 font-mono mb-3">Provider: {(t.provider || 'aws').toUpperCase()} | Engine: {t.iacType || t.templateType}</p>
            <pre className="p-3 bg-slate-950 rounded text-xs font-mono text-amber-300 overflow-x-auto">{t.templateBody || t.content}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};
