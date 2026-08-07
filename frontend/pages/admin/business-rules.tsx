import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { BusinessRulesManager } from '../../components/automation/BusinessRulesManager';
import { DecisionTableEditor } from '../../components/automation/DecisionTableEditor';

export default function AdminBusinessRulesPage() {
  return (
    <AdminLayout title="Business Rules Engine & Decision Matrix | Admin Console">
      <div className="space-y-8 text-left">
        <BusinessRulesManager />
        <DecisionTableEditor />
      </div>
    </AdminLayout>
  );
}
