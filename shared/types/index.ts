/**
 * NexoApps Platform - Shared Type Definitions
 * Phase 2A Authentication
 */

export type AppCategory = 
  | 'Android Apps'
  | 'AI Apps'
  | 'College Projects'
  | 'Utilities'
  | 'Education'
  | 'Sports'
  | 'Games'
  | 'Business'
  | 'Productivity'
  | 'Future Apps'
  | 'Web Apps'
  | 'Desktop Applications'
  | 'Future Products';

export type AppPlatform = 'Android' | 'Web' | 'Windows' | 'macOS' | 'Linux' | 'Cross-Platform';

export type AppStatus = 'Published' | 'Beta' | 'Coming Soon' | 'Maintenance';

export type LifecycleState = 'Draft' | 'Pending Validation' | 'Ready' | 'Published' | 'Archived' | 'Deleted';

export type DeviceViewMode = 'phone' | 'tablet';
export type ThemePreviewMode = 'dark' | 'light';

export type AndroidPermission =
  | 'Internet'
  | 'Storage'
  | 'Camera'
  | 'Microphone'
  | 'Notifications'
  | 'Location'
  | 'Bluetooth';

export interface AppItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: AppCategory;
  subCategory?: string;
  platform: AppPlatform[];
  version: string;
  buildNumber?: number;
  packageName?: string;
  latestVersion?: string;
  iconUrl: string;
  bannerUrl: string;
  coverImage?: string;
  screenshots: string[];
  features: string[];
  downloadUrl?: string;
  externalLink?: string;
  apkFile?: string;
  fileSize?: string;
  apkSize?: string;
  apkChecksum?: string;
  rating: number;
  totalReviews: number;
  downloadsCount: number;
  downloads?: number;
  isFeatured: boolean;
  isTrending?: boolean;
  isNewRelease?: boolean;
  isEditorsChoice?: boolean;
  isDraft?: boolean;
  isArchived?: boolean;
  visibility?: 'Public' | 'Private' | 'Unlisted';
  status: AppStatus;
  lifecycleState?: LifecycleState;
  releaseDate: string;
  lastUpdated: string;
  minAndroidVersion?: string;
  targetAndroidVersion?: string;
  permissions?: AndroidPermission[];
  privacyPolicyUrl?: string;
  supportEmail?: string;
  releaseNotes?: string;
  bugFixes?: string;
  knownIssues?: string;
  comingSoon?: string;
  developer: {
    name: string;
    email: string;
    website?: string;
  };
  tags: string[];
}

export interface ApkValidationReport {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  packageName: string;
  versionName: string;
  buildNumber: number;
  minSdk: string;
  targetSdk: string;
  checksum: string;
  fileSize: string;
  createdAt: string;
}

export interface MediaProcessingState {
  isProcessing: boolean;
  progress: number;
  currentStep: string;
  convertedFormat: string;
  thumbnailCreated: boolean;
  originalSizeMb?: number;
  compressedSizeMb?: number;
  savedPercentage?: number;
}

export interface AppVersionRecord {
  id: string;
  appId: string;
  versionName: string;
  buildNumber: number;
  releaseDate: string;
  releaseNotes: string;
  bugFixes?: string;
  knownIssues?: string;
  apkFile?: string;
  apkChecksum?: string;
  isActive: boolean;
}

export interface OwnerNotification {
  id: string;
  type: 'upload_complete' | 'validation_failed' | 'app_published' | 'app_archived' | 'version_updated' | 'storage_warning' | 'new_review' | 'new_rating';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  metadata?: any;
}

export interface TimelineEvent {
  id: string;
  appId: string;
  eventType: 'Created' | 'Updated' | 'Validated' | 'Published' | 'Archived' | 'Version Updated' | 'Deleted';
  description: string;
  createdAt: string;
  createdBy?: string;
}

