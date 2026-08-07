/**
 * Seller Service — NexoApps Phase 10A
 * Manages marketplace seller accounts, product submissions, and revenue payouts.
 */

class SellerService {
  constructor() {
    this.sellers = [
      {
        id: 'seller-1',
        userId: 'user-admin',
        storeName: 'Nexo AI Labs',
        storeSlug: 'nexo-ai-labs',
        bio: 'Official premium AI algorithms and models developer team.',
        status: 'approved',
        rating: 4.9,
        createdAt: new Date().toISOString()
      }
    ];
    this.payouts = [
      {
        id: 'pay-out-1',
        sellerId: 'seller-1',
        amount: 1450.00,
        status: 'completed',
        payoutMethod: 'bank_transfer',
        processedAt: new Date().toISOString()
      }
    ];
  }

  async getSellerAccount(userId = 'user-admin') {
    return this.sellers.find(s => s.userId === userId) || this.sellers[0];
  }

  async getPayouts(sellerId = 'seller-1') {
    return this.payouts.filter(p => p.sellerId === sellerId);
  }

  async requestPayout(sellerId, amount) {
    const payout = {
      id: `payout-${Date.now()}`,
      sellerId,
      amount,
      status: 'processing',
      payoutMethod: 'bank_transfer',
      processedAt: new Date().toISOString()
    };
    this.payouts.push(payout);
    return payout;
  }
}

module.exports = new SellerService();
