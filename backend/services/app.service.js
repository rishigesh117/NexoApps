/**
 * App Data Service & In-Memory Catalog Storage
 * NexoApps Platform
 * Supports unlimited future apps dynamically.
 */

const INITIAL_CATALOG = [
  {
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
  },
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
    apkFile: 'nexus-ai.apk',
    fileSize: '18.2 MB',
    apkSize: '18.2 MB',
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
    minAndroidVersion: 'Android 9.0',
    releaseNotes: 'Beta release with LLM integration and prompt template library.',
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
    apkFile: 'nexo-dashboard.apk',
    fileSize: '12.0 MB',
    apkSize: '12.0 MB',
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
    minAndroidVersion: 'Android 8.0',
    releaseNotes: 'WebSocket connection stability improvements and theme system updates.',
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
    apkFile: 'code-vault.exe',
    fileSize: '45.0 MB',
    apkSize: '45.0 MB',
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
    minAndroidVersion: 'N/A (Desktop)',
    releaseNotes: 'Added AES-256 local key store vault support.',
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
    apkFile: 'smart-campus.apk',
    fileSize: '31.4 MB',
    apkSize: '31.4 MB',
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
    minAndroidVersion: 'Android 7.0',
    releaseNotes: 'Role-based access matrix update and QR scanner optimization.',
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
    apkFile: 'quantum-flow.apk',
    fileSize: '50.0 MB',
    apkSize: '50.0 MB',
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
    minAndroidVersion: 'Android 10.0',
    releaseNotes: 'Alpha architecture preview.',
    developer: { name: 'NexoApps Owner', email: 'owner@nexoapps.com' },
    tags: ['Future Product', 'AI Agents', 'Automation', 'Flagship']
  }
];

class AppService {
  constructor() {
    this.apps = [...INITIAL_CATALOG];
  }

  // Get all apps with filtering, searching, and sorting
  getApps(query = {}) {
    let result = [...this.apps];

    const { category, platform, search, sort, featured, trending, new: isNew } = query;

    // Filter by Category
    if (category && category !== 'All' && category !== 'all') {
      const cleanCategory = category.replace(/-/g, ' ').toLowerCase();
      result = result.filter(
        (app) => app.category.toLowerCase() === cleanCategory || app.category.toLowerCase().replace(/ /g, '-') === category.toLowerCase()
      );
    }

    // Filter by Platform
    if (platform && platform !== 'All' && platform !== 'all') {
      result = result.filter((app) =>
        app.platform.some((p) => p.toLowerCase() === platform.toLowerCase())
      );
    }

    // Filter by Featured
    if (featured === 'true' || featured === true) {
      result = result.filter((app) => app.isFeatured);
    }

    // Filter by Trending
    if (trending === 'true' || trending === true) {
      result = result.filter((app) => app.isTrending);
    }

    // Filter by New Release
    if (isNew === 'true' || isNew === true) {
      result = result.filter((app) => app.isNewRelease);
    }

    // Instant Search
    if (search && search.trim()) {
      const term = search.trim().toLowerCase();
      result = result.filter(
        (app) =>
          app.title.toLowerCase().includes(term) ||
          app.tagline.toLowerCase().includes(term) ||
          app.description.toLowerCase().includes(term) ||
          app.category.toLowerCase().includes(term) ||
          app.developer.name.toLowerCase().includes(term) ||
          app.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    }

    // Sorting
    if (sort) {
      switch (sort) {
        case 'newest':
          result.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
          break;
        case 'oldest':
          result.sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime());
          break;
        case 'most_downloaded':
        case 'downloads':
          result.sort((a, b) => b.downloadsCount - a.downloadsCount);
          break;
        case 'highest_rated':
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'recently_updated':
          result.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
          break;
        case 'az':
          result.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'za':
          result.sort((a, b) => b.title.localeCompare(a.title));
          break;
        default:
          break;
      }
    }

    return result;
  }

  // Get Featured Apps
  getFeaturedApps() {
    return this.apps.filter((app) => app.isFeatured);
  }

  // Get Trending Apps
  getTrendingApps() {
    return this.apps.filter((app) => app.isTrending);
  }

