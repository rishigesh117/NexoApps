/**
 * Commerce Service — NexoApps Phase 10A
 * Core commerce orchestrator for orders, cart, wishlist, and settings.
 */

class CommerceService {
  constructor() {
    this.cart = [
      { id: 'cart-1', userId: 'user-admin', productId: 'prod-101', quantity: 1, createdAt: new Date().toISOString() }
    ];
    this.wishlist = [
      { id: 'wish-1', userId: 'user-admin', productId: 'prod-102', createdAt: new Date().toISOString() }
    ];
    this.orders = [
      {
        id: 'ord-1001',
        userId: 'user-admin',
        orderNumber: 'NXO-ORD-2026-001',
        status: 'completed',
        totalAmount: 149.00,
        currency: 'USD',
        taxAmount: 12.00,
        discountAmount: 10.00,
        couponCode: 'WELCOME10',
        createdAt: new Date().toISOString()
      }
    ];
  }

  async getCart(userId = 'user-admin') {
    return this.cart.filter(item => item.userId === userId);
  }

  async addToCart(userId, productId, quantity = 1) {
    const existing = this.cart.find(c => c.userId === userId && c.productId === productId);
    if (existing) {
      existing.quantity += quantity;
      return existing;
    }
    const item = { id: `cart-${Date.now()}`, userId, productId, quantity, createdAt: new Date().toISOString() };
    this.cart.push(item);
    return item;
  }

  async removeFromCart(userId, productId) {
    this.cart = this.cart.filter(c => !(c.userId === userId && c.productId === productId));
    return { success: true };
  }

  async getWishlist(userId = 'user-admin') {
    return this.wishlist.filter(w => w.userId === userId);
  }

  async toggleWishlist(userId, productId) {
    const index = this.wishlist.findIndex(w => w.userId === userId && w.productId === productId);
    if (index >= 0) {
      this.wishlist.splice(index, 1);
      return { added: false };
    }
    const item = { id: `wish-${Date.now()}`, userId, productId, createdAt: new Date().toISOString() };
    this.wishlist.push(item);
    return { added: true, item };
  }

  async getOrders(userId = 'user-admin') {
    return this.orders.filter(o => o.userId === userId);
  }

  async createOrder(userId, orderData) {
    const order = {
      id: `ord-${Date.now()}`,
      userId,
      orderNumber: `NXO-ORD-${Date.now()}`,
      status: 'completed',
      totalAmount: orderData.totalAmount || 99.00,
      currency: orderData.currency || 'USD',
      taxAmount: orderData.taxAmount || 0,
      discountAmount: orderData.discountAmount || 0,
      couponCode: orderData.couponCode || null,
      createdAt: new Date().toISOString()
    };
    this.orders.push(order);
    return order;
  }
}

module.exports = new CommerceService();
