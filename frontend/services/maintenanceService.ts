import { fetchApi } from './apiClient';
import { MaintenanceWindow, EnterpriseSupport } from '../../shared/types';

export const maintenanceService = {
  getWindows: async (): Promise<MaintenanceWindow[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: MaintenanceWindow[] }>('/platform/maintenance/windows');
      return res.data;
    } catch {
      return [
        { id: 'maint-101', title: 'Q3 Automated Database Index Defrag', startTime: new Date(Date.now() + 864000000).toISOString(), endTime: new Date(Date.now() + 867600000).toISOString(), status: 'scheduled' }
      ];
    }
  },

  getTickets: async (): Promise<EnterpriseSupport[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: EnterpriseSupport[] }>('/platform/maintenance/support-tickets');
      return res.data;
    } catch {
      return [
        { id: 'supp-101', ticketId: 'TICK-9081', subject: '24/7 Priority Support SLA Health Check', severity: 'normal', status: 'resolved', createdAt: new Date().toISOString() }
      ];
    }
  }
};
