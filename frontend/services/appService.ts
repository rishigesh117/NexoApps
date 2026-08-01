/**
 * App Data Service Layer
 * NexoApps Platform
 */

import { AppItem } from '../types';
import { fetchApi } from './apiClient';

export const FEATURED_BATLYTICS_APP: AppItem = {
  id: 'batlytics-001',
  slug: 'batlytics-cricket-scoring',
  title: 'Batlytics',
  tagline: 'Real-Time Cricket Scoring & High-Precision Analytics Engine',
  description: 'Batlytics is an advanced, ultra-responsive cricket scoring and performance analytics application built for local matches, tournament managers, and cricket lovers. Features instant ball-by-ball logging, player strike-rate metrics, dynamic Manhattan & Worm charts, and instant PDF match report exports.',
  category: 'Android Apps',
  subCategory: 'Sports & Scoring',
  platform: ['Android'],
  version: '1.0.0-beta',
  latestVersion: '1.0.0-beta',
  iconUrl: '🏏',
  coverImage: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200&auto=format&fit=crop',
  bannerUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200&auto=format&fit=crop',
  screenshots: [
    'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512719994953-eabf50895df7?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop'
  ],
  features: [
    'Ball-by-Ball Live Scoring & Fast Over Entry',
    'Deep Player Performance & Economy Analytics',
    'Interactive Worm, Manhattan & Run-Rate Comparison Charts',
    'Offline Match Storage with Automatic Cloud Sync',
    'Instant PDF Match Summary Generator & Social Export'
  ],
  downloadUrl: '/downloads/batlytics-v1.0.0.apk',
  apkFile: 'batlytics-v1.0.0.apk',
  fileSize: '24.5 MB',
  apkSize: '24.5 MB',
  rating: 4.9,
  totalReviews: 142,
  downloadsCount: 1850,
  downloads: 1850,
  isFeatured: true,
  isTrending: true,
  isNewRelease: true,
  isEditorsChoice: true,
  status: 'Published',
  releaseDate: '2026-07-01',
  lastUpdated: '2026-07-25',
  minAndroidVersion: 'Android 8.0 (Oreo)',
  releaseNotes: 'Initial release featuring ball-by-ball cricket scoring, PDF exports, and Manhattan analytics.',
  developer: {
    name: 'NexoApps Platform',
    email: 'contact@nexoapps.com',
    website: 'https://nexoapps.com'
  },
  tags: ['Cricket', 'Scoring App', 'Sports Analytics', 'Android APK', 'Match Manager']
};

