import { fetchApi } from './apiClient';
import { Invoice } from '../../shared/types';

export const getInvoices = async (): Promise<Invoice[]> => {
  try {
    const res = await fetchApi<{ success: boolean; data: Invoice[] }>('/commerce/invoices');
    return res.data;
  } catch {
    return [
      {
        id: 'inv-1001',
        tenantId: 'tenant-1',
        invoiceNumber: 'INV-2026-0001',
        amountDue: 149.00,
        amountPaid: 149.00,
        status: 'PAID',
        createdAt: new Date().toISOString()
      }
    ];
  }
};

export const invoiceService = {
  getInvoices,
  getUserInvoices: async (): Promise<Invoice[]> => getInvoices()
};
