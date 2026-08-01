import React, { useState, useEffect } from 'react';
import { DeveloperLayout } from '../../components/developer/DeveloperLayout';
import { developerService } from '../../services/developerService';
import { Settings, Save, CheckCircle2 } from 'lucide-react';

export default function DeveloperSettingsPage() {
  const [studioName, setStudioName] = useState('Batlytics Studio');
  const [displayName, setDisplayName] = useState('Batlytics Dev');
  const [supportEmail, setSupportEmail] = useState('developer@batlytics.com');
  const [website, setWebsite] = useState('https://batlytics.com');
  const [country, setCountry] = useState('India');
  const [bio, setBio] = useState('Creators of high-precision cricket scoring & sports performance engines.');
  const [logoUrl, setLogoUrl] = useState('🏏');
  const [bannerUrl, setBannerUrl] = useState('https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200&auto=format&fit=crop');

  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      const res = await developerService.getDashboard();
      if (res.profile) {
        setStudioName(res.profile.studioName || studioName);
        setDisplayName(res.profile.displayName || displayName);
        setSupportEmail(res.profile.supportEmail || supportEmail);
        setWebsite(res.profile.website || website);
        setCountry(res.profile.country || country);
        setBio(res.profile.bio || bio);
        setLogoUrl(res.profile.logoUrl || logoUrl);
        setBannerUrl(res.profile.bannerUrl || bannerUrl);
      }
    } catch {}
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg(null);
    try {
      await developerService.updateProfile({
        studioName,
        displayName,
        supportEmail,
        website,
        country,
        bio,
        logoUrl,
        bannerUrl,
      });
      setSuccessMsg('Studio profile updated successfully!');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Update failed');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DeveloperLayout title="Studio Settings | NexoApps Console">
      <div className="space-y-6 text-left max-w-3xl">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-brand-cyan" /> Developer Studio Settings
            </h3>
            <p className="text-xs text-text-secondary">
              Update studio profile details displayed on your public developer page (`/developer/[username]`).
            </p>
          </div>
        </div>

        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-text-secondary font-semibold block">Studio Name</label>
              <input
                type="text"
                value={studioName}
                onChange={(e) => setStudioName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-3 py-2 text-white"
                required
              />
            </div>

            <div>
              <label className="text-text-secondary font-semibold block">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="text-text-secondary font-semibold block">Support Email</label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-3 py-2 text-white"
                required
              />
            </div>

            <div>
              <label className="text-text-secondary font-semibold block">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="text-text-secondary font-semibold block">Website URL</label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="text-text-secondary font-semibold block">Logo URL / Icon Emoji</label>
              <input
                type="text"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-3 py-2 text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-text-secondary font-semibold block">Banner Image URL</label>
              <input
                type="text"
                value={bannerUrl}
                onChange={(e) => setBannerUrl(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-3 py-2 text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-text-secondary font-semibold block">Studio Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 text-white resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center gap-1.5 transition-all"
            >
              <Save className="w-4 h-4" /> Save Profile Settings
            </button>
          </div>
        </form>
      </div>
    </DeveloperLayout>
  );
}