export const INITIAL_APPS_CATALOG: AppItem[] = [
  FEATURED_BATLYTICS_APP,
  {
    id: 'aigen-002',
    slug: 'nexus-ai-studio',
    title: 'Nexus AI Studio',
    tagline: 'Multi-Modal Intelligent Content Assistant',
    description: 'An AI-driven workspace application for generating code snippets, summarizing complex documents, and creating structured project reports.',
    category: 'AI Apps',
    subCategory: 'Productivity & AI',
    platform: ['Web', 'Cross-Platform'],
    version: '0.9.0',
    latestVersion: '0.9.0',
    iconUrl: '🤖',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    screenshots: [],
    features: ['Contextual AI Assistant', 'Prompt Library', 'Export to Markdown & PDF'],
    downloadUrl: '#',
    fileSize: '18.2 MB',
    rating: 4.8,
    totalReviews: 89,
    downloadsCount: 940,
    downloads: 940,
    isFeatured: true,
    isTrending: true,
    isNewRelease: false,
    isEditorsChoice: true,
    status: 'Beta',
    releaseDate: '2026-06-15',
    lastUpdated: '2026-07-20',
    developer: { name: 'NexoApps Owner', email: 'owner@nexoapps.com' },
    tags: ['AI', 'Productivity', 'LLM', 'Web App']
  },
  {
    id: 'web-003',
    slug: 'nexo-dashboard-ui',
    title: 'Nexo Dashboard Core',
    tagline: 'Real-Time Analytics & System Control Hub',
    description: 'High-performance web dashboard system for monitoring cloud servers, user traffic, and application health metrics.',
    category: 'Utilities',
    subCategory: 'System & Analytics',
    platform: ['Web'],
    version: '1.2.0',
    latestVersion: '1.2.0',
    iconUrl: '⚡',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    screenshots: [],
    features: ['Real-Time WebSockets', 'Customizable Widget Grid', 'Light/Dark Theme System'],
    downloadUrl: '#',
    fileSize: '12.0 MB',
    rating: 5.0,
    totalReviews: 64,
    downloadsCount: 2100,
    downloads: 2100,
    isFeatured: false,
    isTrending: true,
    isNewRelease: false,
    isEditorsChoice: false,
    status: 'Published',
    releaseDate: '2026-05-10',
    lastUpdated: '2026-07-10',
    developer: { name: 'NexoApps Owner', email: 'owner@nexoapps.com' },
    tags: ['Dashboard', 'Web App', 'Analytics', 'React']
  },
  {
    id: 'desk-004',
    slug: 'code-vault-desktop',
    title: 'CodeVault Desktop',
    tagline: 'Encrypted Developer Snippet & Environment Manager',
    description: 'A native desktop application built for organizing code snippets, environment credentials, and quick shell commands with zero cloud dependencies.',
    category: 'Utilities',
    subCategory: 'Developer Tools',
    platform: ['Windows', 'macOS', 'Linux'],
    version: '1.0.1',
    latestVersion: '1.0.1',
    iconUrl: '🔒',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    screenshots: [],
    features: ['AES-256 Encryption', 'Global Search Shortcut', 'Syntax Highlighting for 30+ Languages'],
    downloadUrl: '#',
    fileSize: '45.0 MB',
    rating: 4.9,
    totalReviews: 52,
    downloadsCount: 780,
    downloads: 780,
    isFeatured: false,
    isTrending: false,
    isNewRelease: true,
    isEditorsChoice: false,
    status: 'Published',
    releaseDate: '2026-04-20',
    lastUpdated: '2026-06-30',
    developer: { name: 'NexoApps Owner', email: 'owner@nexoapps.com' },
    tags: ['Desktop', 'Security', 'Developer Tools', 'Encryption']
  },
  {
    id: 'proj-005',
    slug: 'smart-campus-manager',
    title: 'Smart Campus Portal',
    tagline: 'Fullstack University Event & Resource Management System',
    description: 'A featured college capstone project demonstrating scalable microservices, student scheduling, attendance logging, and room reservation.',
    category: 'College Projects',
    subCategory: 'Education & Management',
    platform: ['Web', 'Android'],
    version: '2.0.0',
    latestVersion: '2.0.0',
    iconUrl: '🎓',
    coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop',
    screenshots: [],
    features: ['QR Attendance Scanner', 'Event Push Notifications', 'Role-Based Portal Access'],
    downloadUrl: '#',
    fileSize: '31.4 MB',
    rating: 4.7,
    totalReviews: 41,
    downloadsCount: 1200,
    downloads: 1200,
    isFeatured: false,
    isTrending: false,
    isNewRelease: false,
    isEditorsChoice: true,
    status: 'Published',
    releaseDate: '2026-03-12',
    lastUpdated: '2026-05-01',
    developer: { name: 'NexoApps Owner', email: 'owner@nexoapps.com' },
    tags: ['College Project', 'Fullstack', 'University', 'Android']
  },
  {
    id: 'fut-006',
    slug: 'quantum-flow-engine',
    title: 'QuantumFlow AI',
    tagline: 'Autonomous Workflow & Agent Orchestration Engine',
    description: 'Upcoming flagship product designed to automate multi-agent coding workflows, cloud deployment pipelines, and continuous testing.',
    category: 'Productivity',
    subCategory: 'AI & Automation',
    platform: ['Cross-Platform', 'Web'],
    version: '0.1.0-alpha',
    latestVersion: '0.1.0-alpha',
    iconUrl: '🚀',
    coverImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop',
    screenshots: [],
    features: ['Autonomous Task Graph', 'Live Terminal Stream', 'Plugin Ecosystem'],
    downloadUrl: '#',
    fileSize: '50.0 MB',
    rating: 5.0,
    totalReviews: 12,
    downloadsCount: 0,
    downloads: 0,
    isFeatured: false,
    isTrending: true,
    isNewRelease: true,
    isEditorsChoice: false,
    status: 'Coming Soon',
    releaseDate: '2026-11-01',
    lastUpdated: '2026-07-27',
    developer: { name: 'NexoApps Owner', email: 'owner@nexoapps.com' },
    tags: ['Future Product', 'AI Agents', 'Automation', 'Flagship']
  }
];

export async function getAppsCatalog(params: Record<string, string> = {}): Promise<AppItem[]> {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetchApi<{ success: boolean; data: AppItem[] }>(`/apps${queryString ? `?${queryString}` : ''}`);
    if (response.data && response.data.length > 0) {
      return response.data;
    }
    return INITIAL_APPS_CATALOG;
  } catch {
    return INITIAL_APPS_CATALOG;
  }
}

