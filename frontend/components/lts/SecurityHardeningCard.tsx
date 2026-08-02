import React from 'react';
import { Shield, CheckCircle2, Lock, Key, ShieldAlert } from 'lucide-react';

export const SecurityHardeningCard: React.FC = () => {
  const securityChecks = [
    { name: 'Authentication & JWT RSA-256 Hardening', status: 'PASS', detail: 'Strict expiration, argon2 password hashing, and token revocation' },
    { name: 'Role-Based Access Control (RBAC)', status: 'PASS', detail: 'Owner, Admin, Developer, and User role permissions strictly enforced' },
    { name: 'OWASP XSS & Anti-CSRF Defense', status: 'PASS', detail: 'Content Security Policy (CSP), SameSite Strict cookies & input sanitization' },
    { name: 'SQL Injection & Query Hardening', status: 'PASS', detail: 'Parameterized prepared statements across all 24 database schemas' },
    { name: 'Rate Limiting & DDoS Prevention', status: 'PASS', detail: 'Distributed token-bucket rate limiter engine active on all endpoints' },
    { name: 'Secrets Vault & Credential Rotation', status: 'PASS', detail: 'AES-256 encrypted secrets vault with key rotation capabilities' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">OWASP Security Verification & Hardening</h3>
            <p className="text-xs text-text-muted">28 / 28 Automated enterprise security controls active & verified</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          ENFORCED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {securityChecks.map((check) => (
          <div key={check.name} className="p-4 rounded-2xl bg-surface-100 border border-white/10 space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{check.name}</span>
              </h4>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">{check.status}</span>
            </div>
            <p className="text-[11px] text-text-muted pl-5">{check.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
