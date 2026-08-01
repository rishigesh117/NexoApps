import React, { useState } from 'react';
import { UserAdminRecord } from '../../types';
import { adminService } from '../../services/adminService';
import { Users, Search, UserCheck, UserX, Shield, CheckCircle2 } from 'lucide-react';

interface UserManagementProps {
  users: UserAdminRecord[];
  onRefresh: () => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({ users, onRefresh }) => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter ? u.role === roleFilter : true;
    return matchesSearch && matchesRole;
  });

  const handleToggleStatus = async (user: UserAdminRecord) => {
    const nextStatus = user.status === 'Suspended' ? 'Active' : 'Suspended';
    try {
      await adminService.updateUser(user.id, { status: nextStatus });
      onRefresh();
    } catch (err: any) {
      alert(err.message || 'Failed to update user status');
    }
  };

  const handlePromoteRole = async (user: UserAdminRecord) => {
    if (confirm(`Promote user ${user.username} (${user.email}) to ADMIN role?`)) {
      try {
        await adminService.updateUser(user.id, { role: 'ADMIN' });
        onRefresh();
      } catch (err: any) {
        alert(err.message || 'Failed to promote user role');
      }
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-brand-cyan" /> User Accounts Directory
            </h3>
            <p className="text-xs text-text-secondary">
              Manage member profiles, grant administrator roles, and control active/suspended statuses.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
            {filteredUsers.length} Users Listed
          </span>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by username or email..."
              className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-cyan/50"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-900 border border-white/10 rounded-full px-4 py-2 text-xs text-white"
          >
            <option value="">All Roles</option>
            <option value="MEMBER">MEMBER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-white/5 text-text-muted border-b border-white/10 uppercase text-[10px] tracking-wider">
                <th className="p-4 font-semibold">User Details</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold">Email Verified</th>
                <th className="p-4 font-semibold">Account Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-bold text-white">
                    {u.username}
                    <span className="block text-[11px] text-text-muted font-normal">{u.email}</span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        u.role === 'OWNER'
                          ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                          : u.role === 'ADMIN'
                          ? 'bg-brand-violet/20 text-brand-violet border-brand-violet/30'
                          : 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/30'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4">
                    {u.emailVerified ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    ) : (
                      <span className="text-amber-400 font-semibold">Pending</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span
                      className={`font-semibold ${
                        u.status === 'Suspended' ? 'text-rose-400' : 'text-emerald-400'
                      }`}
                    >
                      {u.status || 'Active'}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleToggleStatus(u)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        u.status === 'Suspended'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border-rose-500/30 hover:bg-rose-500/30'
                      }`}
                    >
                      {u.status === 'Suspended' ? 'Activate' : 'Suspend'}
                    </button>

                    {u.role !== 'ADMIN' && (
                      <button
                        onClick={() => handlePromoteRole(u)}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 hover:bg-brand-cyan/30 transition-all"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
