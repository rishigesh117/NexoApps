import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SEOHead } from '../components/SEOHead';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { GlobalSearch } from '../components/ai/GlobalSearch';
import { SearchFilters } from '../components/ai/SearchFilters';
import { SearchResultsGrid } from '../components/ai/SearchResultsGrid';
import { fetchApi } from '../services/apiClient';
import { AISearchResult } from '../types';

export default function SearchPage() {
  const router = useRouter();
  const { q, category } = router.query;

  const [query, setQuery] = useState<string>((q as string) || '');
  const [selectedCategory, setSelectedCategory] = useState<string>((category as string) || 'All');
  const [sort, setSort] = useState<string>('relevance');
  const [rating, setRating] = useState<string>('');

  const [searchResult, setSearchResult] = useState<AISearchResult>({
    apps: [],
    developers: [],
    collections: [],
    suggestions: [],
    trending: [],
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const performSearch = async (searchTerm: string, cat: string = selectedCategory, s: string = sort) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('q', searchTerm);
      if (cat && cat !== 'All') params.append('category', cat);
      if (s) params.append('sort', s);

      const res = await fetchApi<{ success: boolean; data: AISearchResult }>(`/search?${params.toString()}`);
      setSearchResult(res.data);
    } catch {
      setSearchResult({
        apps: [],
        developers: [],
        collections: [],
        suggestions: [],
        trending: [],
        total: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const qStr = (q as string) || '';
    setQuery(qStr);
    performSearch(qStr, (category as string) || 'All', sort);
  }, [q, category, sort]);

  return (
    <>
      <SEOHead
        title="Global AI Search & Intelligence | NexoApps"
        description="Search applications, developer studios, category collections, and AI utilities on NexoApps."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
          {/* AI Search Header */}
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 space-y-6 shadow-2xl">
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Global Platform AI Search Engine
            </h1>
            <GlobalSearch
              initialQuery={query}
              onSearch={(newQ) => {
                setQuery(newQ);
                performSearch(newQ);
              }}
              popularSearches={searchResult.trending}
            />
          </div>

          {/* Search Filters Bar */}
          <SearchFilters
            category={selectedCategory}
            sort={sort}
            rating={rating}
            onCategoryChange={(cat) => {
              setSelectedCategory(cat);
              performSearch(query, cat, sort);
            }}
            onSortChange={(s) => {
              setSort(s);
              performSearch(query, selectedCategory, s);
            }}
            onRatingChange={setRating}
          />

          {/* Search Results Grid */}
          <SearchResultsGrid result={searchResult} />
        </main>

        <Footer />
      </div>
    </>
  );
}
