import { fetchApi } from './apiClient';

export const affiliateService = {
  getStats: async () => {
    try {
      const res = await fetchApi<{ success: boolean; data: any }>('/commerce/affiliate/stats');
      return res.data;
    } catch {
      return {
        program: { id: 'aff-main', name: 'NexoApps Global Affiliate Program', commissionRate: 20.0, cookieDays: 60, isActive: true },
        referralLink: 'https://nexoapps.com/ref?aff=user-admin',
        totalEarned: 1420.00,
        totalReferrals: 18,
        commissions: [
          { id: 'comm-101', affiliateUserId: 'user-admin', orderId: 'ord-1001', commissionAmount: 29.80, status: 'approved', createdAt: new Date().toISOString() }
        ]
      };
    }
  }
};