export interface UploadWizardState {
  // Step 1: Basic Info
  title: string;
  packageName: string;
  slug: string;
  tagline: string;
  description: string;
  category: AppCategory;
  tags: string[];
  version: string;
  buildNumber: number;
  fileSize: string;
  releaseDate: string;
  lastUpdated: string;

  // Step 2: Media
  iconUrl: string;
  bannerUrl: string;
  coverImage: string;
  screenshots: string[];

  // Step 3: APK
  apkFile: string;
  apkSize: string;
  apkChecksum: string;
  uploadProgress: number;
  isUploading: boolean;

  // Step 4: Store Info & Permissions
  developerName: string;
  developerEmail: string;
  developerWebsite: string;
  privacyPolicyUrl: string;
  supportEmail: string;
  minAndroidVersion: string;
  targetAndroidVersion: string;
  permissions: AndroidPermission[];

  // Step 5: Features
  features: string[];

  // Step 6: Release Notes
  releaseNotes: string;
  bugFixes: string;
  knownIssues: string;
  comingSoon: string;

  // Step 8: Status Flags
  status: AppStatus;
  isDraft: boolean;
  isArchived: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  isEditorsChoice: boolean;
  visibility: 'Public' | 'Private' | 'Unlisted';
}

export interface OwnerStats {
  draftAppsCount: number;
  publishedAppsCount: number;
  archivedAppsCount: number;
  latestUploadDate: string;
  pendingUpdatesCount: number;
  totalApkStorageUsed: string;
}


export type UserRole = 'GUEST' | 'MEMBER' | 'DEVELOPER' | 'ADMIN' | 'OWNER';

export type DeveloperStatus = 'Pending' | 'Verified' | 'Rejected' | 'Suspended';

export type SubmissionStatus = 'Pending Review' | 'Approved' | 'Rejected' | 'Changes Requested';

export interface DeveloperApplicationRecord {
  id: string;
  userId: string;
  studioName: string;
  displayName: string;
  country: string;
  website?: string;
  supportEmail: string;
  bio: string;
  portfolioUrl?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  rejectionReason?: string;
  createdAt: string;
  reviewedAt?: string;
}

export interface SubmissionItemRecord {
  id: string;
  appId: string;
  developerId: string;
  submissionType: 'New Release' | 'Version Update';
  appTitle: string;
  versionName: string;
  buildNumber: number;
  category: AppCategory;
  changesSummary?: string;
  status: SubmissionStatus;
  rejectionReason?: string;
  createdAt: string;
  reviewedAt?: string;
  developer?: {
    studioName: string;
    displayName: string;
    email: string;
  };
  app?: AppItem;
}

export interface SubmissionCommentRecord {
  id: string;
  submissionId: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  commentText: string;
  createdAt: string;
}

export interface DeveloperNotificationItem {
  id: string;
  developerId: string;
  type: 'submission_received' | 'approved' | 'rejected' | 'needs_changes' | 'new_review' | 'app_featured' | 'version_published';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  metadata?: any;
}

