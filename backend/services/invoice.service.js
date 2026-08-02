/**
 * Invoice Generation Service
 * NexoApps Platform - Phase 7A (Version 3.0)
 */

class InvoiceService {
  constructor() {
    this.invoices = [
      {
        id: 'inv-101',
        tenantId: 't-1',
        tenantName: 'Batlytics Sports Inc.',
        invoiceNumber: 'INV-2026-0801',
        amountDue: 299.00,
        amountPaid: 299.00,
        status: 'PAID',
        pdfUrl: 'https://api.nexoapps.dev/v1/invoices/inv-101/pdf',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        id: 'inv-102',
        tenantId: 't-2',
        tenantName: 'Nexo AI Developer Org',
        invoiceNumber: 'INV-2026-0802',
        amountDue: 99.00,
        amountPaid: 99.00,
        status: 'PAID',
        pdfUrl: 'https://api.nexoapps.dev/v1/invoices/inv-102/pdf',
        createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      },
    ];
  }

  getInvoices(tenantId) {
    return this.invoices;
  }
}

module.exports = new InvoiceService();
