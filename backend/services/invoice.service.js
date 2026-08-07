/**
 * Invoice Service — NexoApps Phase 10A
 * Generates automated billing invoices, receipt verification, and tax statements.
 */

class InvoiceService {
  constructor() {
    this.invoices = [
      {
        id: 'inv-1001',
        orderId: 'ord-1001',
        invoiceNumber: 'INV-2026-0001',
        userId: 'user-admin',
        amount: 149.00,
        taxAmount: 12.00,
        status: 'paid',
        dueDate: new Date().toISOString(),
        paidAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      }
    ];
  }

  async getUserInvoices(userId = 'user-admin') {
    return this.invoices.filter(i => i.userId === userId);
  }

  async getInvoiceById(id) {
    return this.invoices.find(i => i.id === id || i.invoiceNumber === id) || this.invoices[0];
  }

  async generateInvoice(order) {
    const invoice = {
      id: `inv-${Date.now()}`,
      orderId: order.id,
      invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: order.userId,
      amount: order.totalAmount,
      taxAmount: order.taxAmount || 0,
      status: 'paid',
      dueDate: new Date().toISOString(),
      paidAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    this.invoices.push(invoice);
    return invoice;
  }
}

module.exports = new InvoiceService();
