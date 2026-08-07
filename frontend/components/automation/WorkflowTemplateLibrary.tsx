import React from 'react';

export const WorkflowTemplateLibrary: React.FC = () => {
  const templates = [
    { title: 'AI Model CI/CD Pipeline', category: 'MLOps', desc: 'Automated train, test, and deploy workflow for AI models' },
    { title: 'Data Lake ETL & Validation', category: 'Data', desc: 'Multi-stage data extraction, schema validation, and warehousing' },
    { title: 'Customer Onboarding Automation', category: 'Ops', desc: 'Provisioning, welcome emails, and webhook notifications' },
    { title: 'Enterprise Approval & RPA Chain', category: 'Enterprise', desc: 'AI-assisted document verification and multi-tier signoff' },
  ];

  return (
    <div className="p-6 space-y-6 text-slate-100">
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white">Workflow Template Library</h2>
        <p className="text-slate-400 text-sm">Pre-built industry standard blueprints for enterprise process automation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((tpl, i) => (
          <div key={i} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="text-xs uppercase font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">{tpl.category}</span>
            <h3 className="text-lg font-bold text-white">{tpl.title}</h3>
            <p className="text-sm text-slate-400">{tpl.desc}</p>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-lg">
              Use Blueprint &rarr;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
