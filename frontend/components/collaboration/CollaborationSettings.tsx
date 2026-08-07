import React, { useState } from 'react';
import { Sliders, Shield, Bell, Lock } from 'lucide-react';

export const CollaborationSettings: React.FC = () => {
  const [allowPublicWhiteboards, setAllowPublicWhiteboards] = useState(true);
  const [enableAITranscripts, setEnableAITranscripts] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Sliders className="w-6 h-6 text-brand-cyan" /> Collaboration Settings
        </h2>
        <p className="text-text-muted text-sm">Configure workplace permissions, AI integrations, and security policies</p>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-white text-sm">Allow Public Whiteboards</h4>
            <p className="text-text-muted text-xs">Permit workspace members to share whiteboards publicly</p>
          </div>
          <input
            type="checkbox"
            checked={allowPublicWhiteboards}
            onChange={(e) => setAllowPublicWhiteboards(e.target.checked)}
            className="w-4 h-4 accent-brand-cyan"
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <h4 className="font-semibold text-white text-sm">AI Meeting Transcripts</h4>
            <p className="text-text-muted text-xs">Automatically generate transcripts & summaries for meeting recordings</p>
          </div>
          <input
            type="checkbox"
            checked={enableAITranscripts}
            onChange={(e) => setEnableAITranscripts(e.target.checked)}
            className="w-4 h-4 accent-brand-cyan"
          />
        </div>
      </div>
    </div>
  );
};
