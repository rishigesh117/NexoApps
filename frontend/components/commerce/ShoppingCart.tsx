import React, { useState, useEffect } from 'react';
import { ShoppingCart as CartIcon, Trash2, ArrowRight } from 'lucide-react';
import { commerceService } from '../../services/commerceService';
import { ShoppingCart as CartType } from '../../../shared/types';

export const ShoppingCart: React.FC = () => {
  const [cart, setCart] = useState<CartType[]>([]);

  useEffect(() => {
    commerceService.getCart().then(setCart);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <CartIcon className="w-6 h-6 text-blue-400" /> Shopping Cart
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-white">NexoVision Pro AI Vision Model</h4>
                <span className="text-sm text-slate-400">Qty: {item.quantity}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-lg font-bold text-white">$149.00</span>
                <button className="text-red-400 hover:text-red-300 transition">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-fit">
          <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm text-slate-300 mb-4">
            <div className="flex justify-between"><span>Subtotal</span><span>$149.00</span></div>
            <div className="flex justify-between"><span>Estimated Tax</span><span>$12.00</span></div>
            <div className="flex justify-between font-bold text-white text-base pt-2 border-t border-slate-700">
              <span>Total</span><span>$161.00</span>
            </div>
          </div>
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2">
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
