/**
 * Routing Service — NexoApps Phase 12D (v9.4)
 * Route creation, path matching, methods, upstreams, targets.
 */

class RoutingService {
  constructor() {
    this.routes = [
      {
        id: 'groute-1',
        gatewayId: 'gw-core-01',
        routePath: '/api/v1/observability/*',
        methods: 'GET,POST,PUT,DELETE',
        upstreamId: 'up-obs-core',
        stripPath: false,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'groute-2',
        gatewayId: 'gw-core-01',
        routePath: '/api/v1/database-platform/*',
        methods: 'GET,POST,PUT,DELETE',
        upstreamId: 'up-db-core',
        stripPath: false,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'groute-3',
        gatewayId: 'gw-mesh-02',
        routePath: '/api/v1/modelops/*',
        methods: 'GET,POST',
        upstreamId: 'up-modelops',
        stripPath: false,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    this.upstreams = [
      { id: 'up-obs-core', gatewayId: 'gw-core-01', upstreamName: 'observability-cluster-upstream', algorithm: 'round_robin', healthCheckPath: '/health', createdAt: new Date().toISOString() },
      { id: 'up-db-core', gatewayId: 'gw-core-01', upstreamName: 'database-platform-upstream', algorithm: 'least_conn', healthCheckPath: '/health', createdAt: new Date().toISOString() },
      { id: 'up-modelops', gatewayId: 'gw-mesh-02', upstreamName: 'modelops-inference-upstream', algorithm: 'round_robin', healthCheckPath: '/health', createdAt: new Date().toISOString() },
    ];

    this.targets = [
      { id: 'utarget-1', upstreamId: 'up-obs-core', targetHost: '10.0.1.10', targetPort: 5000, weight: 100, status: 'healthy', createdAt: new Date().toISOString() },
      { id: 'utarget-2', upstreamId: 'up-db-core', targetHost: '10.0.3.10', targetPort: 5432, weight: 100, status: 'healthy', createdAt: new Date().toISOString() },
    ];
  }

  async getRoutes(gatewayId) {
    if (gatewayId) return this.routes.filter((r) => r.gatewayId === gatewayId);
    return this.routes;
  }

  async createRoute(data) {
    const route = {
      id: `groute-${Date.now()}`,
      gatewayId: data.gatewayId || 'gw-core-01',
      routePath: data.routePath,
      methods: data.methods || 'GET,POST,PUT,DELETE',
      upstreamId: data.upstreamId || 'up-obs-core',
      stripPath: !!data.stripPath,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.routes.push(route);
    return route;
  }

  async getUpstreams() {
    return this.upstreams;
  }

  async getTargets(upstreamId) {
    if (upstreamId) return this.targets.filter((t) => t.upstreamId === upstreamId);
    return this.targets;
  }
}

module.exports = new RoutingService();