  // Get New Releases
  getNewApps() {
    return this.apps.filter((app) => app.isNewRelease);
  }

  // Search & Autocomplete
  searchApps(searchTerm) {
    if (!searchTerm || !searchTerm.trim()) {
      return {
        apps: [],
        suggestions: {
          appNames: [],
          categories: ['Android Apps', 'AI Apps', 'College Projects', 'Utilities'],
          developers: ['NexoApps Platform', 'NexoApps Owner'],
          recentSearches: ['Batlytics', 'AI Studio', 'Cricket Scoring', 'Dashboard'],
          popularSearches: ['Batlytics Cricket', 'AI Apps', 'Android APK', 'Analytics'],
        },
      };
    }

    const term = searchTerm.trim().toLowerCase();
    const matchedApps = this.getApps({ search: term });

    const appNames = matchedApps.map((a) => a.title);
    const categories = Array.from(new Set(matchedApps.map((a) => a.category)));
    const developers = Array.from(new Set(matchedApps.map((a) => a.developer.name)));

    return {
      apps: matchedApps,
      suggestions: {
        appNames,
        categories,
        developers,
        recentSearches: ['Batlytics', 'AI Studio', 'Cricket Scoring'],
        popularSearches: ['Batlytics Cricket', 'AI Apps', 'Android APK'],
      },
    };
  }

  // Get App by Slug
  getAppBySlug(slug) {
    return this.apps.find((app) => app.slug === slug);
  }

  // Get Related Apps
  getRelatedApps(slug) {
    const target = this.getAppBySlug(slug);
    if (!target) return this.apps.slice(0, 3);
    return this.apps
      .filter((a) => a.slug !== slug && (a.category === target.category || a.developer.name === target.developer.name))
      .slice(0, 3);
  }

  // Get Changelog for an App
  getChangelog(slug) {
    const target = this.getAppBySlug(slug);
    if (!target) return [];
    return [
      {
        version: target.version,
        releaseDate: target.lastUpdated || target.releaseDate,
        addedFeatures: target.features || ['Live Scoring Engine', 'PDF Exporting'],
        fixedBugs: ['Minor UI layout optimization for tablet viewports', 'Session refresh latency fix'],
        improvements: ['Faster ball-by-ball calculation pipeline', 'Enhanced dark mode glass contrast'],
        releaseNotes: target.releaseNotes || 'General performance updates and stability enhancements.',
      },
      {
        version: '0.9.5-alpha',
        releaseDate: '2026-06-15',
        addedFeatures: ['Initial match creation workflow', 'Manhattan chart engine'],
        fixedBugs: ['Fixed over counter reset edge case'],
        improvements: ['Bcrypt hashing security integration'],
        releaseNotes: 'Early preview release for internal beta testing.',
      },
    ];
  }

  // Get Version History
  getVersionHistory(slug) {
    return this.getChangelog(slug);
  }

  // Get Apps by Category
  getAppsByCategory(categorySlug) {
    return this.getApps({ category: categorySlug });
  }

  // Phase 4A: Get Draft Apps
  getDraftApps() {
    return this.apps.filter((a) => a.isDraft === true);
  }

  // Phase 4A: Get Published Apps
  getPublishedApps() {
    return this.apps.filter((a) => !a.isDraft && !a.isArchived);
  }

  // Phase 4A: Get Archived Apps
  getArchivedApps() {
    return this.apps.filter((a) => a.isArchived === true);
  }

