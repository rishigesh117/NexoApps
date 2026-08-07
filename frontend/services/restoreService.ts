import { RestorePoint, RestoreJob } from '../../shared/types';

export const getDatabaseRestores = async (): Promise<{ points: RestorePoint[]; jobs: RestoreJob[] }> => {
  return {
    points: [
      { id: 'rp-1', clusterId: 'dbc-1', pointInTime: new Date().toISOString(), createdAt: new Date().toISOString() }
    ],
    jobs: [
      { id: 'rj-1', archiveId: 'ba-1', targetClusterId: 'dbc-1', status: 'completed', restoredAt: new Date().toISOString() }
    ]
  };
};
