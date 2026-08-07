import React, { useState, useEffect } from 'react';
import { Radio, Activity } from 'lucide-react';
import { streamingService } from '../../services/streamingService';
import { StreamingTopic } from '../../../shared/types';

export const StreamingMonitor: React.FC = () => {
  const [topics, setTopics] = useState<StreamingTopic[]>([]);

  useEffect(() => {
    streamingService.getTopics().then(setTopics);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Real-Time Streaming & Kafka Topic Monitor</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topics.map(t => (
          <div key={t.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-white font-mono flex items-center gap-2">
                <Radio className="w-5 h-5 text-purple-400" /> {t.topicName}
              </h3>
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold uppercase">{t.status}</span>
            </div>
            <p className="text-xs text-slate-400 font-mono">{t.partitions} Partitions / {t.replicationFactor}x Replication</p>
          </div>
        ))}
      </div>
    </div>
  );
};
