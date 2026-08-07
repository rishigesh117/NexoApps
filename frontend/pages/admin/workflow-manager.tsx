import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { WorkflowTemplateLibrary } from '../../components/automation/WorkflowTemplateLibrary';
import { ExecutionMonitor } from '../../components/automation/ExecutionMonitor';

export default function AdminWorkflowManagerPage() {
  return (
    <AdminLayout title="Enterprise Workflow Manager | Admin Console">
      <div className="space-y-8 text-left">
        <WorkflowTemplateLibrary />
        <ExecutionMonitor />
      </div>
    </AdminLayout>
  );
}
