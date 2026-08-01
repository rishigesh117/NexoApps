import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { MainLayout } from '../layouts/MainLayout';
import { SEOHead } from '../components/SEOHead';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { useAuth } from '../context/AuthContext';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileSidebar, ProfileTab } from '../components/profile/ProfileSidebar';
import { AccountSettingsTab } from '../components/profile/AccountSettingsTab';
import { SecurityTab } from '../components/profile/SecurityTab';
import { ActiveSessionsTab } from '../components/profile/ActiveSessionsTab';
import { DownloadsTab } from '../components/profile/DownloadsTab';
import { FavoritesTab } from '../components/profile/FavoritesTab';
import { ReviewsTab } from '../components/profile/ReviewsTab';
import { SuggestionsTab } from '../components/profile/SuggestionsTab';
import { NotificationsTab } from '../components/profile/NotificationsTab';
import { Shield, Sparkles, Key, CheckCircle2, Lock } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');

  return (
    <>
      <SEOHead
        title="Account Center | NexoApps Platform"
        description="Manage your profile, account settings, active security sessions, and app download history."
        canonicalUrl="https://nexoapps.com/profile"
      />

      <MainLayout>
        <ProtectedRoute>
          {user && (
            <div className="py-8 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Top Profile Header Banner */}
              <ProfileHeader user={user} />

              {/* Main Content Layout: Left Sidebar + Tab Panel */}
              <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Navigation Sidebar */}
                <ProfileSidebar activeTab={activeTab} onSelectTab={setActiveTab} />

                {/* Selected Tab Content View */}
                <div className="flex-1 min-w-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      {activeTab === 'overview' && (
                        <div className="space-y-6 text-left">
                          
                          {/* Overview Info Card */}
                          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                              <Sparkles className="w-5 h-5 text-brand-cyan" /> Account Overview
                            </h3>
                            <p className="text-xs text-text-muted">
                              Summary of your NexoApps account properties and platform permissions
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                              <div className="p-4 rounded-2xl bg-surface-100/80 border border-white/10 space-y-1">
                                <span className="text-[11px] text-text-muted font-semibold uppercase tracking-wider">Username</span>
                                <p className="text-sm font-bold text-white">{user.username}</p>
                              </div>

                              <div className="p-4 rounded-2xl bg-surface-100/80 border border-white/10 space-y-1">
                                <span className="text-[11px] text-text-muted font-semibold uppercase tracking-wider">Email Address</span>
                                <p className="text-sm font-bold text-white">{user.email}</p>
                              </div>

                              <div className="p-4 rounded-2xl bg-surface-100/80 border border-white/10 space-y-1">
                                <span className="text-[11px] text-text-muted font-semibold uppercase tracking-wider">Platform Role</span>
                                <p className="text-sm font-bold text-brand-cyan">{user.role}</p>
                              </div>

                              <div className="p-4 rounded-2xl bg-surface-100/80 border border-white/10 space-y-1">
                                <span className="text-[11px] text-text-muted font-semibold uppercase tracking-wider">Email Status</span>
                                <p className={`text-sm font-bold ${user.emailVerified ? 'text-emerald-400' : 'text-amber-400'}`}>
                                  {user.emailVerified ? 'Verified Account' : 'Pending Verification'}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Security Summary Card */}
                          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                              <Shield className="w-5 h-5 text-brand-cyan" /> Account Security Summary
                            </h3>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                              <div className="p-3.5 rounded-xl bg-surface-100/60 border border-white/5 flex items-center justify-between">
                                <span className="text-text-secondary">Email Verified</span>
                                <span className="font-bold text-emerald-400">
                                  {user.emailVerified ? 'Yes' : 'No'}
                                </span>
                              </div>

                              <div className="p-3.5 rounded-xl bg-surface-100/60 border border-white/5 flex items-center justify-between">
                                <span className="text-text-secondary">Password Security</span>
                                <span className="font-bold text-emerald-400">Strong</span>
                              </div>

                              <div className="p-3.5 rounded-xl bg-surface-100/60 border border-white/5 flex items-center justify-between">
                                <span className="text-text-secondary">Two-Factor Auth (2FA)</span>
                                <span className="font-bold text-text-muted">Coming Soon</span>
                              </div>

                              <div className="p-3.5 rounded-xl bg-surface-100/60 border border-white/5 flex items-center justify-between">
                                <span className="text-text-secondary">Third-Party OAuth</span>
                                <span className="font-bold text-text-muted">Google / GitHub</span>
                              </div>
                            </div>
                          </div>

                        </div>
                      )}

                      {activeTab === 'security' && <SecurityTab user={user} />}
                      {activeTab === 'settings' && <AccountSettingsTab user={user} />}
                      {activeTab === 'sessions' && <ActiveSessionsTab />}
                      {activeTab === 'downloads' && <DownloadsTab />}
                      {activeTab === 'favorites' && <FavoritesTab />}
                      {activeTab === 'reviews' && <ReviewsTab />}
                      {activeTab === 'suggestions' && <SuggestionsTab />}
                      {activeTab === 'notifications' && <NotificationsTab />}
                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>

            </div>
          )}
        </ProtectedRoute>
      </MainLayout>
    </>
  );
}
