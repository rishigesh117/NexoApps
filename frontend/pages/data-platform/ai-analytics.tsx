import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Brain, Zap, Plus, Play, CheckCircle, Loader2, Clock } from 'lucide-react';
import { Navbar } from '../../components/Navbar';

export default function AIAnalyticsPage() {
  const models = [
    { id: '1', name: 'Churn Predictor', description: 'Predicts user churn probability based on engagement metrics', algorithm: 'Random Forest', accuracy: 92, status: 'trained', lastTrained: '2 days ago' },
    { id: '2', name: 'Revenue Forecaster', description: 'Time-series forecast of monthly recurring revenue', algorithm: 'XGBoost', accuracy: 88, status: 'trained', lastTrained: '1 day ago' },
    { id: '3', name: 'Anomaly Detector', description: 'Detects anomalous API traffic patterns', algorithm: 'Isolation Forest', accuracy: 95, status: 'training', lastTrained: 'In progress' },
  ];

  const statusBadge = (s: string) => {
    if (s === 'trained') return <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold"><CheckCircle className="w-3 h-3" /> Trained</span>;
    if (s === 'training') return <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold"><Loader2 className="w-3 h-3 animate-spin" /> Training</span>;
    return <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-100 text-text-muted text-[10px] font-bold"><Clock className="w-3 h-3" /> Draft</span>;
  };

  return (
    <>
      <Head>
        <title>AI Analytics Models | NexoApps Data Platform</title>
        <meta name="description" content="Machine learning models for churn prediction, revenue forecasting, and anomaly detection." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-display font-bold">AI Analytics</h1>
              <p className="text-text-secondary mt-1">Machine learning models for predictive analytics and forecasting.</p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-bold hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" /> New Model
            </button>
          </div>

          <div className="space-y-4">
            {models.map((m, i) => (
              <motion.div key={m.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-indigo-500/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center">
                    <Brain className="w-7 h-7 text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-white">{m.name}</h3>
                      {statusBadge(m.status)}
                    </div>
                    <p className="text-sm text-text-secondary">{m.description}</p>
                  </div>
                  <div className="hidden md:flex items-center gap-6 text-xs">
                    <div className="text-center">
                      <p className="text-lg font-bold text-indigo-400">{m.accuracy}%</p>
                      <p className="text-text-muted">Accuracy</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-semibold">{m.algorithm}</p>
                      <p className="text-text-muted">Algorithm</p>
                    </div>
                    <div className="text-center">
                      <p className="text-text-secondary">{m.lastTrained}</p>
                      <p className="text-text-muted">Last Trained</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-400 text-xs font-semibold transition-colors">
                      <Play className="w-3 h-3" /> Run Prediction
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 text-violet-400 text-xs font-semibold transition-colors">
                      <Zap className="w-3 h-3" /> Retrain
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
