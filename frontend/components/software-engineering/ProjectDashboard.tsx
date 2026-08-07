import React from 'react';
import { Cpu, GitBranch, ShieldCheck, CheckCircle2, Terminal } from 'lucide-react';
import { SoftwareProject } from '../../../shared/types';

interface ProjectDashboardProps {
  project: SoftwareProject;
}

export const ProjectDashboard: React.FC<ProjectDashboardProps> = ({ project }) => {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-cyan via-brand-blue to-brand-violet p-0.5 shadow-glow-cyan">
            <div className="w-full h-full bg-background rounded-[14px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-brand-cyan" />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              {project.name}
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan font-mono">
                {project.architecturePattern}
              </span>
            </h2>
            <p className="text-xs text-text-muted mt-0.5">Tech Stack: {project.techStack}</p>
          </div>
        </div>

        <span className="text-xs font-bold px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> SDLC Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-surface-100/80 border border-white/10">
          <span className="text-[10px] font-bold text-text-muted uppercase">Code Coverage</span>
          <h4 className="text-2xl font-extrabold text-emerald-400 mt-1">94.8%</h4>
        </div>
        <div className="p-4 rounded-2xl bg-surface-100/80 border border-white/10">
          <span className="text-[10px] font-bold text-text-muted uppercase">Security Health</span>
          <h4 className="text-2xl font-extrabold text-brand-cyan mt-1">PASSED</h4>
        </div>
        <div className="p-4 rounded-2xl bg-surface-100/80 border border-white/10">
          <span className="text-[10px] font-bold text-text-muted uppercase">Velocity Score</span>
          <h4 className="text-2xl font-extrabold text-brand-violet mt-1">98.2 / 100</h4>
        </div>
        <div className="p-4 rounded-2xl bg-surface-100/80 border border-white/10">
          <span className="text-[10px] font-bold text-text-muted uppercase">Technical Debt</span>
          <h4 className="text-2xl font-extrabold text-amber-400 mt-1">1.5 hrs</h4>
        </div>
      </div>
    </div>
  );
};
