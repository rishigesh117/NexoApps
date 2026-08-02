import React, { useState } from 'react';
import { Zap, Play, CheckCircle2, Terminal } from 'lucide-react';

export const ServerlessConsole: React.FC = () => {
  const [invoking, setInvoking] = useState(false);
  const [output, setOutput] = useState<any>(null);

  const handleInvoke = () => {
    setInvoking(true);
    setTimeout(() => {
      setInvoking(false);
      setOutput({ success: true, executionId: 'exec_8a9f21', durationMs: 38, memoryUsedMb: 64, result: { status: 200, message: 'Serverless function executed clean in V8 isolate' } });
    }, 800);
  };

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Serverless Function Console</h3>
          <p className="text-xs text-text-muted">Test and invoke serverless microservices with sub-50ms cold start latency</p>
        </div>
        <button
          onClick={handleInvoke}
          disabled={invoking}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold shadow-glow-cyan hover:opacity-95 transition-all disabled:opacity-50"
        >
          <Play className={`w-3.5 h-3.5 ${invoking ? 'animate-spin' : ''}`} />
          <span>{invoking ? 'Executing...' : 'Invoke Serverless Function'}</span>
        </button>
      </div>

      {output && (
        <div className="p-4 rounded-2xl bg-surface-100 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> HTTP 200 OK
            </span>
            <span className="font-mono text-text-muted">Duration: {output.durationMs}ms | Memory: {output.memoryUsedMb}MB</span>
          </div>
          <pre className="font-mono text-xs text-text-secondary bg-background/50 p-3 rounded-xl border border-white/5 overflow-x-auto">
            {JSON.stringify(output.result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
