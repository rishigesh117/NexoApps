import React from 'react';
import { ApkValidationReport } from '../../../types';
import { ShieldCheck, AlertCircle, CheckCircle2, FileCode, HardDrive, Hash, Layers } from 'lucide-react';

interface ValidationReportProps {
  report: ApkValidationReport;
}

export const ValidationReport: React.FC<ValidationReportProps> = ({ report }) => {
  return (
    <div
      className={`p-6 rounded-3xl border text-left space-y-4 shadow-xl transition-all ${
        report.isValid
          ? 'bg-emerald-500/10 border-emerald-500/25'
          : 'bg-rose-500/10 border-rose-500/25'
      }`}
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          {report.isValid ? (
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400" />
          )}
          <h4 className="text-sm font-extrabold text-white">
            {report.isValid ? 'APK Verification Report — Passed' : 'APK Verification Report — Action Required'}
          </h4>
        </div>

        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
            report.isValid ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
          }`}
        >
          {report.isValid ? 'Verified Format' : 'Validation Error'}
        </span>
      </div>

      {/* Grid Properties */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-2xl bg-slate-950/50 border border-white/10 space-y-0.5">
          <span className="text-[10px] text-text-muted uppercase font-semibold flex items-center gap-1">
            <FileCode className="w-3 h-3 text-brand-cyan" /> Package Name
          </span>
          <p className="font-mono font-bold text-white truncate text-[11px]">{report.packageName}</p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-950/50 border border-white/10 space-y-0.5">
          <span className="text-[10px] text-text-muted uppercase font-semibold flex items-center gap-1">
            <Layers className="w-3 h-3 text-brand-violet" /> Version & Build
          </span>
          <p className="font-mono font-bold text-brand-cyan text-[11px]">
            v{report.versionName} (#{report.buildNumber})
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-950/50 border border-white/10 space-y-0.5">
          <span className="text-[10px] text-text-muted uppercase font-semibold flex items-center gap-1">
            <HardDrive className="w-3 h-3 text-emerald-400" /> SDK Target
          </span>
          <p className="font-bold text-white text-[11px] truncate">{report.targetSdk}</p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-950/50 border border-white/10 space-y-0.5">
          <span className="text-[10px] text-text-muted uppercase font-semibold flex items-center gap-1">
            <Hash className="w-3 h-3 text-amber-400" /> SHA-256
          </span>
          <p className="font-mono text-[10px] text-emerald-400 truncate">{report.checksum}</p>
        </div>
      </div>

      {/* Validation Errors list if any */}
      {report.errors.length > 0 && (
        <div className="space-y-1.5 pt-1 text-xs">
          <span className="font-bold text-rose-400 block">Validation Failures:</span>
          {report.errors.map((err, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{err}</span>
            </div>
          ))}
        </div>
      )}

      {/* Validation Warnings if any */}
      {report.warnings.length > 0 && (
        <div className="space-y-1.5 pt-1 text-xs">
          <span className="font-bold text-amber-300 block">Warnings:</span>
          {report.warnings.map((warn, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-amber-400" />
              <span>{warn}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
