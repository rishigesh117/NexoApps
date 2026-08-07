import { StorageProvider, StorageBucket, StorageObject, CDNConfiguration } from '../../shared/types';

export const getStorageData = async (): Promise<{
  providers: StorageProvider[];
  buckets: StorageBucket[];
  objects: StorageObject[];
  cdns: CDNConfiguration[];
}> => {
  return {
    providers: [
      { id: 'sp-1', providerName: 'AWS S3 Cloud Storage', providerType: 's3_compatible', status: 'active', createdAt: new Date().toISOString() }
    ],
    buckets: [
      { id: 'sb-1', providerId: 'sp-1', bucketName: 'nexo-production-assets', region: 'us-east-1', createdAt: new Date().toISOString() },
      { id: 'sb-2', providerId: 'sp-1', bucketName: 'nexo-modelops-artifacts', region: 'us-east-1', createdAt: new Date().toISOString() }
    ],
    objects: [
      { id: 'so-1', bucketId: 'sb-1', objectKey: 'builds/v9.1-production-bundle.tar.gz', sizeBytes: 524288000, contentType: 'application/gzip', uploadedAt: new Date().toISOString() }
    ],
    cdns: [
      { id: 'cdn-1', domainName: 'cdn.nexoapps.com', originUrl: 'https://origin.nexoapps.internal', status: 'active', createdAt: new Date().toISOString() }
    ]
  };
};

export const getVolumes = async (): Promise<any[]> => {
  return [
    { id: 'vol-1', name: 'nvme-vol-01', sizeGb: 500, volumeType: 'nvme_ssd', status: 'attached' }
  ];
};

export const getBuckets = async (): Promise<StorageBucket[]> => {
  return [
    { id: 'sb-1', providerId: 'sp-1', bucketName: 'nexo-production-assets', region: 'us-east-1', createdAt: new Date().toISOString() }
  ];
};

export const storageService = {
  getStorageData,
  getVolumes,
  getBuckets
};