export async function getFeaturedApps(): Promise<AppItem[]> {
  try {
    const response = await fetchApi<{ success: boolean; data: AppItem[] }>('/apps/featured');
    return response.data || INITIAL_APPS_CATALOG.filter(a => a.isFeatured);
  } catch {
    return INITIAL_APPS_CATALOG.filter(a => a.isFeatured);
  }
}

export async function getTrendingApps(): Promise<AppItem[]> {
  try {
    const response = await fetchApi<{ success: boolean; data: AppItem[] }>('/apps/trending');
    return response.data || INITIAL_APPS_CATALOG.filter(a => a.isTrending);
  } catch {
    return INITIAL_APPS_CATALOG.filter(a => a.isTrending);
  }
}

export async function getNewApps(): Promise<AppItem[]> {
  try {
    const response = await fetchApi<{ success: boolean; data: AppItem[] }>('/apps/new');
    return response.data || INITIAL_APPS_CATALOG.filter(a => a.isNewRelease);
  } catch {
    return INITIAL_APPS_CATALOG.filter(a => a.isNewRelease);
  }
}

export async function searchApps(query: string): Promise<{
  apps: AppItem[];
  suggestions: {
    appNames: string[];
    categories: string[];
    developers: string[];
    recentSearches: string[];
    popularSearches: string[];
  };
}> {
  try {
    const response = await fetchApi<{ success: boolean; data: any }>(`/apps/search?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch {
    const term = query.toLowerCase().trim();
    const matched = INITIAL_APPS_CATALOG.filter(
      a =>
        a.title.toLowerCase().includes(term) ||
        a.tagline.toLowerCase().includes(term) ||
        a.category.toLowerCase().includes(term) ||
        a.developer.name.toLowerCase().includes(term)
    );
    return {
      apps: matched,
      suggestions: {
        appNames: matched.map(m => m.title),
        categories: Array.from(new Set(matched.map(m => m.category))),
        developers: Array.from(new Set(matched.map(m => m.developer.name))),
        recentSearches: ['Batlytics', 'AI Studio', 'Cricket Scoring'],
        popularSearches: ['Batlytics Cricket', 'AI Apps', 'Android APK'],
      },
    };
  }
}

export async function getAppBySlug(slug: string): Promise<AppItem | undefined> {
  try {
    const response = await fetchApi<{ success: boolean; data: AppItem }>(`/apps/${slug}`);
    return response.data || INITIAL_APPS_CATALOG.find((app) => app.slug === slug);
  } catch {
    return INITIAL_APPS_CATALOG.find((app) => app.slug === slug);
  }
}

export async function getRelatedApps(slug: string): Promise<AppItem[]> {
  try {
    const response = await fetchApi<{ success: boolean; data: AppItem[] }>(`/apps/${slug}/related`);
    return response.data || INITIAL_APPS_CATALOG.filter(a => a.slug !== slug).slice(0, 3);
  } catch {
    return INITIAL_APPS_CATALOG.filter(a => a.slug !== slug).slice(0, 3);
  }
}

export async function getChangelog(slug: string): Promise<Array<{
  version: string;
  releaseDate: string;
  addedFeatures: string[];
  fixedBugs: string[];
  improvements: string[];
  releaseNotes: string;
}>> {
  try {
    const response = await fetchApi<{ success: boolean; data: any[] }>(`/apps/${slug}/changelog`);
    return response.data || [
      {
        version: '1.0.0-beta',
        releaseDate: '2026-07-25',
        addedFeatures: ['Ball-by-Ball scoring engine', 'Manhattan & Worm Analytics'],
        fixedBugs: ['Fixed responsive layout on tablet viewports'],
        improvements: ['Optimized PDF export render speed'],
        releaseNotes: 'Initial Beta release for NexoApps platform.',
      },
    ];
  } catch {
    return [
      {
        version: '1.0.0-beta',
        releaseDate: '2026-07-25',
        addedFeatures: ['Ball-by-Ball scoring engine', 'Manhattan & Worm Analytics'],
        fixedBugs: ['Fixed responsive layout on tablet viewports'],
        improvements: ['Optimized PDF export render speed'],
        releaseNotes: 'Initial Beta release for NexoApps platform.',
      },
    ];
  }
}

export async function getVersionHistory(slug: string) {
  return getChangelog(slug);
}
