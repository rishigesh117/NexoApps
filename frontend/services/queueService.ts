import { MessageQueue, BackgroundJob, JobSchedule } from '../../shared/types';

export const getQueues = async (): Promise<MessageQueue[]> => {
  return [
    { id: 'mq-1', queueName: 'production-task-queue', queueType: 'rabbitmq', messagesCount: 42, consumersCount: 8, status: 'active', createdAt: new Date().toISOString() },
    { id: 'mq-2', queueName: 'telemetry-event-queue', queueType: 'kafka', messagesCount: 1250, consumersCount: 12, status: 'active', createdAt: new Date().toISOString() }
  ];
};

export const getBackgroundJobs = async (): Promise<{ jobs: BackgroundJob[]; schedules: JobSchedule[] }> => {
  return {
    jobs: [
      { id: 'job-1', jobName: 'Nightly Database Vacuum & Index Optimization', jobType: 'maintenance', status: 'completed', createdAt: new Date().toISOString() },
      { id: 'job-2', jobName: 'ModelOps Artifact Sync Worker', jobType: 'sync', status: 'running', createdAt: new Date().toISOString() }
    ],
    schedules: [
      { id: 'sch-1', scheduleName: 'Hourly Health Telemetry Check', cronExpression: '0 * * * *', isActive: true, createdAt: new Date().toISOString() }
    ]
  };
};
