/**
 * Master API Router Blueprint
 * NexoApps Platform
 */

const express = require('express');
const router = express.Router();

const appRoutes = require('./app.routes');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const sessionRoutes = require('./session.routes');
const suggestionRoutes = require('./suggestion.routes');
const downloadRoutes = require('./download.routes');
const reviewRoutes = require('./review.routes');
const favoriteRoutes = require('./favorite.routes');
const adminRoutes = require('./admin.routes');
const developerRoutes = require('./developer.routes');
const dashboardRoutes = require('./dashboard.routes');
const developerWorkspaceRoutes = require('./developer.workspace.routes');
const submissionRoutes = require('./submission.routes');
const communityRoutes = require('./community.routes');
const notificationRoutes = require('./notification.routes');
const followRoutes = require('./follow.routes');
const collectionRoutes = require('./collection.routes');
const healthRoutes = require('./health.routes');
const searchRoutes = require('./search.routes');
const analyticsRoutes = require('./analytics.routes');
const assistantRoutes = require('./assistant.routes');
const supportRoutes = require('./support.routes');
const automationRoutes = require('./automation.routes');
const syncRoutes = require('./sync.routes');
const backupRoutes = require('./backup.routes');
const deviceRoutes = require('./device.routes');
const preferencesRoutes = require('./preferences.routes');
const organizationRoutes = require('./organization.routes');
const workspaceRoutes = require('./workspace.routes');
const projectRoutes = require('./project.routes');
const operationsRoutes = require('./operations.routes');
const auditRoutes = require('./audit.routes');
const deploymentRoutes = require('./deployment.routes');
const builderRoutes = require('./builder.routes');
const templateRoutes = require('./template.routes');
const workflowRoutes = require('./workflow.routes');
const agentRoutes = require('./agent.routes');
const plannerRoutes = require('./planner.routes');
const sprintRoutes = require('./sprint.routes');
const codeReviewRoutes = require('./review.routes');
const modelRoutes = require('./model.routes');
const aiDeploymentRoutes = require('./ai_deployment.routes');
const datasetRoutes = require('./dataset.routes');
const experimentRoutes = require('./experiment.routes');
const runtimeRoutes = require('./runtime.routes');
const marketplaceRoutes = require('./marketplace.routes');
const creatorRoutes = require('./creator.routes');
const licenseRoutes = require('./license.routes');
const subscriptionRoutes = require('./subscription.routes');
const platformDashboardRoutes = require('./dashboard.routes');
const platformSearchRoutes = require('./platform_search.routes');
const platformActivityRoutes = require('./activity.routes');
const platformOSRoutes = require('./platform.routes');
const automationRulesRoutes = require('./automation_rules.routes');
const tenantRoutes = require('./tenant.routes');
const billingRoutes = require('./billing.routes');
const invoiceRoutes = require('./invoice.routes');
const saasSubscriptionRoutes = require('./saas_subscription.routes');
const apiGatewayRoutes = require('./api_gateway.routes');
const oauthRoutes = require('./oauth.routes');
const webhookRoutes = require('./webhook.routes');
const integrationRoutes = require('./integration.routes');
const developerApiRoutes = require('./developer_api.routes');
const etlRoutes = require('./etl.routes');
const analyticsV2Routes = require('./analytics_v2.routes');
const reportsRoutes = require('./reports.routes');
const dashboardBuilderRoutes = require('./dashboard_builder.routes');
const predictionRoutes = require('./prediction.routes');
const deploymentV2Routes = require('./deployment_v2.routes');
const environmentRoutes = require('./environment.routes');
const ltsRoutes = require('./lts.routes');
const agentWorkspaceRoutes = require('./agent_workspace.routes');
const agentExecutionRoutes = require('./agent_execution.routes');
const agentMemoryRoutes = require('./agent_memory.routes');
const agentMetricsRoutes = require('./agent_metrics.routes');
const deploymentRuntimeRoutes = require('./deployment_runtime.routes');
const runtimeMonitorRoutes = require('./runtime_monitor.routes');
const runtimeBackupRoutes = require('./runtime_backup.routes');
const knowledgeRoutes = require('./knowledge.routes');
const ragRoutes = require('./rag.routes');
const connectorRoutes = require('./connector.routes');
const memoryRoutes = require('./memory.routes');
const enterpriseRoutes = require('./enterprise.routes');
const approvalRoutes = require('./approval.routes');
const businessProcessRoutes = require('./business_process.routes');
const automationCenterRoutes = require('./automation_center.routes');
const globalAIRoutes = require('./global_ai.routes');
const reasoningRoutes = require('./reasoning.routes');
const governanceRoutes = require('./governance.routes');
const observabilityRoutes = require('./observability.routes');
const releaseRoutes = require('./release.routes');

