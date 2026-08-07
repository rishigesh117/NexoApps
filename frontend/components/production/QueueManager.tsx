import React, { useEffect, useState } from 'react';
import { Layers, Plus, CheckCircle2 } from 'lucide-react';
import { getQueues } from '../../services/queueService';
import { MessageQueue } from '../../../shared/types';

export const QueueManager: React.FC = () => {
  const [queues, setQueues] = useState<MessageQueue[]>([]);

  useEffect(() => {
    getQueues().then(setQueues);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Layers className="w-6 h-6 text-brand-cyan" /> Message Queue & Event Stream Manager
        </h2>
        <p className="text-text-muted text-sm">RabbitMQ & Kafka topic partitions, active messages and consumer listeners</p>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
        {queues.map((q) => (
          <div key={q.id} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white text-sm">{q.queueName}</h4>
              <p className="text-text-muted text-xs">Engine: {q.queueType} • Active Consumers: {q.consumersCount}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-text-muted uppercase">Pending Messages</span>
              <div className="text-lg font-bold text-brand-cyan">{(q.messagesCount || 0).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
