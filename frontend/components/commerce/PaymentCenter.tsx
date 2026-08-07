import React, { useState, useEffect } from 'react';
import { CreditCard, ShieldCheck } from 'lucide-react';
import { paymentService } from '../../services/paymentService';
import { PaymentGateway } from '../../../shared/types';

export const PaymentCenter: React.FC = () => {
  const [gateways, setGateways] = useState<PaymentGateway[]>([]);

  useEffect(() => {
    paymentService.getGateways().then(setGateways);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Payment Orchestration Center</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {gateways.map(gw => (
          <div key={gw.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-6 h-6 text-blue-400" />
              <h3 className="font-semibold text-white">{gw.gatewayName}</h3>
            </div>
            <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold">
              Status: Active
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
