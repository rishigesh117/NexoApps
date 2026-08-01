import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { KnowledgeSearch } from '../components/assistant/KnowledgeSearch';
import { FAQCard } from '../components/assistant/FAQCard';
import { fetchApi } from '../services/apiClient';
import { KnowledgeArticle, FAQItem } from '../types';
import { HelpCircle, BookOpen, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function HelpCenterPage() {
  const [articles, setArticles] = useState<KnowledgeArticle[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);

  const fetchKnowledge = async (query = '', category = 'All') => {
    try {
      const [artRes, faqRes] = await Promise.all([
        fetchApi<{ success: boolean; data: KnowledgeArticle[] }>(`/support/articles?q=${query}&category=${category}`),
        fetchApi<{ success: boolean; data: FAQItem[] }>(`/support/faq?category=${category}`),
      ]);
      setArticles(artRes.data || []);
      setFaqs(faqRes.data || []);
    } catch {
      // Fallbacks
    }
  };

  useEffect(() => {
    fetchKnowledge();
  }, []);

  return (
    <>
      <SEOHead
        title="Smart Help Center & Knowledge Base | NexoApps"
        description="Search documentation, developer guides, publishing tutorials, and frequently asked questions on NexoApps."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
          {/* Header Hero */}
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 space-y-6 shadow-2xl">
            <div>
              <div className="flex items-center gap-2 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-1">
                <HelpCircle className="w-4 h-4" /> Smart Knowledge & Assistance
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                NexoApps Help Center & Documentation
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary max-w-2xl mt-1">
                Search comprehensive guides, developer integration tutorials, publishing documentation, and FAQs.
              </p>
            </div>

            <KnowledgeSearch onSearch={(q, cat) => fetchKnowledge(q, cat)} />
          </div>

          {/* Featured Articles Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-2">
              <BookOpen className="w-4 h-4 text-brand-cyan" /> Featured Platform Articles & Guides
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((art) => (
                <div key={art.id} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3 hover:border-brand-cyan/40 transition-all">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                    {art.category}
                  </span>
                  <h4 className="text-base font-extrabold text-white">{art.title}</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{art.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Section */}
          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-2">
              <HelpCircle className="w-4 h-4 text-brand-violet" /> Frequently Asked Questions
            </h3>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <FAQCard key={faq.id} faq={faq} />
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
