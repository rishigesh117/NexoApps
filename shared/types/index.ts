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

// Phase 5D Enterprise Workspace Interfaces
export type WorkspaceRole = 'owner' | 'admin' | 'pm' | 'developer' | 'reviewer' | 'viewer';

export type WorkspacePermission =
  | '*'
  | 'manage_members'
  | 'manage_projects'
  | 'manage_api_keys'
  | 'upload_apks'
  | 'view_analytics'
  | 'review_submissions'
  | 'view_audit'
  | 'view_projects';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  description?: string;
  websiteUrl?: string;
  country?: string;
  logoUrl?: string;
  bannerUrl?: string;
  status: 'Active' | 'Verified' | 'Suspended';
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  membersCount?: number;
  projectsCount?: number;
}

export interface OrganizationMember {
  id: string;
  organizationId: string;
  userId: string;
  username: string;
  email: string;
  role: WorkspaceRole;
  avatarUrl?: string;
  joinedAt: string;
}

export interface OrganizationInvitation {
  id: string;
  organizationId: string;
  organizationName?: string;
  email: string;
  role: WorkspaceRole;
  invitedBy: string;
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Expired';
  token: string;
  createdAt: string;
  expiresAt: string;
}

export interface OrganizationProject {
  id: string;
  organizationId: string;
  name: string;
  slug: string;
  description?: string;
  status: 'Planning' | 'Active' | 'Review' | 'Completed' | 'Archived';
  category: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
  membersCount?: number;
  filesCount?: number;
}

export interface ProjectActivity {
  id: string;
  organizationId: string;
  projectId?: string;
  actorId?: string;
  actorName: string;
  actionType: string;
  description: string;
  createdAt: string;
}

export interface ProjectComment {
  id: string;
  projectId: string;
  authorId?: string;
  authorName: string;
  commentText: string;
  createdAt: string;
}

export interface ProjectFile {
  id: string;
  projectId: string;
  fileName: string;
  fileSizeBytes: number;
  fileType: string;
  uploadedBy?: string;
  uploadedAt: string;
}

export interface ProjectAuditLog {
  id: string;
  organizationId: string;
  actorId?: string;
  action: string;
  ipAddress?: string;
  details?: string;
  createdAt: string;
}

export interface ProjectApiKey {
  id: string;
  organizationId: string;
  keyName: string;
  apiKey: string;
  permissions: string[];
  createdBy?: string;
  lastUsedAt?: string;
  createdAt: string;
}

