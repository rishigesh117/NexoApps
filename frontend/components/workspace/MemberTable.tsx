import React from 'react';
import { OrganizationMember } from '../../types';
import { RoleBadge } from './RoleBadge';
import { UserCheck, Trash2, Mail } from 'lucide-react';

interface MemberTableProps {
  members: OrganizationMember[];
  onRemoveMember?: (id: string) => void;
}

export const MemberTable: React.FC<MemberTableProps> = ({ members, onRemoveMember }) => {
  return (
    <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden text-left shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-white/5 border-b border-white/10 text-text-muted font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Joined Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-white/5 transition-all">
                <td className="px-6 py-4 font-bold text-white flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center font-bold text-brand-cyan">
                    {m.username.charAt(0).toUpperCase()}
                  </div>
                  <span>{m.username}</span>
                </td>
                <td className="px-6 py-4 text-text-secondary">{m.email}</td>
                <td className="px-6 py-4">
                  <RoleBadge role={m.role} />
                </td>
                <td className="px-6 py-4 text-text-muted">{new Date(m.joinedAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  {m.role !== 'owner' && onRemoveMember && (
                    <button
                      type="button"
                      onClick={() => onRemoveMember(m.id)}
                      className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Remove Member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
