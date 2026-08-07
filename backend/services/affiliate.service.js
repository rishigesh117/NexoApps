/**
 * Affiliate Service — NexoApps Phase 10A
 * Manages affiliate program referral links, tracking, and commission payouts.
 */

class AffiliateService {
  constructor() {
    this.program = { id: 'aff-main', name: 'NexoApps Global Affiliate Program', commissionRate: 20.0, cookieDays: 60, isActive: true };
    this.commissions = [
      { id: 'comm-101', affiliateUserId: 'user-admin', orderId: 'ord-1001', commissionAmount: 29.80, status: 'approved', createdAt: new Date().toISOString() }
    ];
  }

  async getAffiliateStats(userId = 'user-admin') {
    const userCommissions = this.commissions.filter(c => c.affiliateUserId === userId);
    const totalEarned = userCommissions.reduce((acc, curr) => acc + curr.commissionAmount, 0);
    return {
      program: this.program,
      referralLink: `https://nexoapps.com/ref?aff=${userId}`,
      totalEarned,
      totalReferrals: userCommissions.length,
      commissions: userCommissions
    };
  }
}

module.exports = new AffiliateService();
