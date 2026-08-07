/**
 * Navigation Service — NexoApps Phase 9E
 * Unified cross-module AI OS navigation hierarchy and breadcrumb resolver.
 */

class NavigationService {
  async getNavigation() {
    return [
      { id: 'nav-1', label: 'AI OS Workspace', href: '/workspace', iconName: 'Cpu', displayOrder: 1 },
      { id: 'nav-2', label: 'AI Gateway', href: '/ai-gateway', iconName: 'Boxes', displayOrder: 2 },
      { id: 'nav-3', label: 'App Builder Studio', href: '/app-builder', iconName: 'Layout', displayOrder: 3 },
      { id: 'nav-4', label: 'AI Marketplace', href: '/marketplace', iconName: 'Store', displayOrder: 4 },
      { id: 'nav-5', label: 'Software Engineering', href: '/software-engineering', iconName: 'Terminal', displayOrder: 5 },
      { id: 'nav-6', label: 'Knowledge Cloud', href: '/knowledge', iconName: 'BookOpen', displayOrder: 6 },
      { id: 'nav-7', label: 'Enterprise AI', href: '/enterprise', iconName: 'Shield', displayOrder: 7 }
    ];
  }
}

module.exports = new NavigationService();
