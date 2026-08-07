/**
 * Coupon Service — NexoApps Phase 10A
 * Manages promotional discount codes, validity checks, and campaign rules.
 */

class CouponService {
  constructor() {
    this.coupons = [
      { id: 'c-1', code: 'WELCOME10', discountType: 'percentage', discountValue: 10, maxUses: 500, usedCount: 42, isActive: true, createdAt: new Date().toISOString() },
      { id: 'c-2', code: 'NEXOSUMMIT50', discountType: 'fixed', discountValue: 50, maxUses: 100, usedCount: 15, isActive: true, createdAt: new Date().toISOString() }
    ];
  }

  async validateCoupon(code) {
    const coupon = this.coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.isActive);
    if (!coupon) return { valid: false, message: 'Invalid or expired coupon code' };
    if (coupon.usedCount >= coupon.maxUses) return { valid: false, message: 'Coupon usage limit exceeded' };
    return { valid: true, coupon };
  }

  async getCoupons() {
    return this.coupons;
  }
}

module.exports = new CouponService();
