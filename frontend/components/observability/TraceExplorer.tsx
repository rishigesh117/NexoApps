import React, { useEffect, useState } from 'react';
import { GitBranch, Clock, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { tracingService, TraceGroup } from '../../services/tracingService';

export const TraceExplorer: React.FC = () => {
  const [traces, setTraces] = useState<TraceGroup[]>([]);
  const [selectedTrace, setSelectedTrace] = useState<TraceGroup | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tracingService.getTraces().then((res) => {
      setTraces(res);
      if (res.length) setSelectedTrace(res[0]);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-brand-cyan" /> Distributed Tracing & Span Analyzer
        </h2>
        <span className="text-xs text-text-muted">{traces.length} trace sequences collected</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traces List */}
        <div className="p-4 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-2">
          <h3 className="text-xs uppercase font-semibold text-text-muted mb-2">Recent Distributed Traces</h3>
          {traces.map((tr) => (
            <button
              key={tr.traceId}
              onClick={() => setSelectedTrace(tr)}
              className={`w-full p-3 rounded-xl border text-left transition-all space-y-1 ${
                selectedTrace?.traceId === tr.traceId
                  ? 'border-brand-cyan bg-brand-cyan/10 shadow-glow-cyan'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white">{tr.traceId}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                  tr.statusCode === 'OK' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                }`}>
                  {tr.statusCode}
                </span>
              </div>
              <div className="text-xs text-text-muted truncate">{tr.rootOperation}</div>
              <div className="flex items-center justify-between text-[11px] text-text-muted pt-1">
                <span>{tr.spansCount} Spans</span>
                <span className="text-brand-cyan font-mono">{tr.totalDurationMs}ms</span>
              </div>
            </button>
          ))}
        </div>

        {/* Span Waterfall Timeline View */}
        <div className="lg:col-span-2 p-6 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-4">
          {selectedTrace ? (
            <>
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-mono text-base font-bold text-white">{selectedTrace.traceId}</h3>
                  <p className="text-xs text-text-muted">{selectedTrace.rootOperation}</p>
                </div>
                <div className="text-right text-xs">
                  <span className="text-text-muted">Total Duration: </span>
                  <span className="font-mono font-bold text-brand-cyan">{selectedTrace.totalDurationMs}ms</span>
                </div>
              </div>

              {/* Waterfall Timeline */}
              <div className="space-y-3 pt-2">
                {selectedTrace.spans.map((span) => {
                  const pct = Math.min(100, Math.max(15, (span.durationMs / selectedTrace.totalDurationMs) * 100));
                  return (
                    <div key={span.id} className="p-3 rounded-lg bg-black/20 border border-white/5 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white">{span.serviceName} &rarr; <span className="font-mono text-brand-cyan">{span.operationName}</span></span>
                        <span className="font-mono text-text-muted">{span.durationMs}ms</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className="bg-brand-cyan h-full rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-xs text-text-muted">Select a trace to view span breakdown</div>
          )}
        </div>
      </div>
    </div>
  );
};
