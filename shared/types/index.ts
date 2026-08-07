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
  type?: string;
  severity?: 'info' | 'warning' | 'error' | 'critical' | string;
  title?: string;
  details?: string;
  recommendation?: string;
  resolved?: boolean;
  executionId?: string;
  workflowId?: string;
  logLevel?: 'info' | 'warn' | 'error' | 'debug' | string;
  message?: string;
  metadata?: Record<string, any>;
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
  projectId?: string;
  filePath?: string;
  title?: string;
  issueTitle?: string;
  description?: string;
  severity?: 'Low' | 'Medium' | 'High' | 'Critical' | 'low' | 'medium' | 'high' | 'critical';
  status?: 'To Do' | 'In Progress' | 'In Review' | 'Done' | 'open' | 'resolved' | 'in_progress';
  suggestedFix?: string;
  detectedByAgentId?: string;
  createdAt?: string;
}

export interface CodeReview {
  id: string;
  projectId?: string;
  reviewerAgentId?: string;
  pullRequestTitle?: string;
  targetBranch?: string;
  qualityScore?: number;
  status?: 'Approved' | 'Changes Requested' | 'Pending' | 'approved' | 'changes_requested' | 'pending';
  comments?: string[];
  summary?: string;
  reviewedAt?: string;
  createdAt?: string;
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
  userId?: string;
  name?: string;
  datasetName?: string;
  category?: string;
  description?: string;
  fileFormat?: string;
  sizeMb?: number;
  datasetType?: string;
  numRows?: number;
  sizeBytes?: number;
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
  userId?: string;
  name?: string;
  experimentName?: string;
  objective?: string;
  status?: 'Completed' | 'Running' | string;
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
  deploymentId?: string;
  targetId?: string;
  imageTag?: string;
  status?: 'success' | 'failed' | 'rollback';
  eventType?: string;
  details?: Record<string, any> | string;
  deployedAt?: string;
  createdAt?: string;
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
  creatorId?: string;
  publisherId?: string;
  creatorName?: string;
  creatorUsername?: string;
  title: string;
  slug: string;
  type?: 'AGENT' | 'MODEL' | 'TEMPLATE' | 'WORKFLOW' | 'PROMPT_PACK';
  itemType?: 'agent' | 'plugin' | 'workflow' | 'dataset' | 'template' | 'extension';
  category?: string;
  shortDescription?: string;
  fullDescription?: string;
  price?: number;
  priceUsd?: number;
  pricingModel?: 'FREE' | 'ONE_TIME' | 'SUBSCRIPTION' | 'free' | 'freemium' | 'paid' | 'subscription';
  iconUrl?: string;
  bannerUrl?: string;
  version?: string;
  downloadCount?: number;
  downloadsCount?: number;
  ratingAvg?: number;
  ratingCount?: number;
  isPublished?: boolean;
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface MarketplaceVersion {
  id: string;
  itemId: string;
  version?: string;
  versionNumber?: string;
  changelog?: string;
  downloadUrl?: string;
  packageUrl?: string;
  fileSize?: number;
  checksum?: string;
  releasedAt?: string;
  createdAt?: string;
}

export interface MarketplaceReview {
  id: string;
  itemId: string;
  userId: string;
  userName?: string;
  rating: number;
  comment?: string;
  reviewText?: string;
  isApproved?: boolean;
  createdAt?: string;
}

export interface MarketplaceRating {
  id?: string;
  itemId: string;
  userId?: string;
  ratingAvg?: number;
  totalRatings?: number;
  ratingScore?: number;
  createdAt?: string;
}

export interface MarketplaceDownload {
  id: string;
  itemId: string;
  userId: string;
  version?: string;
  versionNumber?: string;
  ipAddress?: string;
  downloadedAt?: string;
}

export interface MarketplaceCollection {
  id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: string;
  coverUrl?: string;
  isFeatured?: boolean;
  itemsCount?: number;
  createdAt?: string;
}

export interface CreatorFollower {
  id: string;
  creatorId: string;
  followerUserId: string;
  createdAt: string;
}

export interface License {
  id: string;
  itemId?: string;
  productId?: string;
  userId?: string;
  licenseKey?: string;
  licenseType?: string;
  termsUrl?: string;
  maxActivations?: number;
  currentActivations?: number;
  status?: string;
  expiresAt?: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId?: string;
  tenantId?: string;
  itemId?: string;
  planId?: string;
  plan?: SubscriptionPlan;
  status: string;
  billingCycle?: string;
  amount?: number;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
  createdAt: string;
  updatedAt?: string;
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
  description?: string;
  price?: number;
  priceMonthly?: number;
  priceYearly?: number;
  currency?: string;
  billingCycle?: 'monthly' | 'yearly';
  tier?: 'free' | 'pro' | 'enterprise';
  features: string[];
  maxApiCalls?: number;
  maxStorageGb?: number;
  storageGb?: number;
  apiRequestsPerMonth?: number;
  maxMembers?: number;
  isActive: boolean;
  createdAt?: string;
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
  orderId?: string;
  tenantId?: string;
  tenantName?: string;
  invoiceNumber: string;
  userId?: string;
  amount?: number;
  amountDue?: number;
  amountPaid?: number;
  taxAmount?: number;
  status: string;
  pdfUrl?: string;
  dueDate?: string;
  paidAt?: string;
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
  connectionUrl?: string;
  schemaDefinition?: string;
  status: string;
  lastSyncedAt?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt?: string;
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
  sourceId?: string;
  targetId?: string;
  pipelineConfig?: any;
  stages?: any;
  status: string;
  scheduleCron?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt?: string;
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
  secretType?: string;
  encryptedValue?: string;
  encryptedPayload?: string;
  version: number;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
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

// ─── Phase 8C — AI Knowledge Cloud & Enterprise RAG Platform (Version 5.2) ───

export interface KnowledgeBase {
  id: string;
  tenantId?: string;
  name: string;
  description?: string;
  vectorDimension: number;
  embeddingModel: string;
  status: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface KnowledgeDocument {
  id: string;
  knowledgeBaseId: string;
  title: string;
  filePath?: string;
  fileType: string;
  fileSizeBytes: number;
  chunkCount: number;
  status: string;
  uploadedAt: string;
}

export interface DocumentChunk {
  id: string;
  documentId: string;
  chunkIndex: number;
  contentText: string;
  tokenCount: number;
  vectorId?: string;
  createdAt: string;
}

export interface EmbeddingVector {
  id: string;
  chunkId: string;
  vectorData: number[];
  dimensions: number;
  createdAt: string;
}

export interface VectorIndex {
  id: string;
  knowledgeBaseId: string;
  indexName: string;
  indexType: string;
  metric: string;
  vectorCount: number;
  status: string;
  createdAt: string;
}

export interface KnowledgeCollection {
  id: string;
  name: string;
  description?: string;
  documentCount: number;
  createdAt: string;
}

export interface KnowledgeConnector {
  id: string;
  name: string;
  connectorType: string;
  status: string;
  config?: any;
  lastSyncAt?: string;
  createdAt: string;
}

export interface ConnectorSyncJob {
  id: string;
  connectorId: string;
  documentsSynced: number;
  status: string;
  startedAt: string;
  completedAt?: string;
}

export interface SemanticSearchResult {
  chunkId: string;
  documentId: string;
  documentTitle: string;
  contentText: string;
  score: number;
}

export interface RAGSession {
  id: string;
  knowledgeBaseId: string;
  sessionName: string;
  modelName: string;
  status: string;
  createdAt: string;
}

export interface ConversationMemory {
  id: string;
  sessionId: string;
  memoryKey: string;
  memoryValue?: any;
  importanceScore: number;
  createdAt: string;
}

export interface MemorySnapshot {
  id: string;
  sessionId: string;
  snapshotName: string;
  stateJson?: any;
  createdAt: string;
}

export interface KnowledgeFeedback {
  id: string;
  conversationId: string;
  rating: number;
  comments?: string;
  createdAt: string;
}

export interface KnowledgeStatistic {
  id: string;
  knowledgeBaseId: string;
  totalDocuments: number;
  totalChunks: number;
  totalQueriesToday: number;
  avgSearchLatencyMs: number;
  timestamp: string;
}

// ─── Phase 8D — Autonomous AI Enterprise (Version 5.3) ───

export interface Department {
  id: string;
  tenantId?: string;
  name: string;
  code: string;
  headEmployeeId?: string;
  budgetAllocated: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface DigitalEmployee {
  id: string;
  departmentId: string;
  employeeName: string;
  roleTitle: string;
  aiModel: string;
  autonomyLevel: string;
  status: string;
  tasksCompleted: number;
  createdAt: string;
}

export interface EmployeeRole {
  id: string;
  roleName: string;
  description?: string;
  permissionsJson?: any;
  createdAt: string;
}

export interface EmployeeSkill {
  id: string;
  employeeId: string;
  skillName: string;
  proficiencyLevel: number;
  createdAt: string;
}

export interface BusinessProcess {
  id: string;
  tenantId?: string;
  processName: string;
  description?: string;
  ownerDepartmentId?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProcessInstance {
  id: string;
  processId: string;
  triggerSource: string;
  status: string;
  startedAt: string;
  completedAt?: string;
}

export interface ApprovalWorkflow {
  id: string;
  name: string;
  processId: string;
  stepCount: number;
  createdAt: string;
}

export interface ApprovalRequest {
  id: string;
  workflowId: string;
  requesterId: string;
  approverId: string;
  status: string;
  details?: string;
  requestedAt: string;
  resolvedAt?: string;
}

export interface DecisionRecord {
  id: string;
  processInstanceId: string;
  deciderId: string;
  decisionOutcome: string;
  confidenceScore: number;
  rationale?: string;
  decidedAt: string;
}

export interface EnterpriseTask {
  id: string;
  processInstanceId: string;
  assignedEmployeeId?: string;
  taskName: string;
  status: string;
  priority: number;
  createdAt: string;
}

export interface AutomationTemplate {
  id: string;
  name: string;
  category: string;
  configJson?: any;
  createdAt: string;
}

export interface BusinessRule {
  id: string;
  ruleName: string;
  conditionExpression: string;
  actionType: string;
  isEnabled: boolean;
  createdAt: string;
}

export interface RuleExecution {
  id: string;
  ruleId: string;
  result: string;
  executedAt: string;
}

export interface EnterpriseDashboard {
  id: string;
  tenantId?: string;
  title: string;
  layoutJson?: any;
  createdAt: string;
}

export interface OrganizationMetric {
  id: string;
  metricName: string;
  metricValue: number;
  departmentId?: string;
  timestamp: string;
}

// ─── Phase 8E — Autonomous AI Super Platform (Version 5.4) ───

export interface GlobalAINetwork {
  id: string;
  tenantId?: string;
  networkName: string;
  regionCode: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AICluster {
  id: string;
  networkId: string;
  clusterName: string;
  nodeCount: number;
  region: string;
  status: string;
  createdAt: string;
}

export interface ClusterAgent {
  id: string;
  clusterId: string;
  agentId: string;
  nodeId?: string;
  status: string;
  createdAt: string;
}

export interface ReasoningSession {
  id: string;
  sessionTitle: string;
  goalDefinition: string;
  strategy: string;
  status: string;
  startedAt: string;
  completedAt?: string;
}

export interface ReasoningStep {
  id: string;
  sessionId: string;
  stepNumber: number;
  thoughtProcess: string;
  actionChosen?: string;
  confidence: number;
  createdAt: string;
}

export interface ReasoningResult {
  id: string;
  sessionId: string;
  finalSolution: string;
  score: number;
  createdAt: string;
}

export interface GovernancePolicy {
  id: string;
  policyName: string;
  category: string;
  enforcementLevel: string;
  isEnabled: boolean;
  createdAt: string;
}

export interface PolicyAudit {
  id: string;
  policyId: string;
  evaluationResult: string;
  auditedAt: string;
}

export interface PlatformObservability {
  id: string;
  serviceName: string;
  traceId?: string;
  latencyMs: number;
  logLevel: string;
  message: string;
  timestamp: string;
}

export interface ResourceAllocation {
  id: string;
  tenantId?: string;
  clusterId?: string;
  cpuUnits?: number;
  memoryGb?: number;
  gpuUnits?: number;
  resourceType?: 'compute' | 'gpu' | 'storage' | 'network';
  allocatedUnits?: number;
  unitName?: string;
  allocatedAt?: string;
  timestamp?: string;
}

export interface ExecutionStrategy {
  id: string;
  name: string;
  description?: string;
  isDefault: boolean;
  createdAt: string;
}

export interface DistributedJob {
  id: string;
  jobTitle: string;
  nodesAllocated: number;
  status: string;
  createdAt: string;
}

export interface OptimizationProfile {
  id: string;
  profileName: string;
  targetLatencyMs: number;
  cpuSaver: boolean;
  createdAt: string;
}

export interface SystemRecommendation {
  id: string;
  title: string;
  recommendation: string;
  impactScore: number;
  createdAt: string;
}

export interface PlatformHealthSnapshot {
  id: string;
  healthScore: number;
  activeNodes: number;
  timestamp: string;
}

export interface EnterpriseComplianceRecord {
  id: string;
  framework: string;
  status: string;
  timestamp: string;
}

export interface ReleaseInformation {
  id: string;
  versionNumber: string;
  releaseName: string;
  isLts: boolean;
  releasedAt: string;
}

/**
 * Phase 9A — AI Native Application Platform & Universal AI Gateway Types
 */
export interface AIProvider {
  id: string;
  name: string;
  slug: string;
  providerType: 'openai' | 'anthropic' | 'gemini' | 'xai' | 'mistral' | 'groq' | 'ollama' | 'azure' | 'bedrock' | 'huggingface' | 'together' | 'openrouter' | 'custom';
  apiBaseUrl?: string;
  isActive: boolean;
  healthStatus: 'healthy' | 'degraded' | 'offline';
  config?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface ProviderModel {
  id: string;
  providerId: string;
  modelName: string;
  modelKey: string;
  contextWindow: number;
  maxOutputTokens: number;
  inputCostPer1k: number;
  outputCostPer1k: number;
  supportsVision: boolean;
  supportsAudio: boolean;
  supportsFunctionCalling: boolean;
  supportsStreaming: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProviderCredential {
  id: string;
  providerId: string;
  keyName: string;
  apiKeyEncrypted: string;
  environment: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ModelCapability {
  id: string;
  modelId: string;
  capabilityName: string;
  score: number;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface ChatSession {
  id: string;
  userId: string;
  title: string;
  providerId: string;
  modelKey: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  tokensUsed?: number;
  cost?: number;
  latencyMs?: number;
  multimodalAssets?: string[];
  createdAt: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  slug: string;
  description?: string;
  category?: string;
  tags?: string[];
  isPublic: boolean;
  authorId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PromptVersion {
  id: string;
  templateId: string;
  versionNumber: number;
  templateContent: string;
  variables?: string[];
  commitMessage?: string;
  createdAt: string;
}

export interface ModelUsage {
  id: string;
  userId?: string;
  providerId: string;
  modelKey: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCost: number;
  requestDurationMs: number;
  statusCode: number;
  createdAt: string;
}

export interface TokenUsage {
  id: string;
  userId: string;
  providerId: string;
  periodStart: string;
  periodEnd: string;
  totalTokens: number;
  totalCost: number;
  requestCount: number;
  updatedAt: string;
}

export interface ProviderHealth {
  id: string;
  providerId: string;
  status: 'healthy' | 'degraded' | 'offline';
  latencyMs: number;
  errorRate: number;
  lastCheckedAt: string;
  details?: Record<string, any>;
}

export interface FallbackPolicy {
  id: string;
  primaryProviderId: string;
  fallbackProviderId: string;
  priority: number;
  conditionRules?: Record<string, any>;
  isEnabled: boolean;
  createdAt: string;
}

export interface BenchmarkResult {
  id: string;
  modelKey: string;
  benchmarkName: string;
  score: number;
  evaluatedAt: string;
  metadata?: Record<string, any>;
}

export interface MultimodalRequest {
  id: string;
  userId?: string;
  requestType: 'vision' | 'audio' | 'document' | 'synthesis';
  providerId: string;
  modelKey: string;
  inputPayload: string;
  outputPayload?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
}

export interface ImageGeneration {
  id: string;
  userId?: string;
  providerId: string;
  prompt: string;
  imageUrl: string;
  resolution?: string;
  style?: string;
  cost?: number;
  createdAt: string;
}

export interface SpeechRequest {
  id: string;
  userId?: string;
  providerId: string;
  type: 'tts' | 'stt';
  inputTextOrAudio: string;
  outputUrl?: string;
  durationSec?: number;
  createdAt: string;
}

export interface TranslationRequest {
  id: string;
  userId?: string;
  providerId: string;
  sourceLang?: string;
  targetLang: string;
  inputText: string;
  translatedText: string;
  createdAt: string;
}

/**
 * Phase 9B — AI Application Builder, Low-Code Studio & Intelligent App Composer Types
 */
export interface AIApplication {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  description?: string;
  category?: string;
  iconUrl?: string;
  status: 'draft' | 'published' | 'archived';
  environment: 'development' | 'staging' | 'production';
  version: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationVersion {
  id: string;
  applicationId: string;
  versionNumber: string;
  changelog?: string;
  snapshotPayload: string;
  createdBy?: string;
  createdAt: string;
}

export interface ApplicationTemplate {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category?: string;
  thumbnailUrl?: string;
  templatePayload: string;
  isFeatured: boolean;
  usageCount: number;
  createdAt: string;
}

export interface ApplicationComponent {
  id: string;
  applicationId: string;
  pageId?: string;
  componentType: string;
  name: string;
  props?: Record<string, any>;
  layoutPosition?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationPage {
  id: string;
  applicationId: string;
  title: string;
  slug: string;
  isHome: boolean;
  layoutConfig?: Record<string, any>;
  createdAt: string;
}

export interface ApplicationWorkflow {
  id: string;
  applicationId: string;
  name: string;
  triggerType: string;
  workflowNodes?: any[];
  workflowEdges?: any[];
  isActive: boolean;
  createdAt: string;
}

export interface ApplicationVariable {
  id: string;
  applicationId: string;
  variableKey: string;
  variableValue?: string;
  isSecret: boolean;
  createdAt: string;
}

export interface ApplicationSetting {
  id: string;
  applicationId: string;
  themeMode: 'dark' | 'light' | 'system';
  customCss?: string;
  modelOverride?: string;
  rateLimitRpm: number;
  updatedAt: string;
}

export interface ApplicationPermission {
  id: string;
  applicationId: string;
  role: string;
  canEdit: boolean;
  canDeploy: boolean;
  createdAt: string;
}

export interface ApplicationCollaborator {
  id: string;
  applicationId: string;
  userId: string;
  role: string;
  addedAt: string;
}

export interface ApplicationAsset {
  id: string;
  applicationId: string;
  assetName: string;
  assetUrl: string;
  fileSize: number;
  mimeType?: string;
  createdAt: string;
}

export interface ApplicationBuild {
  id: string;
  applicationId: string;
  buildNumber: number;
  status: 'pending' | 'building' | 'success' | 'failed';
  logs?: string;
  durationSec: number;
  createdAt: string;
}

export interface ApplicationDeployment {
  id: string;
  applicationId: string;
  buildId: string;
  environment: 'development' | 'staging' | 'production';
  deploymentUrl?: string;
  status: 'active' | 'rollback' | 'deprecated';
  deployedAt: string;
}

export interface ApplicationEnvironment {
  id: string;
  applicationId: string;
  environmentName: string;
  baseUrl?: string;
  variablesConfig?: Record<string, any>;
  updatedAt: string;
}

export interface ApplicationTest {
  id: string;
  applicationId: string;
  testName: string;
  suiteType: string;
  status: 'passed' | 'failed' | 'running';
  results?: Record<string, any>;
  executedAt: string;
}

export interface ApplicationRelease {
  id: string;
  applicationId: string;
  releaseTag: string;
  title: string;
  description?: string;
  isLatest: boolean;
  releasedAt: string;
}

export interface ApplicationSnapshot {
  id: string;
  applicationId: string;
  snapshotName: string;
  dataPayload: string;
  createdAt: string;
}

export interface ComponentLibraryItem {
  id: string;
  name: string;
  componentType: string;
  category: string;
  iconName: string;
  defaultProps?: Record<string, any>;
  isPublished: boolean;
  createdAt: string;
}

export interface VisualEditorSession {
  id: string;
  applicationId: string;
  userId: string;
  lastCursorPosition?: string;
  activePageId?: string;
  updatedAt: string;
}

/**
 * Phase 9C — AI Marketplace, Agent Ecosystem & Enterprise Extension Platform Types
 */
export interface MarketplaceCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  iconName?: string;
  createdAt: string;
}

export interface MarketplacePurchase {
  id: string;
  itemId: string;
  userId: string;
  amountPaid: number;
  currency: string;
  paymentStatus: string;
  licenseKey?: string;
  purchasedAt: string;
}

export interface MarketplaceSubscription {
  id: string;
  itemId: string;
  userId: string;
  planTier: string;
  status: string;
  renewsAt?: string;
  createdAt: string;
}

export interface MarketplacePublisher {
  id: string;
  userId: string;
  publisherName: string;
  publisherSlug: string;
  websiteUrl?: string;
  supportEmail?: string;
  bio?: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  revenueSharePct: number;
  createdAt: string;
  updatedAt: string;
}

export interface PublisherVerification {
  id: string;
  publisherId: string;
  taxId?: string;
  identityVerified: boolean;
  domainVerified: boolean;
  verifiedAt: string;
}

export interface MarketplaceAsset {
  id: string;
  itemId: string;
  assetName: string;
  assetUrl: string;
  assetType: string;
  createdAt: string;
}

export interface MarketplaceLicense {
  id: string;
  itemId: string;
  userId: string;
  licenseKey: string;
  licenseType: 'standard' | 'premium' | 'enterprise';
  maxActivations: number;
  activationCount: number;
  isActive: boolean;
  createdAt: string;
}

export interface Plugin {
  id: string;
  name: string;
  pluginKey: string;
  description?: string;
  version: string;
  entrypointFile: string;
  isOfficial: boolean;
  createdAt: string;
}

export interface PluginInstallation {
  id: string;
  pluginId: string;
  userId: string;
  status: 'active' | 'disabled' | 'pending';
  installedVersion: string;
  installedAt: string;
}

export interface PluginPermission {
  id: string;
  pluginId: string;
  permissionName: string;
}

export interface PluginUpdate {
  id: string;
  pluginId: string;
  targetVersion: string;
  updateNotes?: string;
  releasedAt: string;
}

export interface ExtensionPackage {
  id: string;
  name: string;
  packageId: string;
  sdkVersion: string;
  author?: string;
  manifestJson?: Record<string, any>;
  isVerified: boolean;
  createdAt: string;
}

export interface ExtensionDependency {
  id: string;
  extensionId: string;
  dependencyName: string;
  minVersion?: string;
}

export interface MarketplaceStatistic {
  id: string;
  periodDate: string;
  totalDownloads: number;
  totalRevenueUsd: number;
  activePublishers: number;
  updatedAt: string;
}

/**
 * Phase 9D — Autonomous AI Software Engineering Platform & SDLC Types
 */
export interface SoftwareProject {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  description?: string;
  techStack: string;
  architecturePattern: string;
  status: 'active' | 'archived' | 'generating';
  createdAt: string;
  updatedAt: string;
}

export interface ProjectRepository {
  id: string;
  projectId: string;
  repoName: string;
  defaultBranch: string;
  isPrivate: boolean;
  createdAt: string;
}

export interface RepositoryBranch {
  id: string;
  repoId: string;
  branchName: string;
  headCommitHash?: string;
  isProtected: boolean;
  createdAt: string;
}

export interface RepositoryCommit {
  id: string;
  repoId: string;
  commitHash: string;
  authorName: string;
  commitMessage: string;
  committedAt: string;
}

export interface SourceFile {
  id: string;
  projectId: string;
  filePath: string;
  language: string;
  content?: string;
  lineCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CodeGeneration {
  id: string;
  projectId: string;
  prompt: string;
  generatedCode?: string;
  targetFilePath?: string;
  status: string;
  generatedAt: string;
}

export interface PullRequest {
  id: string;
  repoId: string;
  prNumber: number;
  title: string;
  sourceBranch: string;
  targetBranch: string;
  status: 'open' | 'merged' | 'closed';
  authorId: string;
  createdAt: string;
}

export interface CodeQualityReport {
  id: string;
  projectId: string;
  maintainabilityIndex: number;
  cognitiveComplexity: number;
  duplicateCodePct: number;
  createdAt: string;
}

export interface SecurityScan {
  id: string;
  projectId?: string;
  scanType?: 'sast' | 'dast' | 'container' | 'secret';
  vulnerabilitiesFound: number;
  severityBreakdown?: Record<string, number>;
  status: 'passed' | 'failed' | 'warning' | 'completed' | 'running';
  scannedAt?: string;
  ranAt?: string;
}

export interface DependencyGraph {
  id: string;
  projectId: string;
  graphJson: Record<string, any>;
  updatedAt: string;
}

export interface ArchitectureDesign {
  id: string;
  projectId: string;
  patternType: string;
  diagramMermaid?: string;
  componentsJson?: any[];
  createdAt: string;
}

export interface DatabaseDesign {
  id: string;
  projectId: string;
  schemaSql?: string;
  erDiagram?: string;
  tablesCount: number;
  updatedAt: string;
}

export interface ApiSpecification {
  id: string;
  projectId: string;
  openapiSpec?: string;
  endpointsCount: number;
  updatedAt: string;
}

export interface TestSuite {
  id: string;
  projectId: string;
  suiteName: string;
  suiteType: 'unit' | 'integration' | 'e2e' | 'security';
  createdAt: string;
}

export interface TestCase {
  id: string;
  suiteId: string;
  testName: string;
  assertionCode?: string;
  isPassing: boolean;
}

export interface DocumentationProject {
  id: string;
  projectId: string;
  readmeMd?: string;
  apiDocsMd?: string;
  architectureDocsMd?: string;
  updatedAt: string;
}

export interface ReleasePipeline {
  id: string;
  projectId: string;
  pipelineName: string;
  status: 'success' | 'failed' | 'running';
  createdAt: string;
}

export interface EngineeringMetric {
  id: string;
  projectId: string;
  codeCoveragePct: number;
  technicalDebtHours: number;
  velocityScore: number;
  updatedAt: string;
}

/**
 * Phase 9E — NexoApps AI Operating System (AI OS) Version 7.0 Types
 */
export interface Workspace {
  id: string;
  ownerId: string;
  workspaceName: string;
  slug: string;
  isActive: boolean;
  theme?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceModule {
  id: string;
  moduleKey: string;
  displayName: string;
  category: string;
  version: string;
  isEnabled: boolean;
  icon: string;
  routePath: string;
}

export interface GlobalSearchResult {
  id: string;
  entityId: string;
  entityType: string;
  title: string;
  description?: string;
  targetUrl: string;
  keywords?: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  category: 'system' | 'alert' | 'activity' | 'ai';
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  userId?: string;
  actorName: string;
  actionTitle: string;
  moduleKey: string;
  details?: string;
  createdAt: string;
}

export interface FeatureFlag {
  id: string;
  flagKey: string;
  description?: string;
  isEnabled: boolean;
  rolloutPercentage: number;
  updatedAt: string;
}

export interface PlatformSetting {
  id: string;
  settingKey: string;
  settingValue: string;
  category: string;
  updatedAt: string;
}

export interface ModuleHealth {
  id: string;
  moduleKey: string;
  status: 'healthy' | 'degraded' | 'down';
  uptimePct: number;
  latencyMs: number;
  lastChecked: string;
}

export interface Recommendation {
  id: string;
  targetUserId?: string;
  recommendationType: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionUrl?: string;
  createdAt: string;
}

export interface SystemVersion {
  id: string;
  versionTag: string;
  releaseName: string;
  changelog?: string;
  deployedAt: string;
}

// =====================================================
// Phase 10A — AI Commerce & Marketplace Types (Version 7.1)
// =====================================================

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  createdAt: string;
}

export interface ProductPricing {
  id: string;
  productId: string;
  pricingModel: 'one_time' | 'recurring' | 'usage_based' | 'free';
  price: number;
  currency: string;
  billingInterval?: 'monthly' | 'yearly';
  usageUnit?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  sellerId: string;
  title: string;
  slug: string;
  description?: string;
  categoryId?: string;
  productType: 'digital_app' | 'ai_model' | 'api_subscription' | 'dataset' | 'license';
  status: 'draft' | 'published' | 'archived';
  iconUrl?: string;
  bannerUrl?: string;
  downloadUrl?: string;
  features?: string[];
  pricing?: ProductPricing[];
  rating: number;
  totalReviews: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionHistory {
  id: string;
  subscriptionId: string;
  action: 'created' | 'upgraded' | 'downgraded' | 'canceled' | 'renewed';
  oldPlanId?: string;
  newPlanId?: string;
  timestamp: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productTitle?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: 'pending' | 'completed' | 'refunded' | 'failed';
  totalAmount: number;
  currency: string;
  taxAmount: number;
  discountAmount: number;
  couponCode?: string;
  items?: OrderItem[];
  createdAt: string;
}

export interface PaymentGateway {
  id: string;
  gatewayName: string;
  isEnabled: boolean;
  config: Record<string, any>;
  createdAt: string;
}

export interface Payment {
  id: string;
  orderId: string;
  gatewayId?: string;
  paymentMethod: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed' | 'refunded';
  transactionRef?: string;
  createdAt: string;
}

export interface PaymentTransaction {
  id: string;
  paymentId: string;
  eventType: string;
  rawPayload: Record<string, any>;
  createdAt: string;
}

export interface LicenseKey {
  id: string;
  licenseId: string;
  activationCode: string;
  deviceId?: string;
  activatedAt?: string;
}

export interface InvoiceTemplate {
  id: string;
  name: string;
  companyDetails: Record<string, any>;
  footerText?: string;
  isDefault: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxUses: number;
  usedCount: number;
  expiresAt?: string;
  isActive: boolean;
  createdAt: string;
}

export interface DiscountCampaign {
  id: string;
  title: string;
  bannerMessage?: string;
  discountPercentage: number;
  startsAt: string;
  endsAt: string;
  isActive: boolean;
}

export interface ShoppingCart {
  id: string;
  userId: string;
  productId: string;
  product?: Product;
  quantity: number;
  createdAt: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  product?: Product;
  createdAt: string;
}

export interface AffiliateProgram {
  id: string;
  name: string;
  commissionRate: number;
  cookieDays: number;
  isActive: boolean;
}

export interface AffiliateCommission {
  id: string;
  affiliateUserId: string;
  orderId: string;
  commissionAmount: number;
  status: 'pending' | 'approved' | 'paid';
  createdAt: string;
}

export interface SellerAccount {
  id: string;
  userId: string;
  storeName: string;
  storeSlug: string;
  bio?: string;
  payoutDetails?: Record<string, any>;
  status: 'pending' | 'approved' | 'suspended';
  rating: number;
  createdAt: string;
}

export interface SellerPayout {
  id: string;
  sellerId: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed';
  payoutMethod: string;
  processedAt: string;
}

// =====================================================
// Phase 10B — AI Cloud Infrastructure Platform Types (Version 7.2)
// =====================================================

export interface CloudTenant {
  id: string;
  name: string;
  slug: string;
  tier: 'starter' | 'pro' | 'enterprise';
  status: 'active' | 'suspended' | 'provisioning';
  maxVcpus: number;
  maxRamGb: number;
  maxStorageTb: number;
  createdAt: string;
  updatedAt: string;
}

export interface TenantUser {
  id: string;
  tenantId: string;
  userId: string;
  role: 'owner' | 'admin' | 'engineer' | 'viewer';
  createdAt: string;
}

export interface TenantSetting {
  id: string;
  tenantId: string;
  settingKey: string;
  settingValue?: string;
  updatedAt: string;
}

export interface TenantBilling {
  id: string;
  tenantId: string;
  billingAccountId: string;
  monthlyBudget: number;
  currentSpend: number;
  currency: string;
  updatedAt: string;
}

export interface CloudRegion {
  id: string;
  name: string;
  code: string;
  location: string;
  isActive: boolean;
  createdAt: string;
}

export interface AvailabilityZone {
  id: string;
  regionId: string;
  zoneCode: string;
  status: 'available' | 'maintenance' | 'degraded';
}

export interface VirtualNetwork {
  id: string;
  tenantId: string;
  regionId: string;
  name: string;
  cidrBlock: string;
  status: 'active' | 'updating' | 'deleted';
  createdAt: string;
}

export interface Subnet {
  id: string;
  vnetId: string;
  zoneId: string;
  name: string;
  cidrBlock: string;
  isPublic: boolean;
}

export interface FirewallRule {
  id: string;
  vnetId: string;
  ruleName: string;
  direction: 'inbound' | 'outbound';
  protocol: 'tcp' | 'udp' | 'icmp' | 'all';
  portRange: string;
  sourceCidr: string;
  action: 'allow' | 'deny';
}

export interface LoadBalancer {
  id: string;
  tenantId: string;
  vnetId: string;
  name: string;
  type: 'application' | 'network';
  dnsName: string;
  status: 'active' | 'provisioning';
  createdAt: string;
}

export interface ComputeCluster {
  id: string;
  tenantId: string;
  regionId: string;
  clusterName: string;
  clusterType: 'kubernetes' | 'slurm' | 'ray_ai';
  nodeCount: number;
  gpuCount: number;
  status: 'ready' | 'scaling' | 'degraded';
  createdAt: string;
}

export interface VirtualMachine {
  id: string;
  tenantId: string;
  clusterId?: string;
  subnetId: string;
  name: string;
  instanceType: string;
  vcpus: number;
  ramGb: number;
  gpus: number;
  osImage: string;
  privateIp?: string;
  publicIp?: string;
  status: 'running' | 'stopped' | 'terminated';
  createdAt: string;
}

export interface StorageVolume {
  id: string;
  tenantId: string;
  vmId?: string;
  name: string;
  sizeGb: number;
  volumeType: 'nvme_ssd' | 'block_hdd' | 'high_iops';
  status: 'attached' | 'detached';
  createdAt: string;
}

export interface StorageBucket {
  id: string;
  tenantId: string;
  regionId: string;
  bucketName: string;
  accessLevel: 'private' | 'public_read';
  storageClass: 'standard' | 'glacier' | 'warm';
  createdAt: string;
}

export interface ObjectStorage {
  id: string;
  bucketId: string;
  objectKey: string;
  sizeBytes: number;
  contentType: string;
  uploadedAt: string;
}

export interface ResourceGroup {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  createdAt: string;
}

export interface InfrastructureTemplate {
  id: string;
  name?: string;
  templateName?: string;
  provider?: string;
  templateType?: 'terraform' | 'cloudformation' | 'pulumi' | string;
  iacType?: string;
  content?: string;
  templateBody?: string;
  version?: string;
  createdAt: string;
}

export interface CloudService {
  id: string;
  serviceName: string;
  serviceType: string;
  status: 'operational' | 'degraded' | 'maintenance';
  updatedAt: string;
}

export interface InfrastructureEvent {
  id: string;
  tenantId?: string;
  eventType: string;
  severity: 'info' | 'warning' | 'critical';
  message: string;
  createdAt: string;
}

export interface AnalyticsReport {
  id: string;
  title: string;
  chartType: string;
  dataPayload: Record<string, any>;
  createdAt: string;
}

export interface StreamingTopic {
  id: string;
  topicName: string;
  partitions: number;
  replicationFactor: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface PredictiveModel {
  id: string;
  modelName: string;
  targetColumn: string;
  accuracyPct: number;
  status: 'deployed' | 'training' | 'archived';
  trainedAt: string;
}

export interface DataConnection {
  id: string;
  sourceId: string;
  connectionName: string;
  authType: 'basic' | 'oauth' | 'apiKey' | 'iam';
  config: Record<string, any>;
  createdAt: string;
}

export interface PipelineRun {
  id: string;
  pipelineId: string;
  runNumber?: number;
  status: 'running' | 'completed' | 'failed' | 'success' | 'cancelled';
  recordsProcessed?: number;
  durationMs?: number;
  startedAt: string;
  finishedAt?: string;
  completedAt?: string;
}

export interface PipelineSchedule {
  id: string;
  pipelineId: string;
  cronExpression: string;
  isActive: boolean;
}

export interface DataLakehouse {
  id: string;
  name: string;
  storageLocation: string;
  format: 'iceberg' | 'delta' | 'hudi';
  totalSizeGb: number;
  createdAt: string;
}

export interface DataCatalog {
  id: string;
  lakehouseId: string;
  tableName: string;
  schemaDefinition: string;
  recordCount: number;
  updatedAt: string;
}

export interface DataAsset {
  id: string;
  catalogId: string;
  assetName: string;
  assetType: 'table' | 'view' | 'stream';
  owner: string;
  createdAt: string;
}

export interface MetadataRegistry {
  id: string;
  assetId: string;
  metaKey: string;
  metaValue: string;
}

export interface DataLineage {
  id: string;
  sourceAssetId: string;
  targetAssetId: string;
  transformationLogic?: string;
  createdAt: string;
}

export interface DatasetVersion {
  id: string;
  assetId: string;
  versionTag: string;
  snapshotUrl: string;
  createdAt: string;
}

export interface DataQualityRule {
  id: string;
  assetId: string;
  ruleType: string;
  columnName: string;
  threshold: number;
  isActive: boolean;
}

export interface DataQualityReport {
  id: string;
  ruleId: string;
  passed: boolean;
  score: number;
  executedAt: string;
}

export interface MasterData {
  id: string;
  entityType: string;
  primaryKey: string;
  attributes: Record<string, any>;
  updatedAt: string;
}

export interface GovernancePolicy {
  id: string;
  policyName: string;
  riskLevel: 'low' | 'medium' | 'high';
  accessRole: string;
  retentionDays: number;
  isEnforced: boolean;
}

export interface AnalyticsModel {
  id: string;
  modelName: string;
  queryDefinition: string;
  refreshInterval: string;
  createdAt: string;
}

// =====================================================
// Phase 10D — AI Security Platform & Zero Trust Types (Version 7.4)
// =====================================================

export interface IdentityProvider {
  id: string;
  name: string;
  providerType: 'saml' | 'oidc' | 'oauth2' | 'active_directory';
  clientId: string;
  issuerUrl: string;
  isEnabled: boolean;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  tenantId: string;
  securityTier: string;
  createdAt: string;
}

export interface OrganizationMember {
  id: string;
  orgId: string;
  userId: string;
  roleId: string;
  status: 'active' | 'suspended';
  joinedAt: string;
}

export interface Role {
  id: string;
  roleName: string;
  description?: string;
  isSystemRole: boolean;
  createdAt: string;
}

export interface Permission {
  id: string;
  permissionKey: string;
  resourceType: string;
  action: string;
}

export interface AccessPolicy {
  id: string;
  policyName: string;
  policyType: 'rbac' | 'abac' | 'zero_trust';
  conditions: Record<string, any>;
  isActive: boolean;
}

export interface UserSession {
  id: string;
  userId: string;
  deviceId?: string;
  ipAddress: string;
  userAgent?: string;
  isMfaVerified: boolean;
  expiresAt: string;
  createdAt: string;
}

export interface ApiKey {
  id: string;
  userId: string;
  keyName: string;
  keyHash: string;
  permissions: string[];
  lastUsedAt?: string;
  expiresAt?: string;
  createdAt: string;
}

export interface ServiceAccount {
  id: string;
  accountName: string;
  roleId: string;
  isActive: boolean;
  createdAt: string;
}

export interface SecretVersion {
  id: string;
  secretId: string;
  version: number;
  encryptedPayload: string;
  createdAt: string;
}

export interface SecurityPolicy {
  id: string;
  policyName: string;
  category: 'network' | 'identity' | 'data' | 'endpoint';
  enforcementLevel: 'strict' | 'audit' | 'disabled';
  createdAt: string;
}

export interface SecurityIncident {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved';
  detectedAt: string;
}

export interface ThreatIntel {
  id: string;
  indicator: string;
  threatType: string;
  riskScore: number;
  detectedAt: string;
}

export interface VulnerabilityReport {
  id: string;
  cveId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedComponent: string;
  remediationStatus: 'open' | 'patched' | 'ignored';
  discoveredAt: string;
}

export interface TrustedDevice {
  id: string;
  userId: string;
  deviceId: string;
  trustedUntil: string;
}

export interface MFADevice {
  id: string;
  userId: string;
  mfaType: 'totp' | 'fido2' | 'sms';
  secretKey: string;
  isVerified: boolean;
}

export interface ComplianceFramework {
  id: string;
  frameworkName: string;
  version: string;
  passingPct: number;
}

export interface ComplianceAssessment {
  id: string;
  frameworkId: string;
  scorePct: number;
  assessedAt: string;
}

// =====================================================
// Phase 10E — AI Hyper Platform & Version 8.0 Release Types
// =====================================================

export interface PlatformRegistry {
  id: string;
  platformName: string;
  version: string;
  environment: string;
  isLtsReady: boolean;
  createdAt: string;
}

export interface PlatformModule {
  id: string;
  moduleKey: string;
  moduleName: string;
  version: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface ModuleDependency {
  id: string;
  moduleId: string;
  dependsOnModuleId: string;
  minVersion: string;
}

export interface PlatformIntegration {
  id: string;
  integrationName: string;
  integrationType: string;
  status: 'connected' | 'error';
  config: Record<string, any>;
  createdAt: string;
}

export interface PlatformWorkflow {
  id: string;
  workflowName: string;
  stepCount: number;
  status: 'active' | 'paused';
  createdAt: string;
}

export interface GlobalConfiguration {
  id: string;
  configKey: string;
  configValue: string;
  category: string;
  updatedAt: string;
}

export interface WorkspaceSession {
  id: string;
  workspaceId: string;
  userId: string;
  activeTab: string;
  lastActivity: string;
}

export interface WorkspacePreference {
  id: string;
  workspaceId: string;
  theme: string;
  layout: string;
}

export interface WorkspaceLayout {
  id: string;
  workspaceId: string;
  layoutJson: Record<string, any>;
}

export interface PlatformNotification {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  isRead: boolean;
  createdAt: string;
}

export interface SystemHealth {
  id: string;
  subsystem: string;
  status: 'healthy' | 'degraded' | 'error';
  cpuPercent: number;
  memoryPercent: number;
  checkedAt: string;
}

export interface SystemMetric {
  id: string;
  metricKey: string;
  metricValue: number;
  recordedAt: string;
}

export interface PlatformTelemetry {
  id: string;
  eventType: string;
  details: Record<string, any>;
  createdAt: string;
}

export interface ReleaseHistory {
  id: string;
  releaseVersion: string;
  releaseName: string;
  notes?: string;
  deployedAt: string;
}

export interface PlatformBackup {
  id: string;
  backupName: string;
  sizeBytes: number;
  storageUrl: string;
  status: 'completed' | 'failed' | 'in_progress';
  createdAt: string;
}

export interface RestorePoint {
  id: string;
  backupId: string;
  restorePointName: string;
  createdAt: string;
}

export interface MaintenanceWindow {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'active' | 'completed';
}

export interface FeatureRollout {
  id: string;
  featureKey: string;
  rolloutPct: number;
  isEnabled: boolean;
}

export interface EnterpriseSupport {
  id: string;
  ticketId?: string;
  ticketNumber?: string;
  subject: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  severity?: 'low' | 'normal' | 'high' | 'critical' | string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
}

export interface PlatformAuditLog {
  id: string;
  action: string;
  actor: string;
  createdAt: string;
}

// =====================================================
// Phase 11A — AI Developer Cloud Platform Types (Version 8.1)
// =====================================================

export interface DeveloperOrganization {
  id: string;
  orgName: string;
  slug: string;
  billingPlan: string;
  createdAt: string;
}

export interface DeveloperTeam {
  id: string;
  orgId: string;
  teamName: string;
  slug: string;
  createdAt: string;
}

export interface Repository {
  id: string;
  orgId: string;
  repoName: string;
  slug: string;
  defaultBranch: string;
  isPrivate: boolean;
  createdAt: string;
}

export interface RepositoryMember {
  id: string;
  repoId: string;
  userId: string;
  role: 'owner' | 'maintainer' | 'developer' | 'reporter';
  addedAt: string;
}

export interface RepositoryPermission {
  id: string;
  repoId: string;
  role: string;
  canPush: boolean;
  canMerge: boolean;
  canAdmin: boolean;
}

export interface Branch {
  id: string;
  repoId: string;
  branchName: string;
  headCommitHash?: string;
  isProtected: boolean;
  createdAt: string;
}

export interface Commit {
  id: string;
  repoId: string;
  commitHash: string;
  authorName: string;
  commitMessage: string;
  committedAt: string;
}

export interface MergeRequest {
  id: string;
  repoId: string;
  mrNumber: number;
  title: string;
  sourceBranch: string;
  targetBranch: string;
  status: 'open' | 'merged' | 'closed';
  authorId: string;
  createdAt: string;
}

export interface PipelineDefinition {
  id: string;
  repoId: string;
  pipelineName: string;
  configYaml: string;
  isActive: boolean;
  createdAt: string;
}



export interface PipelineJob {
  id: string;
  runId: string;
  jobName: string;
  status: 'pending' | 'running' | 'success' | 'failed';
  logs?: string;
  startedAt?: string;
  finishedAt?: string;
}

export interface BuildRunner {
  id: string;
  runnerName: string;
  runnerType: string;
  status: 'online' | 'offline' | 'busy';
  maxJobs: number;
  createdAt: string;
}

export interface Artifact {
  id: string;
  runId: string;
  artifactName: string;
  fileSize: number;
  downloadUrl: string;
  createdAt: string;
}

export interface ArtifactRegistry {
  id: string;
  orgId: string;
  packageName: string;
  packageType: string;
  version: string;
  createdAt: string;
}

export interface ContainerRegistry {
  id: string;
  orgId: string;
  registryName: string;
  registryUrl: string;
  createdAt: string;
}

export interface ContainerImage {
  id: string;
  registryId: string;
  imageName: string;
  tag: string;
  sizeBytes: number;
  pushedAt: string;
}

export interface DeploymentEnvironment {
  id: string;
  orgId: string;
  envName: string;
  envType: 'development' | 'staging' | 'production';
  createdAt: string;
}

export interface DeploymentTarget {
  id: string;
  envId: string;
  targetName: string;
  targetType: string;
  createdAt: string;
}

// =====================================================
// Phase 11B — AI ModelOps Platform Types (Version 8.2)
// =====================================================



export interface DatasetVersion {
  id: string;
  datasetId: string;
  versionTag: string;
  storageUrl: string;
  createdAt: string;
}

export interface DatasetAnnotation {
  id: string;
  versionId: string;
  annotationLabel: string;
  confidence: number;
  createdAt: string;
}

export interface FeatureStore {
  id: string;
  storeName: string;
  onlineEngine: string;
  offlineEngine: string;
  createdAt: string;
}

export interface FeatureGroup {
  id: string;
  storeId: string;
  groupName: string;
  entityKey: string;
  createdAt: string;
}

export interface TrainingJob {
  id: string;
  jobName: string;
  framework: string;
  datasetVersionId: string;
  status: 'created' | 'running' | 'completed' | 'failed';
  createdAt: string;
}

export interface TrainingRun {
  id: string;
  jobId: string;
  runNumber: number;
  status: 'running' | 'completed' | 'failed';
  startedAt: string;
  finishedAt?: string;
}

export interface TrainingMetric {
  id: string;
  runId: string;
  epoch: number;
  loss: number;
  accuracy: number;
  recordedAt: string;
}



export interface ExperimentRun {
  id: string;
  experimentId: string;
  runName: string;
  metricsJson: Record<string, any>;
  parametersJson: Record<string, any>;
  createdAt: string;
}

export interface HyperparameterTrial {
  id: string;
  experimentRunId: string;
  trialNumber: number;
  hyperparamsJson: Record<string, any>;
  score: number;
  status: string;
}

export interface ModelRegistry {
  id: string;
  modelName: string;
  taskType: string;
  framework: string;
  isActive: boolean;
  createdAt: string;
}

export interface ModelVersion {
  id: string;
  modelId: string;
  versionTag: string;
  stage: 'development' | 'staging' | 'production' | 'archived';
  createdAt: string;
}

export interface ModelArtifact {
  id: string;
  modelVersionId: string;
  artifactType: string;
  storageUrl: string;
  sizeBytes: number;
  createdAt: string;
}

export interface ModelDeployment {
  id: string;
  modelVersionId: string;
  deploymentName: string;
  replicaCount: number;
  status: 'healthy' | 'degraded' | 'scaling';
  createdAt: string;
}

export interface DeploymentEndpoint {
  id: string;
  deploymentId: string;
  endpointUrl: string;
  authToken?: string;
  createdAt: string;
}

export interface PredictionLog {
  id: string;
  endpointId: string;
  latencyMs: number;
  statusCode: number;
  createdAt: string;
}

export interface ModelMonitoring {
  id: string;
  deploymentId: string;
  requestsPerSec: number;
  p99LatencyMs: number;
  errorRatePct: number;
  checkedAt: string;
}

export interface ModelDriftReport {
  id: string;
  deploymentId: string;
  conceptDriftScore: number;
  featureDriftScore: number;
  hasDrift: boolean;
  createdAt: string;
}

export interface InferenceRequest {
  id: string;
  endpointId: string;
  promptTokens: number;
  completionTokens: number;
  createdAt: string;
}

// =====================================================
// Phase 11C — AI Enterprise Automation Platform (Version 8.3)
// =====================================================

export interface AutomationWorkspace {
  id: string;
  workspaceName: string;
  description?: string;
  organizationId?: string;
  ownerId: string;
  status: 'active' | 'archived' | 'disabled';
  createdAt: string;
  updatedAt: string;
}

export interface AutomationProject {
  id: string;
  workspaceId: string;
  projectName: string;
  description?: string;
  category?: string;
  status: 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface AutomationWorkflow {
  id: string;
  projectId: string;
  workflowName: string;
  description?: string;
  status: 'draft' | 'published' | 'paused' | 'archived';
  triggerType: 'manual' | 'schedule' | 'webhook' | 'event';
  executionMode: 'sequential' | 'parallel';
  createdBy: string;
  version: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowVersion {
  id: string;
  workflowId: string;
  versionNumber: number;
  definitionJson: string;
  changelog?: string;
  publishedBy: string;
  isPublished: boolean;
  createdAt: string;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  versionId?: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  triggeredBy: string;
  inputData?: Record<string, any>;
  outputData?: Record<string, any>;
  errorMessage?: string;
  startedAt?: string;
  completedAt?: string;
  durationMs: number;
  createdAt: string;
}

export interface WorkflowStep {
  id: string;
  workflowId: string;
  stepKey: string;
  name: string;
  stepName?: string;
  stepType: string;
  stepOrder?: number;
  config?: any;
  configuration?: Record<string, any>;
  positionX: number;
  positionY: number;
  nextStepKeys?: string[];
  nextStepId?: string;
  onFailure?: 'stop' | 'continue' | 'retry' | string;
  createdAt: string;
}

export interface WorkflowVariable {
  id: string;
  workflowId: string;
  variableName: string;
  variableType: 'string' | 'number' | 'boolean' | 'json';
  defaultValue?: string;
  isSecret: boolean;
  createdAt: string;
}

export interface WorkflowSchedule {
  id: string;
  workflowId: string;
  cronExpression: string;
  timezone: string;
  isEnabled: boolean;
  lastRunAt?: string;
  nextRunAt?: string;
  createdAt: string;
}

export interface AutomationTrigger {
  id: string;
  workflowId: string;
  triggerName: string;
  triggerType: 'webhook' | 'schedule' | 'event_bus' | 'file';
  eventPattern?: string;
  config?: Record<string, any>;
  isActive: boolean;
  createdAt: string;
}

export interface EventSubscription {
  id: string;
  triggerId: string;
  eventType: string;
  targetUrl?: string;
  filterRules?: Record<string, any>;
  status: 'active' | 'paused';
  createdAt: string;
}

export interface BusinessRule {
  id: string;
  ruleName: string;
  description?: string;
  ruleGroup: string;
  conditions: Record<string, any>;
  actions: Record<string, any>;
  priority: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DecisionTable {
  id: string;
  tableName: string;
  description?: string;
  inputsSchema: Record<string, any>[];
  outputsSchema: Record<string, any>[];
  rulesJson: Record<string, any>[];
  hitPolicy: 'first' | 'collect' | 'rule_order';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApprovalWorkflow {
  id: string;
  workflowName: string;
  description?: string;
  approverRoles: string[];
  requireAll: boolean;
  autoRejectTimeoutHours: number;
  createdAt: string;
}

export interface ApprovalRequest {
  id: string;
  approvalWorkflowId?: string;
  workflowId: string;
  requesterId: string;
  approverId: string;
  entityType?: string;
  entityId?: string;
  status: string;
  title?: string;
  details?: string;
  requestedAt: string;
  resolvedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApprovalAction {
  id: string;
  requestId: string;
  approverId: string;
  action: 'approved' | 'rejected' | 'commented';
  comment?: string;
  createdAt: string;
}

export interface RPABot {
  id: string;
  botName: string;
  description?: string;
  botType: 'attended' | 'unattended' | 'hybrid';
  status: 'idle' | 'running' | 'error' | 'offline';
  hostMachine?: string;
  capabilities: string[];
  lastHeartbeat?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RPAJob {
  id: string;
  botId: string;
  workflowId?: string;
  jobName: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  parameters?: Record<string, any>;
  resultData?: Record<string, any>;
  errorDetails?: string;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
}

export interface AutomationIntegration {
  id: string;
  integrationName: string;
  provider: string;
  category: string;
  authType: 'oauth2' | 'api_key' | 'basic' | 'custom';
  baseUrl?: string;
  isEnabled: boolean;
  createdAt: string;
}

export interface IntegrationConnection {
  id: string;
  integrationId: string;
  connectionName: string;
  status: 'connected' | 'error' | 'disconnected';
  createdBy: string;
  lastVerified?: string;
  createdAt: string;
}

export interface ExecutionMetric {
  id: string;
  workflowId: string;
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  avgDurationMs: number;
  lastExecutionAt?: string;
  recordedDate: string;
}

export interface ProcessAnalytics {
  id: string;
  processName: string;
  category: string;
  totalRuns: number;
  timeSavedHours: number;
  costSavedUsd: number;
  efficiencyScore: number;
  updatedAt: string;
}

export interface WorkflowTemplate {
  id: string;
  templateName: string;
  description?: string;
  category: string;
  definitionJson: string;
  icon?: string;
  usageCount: number;
  createdAt: string;
}

export interface AutomationRecommendation {
  id: string;
  title: string;
  description: string;
  impactScore: number;
  suggestedAction: string;
  status: 'pending' | 'applied' | 'dismissed';
  createdAt: string;
}

export interface EnterpriseAutomationAuditLog {
  id: string;
  userId: string;
  action: string;
  resourceType: string;
  resourceId: string;
  changesJson?: string;
  ipAddress?: string;
  createdAt: string;
}

/**
 * Phase 11D - AI Collaboration Platform & Digital Workplace Types
 */

export interface Workspace {
  id: string;
  workspaceName: string;
  slug: string;
  description?: string;
  ownerId: string;
  isPrivate: boolean;
  status: 'active' | 'archived' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  userId: string;
  role: 'owner' | 'admin' | 'member' | 'guest';
  joinedAt: string;
  status: 'active' | 'invited' | 'removed';
}

export interface WorkspaceRoleInfo {
  id: string;
  workspaceId: string;
  roleName: string;
  permissions: string[];
  createdAt: string;
}

export interface TeamChannel {
  id: string;
  workspaceId: string;
  channelName: string;
  channelType: 'public' | 'private' | 'read_only';
  topic?: string;
  createdBy: string;
  createdAt: string;
}

export interface ChannelMessage {
  id: string;
  channelId: string;
  senderId: string;
  content: string;
  messageType: 'text' | 'file' | 'system' | 'code';
  attachments?: Record<string, any>[];
  createdAt: string;
  updatedAt: string;
}

export interface MessageThread {
  id: string;
  parentMessageId: string;
  senderId: string;
  content: string;
  createdAt: string;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface MeetingRoom {
  id: string;
  workspaceId: string;
  roomName: string;
  roomCode: string;
  hostId: string;
  isActive: boolean;
  createdAt: string;
}

export interface MeetingSession {
  id: string;
  roomId: string;
  sessionTitle: string;
  scheduledStart?: string;
  scheduledEnd?: string;
  actualStart?: string;
  actualEnd?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  recordingUrl?: string;
  transcriptText?: string;
  createdAt: string;
}

export interface MeetingParticipant {
  id: string;
  sessionId: string;
  userId: string;
  role: 'host' | 'presenter' | 'attendee';
  joinedAt?: string;
  leftAt?: string;
}

export interface KnowledgeBase {
  workspaceId?: string;
  title?: string;
  category?: string;
  createdBy?: string;
}

export interface KnowledgeArticle {
  id: string;
  knowledgeBaseId: string;
  title: string;
  slug: string;
  content: string;
  authorId: string;
  status: 'draft' | 'published' | 'archived';
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentLibrary {
  id: string;
  workspaceId: string;
  libraryName: string;
  description?: string;
  createdBy: string;
  createdAt: string;
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  versionNumber: number;
  filePath: string;
  fileSize: number;
  uploadedBy: string;
  createdAt: string;
}

export interface SharedDocument {
  id: string;
  libraryId: string;
  title: string;
  fileType: string;
  ownerId: string;
  currentVersionId?: string;
  permissions: 'view' | 'edit' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Whiteboard {
  id: string;
  workspaceId: string;
  boardName: string;
  createdBy: string;
  isPublic: boolean;
  canvasData?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface WhiteboardObject {
  id: string;
  whiteboardId: string;
  objectType: 'sticky' | 'shape' | 'text' | 'path' | 'image';
  positionX: number;
  positionY: number;
  width?: number;
  height?: number;
  propertiesJson?: Record<string, any>;
  createdBy: string;
  createdAt: string;
}

export interface ProjectSpace {
  id: string;
  workspaceId: string;
  projectName: string;
  description?: string;
  leadId: string;
  status: 'active' | 'on_hold' | 'completed';
  createdAt: string;
}

export interface ProjectTask {
  id: string;
  projectSpaceId: string;
  title: string;
  description?: string;
  assigneeId?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in_progress' | 'review' | 'done';
  dueDate?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMilestone {
  id: string;
  projectSpaceId: string;
  milestoneName: string;
  dueDate?: string;
  status: 'pending' | 'achieved' | 'missed';
  createdAt: string;
}

export interface ActivityFeed {
  id: string;
  workspaceId: string;
  actorId: string;
  actionType: string;
  targetType: string;
  targetId: string;
  summary: string;
  createdAt: string;
}

export interface TeamNotification {
  id: string;
  recipientId: string;
  title: string;
  message: string;
  notificationType: 'info' | 'warning' | 'alert' | 'success';
  isRead: boolean;
  linkUrl?: string;
  createdAt: string;
}

export interface CollaborationAnalytics {
  id: string;
  workspaceId: string;
  activeUsersDaily: number;
  messagesSent: number;
  meetingsHeld: number;
  docsCreated: number;
  recordedDate: string;
  createdAt: string;
}

export interface KnowledgeRecommendation {
  id: string;
  userId: string;
  articleId: string;
  relevanceScore: number;
  reason?: string;
  createdAt: string;
}

export interface CollaborationAuditLog {
  id: string;
  workspaceId?: string;
  userId: string;
  action: string;
  resourceType: string;
  resourceId: string;
  ipAddress?: string;
  createdAt: string;
}

// ─── Phase 11E — NexoApps AI Enterprise Universe & Version 9.0 Release ───

export interface EnterpriseRegistry {
  id: string;
  enterpriseName: string;
  licenseTier: string;
  status: 'active' | 'suspended' | 'maintenance';
  createdAt: string;
  updatedAt: string;
}

export interface EnterpriseModule {
  id: string;
  moduleName: string;
  moduleKey: string;
  category: string;
  version: string;
  isEnabled: boolean;
  createdAt: string;
}

export interface EnterpriseWorkspace {
  id: string;
  workspaceName: string;
  slug: string;
  description?: string;
  ownerId: string;
  status: 'active' | 'archived';
  createdAt: string;
}

export interface EnterpriseService {
  id: string;
  serviceName: string;
  serviceType: string;
  endpointUrl?: string;
  status: 'healthy' | 'degraded' | 'down';
  createdAt: string;
}

export interface EnterpriseIntegration {
  id: string;
  integrationName: string;
  provider: string;
  status: 'connected' | 'disconnected' | 'error';
  configJson?: Record<string, any>;
  createdAt: string;
}

export interface EnterpriseWorkflow {
  id: string;
  workflowName: string;
  description?: string;
  status: 'active' | 'paused' | 'draft';
  stepsJson?: Record<string, any>[];
  createdAt: string;
}

export interface EnterprisePolicy {
  id: string;
  policyName: string;
  policyType: string;
  rulesJson: Record<string, any>;
  isActive: boolean;
  createdAt: string;
}

export interface EnterpriseSetting {
  id: string;
  settingKey: string;
  settingValue: string;
  updatedAt: string;
}

export interface EnterpriseNotification {
  id: string;
  recipientId: string;
  title: string;
  message: string;
  notificationType: 'info' | 'warning' | 'critical' | 'success';
  isRead: boolean;
  createdAt: string;
}

export interface EnterpriseActivity {
  id: string;
  actorId: string;
  action: string;
  details?: string;
  createdAt: string;
}

export interface EnterpriseAIService {
  id: string;
  serviceName: string;
  modelProvider: string;
  status: 'active' | 'idle' | 'maintenance';
  createdAt: string;
}

export interface EnterpriseAIAgent {
  id: string;
  agentName: string;
  roleType: string;
  status: 'active' | 'paused';
  createdAt: string;
}

export interface EnterpriseHealth {
  id: string;
  subsystemName: string;
  healthScore: number;
  status: 'healthy' | 'degraded' | 'critical';
  checkedAt: string;
}

export interface EnterpriseMetric {
  id: string;
  metricName: string;
  metricValue: number;
  recordedAt: string;
}

export interface EnterpriseUsage {
  id: string;
  resourceName: string;
  usageCount: number;
  recordedDate: string;
}

export interface EnterpriseCost {
  id: string;
  costCenter: string;
  allocatedBudget: number;
  actualSpend: number;
  currency: string;
  recordedMonth: string;
}

export interface EnterpriseBackup {
  id: string;
  backupName: string;
  backupType: 'full' | 'incremental' | 'snapshot';
  sizeBytes: number;
  status: 'completed' | 'failed' | 'in_progress';
  createdAt: string;
}

export interface EnterpriseRestorePoint {
  id: string;
  backupId: string;
  snapshotTag: string;
  createdAt: string;
}

export interface EnterpriseRelease {
  id: string;
  version: string;
  releaseName: string;
  changelog?: string;
  releasedAt: string;
}














