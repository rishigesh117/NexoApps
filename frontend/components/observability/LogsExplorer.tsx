import React, { useEffect, useState } from 'react';
import { Terminal, Search, Filter, ShieldCheck, RefreshCw } from 'lucide-react';
import { loggingService } from '../../services/loggingService';
import { LogEntry } from '../../../shared/types';

export const LogsExplorer: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [query, setQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    const res = await loggingService.searchLogs({ query, severity: severityFilter });
    setLogs(res.logs);
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, [severityFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLogs();
  };

  const getSeverityBadgeClass = (sev: string) => {
    switch (sev.toUpperCase()) {
      case 'FATAL':
      case 'ERROR':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'WARN':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'DEBUG':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-brand-cyan" /> Centralized Log Explorer & Search
        </h2>
        <span className="text-xs text-emerald-400 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> Secret Redaction Active
        </span>
      </div>

      {/* Filter and Search Bar */}
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search log text or structured data..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-text-muted focus:outline-none focus:border-brand-cyan"
          />
        </div>
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-cyan"
        >
          <option value="">All Severities</option>
          <option value="INFO">INFO</option>
          <option value="DEBUG">DEBUG</option>
          <option value="WARN">WARN</option>
          <option value="ERROR">ERROR</option>
          <option value="FATAL">FATAL</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-brand-cyan text-background font-bold text-xs hover:bg-brand-cyan/90 transition-all flex items-center justify-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Search
        </button>
      </form>

      {/* Log Console View */}
      <div className="p-4 rounded-xl glass-panel border border-white/10 bg-black/40 font-mono space-y-2 overflow-x-auto">
        {loading ? (
          <div className="py-8 text-center text-xs text-text-muted">Fetching log streams...</div>
        ) : logs.length === 0 ? (
          <div className="py-8 text-center text-xs text-text-muted">No logs matching query criteria</div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="p-2.5 rounded hover:bg-white/5 border-b border-white/5 text-xs flex items-start gap-3">
              <span className="text-[10px] text-text-muted shrink-0 pt-0.5">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold border uppercase shrink-0 ${getSeverityBadgeClass(log.severity)}`}>
                {log.severity}
              </span>
              <span className="text-white break-all flex-1">{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
