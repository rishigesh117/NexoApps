import React, { useState } from 'react';
import { AppVersionRecord } from '../../../types';
import { Layers, Plus, RotateCcw, CheckCircle2, FileCode, Bug, Clock, Download } from 'lucide-react';

interface VersionManagerProps {
  appId: string;
  versions: AppVersionRecord[];
  onCreateVersion: (data: any) => void;
  onRollback: (versionId: string) => void;
}

export const VersionManager: React.FC<VersionManagerProps> = ({
  appId,
  versions,
  onCreateVersion,
  onRollback,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [versionName, setVersionName] = useState('');
  const [buildNumber, setBuildNumber] = useState(versions.length + 1);
  const [releaseNotes, setReleaseNotes] = useState('');
  const [bugFixes, setBugFixes] = useState('');
  const [knownIssues, setKnownIssues] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateVersion({
      versionName,
      buildNumber,
      releaseNotes,
      bugFixes,
      knownIssues,
      releaseDate: new Date().toISOString().split('T')[0],
    });
    setIsModalOpen(false);
    setVersionName('');
    setReleaseNotes('');
    setBugFixes('');
    setKnownIssues('');
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-5 text-left">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-cyan" /> Version Releases & Rollback Manager
          </h3>
          <p className="text-xs text-text-secondary">
            Manage release builds (v1.0, v1.1, v2.0), changelogs, and rollback active builds.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" /> Create Version Build
        </button>
      </div>

      {/* Versions List */}
      <div className="space-y-3">
        {versions.map((ver) => (
          <div
            key={ver.id}
            className={`p-4 rounded-2xl border transition-all text-xs space-y-3 ${
              ver.isActive
                ? 'bg-brand-cyan/10 border-brand-cyan/30 shadow-glow-cyan'
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-sm text-white">v{ver.versionName}</span>
                <span className="text-[11px] font-mono text-brand-cyan">Build #{ver.buildNumber}</span>
                {ver.isActive && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Active Release
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-text-muted">{ver.releaseDate}</span>
                {!ver.isActive && (
                  <button
                    type="button"
                    onClick={() => onRollback(ver.id)}
                    className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold hover:bg-amber-500/30 text-[10px] flex items-center gap-1 transition-all"
                  >
                    <RotateCcw className="w-3 h-3" /> Rollback to this build
                  </button>
                )}
              </div>
            </div>

            <p className="text-text-secondary italic leading-relaxed">{ver.releaseNotes}</p>

            {ver.bugFixes && (
              <div className="text-[11px] text-rose-300 flex items-center gap-1">
                <Bug className="w-3 h-3 shrink-0" /> {ver.bugFixes}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-white/15 shadow-2xl space-y-4 text-xs">
            <h4 className="text-base font-bold text-white">Add New Version Build</h4>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-text-secondary font-semibold block">Version Name</label>
                  <input
                    type="text"
                    value={versionName}
                    onChange={(e) => setVersionName(e.target.value)}
                    placeholder="e.g. 2.1.0"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-3 py-2 text-white font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="text-text-secondary font-semibold block">Build Number</label>
                  <input
                    type="number"
                    value={buildNumber}
                    onChange={(e) => setBuildNumber(parseInt(e.target.value) || 1)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-3 py-2 text-white font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-text-secondary font-semibold block">Release Notes</label>
                <textarea
                  value={releaseNotes}
                  onChange={(e) => setReleaseNotes(e.target.value)}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 text-white resize-none"
                  required
                />
              </div>

              <div>
                <label className="text-text-secondary font-semibold block">Resolved Bug Fixes</label>
                <input
                  type="text"
                  value={bugFixes}
                  onChange={(e) => setBugFixes(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full text-text-muted hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full text-slate-950 font-bold bg-gradient-to-r from-brand-cyan to-brand-violet"
                >
                  Save Build
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
