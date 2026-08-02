import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { ModelCard } from '../../components/ai-platform/ModelCard';
import { getAIModels } from '../../services/modelService';
import { AIModel } from '../../types';
import { Boxes } from 'lucide-react';

export default function AdminModelsPage() {
  const [models, setModels] = useState<AIModel[]>([]);

  useEffect(() => {
    getAIModels().then((data) => setModels(data)).catch(() => {});
  }, []);

  return (
    <AdminLayout title="Admin AI Models Console | NexoApps Admin">
      <div className="space-y-8 text-left">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Boxes className="w-6 h-6 text-brand-violet" /> Enterprise AI Model Registry Console
          </h1>
          <p className="text-xs text-text-secondary">
            Manage public and private AI models, artifact storage, and model licensing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {models.map((m) => (
            <ModelCard key={m.id} model={m} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
