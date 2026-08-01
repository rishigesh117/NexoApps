import React from 'react';
import { Layers, Heart, Mail } from 'lucide-react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="w-full border-t border-white/10 bg-surface-50/60 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Logo & Description */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-cyan via-brand-blue to-brand-violet p-0.5 shadow-glow-cyan">
                <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
                  <Layers className="w-5 h-5 text-brand-cyan" />
                </div>
              </div>
              <span className="font-display font-bold text-xl text-white">Nexo<span className="text-brand-cyan">Apps</span></span>
            </Link>
            <p className="text-xs text-text-muted leading-relaxed max-w-sm">
              Independent multi-platform app store platform. Hosting Android APKs, AI Models, Web Applications, Desktop Systems, and Academic Innovation.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-text-secondary">
              <Mail className="w-4 h-4 text-brand-cyan" />
              <span>contact@nexoapps.com</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display font-semibold text-xs text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="flex flex-col gap-2 text-xs text-text-secondary">
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Home</a></li>
              <li><a href="#featured-batlytics" className="hover:text-brand-cyan transition-colors">Batlytics App</a></li>
              <li><a href="#categories" className="hover:text-brand-cyan transition-colors">All Applications</a></li>
              <li><a href="#why-us" className="hover:text-brand-cyan transition-colors">Why NexoApps</a></li>
              <li><a href="#contact" className="hover:text-brand-cyan transition-colors">Contact Owner</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display font-semibold text-xs text-white uppercase tracking-wider">Categories</h4>
            <ul className="flex flex-col gap-2 text-xs text-text-secondary">
              <li><a href="#categories" className="hover:text-brand-cyan transition-colors">Sports Apps</a></li>
              <li><a href="#categories" className="hover:text-brand-cyan transition-colors">AI & LLM Tools</a></li>
              <li><a href="#categories" className="hover:text-brand-cyan transition-colors">Web Applications</a></li>
              <li><a href="#categories" className="hover:text-brand-cyan transition-colors">Desktop Software</a></li>
              <li><a href="#categories" className="hover:text-brand-cyan transition-colors">College Projects</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display font-semibold text-xs text-white uppercase tracking-wider">Legal & Policy</h4>
            <ul className="flex flex-col gap-2 text-xs text-text-secondary">
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Security Policy</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Cookie Preferences</a></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display font-semibold text-xs text-white uppercase tracking-wider">Help & Support</h4>
            <ul className="flex flex-col gap-2 text-xs text-text-secondary">
              <li><Link href="/help" className="hover:text-brand-cyan transition-colors">Knowledge Base</Link></li>
              <li><Link href="/support" className="hover:text-brand-cyan transition-colors">Support Tickets</Link></li>
              <li><Link href="/analytics" className="hover:text-brand-cyan transition-colors">Platform Analytics</Link></li>
              <li><Link href="/search" className="hover:text-brand-cyan transition-colors">AI Global Search</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Made with love */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>© {new Date().getFullYear()} NexoApps Platform. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> by <strong className="text-white font-semibold">NexoApps</strong>
          </p>
        </div>
      </div>
    </footer>
  );
};
