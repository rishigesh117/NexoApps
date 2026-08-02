/**
 * Payment Methods & Ledger Service
 * NexoApps Platform - Phase 7A (Version 3.0)
 */

class PaymentService {
  getPaymentMethods(tenantId) {
    return [
      {
        id: 'pm-1',
        tenantId: tenantId || 't-1',
        brand: 'Visa',
        last4: '4242',
        expMonth: 12,
        expYear: 2028,
        isDefault: true,
        createdAt: new Date().toISOString(),
      },
    ];
  }
}

module.exports = new PaymentService();
