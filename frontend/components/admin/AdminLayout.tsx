import React from 'react';
import { SEOHead } from '../SEOHead';
import { RoleGuard } from '../RoleGuard';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';
import { AIAssistantButton } from '../assistant/AIAssistantButton';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title = 'Google Play Console | NexoApps Admin',
  description = 'NexoApps Admin Dashboard and Developer Console',
}) => {
  return (
    <>
      <SEOHead title={title} description={description} />

      <RoleGuard roles={['ADMIN']}>
        <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased selection:bg-brand-cyan selection:text-slate-950">
          {/* Top Admin Header */}
          <AdminHeader />

          {/* Main Body */}
          <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
            <AdminSidebar />

            <main className="flex-1 min-w-0">
              {children}
            </main>
          </div>

          {/* Global Floating AI Assistant */}
          <AIAssistantButton />
        </div>
      </RoleGuard>
    </>
  );
};
