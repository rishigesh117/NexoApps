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

module.exports = router;
