import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Layers,
  Search,
  Activity,
  User,
  LogOut,
  UserPlus,
  Menu,
  X,
  Rocket,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { NotificationCenter } from './ai-os/NotificationCenter';
import { SearchModal } from './SearchModal';
import { LoginModal } from './LoginModal';
import { SignupModal } from './SignupModal';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Cloud Control', href: '/cloud-control' },
    { name: 'Networking', href: '/networking' },
    { name: 'Observability', href: '/observability' },
    { name: 'Database Platform', href: '/database-platform' },
    { name: 'Production', href: '/production' },
    { name: 'Enterprise', href: '/enterprise' },
    { name: 'AI Universe', href: '/enterprise/dashboard' },
    { name: 'Collaboration', href: '/collaboration' },
    { name: 'Workspace', href: '/collaboration/workspaces' },
    { name: 'Automation', href: '/automation' },
    { name: 'Workflows', href: '/automation/workflows' },
    { name: 'Platform', href: '/platform' },
    { name: 'Developer Cloud', href: '/developer-cloud' },
    { name: 'DevOps', href: '/developer-cloud/pipelines' },
    { name: 'ModelOps', href: '/modelops' },
    { name: 'AI Models', href: '/modelops/models' },
    { name: 'Cloud Platform', href: '/cloud-platform' },
    { name: 'Commerce', href: '/commerce' },
    { name: 'AI OS Workspace', href: '/workspace' },
    { name: 'AI Gateway', href: '/ai-gateway' },
    { name: 'Application Builder', href: '/app-builder' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Software Engineering', href: '/software-engineering' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Tenant SaaS', href: '/tenant' },
    { name: 'Developer API', href: '/developer/api' },
    { name: 'Security', href: '/security' },
    { name: 'Data Platform', href: '/data-platform' },
    { name: 'v4.0 LTS', href: '/lts' },
    { name: 'Agent Cloud', href: '/agent-cloud' },
    { name: 'AI Runtime', href: '/runtime' },
    { name: 'Knowledge Cloud', href: '/knowledge' },
    { name: 'Enterprise AI', href: '/enterprise' },
    { name: 'Super Platform', href: '/super-platform' },
    { name: 'Apps', href: '/apps' },
    { name: 'AI Platform', href: '/ai-platform' },
    { name: 'AI Builder', href: '/builder' },
    { name: 'AI Agents', href: '/agents' },
    { name: 'Community', href: '/community' },
    { name: 'Trending', href: '/trending' },
    { name: 'Recommended', href: '/recommended' },
    { name: 'Collections', href: '/collections' },
    { name: 'Categories', href: '/categories' },
    { name: 'Cloud Sync', href: '/cloud' },
    { name: 'Help', href: '/help' },
    { name: 'Support', href: '/support' },
  ];

  const handleSwitchToSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo: NexoApps */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-cyan via-brand-blue to-brand-violet p-0.5 shadow-glow-cyan transition-transform group-hover:scale-105">
                <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
                  <Layers className="w-5 h-5 text-brand-cyan" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl tracking-tight text-white flex items-center gap-1">
                  Nexo<span className="text-brand-cyan">Apps</span>
                </span>
                <span className="text-[10px] text-text-muted tracking-wider uppercase font-semibold">
                  Personal App Store
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1 lg:gap-2 overflow-x-auto max-w-[50vw] scrollbar-none">
              {navLinks.slice(0, 10).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-text-secondary hover:text-white hover:bg-white/5 transition-all duration-200 whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Action Buttons: Search, Login, Sign Up - Always Visible & Shrink-Proof */}
            <div className="flex items-center gap-2 lg:gap-3 shrink-0 ml-auto z-10">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-xl bg-surface-100 border border-white/10 text-text-secondary hover:text-white hover:border-brand-cyan/40 transition-all flex items-center gap-2 text-xs font-medium"
                aria-label="Search Apps"
              >
                <Search className="w-4 h-4 text-brand-cyan" />
                <span className="hidden lg:inline text-text-muted">Search...</span>
              </button>

              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  {(user?.role === 'ADMIN' || user?.role === 'OWNER') && (
                    <>
                      <Link
                        href="/admin/upload"
                        className="px-3 py-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white text-xs font-bold hover:shadow-glow-cyan transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <Rocket className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">Upload App</span>
                      </Link>
                      <Link
                        href="/admin"
                        className="px-3 py-2 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold hover:bg-purple-500/30 transition-all flex items-center gap-1.5"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">Admin</span>
                      </Link>
                    </>
                  )}
                  <NotificationCenter />
                  <span className="text-xs font-semibold text-white px-3 py-2 rounded-xl bg-surface-100 border border-white/10 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-brand-cyan" />
                    {user?.username}
                  </span>
                  <button
                    onClick={() => logout()}
                    className="p-2.5 rounded-xl bg-surface-100 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-text-muted hover:text-red-400 transition-colors"
                    aria-label="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2.5 rounded-xl bg-brand-cyan/20 hover:bg-brand-cyan/30 border border-brand-cyan/50 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-glow-cyan"
                  >
                    <User className="w-3.5 h-3.5 text-brand-cyan" />
                    <span>Login</span>
                  </Link>

                  <Link
                    href="/signup"
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white font-bold text-xs shadow-glow-cyan hover:opacity-95 transition-all flex items-center gap-1.5"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Actions & Hamburger */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-xl bg-surface-100 border border-white/10 text-text-secondary hover:text-white"
              >
                <Search className="w-5 h-5 text-brand-cyan" />
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-xl bg-surface-100 border border-white/10 text-text-secondary hover:text-white transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-white/10 bg-background/95 backdrop-blur-xl px-4 pt-4 pb-6 space-y-3"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-semibold text-text-secondary hover:text-white hover:bg-white/5 transition-all"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    {(user?.role === 'ADMIN' || user?.role === 'OWNER') && (
                      <div className="flex flex-col gap-2 pb-2 border-b border-white/10">
                        <Link
                          href="/admin/upload"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white text-xs font-bold flex items-center justify-center gap-2 shadow-glow-cyan"
                        >
                          <Rocket className="w-4 h-4" />
                          <span>Upload App Portal</span>
                        </Link>
                        <Link
                          href="/admin"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="w-full py-3 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold flex items-center justify-center gap-2"
                        >
                          <ShieldCheck className="w-4 h-4" />
                          <span>Admin Dashboard</span>
                        </Link>
                      </div>
                    )}
                    <button
                      onClick={() => { setIsMobileMenuOpen(false); logout(); }}
                      className="w-full py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout ({user?.username})</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => { setIsMobileMenuOpen(false); setIsLoginOpen(true); }}
                      className="w-full py-3 rounded-xl bg-surface-100 border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2"
                    >
                      <User className="w-4 h-4 text-brand-cyan" />
                      <span>Login Account</span>
                    </button>

                    <button
                      onClick={() => { setIsMobileMenuOpen(false); setIsSignupOpen(true); }}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-glow-cyan"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Create Account (Sign Up)</span>
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onSwitchToSignup={handleSwitchToSignup} />
      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} onSwitchToLogin={handleSwitchToLogin} />
    </>
  );
};
