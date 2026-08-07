import React, { useState } from 'react';

export const RPABotManager: React.FC = () => {
  const [bots] = useState([
    { id: 'bot-1', name: 'Invoice OCR Extractor Bot', type: 'unattended', status: 'idle', host: 'rpa-worker-01.internal', capabilities: ['PDF OCR', 'SAP SAP GUI'] },
    { id: 'bot-2', name: 'Legacy Mainframe Terminal Agent', type: 'hybrid', status: 'running', host: 'rpa-worker-02.internal', capabilities: ['Terminal Emulation', 'CSV Data Export'] },
  ]);

  return (
    <div className="p-6 space-y-6 text-slate-100">
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Robotic Process Automation (RPA) Bot Center</h2>
          <p className="text-slate-400 text-sm">Manage desktop, web UI, and legacy system automation bots</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold rounded-xl shadow-lg">
          + Deploy RPA Bot
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bots.map((bot) => (
          <div key={bot.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">{bot.type}</span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${bot.status === 'running' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'}`}>
                {bot.status}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">{bot.name}</h3>
            <p className="text-xs text-slate-400 font-mono">Host: {bot.host}</p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {bot.capabilities.map((cap, i) => (
                <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                  {cap}
                </span>
              ))}
            </div>
            <div className="pt-3 border-t border-slate-800 flex gap-2">
              <button className="w-full py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-semibold rounded-lg border border-indigo-500/30">
                Trigger Job &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
