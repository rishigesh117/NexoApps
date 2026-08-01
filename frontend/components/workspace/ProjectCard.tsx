import React from 'react';
import { OrganizationProject } from '../../types';
import { FolderGit2, Users, FileCode, CheckCircle2, Clock } from 'lucide-react';

interface ProjectCardProps {
  project: OrganizationProject;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getStatusColor = () => {
    switch (project.status) {
      case 'Active':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'Planning':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Review':
        return 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/40';
      default:
        return 'bg-white/10 text-text-muted border-white/10';
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-brand-cyan/40 transition-all flex flex-col justify-between space-y-4 text-left shadow-2xl">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-cyan px-2.5 py-0.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20">
            {project.category}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor()}`}>
            {project.status}
          </span>
        </div>

        <h3 className="font-extrabold text-white text-base leading-tight">{project.name}</h3>
        <p className="text-xs text-text-secondary line-clamp-2">{project.description}</p>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs text-text-muted">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-brand-cyan" /> {project.membersCount || 1} Members
          </span>
          <span className="flex items-center gap-1">
            <FileCode className="w-3.5 h-3.5 text-brand-violet" /> {project.filesCount || 0} Files
          </span>
        </div>
        <span className="text-[10px] text-text-muted">Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};
