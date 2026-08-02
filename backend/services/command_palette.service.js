/**
 * Command Palette & Shortcuts Service
 * NexoApps Platform - Phase 6E (Version 2.5)
 */

class CommandPaletteService {
  getCommands() {
    return [
      { id: 'cmd-1', name: 'Create New AI Project', shortcut: 'Ctrl+Shift+P', action: 'NAVIGATE', url: '/builder' },
      { id: 'cmd-2', name: 'Open Autonomous Agents Chat', shortcut: 'Ctrl+Shift+A', action: 'NAVIGATE', url: '/agents/chat' },
      { id: 'cmd-3', name: 'Deploy Model Endpoint', shortcut: 'Ctrl+Shift+D', action: 'NAVIGATE', url: '/ai-platform/deployments' },
      { id: 'cmd-4', name: 'Browse AI Marketplace', shortcut: 'Ctrl+Shift+M', action: 'NAVIGATE', url: '/marketplace' },
      { id: 'cmd-5', name: 'Check System Telemetry', shortcut: 'Ctrl+Shift+H', action: 'NAVIGATE', url: '/platform/health' },
    ];
  }
}

module.exports = new CommandPaletteService();
