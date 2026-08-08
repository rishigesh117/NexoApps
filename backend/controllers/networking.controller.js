/**
 * Networking Overview Controller — NexoApps Phase 12D (v9.4)
 */

const gatewayAnalyticsService = require('../services/gateway_analytics.service');
const networkHealthService = require('../services/network_health.service');
const apiGatewayService = require('../services/api_gateway.service');
const dnsService = require('../services/dns.service');
const certificateService = require('../services/certificate.service');
const wafService = require('../services/waf.service');

class NetworkingController {
  async getOverview(req, res) {
    try {
      const analytics = await gatewayAnalyticsService.getAnalyticsSummary();
      const health = await networkHealthService.getOverview();
      const gateways = await apiGatewayService.getGateways();
      const zones = await dnsService.getZones();
      const certs = await certificateService.getCertificates();
      const wafPolicies = await wafService.getPolicies();

      res.json({
        success: true,
        data: {
          version: '9.4.0',
          analytics,
          health,
          gatewaysCount: gateways.length,
          dnsZonesCount: zones.length,
          certificatesCount: certs.length,
          wafPoliciesCount: wafPolicies.length,
        },
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getHealth(req, res) {
    try {
      const health = await networkHealthService.getHealthStatus();
      const overview = await networkHealthService.getOverview();
      res.json({ success: true, data: { status: overview, components: health } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getAnalytics(req, res) {
    try {
      const summary = await gatewayAnalyticsService.getAnalyticsSummary();
      const metrics = await gatewayAnalyticsService.getMetrics();
      const stats = await gatewayAnalyticsService.getTrafficStats();
      res.json({ success: true, data: { summary, metrics, stats } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new NetworkingController();