export interface DeveloperWorkspaceStats {
  myAppsCount: number;
  draftAppsCount: number;
  publishedAppsCount: number;
  archivedAppsCount: number;
  totalDownloads: number;
  totalViews: number;
  totalReviews: number;
  averageRating: number;
  monthlyGrowthPercentage: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  emailVerified: boolean;
  profileImage?: string;
  avatarUrl?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface Review {
  id: string;
  appId: string;
  appSlug?: string;
  appTitle?: string;
  appIcon?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  review: string;
  comment?: string;
  isVerified: boolean;
  likesCount: number;
  isLikedByUser?: boolean;
  createdAt: string;
  updatedAt?: string;
  isDeleted?: boolean;
  adminReply?: {
    message: string;
    repliedAt: string;
  };
}

export interface RatingDistributionData {
  average: number;
  total: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface FavoriteItem {
  id: string;
  userId: string;
  appId: string;
  createdAt: string;
  app?: AppItem;
}

export type ReviewSortOption = 'newest' | 'oldest' | 'highest' | 'helpful';


export interface Suggestion {
  id: string;
  userId?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  appId?: string;
  status: 'Pending' | 'Reviewed' | 'Implemented' | 'Closed';
  createdAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

export interface AdminDashboardStats {
  totalUsers: number;
  totalApps: number;
  totalDownloads: number;
  totalReviews: number;
  averageRating: number;
  activeDevelopers: number;
  pendingSubmissions: number;
  dailyActiveUsers: number;
}

export interface DeveloperProfile {
  id: string;
  userId?: string;
  name?: string;
  studioName?: string;
  displayName?: string;
  username?: string;
  email?: string;
  supportEmail?: string;
  country?: string;
  website?: string;
  bio?: string;
  avatarUrl?: string;
  logoUrl?: string;
  bannerUrl?: string;
  socialLinks?: Record<string, string>;
  portfolioUrl?: string;
  status: 'Pending' | 'Verified' | 'Rejected' | 'Suspended' | 'Active' | 'Pending Verification';
  isVerified: boolean;
  totalApps: number;
  followersCount?: number;
  createdAt: string;
}

export interface ActivityLogItem {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  targetType: string;
  targetId: string;
  details: string;
  ipAddress: string;
  createdAt: string;
}

export interface SystemHealthStatus {
  serverStatus: 'Operational' | 'Degraded' | 'Down';
  databaseStatus: 'Connected' | 'Error';
  uptimeSeconds: number;
  memoryUsageMb: number;
  cpuLoadPercentage: number;
  activeSockets: number;
  lastBackupAt: string;
}

export interface UserAdminRecord extends User {
  status: 'Active' | 'Suspended';
  totalDownloads?: number;
  totalReviews?: number;
}

// Phase 4D Social Ecosystem Interfaces
export interface Collection {
  id: string;
  userId: string;
  title: string;
  description?: string;
  visibility: 'Public' | 'Private' | 'Unlisted';
  coverImage?: string;
  category?: string;
  createdAt: string;
  itemCount?: number;
  apps?: AppItem[];
}

export interface CollectionItem {
  id: string;
  collectionId: string;
  appId: string;
  sortOrder: number;
  addedAt: string;
  app?: AppItem;
}

export interface NotificationItem {
  id: string;
  userId: string;
  type: 'developer_published' | 'app_updated' | 'wishlist_updated' | 'review_reply' | 'app_featured' | 'security_alert' | 'download_completed' | 'developer_followed';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
  metadata?: any;
}

export interface TrendingMetric {
  appId: string;
  app?: AppItem;
  downloads: number;
  favorites: number;
  reviews: number;
  rating: number;
  views: number;
  trendingScore: number;
  period: 'today' | 'week' | 'month';
}

export interface DeveloperFollow {
  id: string;
  userId: string;
  developerId: string;
  followedAt: string;
}

export interface RecommendationItem {
  app: AppItem;
  reason: string;
  score: number;
  similarApps?: AppItem[];
}

export interface CommunityFeedItem {
  id: string;
  type: 'new_release' | 'developer_update' | 'review_milestone' | 'featured_promotion';
  title: string;
  content: string;
  app?: AppItem;
  developer?: {
    studioName: string;
    username: string;
    logoUrl?: string;
  };
  createdAt: string;
}

// Phase 5A AI & Enterprise Analytics Interfaces
export interface AISearchResult {
  apps: AppItem[];
  developers: DeveloperProfile[];
  collections: Collection[];
  suggestions: string[];
  trending: string[];
  total: number;
}

export interface RecommendationV2Group {
  category: 'recommended_for_you' | 'because_you_downloaded' | 'similar_apps' | 'hidden_gems' | 'new_releases';
  title: string;
  description: string;
  items: RecommendationItem[];
}

export interface EnterpriseAnalyticsOverview {
  dau: number;
  mau: number;
  totalDownloads: number;
  revenuePlaceholder: string;
  activeDevelopers: number;
  totalReviews: number;
  searchCount: number;
  conversionRate: number;
  topCategories: { category: string; count: number; percentage: number }[];
  dailyMetrics: { date: string; downloads: number; users: number }[];
  deviceDistribution: { device: string; percentage: number }[];
}

export interface SearchHistoryItem {
  id: string;
  query: string;
  categoryFilter?: string;
  createdAt: string;
}

export interface PopularSearchMetric {
  query: string;
  searchCount: number;
  trend: 'up' | 'stable';
}

// Phase 5B AI Assistant & Smart Support Interfaces
export interface AIConversation {
  id: string;
  userId?: string;
  title: string;
  contextPage?: string;
  createdAt: string;
  updatedAt: string;
  messages?: AIMessage[];
}

export interface AIMessage {
  id: string;
  conversationId: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  suggestedActions?: { label: string; action: string; link?: string }[];
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  userId?: string;
  userName: string;
  userEmail: string;
  subject: string;
  category: 'Account' | 'Publishing' | 'Downloads' | 'Security' | 'Billing' | 'General';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  description: string;
  createdAt: string;
  updatedAt: string;
  replies?: SupportReply[];
}

export interface SupportReply {
  id: string;
  ticketId: string;
  userId?: string;
  senderName: string;
  isAdmin: boolean;
  message: string;
  createdAt: string;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  summary: string;
  viewsCount: number;
  isFeatured: boolean;
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface AutomationLog {
  id: string;
  type: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  details: string;
  recommendation: string;
  resolved: boolean;
  createdAt: string;
}

export interface IssueReport {
  id: string;
  userId?: string;
  pageUrl: string;
  issueType: string;
  description: string;
  status: string;
  createdAt: string;
}

// Phase 5C Cloud Sync, Multi-Device & Backup Interfaces
export interface UserDevice {
  id: string;
  userId: string;
  deviceName: string;
  deviceType: 'Android Phone' | 'Android Tablet' | 'Desktop Browser' | 'Chromebook' | 'iOS Browser';
  os: string;
  browser: string;
  ipAddress: string;
  isCurrentDevice: boolean;
  lastActiveAt: string;
  createdAt: string;
}

export interface SyncSession {
  id: string;
  userId: string;
  deviceId?: string;
  status: 'Pending' | 'Syncing' | 'Completed' | 'Failed';
  itemsSynced: number;
  syncType: 'full' | 'incremental';
  createdAt: string;
  completedAt: string;
}

export interface CloudBackup {
  id: string;
  userId: string;
  backupName: string;
  version: string;
  sizeBytes: number;
  encryptionHash: string;
  isAutoBackup: boolean;
  createdAt: string;
}

export interface SyncHistory {
  id: string;
  userId: string;
  deviceId?: string;
  action: string;
  details: string;
  createdAt: string;
}

export interface UserPreference {
  userId: string;
  theme: 'dark' | 'light';
  language: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  autoBackup: boolean;
  syncFavorites: boolean;
  syncCollections: boolean;
  updatedAt: string;
}

export interface OfflineChange {
  id: string;
  userId: string;
  actionType: string;
  payload: any;
  synced: boolean;
  createdAt: string;
}

export interface NotificationSync {
  id: string;
  userId: string;
  notificationId: string;
  readOnDeviceId?: string;
  syncedAt: string;
}

export interface DownloadSync {
  id: string;
  userId: string;
  appId: string;
  deviceId?: string;
  downloadedAt: string;
}

export interface RecentActivity {
  id: string;
  userId: string;
  deviceName: string;
  activityType: string;
  description: string;
  createdAt: string;
}

export interface SyncConflict {
  id: string;
  userId: string;
  entityType: string;
  localVersion: any;
  cloudVersion: any;
  resolved: boolean;
  createdAt: string;
}




