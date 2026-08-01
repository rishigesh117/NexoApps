import React from 'react';
import { UserAdminRecord } from '../../types';
import { Users, ShieldCheck, UserX, UserCheck } from 'lucide-react';

interface RecentUsersProps {
  users: UserAdminRecord[];
  onToggleStatus?: (userId: string, currentStatus: string) => void;
  onPromoteRole?: (userId: string, currentRole: string) => void;
}

export const RecentUsers: React.FC<RecentUsersProps> = ({
  users,
  onToggleStatus,
  onPromoteRole,
}) => {
  const list = users.slice(0, 5);

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-brand-cyan" />
          <h3 className="text-base font-bold text-white">Registered Platform Members</h3>
        </div>
        <span className="text-xs text-text-muted">{users.length} Total Accounts</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-text-muted border-b border-white/5 uppercase text-[10px] tracking-wider">
              <th className="pb-2 font-semibold">User</th>
              <th className="pb-2 font-semibold">Role</th>
              <th className="pb-2 font-semibold">Status</th>
              <th className="pb-2 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {list.map((u) => (
              <tr key={u.id} className="hover:bg-white/5 transition-colors">
                <td className="py-3 font-bold text-white">
                  {u.username}
                  <span className="block text-[10px] text-text-muted font-normal">{u.email}</span>
                </td>
                <td className="py-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      u.role === 'ADMIN'
                        ? 'bg-brand-violet/20 text-brand-violet border-brand-violet/30'
                        : 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/30'
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="py-3">
                  <span
                    className={`text-[11px] font-semibold ${
                      u.status === 'Suspended' ? 'text-rose-400' : 'text-emerald-400'
                    }`}
                  >
                    {u.status || 'Active'}
                  </span>
                </td>
                <td className="py-3 text-right space-x-1">
                  {onToggleStatus && (
                    <button
                      onClick={() => onToggleStatus(u.id, u.status || 'Active')}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted hover:text-white transition-all"
                      title={u.status === 'Suspended' ? 'Activate User' : 'Suspend User'}
                    >
                      {u.status === 'Suspended' ? (
                        <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <UserX className="w-3.5 h-3.5 text-rose-400" />
                      )}
                    </button>
                  )}

                  {onPromoteRole && u.role !== 'ADMIN' && (
                    <button
                      onClick={() => onPromoteRole(u.id, u.role)}
                      className="px-2 py-1 rounded-lg bg-brand-cyan/20 text-brand-cyan hover:bg-brand-cyan/30 text-[10px] font-bold transition-all"
                    >
                      Promote Admin
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
