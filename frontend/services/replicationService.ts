import { ReplicationGroup, ReplicationStatus, FailoverEvent } from '../../shared/types';

export const getDatabaseReplication = async (): Promise<{
  groups: ReplicationGroup[];
  statuses: ReplicationStatus[];
  failovers: FailoverEvent[];
}> => {
  return {
    groups: [
      { id: 'rg-1', groupName: 'prod-pg-streaming-group', primaryNodeId: 'dbn-1', replicationMode: 'streaming_async', status: 'active', createdAt: new Date().toISOString() }
    ],
    statuses: [
      { id: 'rs-1', groupId: 'rg-1', replicaNodeId: 'dbn-2', replicationLagMs: 1.2, status: 'in_sync', updatedAt: new Date().toISOString() },
      { id: 'rs-2', groupId: 'rg-1', replicaNodeId: 'dbn-3', replicationLagMs: 2.1, status: 'in_sync', updatedAt: new Date().toISOString() }
    ],
    failovers: [
      { id: 'fo-1', clusterId: 'dbc-1', oldPrimaryId: 'dbn-3', newPrimaryId: 'dbn-1', failoverReason: 'Automatic leader election promotion (Patroni HA)', triggeredAt: new Date().toISOString() }
    ]
  };
};
