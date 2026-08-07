import React from 'react';
import { Star, ShieldCheck, Download, ShoppingBag, Check } from 'lucide-react';

export const ProductDetails: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <div className="max-w-4xl mx-auto bg-slate-800 rounded-xl p-8 border border-slate-700">
        <h1 className="text-3xl font-bold text-white mb-2">NexoVision Pro AI Vision Model</h1>
        <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
          <span className="flex items-center gap-1 text-amber-400"><Star className="w-4 h-4 fill-amber-400" /> 4.9 (128 Reviews)</span>
          <span>Version 7.1 Verified</span>
          <span className="text-emerald-400 flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Enterprise License</span>
        </div>

        <p className="text-slate-300 mb-6">
          Ultra-fast real-time vision analytics model for enterprise automation, computer vision pipelines, edge deployment, and automatic object detection.
        </p>

        <div className="bg-slate-900/60 rounded-lg p-5 border border-slate-700/60 mb-6">
          <h3 className="text-base font-semibold text-white mb-3">Core Features Included</h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Real-time 120 FPS Inference</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Multi-Camera Stream Parsing</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> ONNX & TensorRT Weights</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Commercial Usage License</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-slate-700">
          <div>
            <span className="text-xs text-slate-400 block">One-time Commercial License</span>
            <span className="text-3xl font-bold text-white">$149.00</span>
          </div>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
