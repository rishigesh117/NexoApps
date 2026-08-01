import React from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '../utils/cn';

interface PasswordStrengthMeterProps {
  password: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const checks = [
    { label: 'Minimum 8 Characters', test: (p: string) => p.length >= 8 },
    { label: 'Uppercase Letter (A-Z)', test: (p: string) => /[A-Z]/.test(p) },
    { label: 'Lowercase Letter (a-z)', test: (p: string) => /[a-z]/.test(p) },
    { label: 'Number (0-9)', test: (p: string) => /[0-9]/.test(p) },
    { label: 'Special Character (!@#$...)', test: (p: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(p) },
  ];

  const passedCount = checks.filter((c) => c.test(password)).length;

  const getStrengthInfo = () => {
    if (password.length === 0) return { label: 'Empty', color: 'bg-surface-200', text: 'text-text-muted', percent: 0 };
    if (passedCount <= 2) return { label: 'Weak', color: 'bg-red-500', text: 'text-red-400', percent: 33 };
    if (passedCount <= 4) return { label: 'Medium', color: 'bg-amber-500', text: 'text-amber-400', percent: 66 };
    return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-400', percent: 100 };
  };

  const strength = getStrengthInfo();

  return (
    <div className="space-y-3 pt-1">
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex justify-between items-center text-[11px]">
          <span className="text-text-muted font-medium">Password Strength:</span>
          <span className={cn('font-bold', strength.text)}>{password.length > 0 ? strength.label : 'None'}</span>
        </div>
        <div className="w-full h-1.5 bg-surface-200 rounded-full overflow-hidden">
          <div
            className={cn('h-full transition-all duration-300', strength.color)}
            style={{ width: `${strength.percent}%` }}
          />
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
        {checks.map((item, idx) => {
          const isPassed = item.test(password);
          return (
            <div
              key={idx}
              className={cn(
                'flex items-center gap-1.5 text-[11px] font-medium transition-colors',
                isPassed ? 'text-emerald-400' : 'text-text-muted'
              )}
            >
              <div
                className={cn(
                  'w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] shrink-0',
                  isPassed ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400' : 'bg-surface-200 text-text-muted'
                )}
              >
                {isPassed ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : <X className="w-2.5 h-2.5" />}
              </div>
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
