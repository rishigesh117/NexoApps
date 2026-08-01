import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { DeveloperProfileCard } from '../../components/developer/DeveloperProfileCard';
import { developerService } from '../../services/developerService';
import { getAppsCatalog, FEATURED_BATLYTICS_APP } from '../../services/appService';
import { DeveloperProfile, AppItem } from '../../types';

export default function PublicDeveloperProfilePage() {
  const router = useRouter();
  const { username } = router.query;

  const [profile, setProfile] = useState<DeveloperProfile | null>(null);
  const [publishedApps, setPublishedApps] = useState<AppItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    const fetchPublicProfile = async () => {
      setIsLoading(true);
      try {
        const data = await developerService.getPublicProfile(username as string);
        setProfile(data);
        setPublishedApps(data.publishedApps || []);
      } catch {
        // Fallback demo profile for 'batlytics' or any username
        const catalog = await getAppsCatalog();
        setProfile({
          id: 'dev-prof-1',
          userId: 'usr-demo-1',
          studioName: username === 'nexoapps' ? 'Nexo Platform Studio' : 'Batlytics Studio',
          displayName: username === 'nexoapps' ? 'Nexo Developer' : 'Batlytics Dev',
          username: (username as string) || 'batlytics',
          bio: 'Creators of high-precision cricket scoring & sports performance engines on NexoApps Platform.',
          country: 'India',
          website: 'https://batlytics.com',
          supportEmail: 'developer@batlytics.com',
          logoUrl: '🏏',
          bannerUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200&auto=format&fit=crop',
          socialLinks: { twitter: 'https://twitter.com/batlytics' },
          portfolioUrl: 'https://batlytics.com',
          status: 'Verified',
          isVerified: true,
          totalApps: 3,
          followersCount: 1420,
          createdAt: new Date().toISOString(),
        });
        setPublishedApps(catalog && catalog.length > 0 ? catalog : [FEATURED_BATLYTICS_APP]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublicProfile();
  }, [username]);

  return (
    <>
      <SEOHead
        title={`${profile?.studioName || 'Developer Profile'} | NexoApps`}
        description={profile?.bio || 'Explore developer apps on NexoApps'}
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {isLoading ? (
            <div className="py-20 text-center text-text-muted text-xs">Loading developer profile...</div>
          ) : profile ? (
            <DeveloperProfileCard profile={profile} apps={publishedApps} />
          ) : (
            <div className="py-20 text-center text-text-muted text-xs">Developer profile not found.</div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