export interface OrganizationNotification {
  id: string;
  organizationId: string;
  userId?: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// Phase 5E Enterprise DevOps, Production Scaling & Operations Interfaces
export interface AuditLogEntry {
  id: string;
  actorId?: string;
  actorEmail?: string;
  actorRole?: string;
  actionType: string;
  resource?: string;
  details?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface SystemEventEntry {
  id: string;
  eventName: string;
  severity: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
  sourceService: string;
  message: string;
  payload?: any;
  createdAt: string;
}

export interface SecurityEventEntry {
  id: string;
  userId?: string;
  eventType: string;
  ipAddress: string;
  location: string;
  blocked: boolean;
  createdAt: string;
}

export interface LoginHistoryEntry {
  id: string;
  userId: string;
  ipAddress?: string;
  deviceName?: string;
  browser?: string;
  os?: string;
  loginAt: string;
}

export interface ApiUsageLogEntry {
  id: string;
  endpoint: string;
  method: string;
  statusCode: number;
  responseTimeMs: number;
  userId?: string;
  createdAt: string;
}

export interface ServerMetrics {
  cpuUsagePercent: number;
  memoryUsagePercent: number;
  diskUsagePercent: number;
  postgresPoolActive: number;
  postgresPoolIdle: number;
  redisConnected: boolean;
  averageLatencyMs: number;
  requestsPerSec: number;
  errorRatePercent: number;
  activeUsers: number;
  onlineUsers: number;
  queueLength: number;
  workerStatus: 'HEALTHY' | 'DEGRADED' | 'DOWN';
}

export interface JobSchedule {
  id: string;
  jobName: string;
  cronExpression: string;
  lastRunAt?: string;
  nextRunAt: string;
  status: 'ACTIVE' | 'PAUSED' | 'FAILED';
  runCount: number;
}

export interface DeploymentEntry {
  id: string;
  environment: 'Development' | 'Testing' | 'Staging' | 'Production';
  version: string;
  commitHash: string;
  deployedBy: string;
  status: 'SUCCESS' | 'FAILED' | 'BUILDING' | 'ROLLED_BACK';
  deployedAt: string;
}

export interface NotificationQueueStatus {
  emailQueueCount: number;
  pushQueueCount: number;
  retryQueueCount: number;
  deadLetterQueueCount: number;
  workersActive: number;
}

// Phase 6A AI Application Builder Interfaces
export interface AIProject {
  id: string;
  userId: string;
  name: string;
  slug: string;
  description?: string;
  framework: string;
  language: string;
  styling: string;
  status: 'Draft' | 'Generating' | 'Completed' | 'Archived';
  promptUsed?: string;
  createdAt: string;
  updatedAt: string;
  filesCount?: number;
}

export interface AITemplate {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  previewUrl?: string;
  icon: string;
  starsCount: number;
  downloadsCount: number;
  createdAt: string;
}

export interface AIGenerationJob {
  id: string;
  projectId: string;
  userId: string;
  prompt: string;
  status: 'Pending' | 'Processing' | 'Completed' | 'Failed';
  progressPercent: number;
  filesGeneratedCount: number;
  createdAt: string;
  completedAt?: string;
}

export interface AIWorkflow {
  id: string;
  userId: string;
  name: string;
  triggerType: string;
  actions: any[];
  isActive: boolean;
  createdAt: string;
}

export interface GeneratedFile {
  id: string;
  projectId: string;
  filePath: string;
  fileType: string;
  content: string;
  sizeBytes: number;
  createdAt: string;
}

export interface PromptHistory {
  id: string;
  userId: string;
  projectId?: string;
  promptText: string;
  responseSummary?: string;
  tokensUsed: number;
  createdAt: string;
}

export interface ExportPackage {
  id: string;
  projectId: string;
  userId: string;
  exportFormat: 'ZIP' | 'Next.js' | 'React' | 'Node.js';
  downloadUrl: string;
  sizeBytes: number;
  createdAt: string;
}

export interface BuilderComponent {
  id: string;
  name: string;
  category: 'Layout' | 'Form' | 'Card' | 'Data' | 'Navigation';
  description: string;
  codeSnippet: string;
  icon: string;
}

export interface BuilderPage {
  id: string;
  name: string;
  routePath: string;
  componentsCount: number;
}

export interface BuilderStats {
  totalProjects: number;
  totalTemplates: number;
  generatedFilesCount: number;
  activeWorkflows: number;
  exportsCount: number;
}

// Phase 6B Autonomous AI Agents Interfaces
export interface AIAgent {
  id: string;
  name: string;
  role: 'Software Engineer' | 'Project Planner' | 'QA Lead' | 'Code Reviewer' | 'Tech Writer';
  avatar: string;
  description: string;
  capabilities: string[];
  status: 'Active' | 'Busy' | 'Idle' | 'Offline';
  createdAt: string;
}

export interface AgentTask {
  id: string;
  agentId: string;
  taskTitle: string;
  description?: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Failed';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  createdAt: string;
}

export interface AgentSession {
  id: string;
  agentId: string;
  userId: string;
  sessionTitle: string;
  messages: Array<{ sender: 'user' | 'agent'; text: string; timestamp: string }>;
  createdAt: string;
}

export interface AgentMemory {
  id: string;
  agentId: string;
  memoryKey: string;
  memoryValue: string;
  importanceScore: number;
  createdAt: string;
}

export interface ProjectPlan {
  id: string;
  userId: string;
  projectName: string;
  targetDeadline?: string;
  summary: string;
  requirements: string[];
  status: 'Active' | 'Completed' | 'Archived';
  createdAt: string;
}

export interface DevelopmentTask {
  id: string;
  planId: string;
  title: string;
  assignedAgentId?: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'QA';
  status: 'Backlog' | 'To Do' | 'In Progress' | 'Code Review' | 'Done';
  estimatedHours: number;
  createdAt: string;
}

export interface SprintBoard {
  id: string;
  name: string;
  sprintGoal: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Completed' | 'Planned';
  createdAt: string;
}

export interface SprintTask {
  id: string;
  sprintId: string;
  taskTitle: string;
  assignedTo: string;
  status: 'To Do' | 'In Progress' | 'In Review' | 'Done';
  points: number;
  createdAt: string;
}

export interface BugReport {
  id: string;
  filePath: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  issueTitle: string;
  description: string;
  suggestedFix?: string;
  detectedByAgentId?: string;
  createdAt: string;
}

export interface CodeReview {
  id: string;
  reviewerAgentId: string;
  pullRequestTitle: string;
  qualityScore: number;
  status: 'Approved' | 'Changes Requested' | 'Pending';
  comments: string[];
  createdAt: string;
}

export interface DocumentationRecord {
  id: string;
  docTitle: string;
  docType: 'README' | 'Architecture' | 'API Reference' | 'User Manual';
  content: string;
  generatedByAgentId?: string;
  createdAt: string;
}

export interface AgentStatistics {
  totalAgents: number;
  activeSessions: number;
  bugsDetectedCount: number;
  reviewsCompletedCount: number;
  docsGeneratedCount: number;
  sprintsActiveCount: number;
}

// Phase 6C Enterprise AI Deployment Interfaces
export interface AIModel {
  id: string;
  userId: string;
  name: string;
  slug: string;
  taskType: 'LLM' | 'Computer Vision' | 'Audio' | 'Tabular';
  framework: string;
  description: string;
  license: string;
  isPublic: boolean;
  createdAt: string;
  versionsCount?: number;
}

export interface ModelVersion {
  id: string;
  modelId: string;
  version: string;
  artifactPath: string;
  parametersCount: string;
  status: 'Active' | 'Archived';
  createdAt: string;
}

export interface Deployment {
  id: string;
  modelId: string;
  versionId: string;
  environment: 'Development' | 'Staging' | 'Production';
  status: 'RUNNING' | 'STOPPED' | 'STARTING' | 'FAILED';
  replicas: number;
  endpointUrl: string;
  createdAt: string;
  modelName?: string;
}

export interface InferenceRequest {
  id: string;
  deploymentId: string;
  promptTokens: number;
  completionTokens: number;
  latencyMs: number;
  statusCode: number;
  createdAt: string;
}

export interface Dataset {
  id: string;
  userId: string;
  name: string;
  category: string;
  description: string;
  fileFormat: string;
  sizeMb: number;
  createdAt: string;
}

export interface DatasetVersion {
  id: string;
  datasetId: string;
  version: string;
  recordsCount: number;
  downloadUrl: string;
  createdAt: string;
}

export interface Experiment {
  id: string;
  userId: string;
  name: string;
  objective: string;
  status: 'Completed' | 'Running';
  createdAt: string;
}

export interface ExperimentRun {
  id: string;
  experimentId: string;
  modelName: string;
  promptVariant: string;
  accuracyScore: number;
  latencyMs: number;
  createdAt: string;
}

export interface ModelMetric {
  id: string;
  modelId: string;
  metricName: string;
  metricValue: number;
  recordedAt: string;
}

export interface RuntimeLog {
  id: string;
  serviceName: string;
  cpuPercent: number;
  memoryPercent: number;
  gpuPercent: number;
  requestsPerSec: number;
  timestamp: string;
}

export interface EndpointKey {
  id: string;
  userId: string;
  keyName: string;
  apiKey: string;
  isActive: boolean;
  createdAt: string;
}

export interface DeploymentHistory {
  id: string;
  deploymentId: string;
  eventType: string;
  details: string;
  createdAt: string;
}

// Phase 6D AI Marketplace Interfaces
export interface CreatorProfile {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  website?: string;
  isVerified: boolean;
  totalEarnings: number;
  createdAt: string;
  followersCount?: number;
}

export interface MarketplaceItem {
  id: string;
  creatorId: string;
  creatorName?: string;
  creatorUsername?: string;
  title: string;
  slug: string;
  type: 'AGENT' | 'MODEL' | 'TEMPLATE' | 'WORKFLOW' | 'PROMPT_PACK';
  shortDescription: string;
  fullDescription: string;
  price: number;
  pricingModel: 'FREE' | 'ONE_TIME' | 'SUBSCRIPTION';
  ratingAvg: number;
  downloadsCount: number;
  isFeatured: boolean;
  createdAt: string;
}

export interface MarketplaceVersion {
  id: string;
  itemId: string;
  version: string;
  changelog: string;
  downloadUrl: string;
  createdAt: string;
}

export interface MarketplaceReview {
  id: string;
  itemId: string;
  userId: string;
  userName?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface MarketplaceRating {
  itemId: string;
  ratingAvg: number;
  totalRatings: number;
}

export interface MarketplaceDownload {
  id: string;
  itemId: string;
  userId: string;
  version: string;
  downloadedAt: string;
}

export interface MarketplaceCollection {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  createdAt: string;
  itemsCount?: number;
}

export interface CreatorFollower {
  id: string;
  creatorId: string;
  followerUserId: string;
  createdAt: string;
}

export interface License {
  id: string;
  itemId: string;
  licenseType: string;
  termsUrl: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  itemId: string;
  status: 'ACTIVE' | 'CANCELLED';
  billingCycle: 'MONTHLY' | 'YEARLY';
  amount: number;
  currentPeriodEnd: string;
  createdAt: string;
}

export interface PurchaseHistory {
  id: string;
  userId: string;
  itemId: string;
  amount: number;
  purchasedAt: string;
}

export interface VerificationRequest {
  id: string;
  creatorId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedAt: string;
}

export interface MarketplaceStatistics {
  totalItems: number;
  totalDownloads: number;
  totalCreators: number;
  activeSubscriptions: number;
}

// Phase 6E Unified AI OS Interfaces
export interface PlatformNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  module: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export interface ActivityFeedItem {
  id: string;
  userId: string;
  module: 'BUILDER' | 'AGENTS' | 'PLATFORM' | 'MARKETPLACE' | 'WORKSPACE';
  action: string;
  description: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface DashboardWidget {
  id: string;
  widgetKey?: string;
  dashboardId?: string;
  widgetType?: string;
  title?: string;
  category?: string;
  description?: string;
  dataSource?: string;
  queryConfig?: any;
  visualizationConfig?: any;
  positionX?: number;
  positionY?: number;
  width?: number;
  height?: number;
  createdAt?: string;
}

export interface WidgetLayout {
  id: string;
  userId: string;
  layoutConfig: Array<{ i: string; x: number; y: number; w: number; h: number }>;
  createdAt: string;
}

export interface SavedSearch {
  id: string;
  userId: string;
  query: string;
  createdAt: string;
}

export interface CommandHistory {
  id: string;
  userId: string;
  command: string;
  executedAt: string;
}

export interface PlatformShortcut {
  id: string;
  userId: string;
  shortcutKey: string;
  targetUrl: string;
  createdAt: string;
}

export interface DashboardSettings {
  id: string;
  userId: string;
  theme: string;
  compactMode: boolean;
  createdAt: string;
}

export interface AutomationRule {
  id: string;
  userId: string;
  name: string;
  triggerEvent: string;
  actionTarget: string;
  isActive: boolean;
  createdAt: string;
}

export interface PlatformEvent {
  id: string;
  eventName: string;
  payload: Record<string, any>;
  createdAt: string;
}

export interface GlobalSearchResult {
  id: string;
  title: string;
  category: string;
  url: string;
  keywords?: string;
}

export interface PlatformHealth {
  status: 'HEALTHY' | 'DEGRADED' | 'DOWN';
  uptimeSeconds: number;
  cpuLoad: number;
  memoryUsagePercent: number;
  gpuUsagePercent: number;
  activeDeployments: number;
  activeAgentsCount: number;
  requestsPerSec: number;
}

export interface SystemAnnouncement {
  id: string;
  title: string;
  message: string;
  priority: 'NORMAL' | 'HIGH' | 'URGENT';
  isActive: boolean;
  createdAt: string;
}

// Phase 7A Enterprise SaaS Platform Interfaces
export interface Tenant {
  id: string;
  ownerUserId: string;
  name: string;
  slug: string;
  planTier: 'FREE' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE';
  status: 'ACTIVE' | 'SUSPENDED';
  createdAt: string;
  membersCount?: number;
}

export interface TenantMember {
  id: string;
  tenantId: string;
  userId: string;
  userName?: string;
  userEmail?: string;
  role: 'OWNER' | 'ADMIN' | 'MEMBER' | 'BILLING';
  createdAt: string;
}

export interface TenantRole {
  id: string;
  tenantId: string;
  roleName: string;
  permissions: string[];
}

export interface TenantDomain {
  id: string;
  tenantId: string;
  domainName: string;
  isVerified: boolean;
  isPrimary: boolean;
  createdAt: string;
}

export interface TenantBranding {
  id: string;
  tenantId: string;
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  accentColor: string;
  companyName: string;
  supportEmail: string;
  createdAt: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  slug: string;
  priceMonthly: number;
  priceYearly: number;
  storageGb: number;
  apiRequestsPerMonth: number;
  maxMembers: number;
  features: string[];
  isActive: boolean;
}

export interface TenantSubscription {
  id: string;
  tenantId: string;
  planId: string;
  planName?: string;
  status: 'ACTIVE' | 'CANCELLED' | 'PAST_DUE';
  billingCycle: 'MONTHLY' | 'YEARLY';
  currentPeriodEnd: string;
  createdAt: string;
}

export interface Invoice {
  id: string;
  tenantId: string;
  tenantName?: string;
  invoiceNumber: string;
  amountDue: number;
  amountPaid: number;
  status: 'PAID' | 'PENDING' | 'FAILED';
  pdfUrl?: string;
  createdAt: string;
}

export interface InvoiceItem {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface PaymentMethod {
  id: string;
  tenantId: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
  createdAt: string;
}

export interface PaymentTransaction {
  id: string;
  tenantId: string;
  tenantName?: string;
  amount: number;
  currency: string;
  status: 'SUCCEEDED' | 'FAILED';
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  isActive: boolean;
  createdAt: string;
}

export interface UsageRecord {
  id: string;
  tenantId: string;
  metricName: 'STORAGE' | 'BANDWIDTH' | 'API_REQUESTS';
  quantityUsed: number;
  recordedAt: string;
}

export interface TenantStorage {
  id: string;
  tenantId: string;
  usedMb: number;
  limitMb: number;
}

export interface TenantApiLimit {
  id: string;
  tenantId: string;
  requestsThisMonth: number;
  monthlyLimit: number;
}

export interface TenantIntegration {
  id: string;
  tenantId: string;
  integrationName: string;
  isConnected: boolean;
}

// Phase 7B Enterprise Integrations & API Gateway Interfaces
export interface ApiClient {
  id: string;
  userId: string;
  clientName: string;
  clientId: string;
  createdAt: string;
}

export interface ApiToken {
  id: string;
  clientId: string;
  tokenHash: string;
  expiresAt: string;
  createdAt: string;
}

export interface ApiScope {
  id: string;
  name: string;
  description: string;
}

export interface OAuthApplication {
  id: string;
  developerId: string;
  name: string;
  clientId: string;
  clientSecret?: string;
  redirectUris: string[];
  createdAt: string;
}

export interface OAuthAuthorization {
  id: string;
  userId: string;
  applicationId: string;
  scopes: string[];
  createdAt: string;
}

export interface OAuthToken {
  id: string;
  authorizationId: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export interface Webhook {
  id: string;
  userId: string;
  targetUrl: string;
  events: string[];
  secret: string;
  isActive: boolean;
  createdAt: string;
}

export interface WebhookDelivery {
  id: string;
  webhookId: string;
  eventType: string;
  statusCode: number;
  responseBody?: string;
  deliveredAt: string;
}

export interface IntegrationProvider {
  id: string;
  name: string;
  category: 'SAAS' | 'AUTH' | 'COMMUNICATION' | 'PAYMENT' | 'CRM';
  logoUrl?: string;
  description: string;
  isActive: boolean;
}

export interface IntegrationAccount {
  id: string;
  userId: string;
  providerId: string;
  providerName?: string;
  status: 'CONNECTED' | 'DISCONNECTED';
  connectedAt: string;
}

export interface IntegrationLog {
  id: string;
  accountId: string;
  action: string;
  status: 'SUCCESS' | 'FAILED';
  details?: string;
  timestamp: string;
}

export interface ApiUsageStatistic {
  id: string;
  userId: string;
  endpoint: string;
  requestCount: number;
  recordedDate: string;
}

export interface ApiRateLimit {
  id: string;
  tierName: string;
  requestsPerMinute: number;
  requestsPerDay: number;
}

export interface SdkDownload {
  id: string;
  language: 'NODEJS' | 'PYTHON' | 'GO' | 'JAVA';
  version: string;
  downloadCount: number;
}

export interface DeveloperApplication {
  id: string;
  userId: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface DeveloperApiKey {
  id: string;
  applicationId: string;
  apiKey: string;
  name: string;
  isActive: boolean;
  createdAt: string;
}

export interface IntegrationEvent {
  id: string;
  eventType: string;
  payload: any;
  createdAt: string;
}

export interface IntegrationFailure {
  id: string;
  providerName: string;
  errorMessage: string;
  occurredAt: string;
}

// ─── Phase 7C — Enterprise Data Platform (Version 3.2) ───

export interface DataSource {
  id: string;
  tenantId?: string;
  name: string;
  description?: string;
  sourceType: string;
  connectionString?: string;
  schemaDefinition?: string;
  status: string;
  lastSyncedAt?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DataConnector {
  id: string;
  dataSourceId: string;
  connectorType: string;
  config?: any;
  authMethod: string;
  pollingIntervalSeconds: number;
  isActive: boolean;
  lastHealthCheck?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ETLJob {
  id: string;
  tenantId?: string;
  name: string;
  description?: string;
  sourceId?: string;
  destinationId?: string;
  transformationConfig?: any;
  scheduleCron?: string;
  status: string;
  lastRunAt?: string;
  nextRunAt?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ETLRun {
  id: string;
  jobId: string;
  status: string;
  rowsProcessed: number;
  rowsFailed: number;
  errorMessage?: string;
  startedAt: string;
  completedAt?: string;
  durationMs: number;
}

export interface DataPipeline {
  id: string;
  tenantId?: string;
  name: string;
  description?: string;
  pipelineConfig?: any;
  stages?: any;
  status: string;
  scheduleCron?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WarehouseTable {
  id: string;
  tenantId?: string;
  tableName: string;
  schemaDefinition?: string;
  rowCount: number;
  sizeBytes: number;
  lastUpdatedAt?: string;
  createdAt: string;
}

export interface WarehouseSnapshot {
  id: string;
  tableId: string;
  snapshotName?: string;
  rowCount: number;
  sizeBytes: number;
  createdAt: string;
}

export interface Report {
  id: string;
  tenantId?: string;
  name: string;
  description?: string;
  reportType: string;
  queryConfig?: any;
  visualizationConfig?: any;
  filters?: any;
  isPublic: boolean;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScheduledReport {
  id: string;
  reportId: string;
  scheduleCron: string;
  recipients?: string;
  format: string;
  isActive: boolean;
  lastSentAt?: string;
  nextSendAt?: string;
  createdAt: string;
}

export interface ReportExport {
  id: string;
  reportId: string;
  format: string;
  fileUrl?: string;
  fileSize: number;
  exportedBy?: string;
  createdAt: string;
}

export interface DashboardTemplate {
  id: string;
  tenantId?: string;
  name: string;
  description?: string;
  layoutConfig?: any;
  theme: string;
  isDefault: boolean;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}


export interface KPIMetric {
  id: string;
  tenantId?: string;
  name: string;
  description?: string;
  metricType: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  trend: string;
  dataSourceId?: string;
  refreshIntervalSeconds: number;
  lastRefreshedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsModel {
  id: string;
  tenantId?: string;
  name: string;
  description?: string;
  modelType: string;
  algorithm: string;
  trainingConfig?: any;
  accuracy: number;
  status: string;
  lastTrainedAt?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PredictionJob {
  id: string;
  modelId: string;
  inputData?: any;
  status: string;
  startedAt?: string;
  completedAt?: string;
  createdBy?: string;
  createdAt: string;
}

export interface PredictionResult {
  id: string;
  jobId: string;
  predictionOutput?: any;
  confidence: number;
  metadata?: any;
  createdAt: string;
}

export interface ExecutiveDashboard {
  id: string;
  tenantId?: string;
  name: string;
  description?: string;
  layoutConfig?: any;
  kpiIds?: string;
  widgetIds?: string;
  isDefault: boolean;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuditReport {
  id: string;
  tenantId?: string;
  reportName: string;
  reportType: string;
  data?: any;
  generatedBy?: string;
  createdAt: string;
}

export interface DataQualityLog {
  id: string;
  tableId?: string;
  checkType: string;
  status: string;
  issuesFound: number;
  details?: string;
  checkedAt: string;
}

export interface DatasetCatalog {
  id: string;
  tenantId?: string;
  name: string;
  description?: string;
  schemaDefinition?: string;
  tags?: string;
  rowCount: number;
  sizeBytes: number;
  owner?: string;
  accessLevel: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Phase 7D — Enterprise AI Cloud & Workflow Orchestration (Version 3.3) ───

export interface WorkflowTemplate {
  id: string;
  tenantId?: string;
  name: string;
  description?: string;
  category: string;
  definition?: any;
  version: string;
  isActive: boolean;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowInstance {
  id: string;
  templateId: string;
  tenantId?: string;
  name: string;
  status: string;
  triggerType: string;
  triggerConfig?: any;
  environment: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowStep {
  id: string;
  workflowId: string;
  stepKey: string;
  name: string;
  stepType: string;
  config?: any;
  positionX: number;
  positionY: number;
  nextStepKeys?: string[];
  createdAt: string;
}

export interface WorkflowRun {
  id: string;
  workflowId: string;
  status: string;
  startedAt: string;
  completedAt?: string;
  durationMs: number;
  triggeredBy?: string;
  inputPayload?: any;
  outputPayload?: any;
  errorMessage?: string;
}

export interface WorkflowLog {
  id: string;
  runId: string;
  stepId?: string;
  logLevel: string;
  message: string;
  timestamp: string;
}

export interface AutomationJob {
  id: string;
  tenantId?: string;
  name: string;
  description?: string;
  jobType: string;
  eventPattern?: string;
  actionTarget?: string;
  actionPayload?: any;
  status: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobSchedule {
  id: string;
  jobId: string;
  cronExpression: string;
  timezone: string;
  isEnabled: boolean;
  lastExecutedAt?: string;
  nextExecutionAt?: string;
  createdAt: string;
}

export interface MessageQueue {
  id: string;
  tenantId?: string;
  queueName: string;
  queueType: string;
  messageTtlSeconds: number;
  maxRetries: number;
  deadLetterQueueId?: string;
  createdAt: string;
}

export interface QueueMessage {
  id: string;
  queueId: string;
  payload: any;
  status: string;
  retryCount: number;
  availableAt: string;
  createdAt: string;
}

export interface TaskWorker {
  id: string;
  workerName: string;
  nodeId?: string;
  status: string;
  concurrency: number;
  currentTasksCount: number;
  lastHeartbeat: string;
  createdAt: string;
}

export interface WorkerStatus {
  id: string;
  workerId: string;
  cpuPercent: number;
  memoryPercent: number;
  activeJobs: number;
  timestamp: string;
}

export interface EnvironmentProfile {
  id: string;
  tenantId?: string;
  name: string;
  environmentType: string;
  description?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EnvironmentVariable {
  id: string;
  profileId: string;
  varKey: string;
  varValue?: string;
  isSensitive: boolean;
  createdAt: string;
}

export interface Secret {
  id: string;
  tenantId?: string;
  secretName: string;
  secretType: string;
  encryptedValue: string;
  version: number;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeploymentTarget {
  id: string;
  tenantId?: string;
  name: string;
  targetType: string;
  connectionConfig?: any;
  status: string;
  createdAt: string;
}

export interface DeploymentJob {
  id: string;
  targetId: string;
  tenantId?: string;
  name: string;
  buildArtifact?: string;
  status: string;
  startedAt?: string;
  completedAt?: string;
  createdBy?: string;
  createdAt: string;
}

export interface DeploymentLog {
  id: string;
  deploymentId: string;
  logLevel: string;
  message: string;
  timestamp: string;
}

export interface CloudCluster {
  id: string;
  tenantId?: string;
  clusterName: string;
  provider: string;
  region: string;
  status: string;
  nodeCount: number;
  createdAt: string;
}

export interface ClusterNode {
  id: string;
  clusterId: string;
  nodeName: string;
  ipAddress?: string;
  nodeType: string;
  status: string;
  cpuCores: number;
  ramGb: number;
  createdAt: string;
}

export interface SystemBackup {
  id: string;
  tenantId?: string;
  backupName: string;
  backupType: string;
  storageLocation: string;
  sizeBytes: number;
  status: string;
  createdAt: string;
}

export interface BackupHistory {
  id: string;
  backupId: string;
  status: string;
  startedAt: string;
  completedAt?: string;
  errorMessage?: string;
}

export interface RestoreHistory {
  id: string;
  backupId: string;
  restoredBy?: string;
  status: string;
  startedAt: string;
  completedAt?: string;
  details?: string;
}

// ─── Phase 7E — Version 4.0 LTS Release & System Diagnostics ───

export interface LTSHealthStatus {
  version: string;
  isLTS: boolean;
  status: string;
  uptimeSeconds: number;
  securityChecksPassed: number;
  securityChecksTotal: number;
  activeModules: number;
  databaseStatus: string;
  lastDiagnosticAt: string;
}

export interface SecurityAuditEntry {
  id: string;
  tenantId?: string;
  eventType: string;
  severity: string;
  actorId?: string;
  ipAddress?: string;
  userAgent?: string;
  resourceTarget?: string;
  status: string;
  details?: string;
  timestamp: string;
}

export interface SystemConfig {
  id: string;
  configKey: string;
  configValue: string;
  description?: string;
  updatedAt: string;
}

export interface PerformanceMetric {
  id: string;
  metricName: string;
  metricValue: number;
  unit: string;
  moduleName: string;
  timestamp: string;
}

// ─── Phase 8A — AI Operating Cloud & Multi-Agent Workspace (Version 5.0) ───

export interface AgentWorkspace {
  id: string;
  tenantId?: string;
  name: string;
  description?: string;
  environment: string;
  status: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceAgent {
  id: string;
  workspaceId: string;
  agentName: string;
  role: string;
  modelName: string;
  temperature: number;
  status: string;
  capabilities?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AgentCapability {
  id: string;
  agentId: string;
  capabilityName: string;
  config?: any;
  isEnabled: boolean;
  createdAt: string;
}

export interface AgentTool {
  id: string;
  toolName: string;
  description?: string;
  parameterSchema?: any;
  executionHandler?: string;
  isSystem: boolean;
  createdAt: string;
}

export interface AgentConversation {
  id: string;
  sessionId: string;
  agentId: string;
  role: string;
  messageText: string;
  timestamp: string;
}

export interface AgentSharedMemory {
  id: string;
  workspaceId: string;
  memoryKey: string;
  memoryValue?: any;
  memoryType: string;
  accessLevel: string;
  createdByAgentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AgentExecution {
  id: string;
  agentId: string;
  executionType: string;
  inputPayload?: any;
  outputPayload?: any;
  status: string;
  durationMs: number;
  timestamp: string;
}

export interface AgentSchedule {
  id: string;
  agentId: string;
  cronExpression: string;
  taskDefinition?: string;
  isEnabled: boolean;
  lastRunAt?: string;
  nextRunAt?: string;
  createdAt: string;
}

export interface AgentNotification {
  id: string;
  agentId: string;
  notificationType: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface AgentTemplate {
  id: string;
  name: string;
  description?: string;
  role: string;
  defaultCapabilities?: string[];
  isOfficial: boolean;
  createdAt: string;
}

export interface AgentMetric {
  id: string;
  agentId: string;
  metricKey: string;
  metricValue: number;
  timestamp: string;
}

// ─── Phase 8B — AI Runtime Engine & Serverless Execution Platform (Version 5.1) ───

export interface RuntimeEnvironment {
  id: string;
  tenantId?: string;
  name: string;
  description?: string;
  isolationLevel: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface RuntimeSession {
  id: string;
  environmentId: string;
  sessionToken?: string;
  status: string;
  startedAt: string;
  endedAt?: string;
}

export interface RuntimeInstance {
  id: string;
  environmentId: string;
  instanceName: string;
  instanceType: string;
  status: string;
  memoryLimitMb: number;
  cpuCores: number;
  createdAt: string;
}

export interface RuntimeDeployment {
  id: string;
  environmentId: string;
  deploymentName: string;
  artifactUrl?: string;
  status: string;
  replicas: number;
  createdBy?: string;
  createdAt: string;
}

export interface RuntimeLog {
  id: string;
  instanceId: string;
  logLevel: string;
  message: string;
  timestamp: string;
}

export interface RuntimeMetric {
  id: string;
  instanceId: string;
  cpuUsagePercent: number;
  memoryUsageMb: number;
  networkInBytes: number;
  networkOutBytes: number;
  timestamp: string;
}

export interface RuntimeVariable {
  id: string;
  environmentId: string;
  varKey: string;
  varValue?: string;
  isSecret: boolean;
  createdAt: string;
}

export interface RuntimeSecret {
  id: string;
  environmentId: string;
  secretName: string;
  encryptedValue: string;
  version: number;
  createdAt: string;
}

export interface RuntimeSnapshot {
  id: string;
  instanceId: string;
  snapshotName: string;
  sizeBytes: number;
  createdAt: string;
}

export interface RuntimeJob {
  id: string;
  environmentId: string;
  jobName: string;
  command: string;
  status: string;
  executedAt: string;
}

export interface RuntimeTemplate {
  id: string;
  templateName: string;
  description?: string;
  baseImage: string;
  createdAt: string;
}

export interface RuntimeScalingPolicy {
  id: string;
  deploymentId: string;
  minReplicas: number;
  maxReplicas: number;
  targetCpuPercent: number;
  createdAt: string;
}
