import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { PlatformSidebar } from '../../components/platform/PlatformSidebar';
import { getDashboardWidgets } from '../../services/widgetService';
import { DashboardWidget } from '../../types';
import { Sliders, Layout, Check } from 'lucide-react';

export default function WidgetCustomizationPage() {
  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);

  useEffect(() => {
    getDashboardWidgets().then((data) => setWidgets(data)).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="Dashboard Widget Customization | NexoApps AI OS"
        description="Customize dashboard grid layout, enable/disable widgets, and configure real-time telemetry modules."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <PlatformSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Sliders className="w-6 h-6 text-brand-cyan" /> Dashboard Widget Customizer & Layout Manager
              </h1>
              <p className="text-xs text-text-secondary">
                Configure your active OS telemetry widgets, metric cards, and layout priorities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {widgets.map((w) => (
                <div key={w.id} className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center justify-between gap-4 shadow-2xl">
                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-cyan/20 text-brand-cyan">
                      {w.category}
                    </span>
                    <h4 className="font-extrabold text-white text-sm">{w.title}</h4>
                    <p className="text-xs text-text-secondary">{w.description}</p>
                  </div>

                  <button
                    type="button"
                    className="px-4 py-2 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shrink-0"
                  >
                    <Check className="w-3.5 h-3.5" /> Enabled
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