  // Phase 4A: Create or Upload App
  createUploadApp(data) {
    // Validation
    if (!data.title || !data.title.trim()) {
      throw new Error('Application Title is required');
    }

    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const existingSlug = this.apps.find((a) => a.slug === slug && a.id !== data.id);
    if (existingSlug) {
      throw new Error(`Application with slug "${slug}" already exists`);
    }

    if (data.packageName) {
      const existingPkg = this.apps.find((a) => a.packageName === data.packageName && a.id !== data.id);
      if (existingPkg) {
        throw new Error(`Application with package name "${data.packageName}" already exists`);
      }
    }

    const newApp = {
      id: data.id || `app-${Date.now()}`,
      slug,
      title: data.title,
      packageName: data.packageName || `com.nexoapps.${slug.replace(/-/g, '_')}`,
      tagline: data.tagline || '',
      description: data.description || '',
      category: data.category || 'Android Apps',
      subCategory: data.subCategory || 'General',
      platform: data.platform || ['Android'],
      version: data.version || '1.0.0',
      buildNumber: data.buildNumber || 1,
      iconUrl: data.iconUrl || '📱',
      bannerUrl: data.bannerUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      coverImage: data.coverImage || data.bannerUrl,
      screenshots: data.screenshots || [],
      features: data.features || [],
      downloadUrl: data.downloadUrl || (data.apkFile ? `/downloads/${data.apkFile}` : undefined),
      apkFile: data.apkFile || `${slug}-v${data.version || '1.0.0'}.apk`,
      fileSize: data.fileSize || '25.0 MB',
      apkSize: data.apkSize || data.fileSize || '25.0 MB',
      apkChecksum: data.apkChecksum || `sha256_${Date.now()}`,
      rating: data.rating || 5.0,
      totalReviews: data.totalReviews || 0,
      downloadsCount: data.downloadsCount || 0,
      downloads: data.downloads || 0,
      isFeatured: Boolean(data.isFeatured),
      isTrending: Boolean(data.isTrending),
      isNewRelease: Boolean(data.isNewRelease),
      isEditorsChoice: Boolean(data.isEditorsChoice),
      isDraft: Boolean(data.isDraft),
      isArchived: Boolean(data.isArchived),
      visibility: data.visibility || 'Public',
      status: data.isDraft ? 'Coming Soon' : (data.status || 'Published'),
      releaseDate: data.releaseDate || new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      minAndroidVersion: data.minAndroidVersion || 'Android 8.0',
      targetAndroidVersion: data.targetAndroidVersion || 'Android 14.0',
      permissions: data.permissions || ['Internet', 'Storage'],
      privacyPolicyUrl: data.privacyPolicyUrl || 'https://nexoapps.com/privacy',
      supportEmail: data.supportEmail || 'support@nexoapps.com',
      releaseNotes: data.releaseNotes || 'Initial production release.',
      bugFixes: data.bugFixes || '',
      knownIssues: data.knownIssues || '',
      comingSoon: data.comingSoon || '',
      developer: data.developer || {
        name: data.developerName || 'NexoApps Platform',
        email: data.developerEmail || 'developer@nexoapps.com',
        website: data.developerWebsite || 'https://nexoapps.com',
      },
      tags: data.tags || ['Android', 'App Store'],
    };

    const existingIndex = this.apps.findIndex((a) => a.id === newApp.id);
    if (existingIndex !== -1) {
      this.apps[existingIndex] = { ...this.apps[existingIndex], ...newApp };
      return this.apps[existingIndex];
    } else {
      this.apps.unshift(newApp);
      return newApp;
    }
  }

  // Phase 4A: Publish App
  publishApp(id) {
    const app = this.getAppById(id);
    if (!app) throw new Error('App not found');
    app.isDraft = false;
    app.isArchived = false;
    app.status = 'Published';
    app.lastUpdated = new Date().toISOString().split('T')[0];
    return app;
  }

  // Phase 4A: Archive App
  archiveApp(id) {
    const app = this.getAppById(id);
    if (!app) throw new Error('App not found');
    app.isArchived = true;
    app.status = 'Maintenance';
    app.lastUpdated = new Date().toISOString().split('T')[0];
    return app;
  }

  // Phase 4A: Get Owner Stats
  getOwnerStats() {
    const drafts = this.getDraftApps();
    const published = this.getPublishedApps();
    const archived = this.getArchivedApps();

    return {
      draftAppsCount: drafts.length,
      publishedAppsCount: published.length,
      archivedAppsCount: archived.length,
      latestUploadDate: this.apps.length > 0 ? this.apps[0].lastUpdated : new Date().toISOString().split('T')[0],
      pendingUpdatesCount: drafts.length,
      totalApkStorageUsed: `${(this.apps.length * 28.4).toFixed(1)} MB`,
    };
  }
}

module.exports = new AppService();
