import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AgentSidebar } from '../../components/agents/AgentSidebar';
import { ReviewPanel } from '../../components/agents/ReviewPanel';
import { getCodeReviews } from '../../services/reviewService';
import { CodeReview, BugReport } from '../../types';
import { FileCheck } from 'lucide-react';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<CodeReview[]>([]);
  const [bugs, setBugs] = useState<BugReport[]>([]);

  useEffect(() => {
    getCodeReviews().then((res) => {
      setReviews(res.reviews);
      setBugs(res.bugs);
    }).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="AI Code Review & Bug Scanner | NexoApps AI Agents"
        description="Automated pull request reviews, quality scores, static bug detection, and security analysis."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <AgentSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <FileCheck className="w-6 h-6 text-rose-400" /> Automated Code Review & Bug Detection Center
              </h1>
              <p className="text-xs text-text-secondary">
                Hyperion Code Reviewer & Sentinel Security QA automated feedback stream.
              </p>
            </div>

            <ReviewPanel reviews={reviews} bugs={bugs} />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
