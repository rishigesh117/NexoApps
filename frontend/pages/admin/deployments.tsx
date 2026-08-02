import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DeploymentHistory } from '../../components/operations/DeploymentHistory';
import { DeploymentPipeline } from '../../components/cloud/DeploymentPipeline';
import { getDeployments } from '../../services/deploymentService';
import { DeploymentEntry } from '../../types';
import { Rocket } from 'lucide-react';

export default function AdminDeploymentsPage() {
  const [deployments, setDeployments] = useState<DeploymentEntry[]>([]);

  useEffect(() => {
    getDeployments().then((d) => setDeployments(d)).catch(() => {});
  }, []);

  return (
    <AdminLayout title="Deployment Pipeline & History | NexoApps Admin">
      <div className="space-y-8 text-left">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Rocket className="w-6 h-6 text-brand-cyan" /> Deployment Pipeline & Build History
          </h1>
          <p className="text-xs text-text-secondary">
            Inspect GitHub Actions production deployments, staging rollouts, and rollback status.
          </p>
        </div>

        <DeploymentPipeline />

        <DeploymentHistory deployments={deployments} />
      </div>
    </AdminLayout>
  );
}
