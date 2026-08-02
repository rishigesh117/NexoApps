/**
 * Dashboard Widget Service
 * NexoApps Platform - Phase 6E (Version 2.5)
 */

class WidgetService {
  getWidgets() {
    return [
      { id: 'w-1', widgetKey: 'AI_BUILDER_STATUS', title: 'AI Builder Status', category: 'DEVELOPMENT', description: 'Active project scaffolding & export status' },
      { id: 'w-2', widgetKey: 'AGENTS_ACTIVITY', title: 'Autonomous Agents Feed', category: 'AI_AGENTS', description: 'Live agent tasks & code reviews' },
      { id: 'w-3', widgetKey: 'MODEL_TELEMETRY', title: 'Model Telemetry', category: 'PLATFORM', description: 'GPU compute load & inference latency' },
      { id: 'w-4', widgetKey: 'MARKETPLACE_SALES', title: 'Marketplace Sales', category: 'REVENUE', description: 'Live asset downloads & creator royalties' },
    ];
  }
}

module.exports = new WidgetService();
