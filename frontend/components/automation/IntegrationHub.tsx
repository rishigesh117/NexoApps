import React from 'react';

export const IntegrationHub: React.FC = () => {
  const integrations = [
    { name: 'Salesforce CRM Connector', category: 'CRM', auth: 'OAuth 2.0', status: 'Connected' },
    { name: 'SAP S/4HANA Enterprise ERP', category: 'ERP', auth: 'API Key / Mutual TLS', status: 'Connected' },
    { name: 'ServiceNow ITSM Connector', category: 'ITSM', auth: 'OAuth 2.0', status: 'Connected' },
    { name: 'Slack Enterprise Grid Webhooks', category: 'Communications', auth: 'Bot Token', status: 'Connected' },
  ];

  return (
    <div className="p-6 space-y-6 text-slate-100">
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Enterprise Integration Hub</h2>
          <p className="text-slate-400 text-sm">Manage third-party enterprise system connectors &amp; authenticated endpoints</p>
        </div>
        <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold rounded-xl shadow-lg">
          + Add Integration
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integ, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">{integ.category}</span>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-semibold">{integ.status}</span>
              </div>
              <h3 className="text-lg font-bold text-white">{integ.name}</h3>
              <p className="text-xs text-slate-400 mt-1">Auth: {integ.auth}</p>
            </div>
            <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700">
              Configure &rarr;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
