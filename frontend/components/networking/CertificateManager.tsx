import React, { useEffect, useState } from 'react';
import { Lock, ShieldCheck } from 'lucide-react';
import { certificateService } from '../../services/certificateService';
import { SslCertificate } from '../../../shared/types';

export const CertificateManager: React.FC = () => {
  const [certs, setCerts] = useState<SslCertificate[]>([]);

  useEffect(() => {
    certificateService.getCertificates().then((res) => setCerts(res));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-brand-cyan" /> SSL/TLS Certificate Manager & Binding Authority
        </h2>
        <span className="text-xs text-text-muted">{certs.length} certificates</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certs.map((c) => (
          <div key={c.id} className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                {c.status}
              </span>
              <span className="text-xs text-text-muted">Issuer: {c.issuer}</span>
            </div>
            <h3 className="font-bold text-white text-base font-display">{c.domainName}</h3>
            <div className="text-xs text-text-muted pt-2 border-t border-white/10">
              Expires: <strong className="text-white">{new Date(c.expiresAt).toLocaleDateString()}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
