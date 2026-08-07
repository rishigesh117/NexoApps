import React, { useState } from 'react';
import { CreditCard, CheckCircle, Shield } from 'lucide-react';
import { paymentService } from '../../services/paymentService';

export const CheckoutWizard: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleComplete = async () => {
    setIsProcessing(true);
    await paymentService.processPayment({ amount: 161.00 });
    setIsProcessing(false);
    setStep(3);
  };

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <div className="max-w-2xl mx-auto bg-slate-800 p-8 rounded-xl border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-6">Secure Checkout Wizard</h2>

        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Select Payment Method</h3>
            <div className="space-y-3 mb-6">
              <label className="flex items-center p-4 bg-slate-900/60 rounded-lg border border-blue-500/50 cursor-pointer">
                <input type="radio" name="pay" defaultChecked className="mr-3" />
                <CreditCard className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-white font-medium">Stripe Credit / Debit Card</span>
              </label>
            </div>
            <button onClick={() => setStep(2)} className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold">
              Continue to Payment Details
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 font-mono">Total Due: $161.00</h3>
            <button
              onClick={handleComplete}
              disabled={isProcessing}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold"
            >
              {isProcessing ? 'Processing Transaction...' : 'Pay $161.00 Now'}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Order Confirmed!</h3>
            <p className="text-slate-400">Your digital license key has been generated and emailed to your account.</p>
          </div>
        )}
      </div>
    </div>
  );
};
