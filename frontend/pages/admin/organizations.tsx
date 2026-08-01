import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getOrganizations } from '../../services/organizationService';
import { Organization } from '../../types';
import { Building2, CheckCircle2, ShieldAlert, Trash2 } from 'lucide-react';

export default function AdminOrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  const fetchOrgs = async () => {
    try {
      const data = await getOrganizations();
      setOrganizations(data);
    } catch {
      setOrganizations([]);
    }
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  return (
    <AdminLayout title="Organization Management Console | NexoApps Admin">
      <div className="space-y-8 text-left">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Building2 className="w-6 h-6 text-brand-cyan" /> Organization & Workspace Console
            </h1>
            <p className="text-xs text-text-secondary">
              Inspect enterprise organizations, grant verified badges, suspend accounts, and review audit telemetry.
            </p>
          </div>
        </div>

        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden text-left shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-text-muted font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Organization</th>
                  <th className="px-6 py-4">Slug</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Members</th>
                  <th className="px-6 py-4">Projects</th>
                  <th className="px-6 py-4">Created Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {organizations.map((org) => (
                  <tr key={org.id} className="hover:bg-white/5 transition-all">
                    <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                      <span>{org.logoUrl || '🏢'}</span>
                      <span>{org.name}</span>
                      {org.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan" />}
                    </td>
                    <td className="px-6 py-4 font-mono text-brand-cyan">@{org.slug}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {org.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">{org.membersCount || 1}</td>
                    <td className="px-6 py-4 text-text-secondary">{org.projectsCount || 0}</td>
                    <td className="px-6 py-4 text-text-muted">{new Date(org.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
