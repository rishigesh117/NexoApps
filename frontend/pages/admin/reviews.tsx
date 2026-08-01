import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { RecentReviews } from '../../components/admin/RecentReviews';
import { adminService } from '../../services/adminService';
import { Review } from '../../types';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getReviews();
      setReviews(data || []);
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleModerate = async (reviewId: string, action: string) => {
    if (confirm('Are you sure you want to moderate/delete this review?')) {
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    }
  };

  return (
    <AdminLayout title="Reviews Moderation Queue | NexoApps Admin">
      <div className="space-y-6 text-left">
        <RecentReviews reviews={reviews} onModerate={handleModerate} />
      </div>
    </AdminLayout>
  );
}
