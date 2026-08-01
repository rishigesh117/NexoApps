import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { MainLayout } from '../layouts/MainLayout';
import { PageHeader } from '../components/ui/PageHeader';
import { PopularCategories } from '../components/PopularCategories';

export default function CategoriesPage() {
  return (
    <>
      <SEOHead
        title="Application Categories | NexoApps Platform"
        description="Discover NexoApps products by category: Sports, AI, Education, Utilities, Business, and Games."
        canonicalUrl="https://nexoapps.com/categories"
      />

      <MainLayout>
        <PageHeader
          title="App Categories"
          description="Browse products organized across sports scoring, artificial intelligence, educational portals, utility tools, and desktop software."
        />

        <div className="pb-12">
          <PopularCategories />
        </div>
      </MainLayout>
    </>
  );
}
