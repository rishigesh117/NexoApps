import React, { useEffect, useState } from 'react';
import { AlertTriangle, Clock, UserCheck, CheckCircle2, MessageSquare } from 'lucide-react';
import { incidentService, DetailedIncident } from '../../services/incidentService';
import { IncidentRecord } from '../../../shared/types';
import { IncidentTimeline } from './IncidentTimeline';

export const IncidentCenter: React.FC = () => {
  const [incidents, setIncidents] = useState<IncidentRecord[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<DetailedIncident | null>(null);

  const loadIncidents = async () => {
    const list = await incidentService.getIncidents();
    setIncidents(list);
    if (list.length) {
      const detailed = await incidentService.getIncidentById(list[0].id);
      setSelectedIncident(detailed);
    }
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  const handleSelect = async (id: string) => {
    const detailed = await incidentService.getIncidentById(id);
    setSelectedIncident(detailed);
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedIncident) return;
    await incidentService.updateIncidentStatus(selectedIncident.id, newStatus, `Transitioned status to ${newStatus}`);
    handleSelect(selectedIncident.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-400" /> Operational Incident Command Center
        </h2>
        <span className="text-xs text-text-muted">{incidents.length} total incidents recorded</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incident List */}
        <div className="p-4 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
          <h3 className="text-xs uppercase font-semibold text-text-muted">Active & Historical Incidents</h3>
          {incidents.map((inc) => (
            <button
              key={inc.id}
              onClick={() => handleSelect(inc.id)}
              className={`w-full p-3.5 rounded-xl border text-left transition-all space-y-1.5 ${
                selectedIncident?.id === inc.id
                  ? 'border-brand-cyan bg-brand-cyan/10 shadow-glow-cyan'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white">{inc.id}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                  ['RESOLVED', 'CLOSED'].includes(inc.status) ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                }`}>
                  {inc.status}
                </span>
              </div>
              <h4 className="font-semibold text-xs text-white truncate">{inc.title}</h4>
              <div className="flex items-center justify-between text-[10px] text-text-muted pt-1">
                <span>Sev: <strong className="text-rose-400">{inc.severity}</strong></span>
                <span>Assigned: {inc.assignedTo || 'Unassigned'}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Detailed Incident Control & Timeline Panel */}
        <div className="lg:col-span-2 p-6 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-6">
          {selectedIncident ? (
            <>
              <div className="border-b border-white/10 pb-4 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-brand-cyan font-bold">{selectedIncident.id}</span>
                    <span className="text-xs px-2 py-0.5 rounded font-bold uppercase bg-rose-500/20 text-rose-300">
                      {selectedIncident.severity}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-display mt-1">{selectedIncident.title}</h3>
                  <p className="text-xs text-text-muted mt-1">{selectedIncident.description}</p>
                </div>
              </div>

              {/* Status Transition Control Buttons */}
              <div className="space-y-2">
                <span className="text-xs text-text-muted font-semibold">Incident Lifecycle State Transition:</span>
                <div className="flex flex-wrap gap-2">
                  {['ACKNOWLEDGED', 'INVESTIGATING', 'MITIGATING', 'RESOLVED', 'CLOSED'].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all ${
                        selectedIncident.status === st
                          ? 'bg-brand-cyan text-background font-bold'
                          : 'bg-white/5 hover:bg-white/10 text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              {selectedIncident.timeline && <IncidentTimeline timeline={selectedIncident.timeline} />}
            </>
          ) : (
            <div className="p-12 text-center text-xs text-text-muted">Select an incident to view timeline and state controls</div>
          )}
        </div>
      </div>
    </div>
  );
};
