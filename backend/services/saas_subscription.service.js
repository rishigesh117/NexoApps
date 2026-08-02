/**
 * SaaS Subscription Plans Service
 * NexoApps Platform - Phase 7A (Version 3.0)
 */

class SaasSubscriptionService {
  getPlans() {
    return [
      {
        id: 'plan-free',
        name: 'Free Starter',
        slug: 'free',
        priceMonthly: 0,
        priceYearly: 0,
        storageGb: 5,
        apiRequestsPerMonth: 10000,
        maxMembers: 2,
        features: ['1 AI Builder Project', 'Community Agents Support', 'Basic Cloud Sync'],
        isActive: true,
      },
      {
        id: 'plan-starter',
        name: 'Developer Starter',
        slug: 'starter',
        priceMonthly: 29.00,
        priceYearly: 290.00,
        storageGb: 20,
        apiRequestsPerMonth: 50000,
        maxMembers: 5,
        features: ['Unlimited AI Builder Projects', '5 Autonomous Agents', 'Standard Inference Endpoint'],
        isActive: true,
      },
      {
        id: 'plan-pro',
        name: 'Professional Team',
        slug: 'professional',
        priceMonthly: 99.00,
        priceYearly: 990.00,
        storageGb: 100,
        apiRequestsPerMonth: 250000,
        maxMembers: 15,
        features: ['Custom Domain CNAME', 'White-Label Branding', 'Multi-Agent Swarms', '24/7 Dedicated Support'],
        isActive: true,
      },
      {
        id: 'plan-ent',
        name: 'Enterprise Scale',
        slug: 'enterprise',
        priceMonthly: 299.00,
        priceYearly: 2990.00,
        storageGb: 1000,
        apiRequestsPerMonth: 1000000,
        maxMembers: 100,
        features: ['Dedicated GPU Cluster', 'Custom SLA', 'Audit Log Retention', 'Unlimited Team Members'],
        isActive: true,
      },
    ];
  }
}

module.exports = new SaasSubscriptionService();
