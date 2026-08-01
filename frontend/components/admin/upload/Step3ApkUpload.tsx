import React, { useState } from 'react';
import { UploadWizardState } from '../../../types';
import { FileCode, UploadCloud, CheckCircle2, RefreshCw, X, HardDrive, ShieldCheck } from 'lucide-react';

interface Step3Props {
  formData: UploadWizardState;
  onChange: (field: keyof UploadWizardState, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step3ApkUpload: React.FC<Step3Props> = ({
  formData,
  onChange,
  onNext,
  onBack,
}) => {
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(formData.apkFile ? 100 : 0);
  const [etaSeconds, setEtaSeconds] = useState(0);

  const startUploadSimulation = (fileName: string) => {
    setIsSimulatingUpload(true);
    setUploadProgress(0);
    setEtaSeconds(4);

    onChange('apkFile', fileName);
    onChange('apkChecksum', `sha256_${Math.random().toString(36).substring(2, 12)}_${Date.now()}`);

    let current = 0;
    const interval = setInterval(() => {
      current += 25;
      setUploadProgress(current);
      setEtaSeconds(Math.max(0, 4 - Math.floor(current / 25)));

      if (current >= 100) {
        clearInterval(interval);
        setIsSimulatingUpload(false);
      }
    }, 800);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.apk')) {
        onChange('fileSize', `${(file.size / (1024 * 1024)).toFixed(1)} MB`);
        startUploadSimulation(file.name);
      } else {
        alert('Invalid file format. Only .apk files are supported.');
      }
    }
  };

  const handleBrowseSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.name.endsWith('.apk')) {
        onChange('fileSize', `${(file.size / (1024 * 1024)).toFixed(1)} MB`);
        startUploadSimulation(file.name);
      } else {
        alert('Invalid file format. Only .apk files are supported.');
      }
    }
  };

  const cancelUpload = () => {
    setIsSimulatingUpload(false);
    setUploadProgress(0);
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 text-left">
      <div className="border-b border-white/10 pb-4">
        <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
          <FileCode className="w-5 h-5 text-brand-cyan" /> Step 3: APK Binary Package Upload
        </h3>
        <p className="text-xs text-text-secondary">
          Upload Android APK binary file. Automatic checksum validation and package parsing will execute upon upload.
        </p>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
        className="border-2 border-dashed border-white/15 rounded-3xl p-8 text-center space-y-4 hover:border-brand-cyan/50 transition-all bg-white/[0.02]"
      >
        <div className="w-16 h-16 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center mx-auto text-brand-cyan">
          <UploadCloud className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white">Drag & Drop Android APK File Here</h4>
          <p className="text-xs text-text-muted">Maximum file size limit: 500 MB (.apk binary packages only)</p>
        </div>

        <div>
          <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet cursor-pointer hover:shadow-glow-cyan transition-all">
            <span>Browse Files</span>
            <input type="file" accept=".apk" onChange={handleBrowseSelect} className="hidden" />
          </label>
        </div>
      </div>

      {/* Upload Progress Bar */}
      {isSimulatingUpload && (
        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white">Uploading {formData.apkFile}...</span>
            <span className="text-text-muted font-mono">{etaSeconds}s remaining</span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-cyan to-brand-violet rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={cancelUpload}
              className="text-xs text-rose-400 hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Cancel Upload
            </button>
          </div>
        </div>
      )}

      {/* APK Information Card */}
      {uploadProgress === 100 && formData.apkFile && (
        <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" /> APK Upload Verified & Parsed
            </div>
            <button
              onClick={() => startUploadSimulation(formData.apkFile || 'app.apk')}
              className="text-xs text-text-secondary hover:text-white flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Replace APK
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/10 space-y-1">
              <span className="text-[10px] text-text-muted block uppercase font-semibold">File Name</span>
              <span className="font-bold text-white truncate block">{formData.apkFile}</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/10 space-y-1">
              <span className="text-[10px] text-text-muted block uppercase font-semibold">Version</span>
              <span className="font-bold text-brand-cyan font-mono block">v{formData.version}</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/10 space-y-1">
              <span className="text-[10px] text-text-muted block uppercase font-semibold">Size</span>
              <span className="font-bold text-white block">{formData.fileSize}</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/10 space-y-1">
              <span className="text-[10px] text-text-muted block uppercase font-semibold">Checksum</span>
              <span className="font-mono text-[10px] text-emerald-400 truncate block">{formData.apkChecksum}</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-full text-xs font-semibold text-text-secondary hover:text-white bg-white/5 border border-white/10"
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan transition-all"
        >
          Next: Store Information →
        </button>
      </div>
    </div>
  );
};
