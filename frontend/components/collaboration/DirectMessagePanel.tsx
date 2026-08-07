import React, { useEffect, useState } from 'react';
import { User, MessageSquare, Send } from 'lucide-react';
import { getDirectMessages } from '../../services/messagingService';
import { DirectMessage } from '../../../shared/types';

export const DirectMessagePanel: React.FC = () => {
  const [dms, setDms] = useState<DirectMessage[]>([]);

  useEffect(() => {
    getDirectMessages().then(setDms);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-brand-cyan" /> Direct Messaging
        </h2>
        <p className="text-text-muted text-sm">Secure 1-on-1 team communications</p>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
        {dms.map((dm) => (
          <div key={dm.id} className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-brand-cyan">{dm.senderId} → {dm.recipientId}</span>
                <p className="text-sm text-white">{dm.content}</p>
              </div>
            </div>
            <span className="text-xs text-text-muted">{new Date(dm.createdAt).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
