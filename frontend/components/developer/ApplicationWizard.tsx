import React, { useState } from 'react';
import { developerService } from '../../services/developerService';
import { Code2, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/router';

export const ApplicationWizard: React.FC = () => {
  const router = useRouter();
  const [studioName, setStudioName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [country, setCountry] = useState('United States');
  const [website, setWebsite] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [bio, setBio] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      await developerService.applyForDeveloper({
        studioName,
        displayName: displayName || studioName,
        country,
        website,
        supportEmail,
        bio,
        portfolioUrl,
      });

      setSuccessMsg('Your developer account application has been submitted to the Owner Review Panel!');
      setTimeout(() => {
        router.push('/developer');
      }, 2000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Application submission failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 space-y-6 text-left max-w-2xl mx-auto shadow-2xl">
      <div className="border-b border-white/10 pb-4 text-center sm:text-left">
        <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Code2 className="w-6 h-6 text-brand-cyan" /> Apply for Developer Studio Account
        </h2>
        <p className="text-xs text-text-secondary mt-1">
          Join the NexoApps multi-developer workspace to publish, update, and manage your applications.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="space-y-1">
          <label className="text-text-secondary font-semibold">Studio / Publisher Name *</label>
          <input
            type="text"
            value={studioName}
            onChange={(e) => setStudioName(e.target.value)}
            placeholder="Batlytics Studio"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-white"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-text-secondary font-semibold">Developer Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Batlytics Dev Team"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-white"
          />
        </div>

        <div className="space-y-1">
          <label className="text-text-secondary font-semibold">Support Email *</label>
          <input
            type="email"
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
            placeholder="support@batlytics.com"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-white"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-text-secondary font-semibold">Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="United States"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-white"
          />
        </div>

        <div className="space-y-1">
          <label className="text-text-secondary font-semibold">Studio Website</label>
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://batlytics.com"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-white"
          />
        </div>

        <div className="space-y-1">
          <label className="text-text-secondary font-semibold">Portfolio / GitHub URL</label>
          <input
            type="url"
            value={portfolioUrl}
            onChange={(e) => setPortfolioUrl(e.target.value)}
            placeholder="https://github.com/batlytics"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-white"
          />
        </div>

        <div className="space-y-1 sm:col-span-2">
          <label className="text-text-secondary font-semibold">Studio Bio & Description *</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Tell us about the apps you plan to build and publish on NexoApps..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white resize-none"
            required
          />
        </div>
      </div>

      <div className="flex items-center justify-end pt-3 border-t border-white/10">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center gap-2 transition-all"
        >
          <Send className="w-4 h-4" />
          <span>Submit Developer Application</span>
        </button>
      </div>
    </form>
  );
};
