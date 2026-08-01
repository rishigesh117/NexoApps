import React from 'react';
import { User, Settings, Laptop, Download, Star, MessageSquare, Bell, ShieldCheck, Heart } from 'lucide-react';

export type ProfileTab =
  | 'overview'
  | 'security'
  | 'settings'
  | 'sessions'
  | 'downloads'
  | 'favorites'
  | 'reviews'
  | 'suggestions'
  | 'notifications';

interface ProfileSidebarProps {
  activeTab: ProfileTab;
  onSelectTab: (tab: ProfileTab) => void;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const menuItems: { id: ProfileTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <User className="w-4 h-4" /> },
    { id: 'security', label: 'Security Dashboard', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'settings', label: 'Account Settings', icon: <Settings className="w-4 h-4" /> },
    { id: 'sessions', label: 'Active Sessions', icon: <Laptop className="w-4 h-4" /> },
    { id: 'downloads', label: 'My Downloads', icon: <Download className="w-4 h-4" /> },
    { id: 'favorites', label: 'Favorite Apps', icon: <Heart className="w-4 h-4" /> },
    { id: 'reviews', label: 'My Reviews', icon: <Star className="w-4 h-4" /> },
    { id: 'suggestions', label: 'My Suggestions', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full lg:w-64 shrink-0">
      {/* Desktop Sidebar & Mobile Horizontal Slider */}
      <div className="glass-panel p-2 sm:p-3 rounded-2xl sm:rounded-3xl border border-white/10 flex lg:flex-col overflow-x-auto lg:overflow-visible gap-1.5 scrollbar-none">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-brand-cyan/20 to-brand-violet/20 text-white border border-brand-cyan/30 shadow-glow-cyan'
                  : 'text-text-secondary hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <span className={isActive ? 'text-brand-cyan' : 'text-text-muted'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
