import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { MainLayout } from '../layouts/MainLayout';
import { PageHeader } from '../components/ui/PageHeader';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Layers, ShieldCheck, Code2, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title="About NexoApps | Independent Software Platform"
        description="Learn about the NexoApps platform mission, developer roadmap, and ecosystem architecture."
        canonicalUrl="https://nexoapps.com/about"
      />

      <MainLayout>
        <PageHeader
          title="About NexoApps"
          description="NexoApps is an independent software platform created to publish, host, and distribute high-performance Android Apps, AI Models, Web Applications, Desktop Systems, and Academic Innovation."
        />

        <div className="space-y-12 pb-16">
          {/* Mission Glass Card */}
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-cyan to-brand-violet p-0.5">
                <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
                  <Layers className="w-5 h-5 text-brand-cyan" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white">Platform Mission</h2>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Designed as a personal Play Store equivalent, NexoApps provides direct access to software without third-party ad interruptions, bloatware, or deceptive download redirects. Every product hosted on this platform follows rigorous UI standards, high performance, and security best practices.
            </p>
          </div>

          <WhyChooseUs />
        </div>
      </MainLayout>
    </>
  );
}