// Phase 9A AI Gateway Routes
const providerRoutes = require('./provider.routes');
const chatRoutes = require('./chat.routes');
const promptRoutes = require('./prompt.routes');
const universalGatewayRoutes = require('./gateway.routes');

// Phase 9B AI Application Builder Routes
const applicationBuilderRoutes = require('./application_builder.routes');
const applicationTemplateRoutes = require('./application_template.routes');
const componentLibraryRoutes = require('./component_library.routes');
const visualEditorRoutes = require('./visual_editor.routes');
const deploymentPipelineRoutes = require('./deployment_pipeline.routes');

// Phase 9C AI Marketplace & Extension Platform Routes
const publisherRoutes = require('./publisher.routes');
const pluginRoutes = require('./plugin.routes');
const extensionRoutes = require('./extension.routes');
const marketplaceAdminRoutes = require('./marketplace_admin.routes');

// Phase 9D Autonomous AI Software Engineering Routes
const softwareProjectRoutes = require('./software_project.routes');
const repositoryRoutes = require('./repository.routes');
const codeGenerationRoutes = require('./code_generation.routes');
const engineeringRoutes = require('./engineering.routes');
const sdlcTestingRoutes = require('./testing.routes');

// Phase 9E AI Operating System Routes
const platformOsRoutes = require('./platform_os.routes');

