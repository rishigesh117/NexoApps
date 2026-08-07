import React, { useState } from 'react';
import { Rocket, Check, RefreshCw, Globe, ArrowRight } from 'lucide-react';
import { deploymentPipelineService } from '../../services/deploymentPipelineService';

interface DeploymentWizardProps {
  applicationId?: string;
}

export const DeploymentWizard: React.FC<DeploymentWizardProps> = ({ applicationId = 'app-demo-1' }) => {
  const [environment, setEnvironment] = useState('production');
  const [building, setBuilding] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [buildSuccess, setBuildSuccess] = useState<any>(null);
  const [deploySuccess, setDeploySuccess] = useState<any>(null);

  const handleRunPipeline = async (e: React.FormEvent) => {
    e.preventDefault();
    setBuilding(true);
    setDeploySuccess(null);

    try {
      // Step 1: Trigger build
      const buildRes = await deploymentPipelineService.triggerBuild(applicationId);
      if (buildRes.success) {
        setBuildSuccess(buildRes.data);
        setBuilding(false);
        setDeploying(true);

        // Step 2: Deploy build
        const deployRes = await deploymentPipelineService.deployBuild(applicationId, buildRes.data.id, environment);
        if (deployRes.success) {
          setDeploySuccess(deployRes.data);
        }
      }
    } catch (err) {
      console.error('Failed build/deploy pipeline', err);
    } finally {
      setBuilding(false);
      setDeploying(false);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Rocket className="w-5 h-5 text-brand-cyan" />
            One-Click Build & Deployment Wizard
          </h3>
          <p className="text-xs text-text-muted mt-1">
            Automated bundle compilation, static asset optimization, and CDN deployment.
          </p>
        </div>
      </div>

      <form onSubmit={handleRunPipeline} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1">Target Environment</label>
          <select
            value={environment}
            onChange={(e) => setEnvironment(e.target.value)}
            className="w-full sm:w-64 px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs focus:border-brand-cyan focus:outline-none"
          >
            <option value="development">Development Sandbox</option>
            <option value="staging">Staging QA Target</option>
            <option value="production">Global Production Cloud</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={building || deploying}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white font-bold text-xs shadow-glow-cyan hover:opacity-95 disabled:opacity-50 transition-all flex items-center gap-2"
        >
          {building || deploying ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Rocket className="w-4 h-4" />}
          <span>{building ? 'Compiling Build...' : deploying ? 'Deploying Cloud Assets...' : 'Trigger Build & Deploy Pipeline'}</span>
        </button>
      </form>

      {deploySuccess && (
        <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <Check className="w-4 h-4" />
            Deployment Succeeded!
          </div>
          <p className="text-text-secondary">Environment: <span className="text-white font-mono">{deploySuccess.environment}</span></p>
          <p className="text-text-secondary">Live Target URL: <a href={deploySuccess.deploymentUrl} target="_blank" rel="noreferrer" className="text-brand-cyan font-mono underline">{deploySuccess.deploymentUrl}</a></p>
        </div>
      )}
    </div>
  );
};
