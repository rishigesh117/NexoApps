import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { DeveloperNotificationsDropdown } from './DeveloperNotificationsDropdown';
import { Search, LogOut, Code2, ExternalLink } from 'lucide-react';

export const DeveloperHeader: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 glass-panel border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left Title / Studio Branding */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-cyan via-brand-blue to-brand-violet flex items-center justify-center text-slate-950 font-black text-xs shadow-glow-cyan">
          <Code2 className="w-4 h-4 text-slate-950" />
        </div>
        <div>
          <span className="text-sm font-extrabold text-white tracking-wide">Developer Workspace</span>
          <span className="text-[10px] text-brand-cyan font-semibold block">NexoApps Console</span>
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="hidden md:flex items-center relative w-80">
        <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search my apps, submissions..."
          className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-1.5 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-cyan/50 transition-all"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-text-secondary hover:text-white bg-white/5 border border-white/10 transition-all"
        >
          <span>Storefront</span>
          <ExternalLink className="w-3 h-3" />
        </Link>

        {/* Developer Notifications */}
        <DeveloperNotificationsDropdown />

        {/* Developer Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-white/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-violet p-0.5 shrink-0">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold">
              {user?.username?.charAt(0).toUpperCase() || 'D'}
            </div>
          </div>
          <div className="hidden lg:block text-left text-xs">
            <span className="font-bold text-white block leading-tight">{user?.username || 'Developer'}</span>
            <span className="text-[10px] text-brand-cyan font-semibold">{user?.role || 'DEVELOPER'}</span>
          </div>

          <button
            onClick={logout}
            aria-label="Logout"
            className="p-1.5 rounded-xl text-text-muted hover:text-rose-400 hover:bg-rose-500/10 transition-all ml-1"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
