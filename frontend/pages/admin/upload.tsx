import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { OwnerAccessDenied } from '../../components/admin/upload/OwnerAccessDenied';
import { UploadWizardHeader } from '../../components/admin/upload/UploadWizardHeader';
import { Step1BasicInfo } from '../../components/admin/upload/Step1BasicInfo';
import { Step2Media } from '../../components/admin/upload/Step2Media';
import { Step3ApkUpload } from '../../components/admin/upload/Step3ApkUpload';
import { Step4StoreInfo } from '../../components/admin/upload/Step4StoreInfo';
import { Step5Features } from '../../components/admin/upload/Step5Features';
import { Step6ReleaseNotes } from '../../components/admin/upload/Step6ReleaseNotes';
import { Step7Preview } from '../../components/admin/upload/Step7Preview';
import { Step8Publish } from '../../components/admin/upload/Step8Publish';
import { UploadWizardState } from '../../types';

export default function OwnerUploadPage() {
  const { user, role, isAuthenticated } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<UploadWizardState>({
    title: '',
    packageName: '',
    slug: '',
    tagline: '',
    description: '',
    category: 'Android Apps',
    tags: ['Android', 'APK'],
    version: '1.0.0',
    buildNumber: 1,
    fileSize: '25.0 MB',
    releaseDate: new Date().toISOString().split('T')[0],
    lastUpdated: new Date().toISOString().split('T')[0],

    iconUrl: '📱',
    bannerUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512719994953-eabf50895df7?q=80&w=600&auto=format&fit=crop',
    ],

    apkFile: '',
    apkSize: '25.0 MB',
    apkChecksum: '',
    uploadProgress: 0,
    isUploading: false,

    developerName: 'NexoApps Studio',
    developerEmail: 'developer@nexoapps.com',
    developerWebsite: 'https://nexoapps.com',
    privacyPolicyUrl: 'https://nexoapps.com/privacy',
    supportEmail: 'support@nexoapps.com',
    minAndroidVersion: 'Android 8.0 (Oreo)',
    targetAndroidVersion: 'Android 14.0 (API 34)',
    permissions: ['Internet', 'Storage', 'Notifications'],

    features: [
      'Ball by Ball Live Scoring & Fast Over Entry',
      'Deep Player Performance & Economy Analytics',
      'Offline Match Storage with Automatic Cloud Sync',
      'Instant PDF Match Summary Generator',
    ],

    releaseNotes: 'Initial production release for NexoApps platform catalog.',
    bugFixes: 'Optimized PDF export render speed',
    knownIssues: '',
    comingSoon: 'Voice commentary synthesis & Bluetooth scorekeeper sync',

    status: 'Published',
    isDraft: false,
    isArchived: false,
    isFeatured: true,
    isTrending: false,
    isEditorsChoice: false,
    visibility: 'Public',
  });

  const updateField = (field: keyof UploadWizardState, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Grant access if user is authenticated and has OWNER or ADMIN role
  const isAuthorized = isAuthenticated && (role === 'OWNER' || role === 'ADMIN' || user?.email?.toLowerCase() === 'rishigesh720@gmail.com');

  if (!isAuthorized) {
    return <OwnerAccessDenied />;
  }

  return (
    <AdminLayout
      title="Owner Upload Portal | NexoApps Console"
      description="Upload and publish new Android applications to NexoApps catalog."
    >
      <div className="space-y-6">
        
        {/* Wizard Stepper Header */}
        <UploadWizardHeader
          currentStep={currentStep}
          onStepClick={(step) => setCurrentStep(step)}
        />

        {/* Wizard Steps */}
        {currentStep === 1 && (
          <Step1BasicInfo
            formData={formData}
            onChange={updateField}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <Step2Media
            formData={formData}
            onChange={updateField}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <Step3ApkUpload
            formData={formData}
            onChange={updateField}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && (
          <Step4StoreInfo
            formData={formData}
            onChange={updateField}
            onNext={() => setCurrentStep(5)}
            onBack={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 5 && (
          <Step5Features
            formData={formData}
            onChange={updateField}
            onNext={() => setCurrentStep(6)}
            onBack={() => setCurrentStep(4)}
          />
        )}

        {currentStep === 6 && (
          <Step6ReleaseNotes
            formData={formData}
            onChange={updateField}
            onNext={() => setCurrentStep(7)}
            onBack={() => setCurrentStep(5)}
          />
        )}

        {currentStep === 7 && (
          <Step7Preview
            formData={formData}
            onNext={() => setCurrentStep(8)}
            onBack={() => setCurrentStep(6)}
          />
        )}

        {currentStep === 8 && (
          <Step8Publish
            formData={formData}
            onChange={updateField}
            onBack={() => setCurrentStep(7)}
          />
        )}
      </div>
    </AdminLayout>
  );
}
