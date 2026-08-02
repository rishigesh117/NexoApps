import React from 'react';
import { Bot, UserCheck, Plus, Shield, Sparkles } from 'lucide-react';

export const DigitalEmployeeGrid: React.FC = () => {
  const employees = [
    { name: 'AI Software Engineer - Alex', role: 'Senior Fullstack Developer', model: 'gemini-1.5-pro', autonomy: 'Autonomous', tasks: 428, dept: 'Engineering' },
    { name: 'AI Security Auditor - Sarah', role: 'SecOps Analyst', model: 'gemini-1.5-pro', autonomy: 'Semi-Autonomous', tasks: 215, dept: 'Security' },
    { name: 'AI Financial Analyst - Felix', role: 'Revenue Accountant', model: 'gemini-1.5-flash', autonomy: 'Autonomous', tasks: 580, dept: 'Finance' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Digital Workforce Roster</h3>
          <p className="text-xs text-text-muted">Deploy, configure, and monitor autonomous AI employees and specialists</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white text-xs font-bold shadow-glow-cyan hover:opacity-95 transition-all">
          <Plus className="w-3.5 h-3.5" /> Hire Digital Employee
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {employees.map((emp) => (
          <div key={emp.name} className="p-4 rounded-2xl bg-surface-100 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-cyan to-brand-violet flex items-center justify-center text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="font-mono text-xs font-bold text-white truncate">{emp.name}</span>
              </div>
            </div>
            <p className="text-[10px] text-text-muted font-mono">{emp.role} • {emp.dept}</p>
            <div className="grid grid-cols-2 gap-2 text-center py-2 bg-background/50 rounded-xl border border-white/5 text-xs">
              <div>
                <p className="font-bold text-white">{emp.tasks}</p>
                <p className="text-[10px] text-text-muted">Tasks Done</p>
              </div>
              <div>
                <p className="font-bold text-brand-cyan">{emp.autonomy}</p>
                <p className="text-[10px] text-text-muted">Autonomy</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
