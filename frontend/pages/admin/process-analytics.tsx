import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { WorkflowAnalytics } from '../../components/automation/WorkflowAnalytics';
import { RecommendationCenter } from '../../components/automation/RecommendationCenter';

export default function AdminProcessAnalyticsPage() {
  return (
    <AdminLayout title="Process Analytics & ROI Telemetry | Admin Console">
      <div className="space-y-8 text-left">
        <WorkflowAnalytics />
        <RecommendationCenter />
      </div>
    </AdminLayout>
  );
}
