import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Cpu, Bot, BookOpen, BarChart3, Activity, Image as ImageIcon, ArrowRight, ShieldCheck, Sparkles, Layers } from 'lucide-react';
import { Navbar } from '../../components/Navbar';

export default function AIGatewayHubPage() {
  const modules = [
    { title: 'AI Provider Manager', description: 'Configure OpenAI, Anthropic, Gemini, xAI, Groq, Ollama & custom providers.', href: '/ai-gateway/providers', icon: Cpu, color: 'text-brand-cyan', badge: '13+ Providers' },
    { title: 'Universal Chat Workspace', description: 'Multi-model interactive chat with real-time token tracking & streaming.', href: '/ai-gateway/chat', icon: Bot, color: 'text-emerald-400', badge: 'Interactive' },
    { title: 'Enterprise Prompt Library', description: 'Template management, variable substitution, and version control.', href: '/ai-gateway/prompts', icon: BookOpen, color: 'text-brand-violet', badge: 'Versioned' },
    { title: 'AI Model Hub & Benchmarks', description: 'Compare MMLU scores, latency, context windows, and cost profiles.', href: '/ai-gateway/models', icon: Sparkles, color: 'text-amber-400', badge: 'Benchmarks' },
    { title: 'Token Usage & Analytics', description: 'Financial analytics, token consumption, and cost accounting telemetry.', href: '/ai-gateway/usage', icon: BarChart3, color: 'text-rose-400', badge: 'Cost Telemetry' },
    { title: 'Health Grid & Probe Monitor', description: 'Real-time ping probes, error rates, availability, and automatic failovers.', href: '/ai-gateway/health', icon: Activity, color: 'text-cyan-400', badge: 'Zero Downtime' },
    { title: 'Multimodal & Generative Studio', description: 'Vision processing, image synthesis, speech TTS/STT, and translation.', href: '/ai-gateway/multimodal', icon: ImageIcon, color: 'text-violet-400', badge: 'Multimodal' },
  ];

  return (
    <>
      <Head>
        <title>Universal AI Application Platform & Enterprise AI Gateway | NexoApps Version 6.0</title>
        <meta name="description" content="NexoApps Version 6.0 Universal AI Application Platform and Enterprise AI Gateway." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              NexoApps Version 6.0 Release
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight">
              Universal <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet bg-clip-text text-transparent">AI Gateway & Model Hub</span>
            </h1>
            <p className="text-text-secondary text-base md:text-lg max-w-3xl mx-auto">
              Orchestrate, route, and monitor requests across OpenAI, Anthropic, Google Gemini, xAI, Groq, Ollama, Azure, AWS Bedrock, HuggingFace, and custom models.
            </p>
          </motion.div>

          {/* Module Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod, idx) => {
              const Icon = mod.icon;
              return (
                <motion.div
                  key={mod.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 }}
                >
                  <Link href={mod.href} className="block glass-panel p-6 rounded-3xl border border-white/10 hover:border-brand-cyan/40 transition-all group h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-2xl bg-surface-200 border border-white/10 flex items-center justify-center ${mod.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-text-secondary font-mono">
                          {mod.badge}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors">{mod.title}</h3>
                      <p className="text-xs text-text-muted mt-2 leading-relaxed">{mod.description}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-brand-cyan">
                      <span>Launch Module</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
