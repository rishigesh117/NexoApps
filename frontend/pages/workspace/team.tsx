import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { OrganizationSidebar } from '../../components/workspace/OrganizationSidebar';
import { MemberTable } from '../../components/workspace/MemberTable';
import { InviteMemberModal } from '../../components/workspace/InviteMemberModal';
import { getOrganizationMembers } from '../../services/organizationService';
import { OrganizationMember } from '../../types';
import { Users, UserPlus } from 'lucide-react';

export default function WorkspaceTeamPage() {
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const fetchMembers = async () => {
    try {
      const data = await getOrganizationMembers('org-101');
      setMembers(data);
    } catch {
      setMembers([]);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <>
      <SEOHead
        title="Team Directory & Member Roles | NexoApps Workspace"
        description="Manage organization team members, assign workspace roles (Owner, Admin, PM, Developer, Reviewer, Viewer), and invite colleagues."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <OrganizationSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
              <div>
                <h1 className="text-2xl font-black text-white flex items-center gap-2">
                  <Users className="w-6 h-6 text-emerald-400" /> Team Members & Role Directory
                </h1>
                <p className="text-xs text-text-secondary mt-1">
                  Manage organization members, assign role permissions, and issue invitation links.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowInviteModal(true)}
                className="px-6 py-3 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet hover:shadow-glow-cyan flex items-center gap-2 transition-all shrink-0"
              >
                <UserPlus className="w-4 h-4" />
                <span>Invite Team Member</span>
              </button>
            </div>

            <MemberTable members={members} />
          </div>
        </main>

        {showInviteModal && (
          <InviteMemberModal
            orgId="org-101"
            onSuccess={() => {
              setShowInviteModal(false);
              fetchMembers();
            }}
            onClose={() => setShowInviteModal(false)}
          />
        )}

        <Footer />
      </div>
    </>
  );
}
