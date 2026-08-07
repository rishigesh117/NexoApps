import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';
import { datasetService } from '../../services/datasetService';
import { FeatureStore } from '../../../shared/types';

export const FeatureStoreManager: React.FC = () => {
  const [stores, setStores] = useState<FeatureStore[]>([]);

  useEffect(() => {
    datasetService.getFeatureStores().then(setStores);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Real-Time ML Feature Store (Feast / Redis / Iceberg)</h2>
      <div className="space-y-4 max-w-4xl">
        {stores.map(s => (
          <div key={s.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="font-semibold text-white text-lg flex items-center gap-2 mb-2">
              <Layers className="w-5 h-5 text-indigo-400" /> {s.storeName}
            </h3>
            <p className="text-xs text-slate-400 font-mono">Online Serving: {s.onlineEngine} | Offline Serving: {s.offlineEngine}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
