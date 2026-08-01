import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { SubmissionQueueTable } from '../../components/admin/SubmissionQueueTable';
import { developerService } from '../../services/developerService';
import { SubmissionItemRecord } from '../../types';

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<SubmissionItemRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchQueue = async () => {
    setIsLoading(true);
    try {
      const data = await developerService.getSubmissionQueue();
      setSubmissions(data || []);
    } catch {
      // Demo fallback
      setSubmissions([
        {
          id: 'sub-001',
          appId: 'batlytics-001',
          developerId: 'dev-prof-1',
          submissionType: 'New Release',
          appTitle: 'Batlytics',
          versionName: '1.0.0-beta',
          buildNumber: 1,
          category: 'Android Apps',
          changesSummary: 'Initial production build submission for cricket scoring engine.',
          status: 'Pending Review',
          createdAt: new Date().toISOString(),
          developer: {
            studioName: 'Batlytics Studio',
            displayName: 'Batlytics Dev',
            email: 'developer@batlytics.com',
          },
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  return (
    <AdminLayout title="Submission Review Queue | NexoApps Admin">
      <SubmissionQueueTable submissions={submissions} onRefresh={fetchQueue} />
    </AdminLayout>
  );
}