router.use('/apps', appRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/session', sessionRoutes);
router.use('/suggestions', suggestionRoutes);
router.use('/downloads', downloadRoutes);
router.use('/reviews', reviewRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/admin', adminRoutes);
router.use('/admin/developers', developerRoutes);
router.use('/admin/dashboard', dashboardRoutes);
router.use('/admin/submissions', submissionRoutes);
router.use('/developer', developerWorkspaceRoutes);

router.use('/community', communityRoutes);
router.use('/notifications', notificationRoutes);
router.use('/follow', followRoutes);
router.use('/collections', collectionRoutes);
router.use('/health', healthRoutes);
router.use('/search', searchRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/assistant', assistantRoutes);
router.use('/support', supportRoutes);
router.use('/automation', automationRoutes);

router.use('/sync', syncRoutes);
router.use('/backup', backupRoutes);
router.use('/devices', deviceRoutes);
router.use('/preferences', preferencesRoutes);

router.use('/organizations', organizationRoutes);
router.use('/workspace', workspaceRoutes);
router.use('/projects', projectRoutes);

router.use('/operations', operationsRoutes);
router.use('/audit', auditRoutes);
router.use('/deployments', deploymentRoutes);

router.use('/builder', builderRoutes);
router.use('/templates', templateRoutes);
router.use('/workflows', workflowRoutes);

router.use('/agents', agentRoutes);
router.use('/planner', plannerRoutes);
router.use('/sprints', sprintRoutes);
router.use('/code-reviews', codeReviewRoutes);

router.use('/models', modelRoutes);
router.use('/ai-deployments', aiDeploymentRoutes);
router.use('/datasets', datasetRoutes);
router.use('/experiments', experimentRoutes);
router.use('/runtime', runtimeRoutes);

router.use('/marketplace', marketplaceRoutes);
router.use('/creators', creatorRoutes);
router.use('/licenses', licenseRoutes);
router.use('/subscriptions', subscriptionRoutes);

router.use('/dashboard', platformDashboardRoutes);
router.use('/platform-search', platformSearchRoutes);
router.use('/activity', platformActivityRoutes);
router.use('/platform', platformOSRoutes);
router.use('/automation-rules', automationRulesRoutes);

router.use('/tenant', tenantRoutes);
router.use('/billing', billingRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/tenant-subscriptions', saasSubscriptionRoutes);

router.use('/gateway', apiGatewayRoutes);
router.use('/oauth', oauthRoutes);
router.use('/webhooks', webhookRoutes);
router.use('/integrations', integrationRoutes);
router.use('/developer-api', developerApiRoutes);

router.use('/etl', etlRoutes);
router.use('/analytics-v2', analyticsV2Routes);
router.use('/reports', reportsRoutes);
router.use('/dashboard-builder', dashboardBuilderRoutes);
router.use('/predictions', predictionRoutes);
router.use('/cloud', deploymentV2Routes);
router.use('/environments', environmentRoutes);
router.use('/backups', backupRoutes);
router.use('/lts', ltsRoutes);

router.use('/agent-workspace', agentWorkspaceRoutes);
router.use('/agent-execution', agentExecutionRoutes);
router.use('/agent-memory', agentMemoryRoutes);
router.use('/agent-metrics', agentMetricsRoutes);

router.use('/runtime-deployment', deploymentRuntimeRoutes);
router.use('/runtime-monitor', runtimeMonitorRoutes);
router.use('/runtime-backup', runtimeBackupRoutes);

router.use('/knowledge', knowledgeRoutes);
router.use('/rag', ragRoutes);
router.use('/connectors', connectorRoutes);
router.use('/memory', memoryRoutes);

router.use('/enterprise', enterpriseRoutes);
router.use('/approvals', approvalRoutes);
router.use('/business-process', businessProcessRoutes);
router.use('/automation-center', automationCenterRoutes);

router.use('/global-ai', globalAIRoutes);
router.use('/reasoning', reasoningRoutes);
router.use('/governance', governanceRoutes);
router.use('/observability', observabilityRoutes);
router.use('/releases', releaseRoutes);

// Phase 9A AI Gateway Mounted Routes
router.use('/ai-gateway/providers', providerRoutes);
router.use('/ai-gateway/chat', chatRoutes);
router.use('/ai-gateway/prompts', promptRoutes);
router.use('/ai-gateway/gateway', universalGatewayRoutes);

// Phase 9B AI Application Builder Mounted Routes
router.use('/app-builder/applications', applicationBuilderRoutes);
router.use('/app-builder/templates', applicationTemplateRoutes);
router.use('/app-builder/components', componentLibraryRoutes);
router.use('/app-builder/editor', visualEditorRoutes);
router.use('/app-builder/pipeline', deploymentPipelineRoutes);

// Phase 9C AI Marketplace Mounted Routes
router.use('/marketplace', marketplaceRoutes);
router.use('/marketplace/publishers', publisherRoutes);
router.use('/marketplace/plugins', pluginRoutes);
router.use('/marketplace/extensions', extensionRoutes);
router.use('/marketplace/admin', marketplaceAdminRoutes);

// Phase 9D Autonomous AI Software Engineering Mounted Routes
router.use('/software-engineering/core', softwareProjectRoutes);
router.use('/software-engineering/repos', repositoryRoutes);
router.use('/software-engineering/codegen', codeGenerationRoutes);
router.use('/software-engineering/studio', engineeringRoutes);
router.use('/software-engineering/test-engine', sdlcTestingRoutes);

// Phase 9E AI Operating System Mounted Routes
router.use('/ai-os/workspace', workspaceRoutes);
router.use('/ai-os/platform', platformOsRoutes);

// Phase 10A AI Commerce & Marketplace Mounted Routes
const phase10aCommerceRoutes = require('./commerce.routes');
const phase10aProductRoutes = require('./product.routes');
const phase10aPaymentRoutes = require('./payment.routes');
const phase10aSubscriptionRoutes = require('./subscription.routes');
const phase10aSellerRoutes = require('./seller.routes');

router.use('/commerce', phase10aCommerceRoutes);
router.use('/commerce/products', phase10aProductRoutes);
router.use('/commerce/payments', phase10aPaymentRoutes);
router.use('/commerce/subscriptions', phase10aSubscriptionRoutes);
router.use('/seller', phase10aSellerRoutes);

// Phase 10B AI Cloud Infrastructure Platform Mounted Routes
const phase10bTenantRoutes = require('./tenant.routes');
const phase10bCloudRoutes = require('./cloud.routes');
const phase10bComputeRoutes = require('./compute.routes');
const phase10bStorageRoutes = require('./storage.routes');
const phase10bResourceRoutes = require('./resource.routes');

router.use('/cloud-platform/tenants', phase10bTenantRoutes);
router.use('/cloud-platform/cloud', phase10bCloudRoutes);
router.use('/cloud-platform/compute', phase10bComputeRoutes);
router.use('/cloud-platform/storage', phase10bStorageRoutes);
router.use('/cloud-platform/resources', phase10bResourceRoutes);

// Phase 10C AI Data Platform Mounted Routes
const phase10cDataPlatformRoutes = require('./data_platform.routes');
const phase10cPipelineRoutes = require('./pipeline.routes');
const phase10cAnalyticsRoutes = require('./analytics.routes');
const phase10cGovernanceRoutes = require('./governance.routes');
const phase10cStreamingRoutes = require('./streaming.routes');

router.use('/data-platform/core', phase10cDataPlatformRoutes);
router.use('/data-platform/pipelines', phase10cPipelineRoutes);
router.use('/data-platform/analytics', phase10cAnalyticsRoutes);
router.use('/data-platform/governance', phase10cGovernanceRoutes);
router.use('/data-platform/streaming', phase10cStreamingRoutes);

// Phase 10D AI Security Platform Mounted Routes
const phase10dIdentityRoutes = require('./identity.routes');
const phase10dSecurityRoutes = require('./security.routes');
const phase10dComplianceRoutes = require('./compliance.routes');
const phase10dVaultRoutes = require('./vault.routes');
const phase10dOrganizationRoutes = require('./organization.routes');

router.use('/security/identity', phase10dIdentityRoutes);
router.use('/security/core', phase10dSecurityRoutes);
router.use('/security/compliance', phase10dComplianceRoutes);
router.use('/security/vault', phase10dVaultRoutes);
router.use('/security/orgs', phase10dOrganizationRoutes);

// Phase 10E AI Hyper Platform Mounted Routes (Version 8.0)
const phase10ePlatformRoutes = require('./platform.routes');
const phase10eWorkspaceRoutes = require('./workspace.routes');
const phase10eConfigurationRoutes = require('./configuration.routes');
const phase10eReleaseRoutes = require('./release.routes');
const phase10eMaintenanceRoutes = require('./maintenance.routes');

router.use('/platform/core', phase10ePlatformRoutes);
router.use('/platform/workspace', phase10eWorkspaceRoutes);
router.use('/platform/config', phase10eConfigurationRoutes);
router.use('/platform/release', phase10eReleaseRoutes);
router.use('/platform/maintenance', phase10eMaintenanceRoutes);

// Phase 11A AI Developer Cloud Mounted Routes (Version 8.1)
const phase11aDeveloperCloudRoutes = require('./developer_cloud.routes');
const phase11aRepositoryRoutes = require('./repository.routes');
const phase11aPipelineRoutes = require('./pipeline.routes');
const phase11aDeploymentRoutes = require('./deployment.routes');
const phase11aArtifactRoutes = require('./artifact.routes');

router.use('/developer-cloud/core', phase11aDeveloperCloudRoutes);
router.use('/developer-cloud/repositories', phase11aRepositoryRoutes);
router.use('/developer-cloud/pipelines', phase11aPipelineRoutes);
router.use('/developer-cloud/deployments', phase11aDeploymentRoutes);
router.use('/developer-cloud/artifacts', phase11aArtifactRoutes);

// Phase 11B AI ModelOps Mounted Routes (Version 8.2)
const phase11bDatasetRoutes = require('./dataset.routes');
const phase11bTrainingRoutes = require('./training.routes');
const phase11bModelRegistryRoutes = require('./model_registry.routes');
const phase11bModelDeploymentRoutes = require('./modelops_deployment.routes');
const phase11bModelOpsRoutes = require('./modelops.routes');

router.use('/modelops/datasets', phase11bDatasetRoutes);
router.use('/modelops/training', phase11bTrainingRoutes);
router.use('/modelops/registry', phase11bModelRegistryRoutes);
router.use('/modelops/deployments', phase11bModelDeploymentRoutes);
router.use('/modelops/core', phase11bModelOpsRoutes);

// Phase 11C AI Enterprise Automation Platform Mounted Routes (Version 8.3)
const phase11cAutomationRoutes = require('./automation.routes');
const phase11cWorkflowRoutes = require('./workflow.routes');
const phase11cApprovalRoutes = require('./approval.routes');
const phase11cRPARoutes = require('./rpa.routes');
const phase11cIntegrationRoutes = require('./integration.routes');

router.use('/automation/core', phase11cAutomationRoutes);
router.use('/automation/workflows', phase11cWorkflowRoutes);
router.use('/automation/approvals', phase11cApprovalRoutes);
router.use('/automation/rpa', phase11cRPARoutes);
router.use('/automation/integrations', phase11cIntegrationRoutes);

// Phase 11D AI Collaboration Platform Mounted Routes (Version 8.4)
const phase11dWorkspaceRoutes = require('./workspace.routes');
const phase11dMessagingRoutes = require('./messaging.routes');
const phase11dMeetingRoutes = require('./meeting.routes');
const phase11dKnowledgeRoutes = require('./knowledge.routes');
const phase11dCollaborationRoutes = require('./collaboration.routes');

router.use('/collaboration/workspaces', phase11dWorkspaceRoutes);
router.use('/collaboration/messaging', phase11dMessagingRoutes);
router.use('/collaboration/meetings', phase11dMeetingRoutes);
router.use('/collaboration/knowledge', phase11dKnowledgeRoutes);
router.use('/collaboration/core', phase11dCollaborationRoutes);

// Phase 11E NexoApps AI Enterprise Universe Mounted Routes (Version 9.0)
const phase11eEnterpriseRoutes = require('./enterprise.routes');
const phase11eWorkspaceRoutes = require('./enterprise_workspace.routes');
const phase11eAdminRoutes = require('./enterprise_admin.routes');
const phase11eReleaseRoutes = require('./enterprise_release.routes');
const phase11eSupportRoutes = require('./enterprise_support.routes');

router.use('/enterprise/core', phase11eEnterpriseRoutes);
router.use('/enterprise/workspaces', phase11eWorkspaceRoutes);
router.use('/enterprise/admin', phase11eAdminRoutes);
router.use('/enterprise/releases', phase11eReleaseRoutes);
router.use('/enterprise/support', phase11eSupportRoutes);

// Phase 12A NexoApps Production Infrastructure Mounted Routes (Version 9.1)
const phase12aProductionRoutes = require('./production.routes');
const phase12aCacheRoutes = require('./cache.routes');
const phase12aQueueRoutes = require('./queue.routes');
const phase12aMonitoringRoutes = require('./monitoring.routes');
const phase12aStorageRoutes = require('./storage.routes');

router.use('/production/core', phase12aProductionRoutes);
router.use('/production/cache', phase12aCacheRoutes);
router.use('/production/queue', phase12aQueueRoutes);
router.use('/production/monitoring', phase12aMonitoringRoutes);
router.use('/production/storage', phase12aStorageRoutes);

// Phase 12B NexoApps Database Infrastructure Mounted Routes (Version 9.2)
const phase12bDatabasePlatformRoutes = require('./database_platform.routes');
const phase12bBackupRoutes = require('./backup.routes');
const phase12bRestoreRoutes = require('./restore.routes');
const phase12bReplicationRoutes = require('./replication.routes');
const phase12bStorageClusterRoutes = require('./storage_cluster.routes');

router.use('/database-platform/core', phase12bDatabasePlatformRoutes);
router.use('/database-platform/backups', phase12bBackupRoutes);
router.use('/database-platform/restores', phase12bRestoreRoutes);
router.use('/database-platform/replication', phase12bReplicationRoutes);
router.use('/database-platform/storage-clusters', phase12bStorageClusterRoutes);

module.exports = router;









