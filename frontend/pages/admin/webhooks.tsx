import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getWebhooks } from '../../services/webhookService';
import { Webhook } from '../../types';
import { Webhook as WebhookIcon, CheckCircle2 } from 'lucide-react';

export default function AdminWebhooksPage() {
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);

  useEffect(() => {
    getWebhooks().then((data) => setWebhooks(data)).catch(() => {});
  }, []);

  return (
    <AdminLayout title="Admin Webhooks Delivery Monitor | NexoApps Admin">
      <div className="space-y-8 text-left">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <WebhookIcon className="w-6 h-6 text-emerald-400" /> Platform Webhooks Delivery & Retry Monitor
          </h1>
          <p className="text-xs text-text-secondary">
            Monitor real-time webhook payload dispatches, response HTTP status codes, and retry queues.
          </p>
        </div>

        <div className="space-y-4">
          {webhooks.map((wh) => (
            <div key={wh.id} className="glass-panel p-5 rounded-3xl border border-white/10 flex items-center justify-between gap-4 shadow-2xl">
              <div className="space-y-1">
                <h4 className="font-extrabold text-white text-sm font-mono">{wh.targetUrl}</h4>
                <p className="text-xs text-text-muted">Events: {wh.events.join(', ')}</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Active
              </span>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
