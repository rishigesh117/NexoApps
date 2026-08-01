import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CollectionCard } from '../components/community/CollectionCard';
import { CreateCollectionModal } from '../components/community/CreateCollectionModal';
import { communityService } from '../services/communityService';
import { Collection } from '../types';
import { useAuth } from '../context/AuthContext';
import { Layers, Plus, Grid, Lock, Globe } from 'lucide-react';

export default function CollectionsPage() {
  const { isAuthenticated } = useAuth();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingColl, setEditingColl] = useState<Collection | null>(null);

  const fetchCollections = async () => {
    try {
      const list = await communityService.getCollections();
      setCollections(list || []);
    } catch {
      setCollections([]);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [isAuthenticated]);

  const handleSaveCollection = async (data: Partial<Collection>) => {
    try {
      if (data.id) {
        await communityService.updateCollection(data.id, data);
      } else {
        await communityService.createCollection(data);
      }
      fetchCollections();
    } catch (err: any) {
      alert(err.message || 'Collection save failed');
    }
  };

  const handleDeleteCollection = async (id: string) => {
    if (confirm('Delete this custom collection?')) {
      try {
        await communityService.deleteCollection(id);
        fetchCollections();
      } catch (err: any) {
        alert(err.message || 'Delete failed');
      }
    }
  };

  return (
    <>
      <SEOHead
        title="Custom App Collections & Playlists | NexoApps"
        description="Organize your favorite applications into public or private custom collections."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <Layers className="w-6 h-6 text-brand-cyan" /> App Collections & Playlists
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary">
                Curate public or private playlists for Favorites, AI Utilities, Games, Education, and College Projects.
              </p>
            </div>

            {isAuthenticated && (
              <button
                type="button"
                onClick={() => {
                  setEditingColl(null);
                  setIsModalOpen(true);
                }}
                className="px-6 py-3 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet hover:shadow-glow-cyan flex items-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Create Collection</span>
              </button>
            )}
          </div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((coll) => (
              <CollectionCard
                key={coll.id}
                collection={coll}
                onEdit={(c) => {
                  setEditingColl(c);
                  setIsModalOpen(true);
                }}
                onDelete={handleDeleteCollection}
              />
            ))}
          </div>

          <CreateCollectionModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveCollection}
            editCollection={editingColl}
          />
        </main>

        <Footer />
      </div>
    </>
  );
}
