import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, ShoppingBag, Brain, Code, Check } from 'lucide-react';
import { productService } from '../../services/productService';
import { Product, ProductCategory } from '../../../shared/types';

export const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    productService.getProducts().then(setProducts);
    productService.getCategories().then(setCategories);
  }, []);

  const filtered = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.categoryId === selectedCategory);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Digital AI Product Catalog</h2>
      
      <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          All Products
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              selectedCategory === cat.id ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map(product => (
          <div key={product.id} className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-slate-600 transition">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                {product.productType === 'ai_model' ? <Brain className="w-6 h-6" /> : <Code className="w-6 h-6" />}
              </div>
              <span className="px-2.5 py-1 bg-slate-700 text-slate-300 rounded text-xs uppercase font-semibold">
                {product.productType.replace('_', ' ')}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{product.title}</h3>
            <p className="text-slate-400 text-sm mb-4 line-clamp-2">{product.description}</p>
            <div className="flex justify-between items-center pt-4 border-t border-slate-700">
              <span className="text-xl font-bold text-white">
                ${product.pricing?.[0]?.price || 49.00}
              </span>
              <button className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
