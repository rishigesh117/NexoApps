/**
 * Knowledge Base & FAQ Search Service
 * NexoApps Platform - Phase 5B
 */

class KnowledgeBaseService {
  constructor() {
    this.articles = [
      {
        id: 'kb-1',
        title: 'Getting Started with NexoApps Platform',
        slug: 'getting-started-nexoapps',
        category: 'Account',
        summary: 'Learn how to browse apps, create user playlists, follow developers, and manage profile security.',
        content: 'NexoApps is an ecosystem designed for high-precision Android, Web, and AI software applications. Create your free account to curate custom app collections, follow your favorite developer studios, and receive real-time release notifications.',
        viewsCount: 2450,
        isFeatured: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'kb-2',
        title: 'Owner Upload Portal & 8-Step Publishing Wizard',
        slug: 'owner-upload-portal-guide',
        category: 'Publishing',
        summary: 'Step-by-step guide for platform owners on uploading APKs, automatic metadata parsing, and instant store release.',
        content: 'The Owner Upload Portal (/admin/upload) includes an 8-step wizard that validates package names, checks version codes, calculates SHA-256 binary checksums, and publishes apps directly to the storefront catalog.',
        viewsCount: 1890,
        isFeatured: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'kb-3',
        title: 'Multi-Developer Workspace & App Submissions',
        slug: 'multi-developer-workspace-guide',
        category: 'Developer',
        summary: 'How developers register studio profiles and submit applications to the Owner review queue.',
        content: 'Members can apply for Developer Studio accounts at /developer/apply. Once approved, developers can manage published apps, inspect install conversion analytics, and submit new builds to the /admin/submissions queue.',
        viewsCount: 1420,
        isFeatured: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'kb-4',
        title: 'Secure Signed APK Delivery & Token Expiration',
        slug: 'secure-apk-delivery-guide',
        category: 'Downloads',
        summary: 'Understanding signed download tokens, temporary URLs, and SHA-256 binary integrity verification.',
        content: 'All application downloads on NexoApps use HMAC-SHA256 signed temporary tokens with 30-minute expiration windows. Downloads are logged in real-time and integrity is verified via SHA-256 checksum matching.',
        viewsCount: 1150,
        isFeatured: false,
        createdAt: new Date().toISOString(),
      },
    ];

    this.faqs = [
      {
        id: 'faq-1',
        question: 'How do I download and install APK files on Android?',
        answer: 'Navigate to any app page (such as Batlytics), click "Download APK", and open the downloaded .apk file on your Android phone or tablet. Ensure "Install Unknown Apps" is permitted in Settings if prompted.',
        category: 'Downloads',
      },
      {
        id: 'faq-2',
        question: 'How do I become a verified Developer Studio on NexoApps?',
        answer: 'Sign in to your NexoApps account and navigate to /developer/apply. Complete the Studio Name, Country, Support Email, and Portfolio fields to submit your developer application for Owner review.',
        category: 'Developer',
      },
      {
        id: 'faq-3',
        question: 'What is the Platform Health Check on the OWNER Testing Dashboard?',
        answer: 'The OWNER Testing Dashboard (/admin/testing) runs automated diagnostics against Express Server, PostgreSQL, Auth, APIs, Uploads, Store, App Details, Notifications, Developer Workspace, and Console pages.',
        category: 'Owner',
      },
      {
        id: 'faq-4',
        question: 'Are custom app collections public or private?',
        answer: 'You can toggle custom collections between Public, Private, or Unlisted at any time from the Collections page (/collections).',
        category: 'Account',
      },
    ];
  }

  searchKnowledge(query, category) {
    let result = [...this.articles];
    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter(
        (a) => a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q) || a.content.toLowerCase().includes(q)
      );
    }
    if (category && category !== 'All') {
      result = result.filter((a) => a.category.toLowerCase() === category.toLowerCase());
    }
    return result;
  }

  getFAQs(category) {
    if (!category || category === 'All') return this.faqs;
    return this.faqs.filter((f) => f.category.toLowerCase() === category.toLowerCase());
  }
}

module.exports = new KnowledgeBaseService();
