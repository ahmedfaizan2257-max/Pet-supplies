import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, ShieldCheck, Heart, Award, Sparkles, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
}

export default function ProductDetailModal({ product, onClose, onAddToCart }: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        id="detail-modal-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="bg-[#FFFDF7] w-full max-w-2xl rounded-3.5xl overflow-hidden shadow-2xl border-t-8 border-[#FF9F1C] relative max-h-[90vh] flex flex-col"
          id="product-detail-modal"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button top right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-md z-10 transition duration-150 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrolling Modal Content */}
          <div className="overflow-y-auto flex-1 p-6 sm:p-10 space-y-8">
            
            {/* Visual Header / Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-start">
              
              {/* Product Cover */}
              <div className="relative group overflow-hidden rounded-2.5xl bg-white border border-gray-150 p-2 shadow-xs">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 sm:h-64 object-cover rounded-2xl group-hover:scale-102 transition duration-200"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${product.id}/600/600`;
                  }}
                />
                
                {/* Visual Category Label */}
                <span className="absolute top-4 left-4 bg-[#FF9F1C] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                  {product.category}
                </span>
              </div>

              {/* Title & Core Details */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider font-bold">SKU: {product.sku}</span>
                  <h3 className="text-xl sm:text-2xl font-display font-black text-[#2B2D42] tracking-tight leading-tight">
                    {product.name}
                  </h3>
                </div>

                {/* Rating component with standard star formatting */}
                <div className="flex items-center gap-2">
                  <div className="text-[#FF9F1C] text-sm tracking-wider">
                    {'★'.repeat(Math.round(product.rating))}
                    {'☆'.repeat(5 - Math.round(product.rating))}
                  </div>
                  <span className="text-xs text-gray-500 font-bold font-mono">
                    ({product.reviewsCount} reviews &bull; Checked)
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl font-display font-black text-[#FF9F1C]">
                  ${product.price.toFixed(2)} AUD
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-semibold">
                  {product.description}
                </p>

                <div className="flex items-center gap-3.5 pt-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#2EC4B6] bg-[#CBF3F0] px-3 py-1 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" /> Direct Stock AU
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#FF9F1C] bg-orange-50 px-3 py-1 rounded-full">
                    <Award className="w-3.5 h-3.5" /> Veterinary Curated
                  </div>
                </div>
              </div>

            </div>

            {/* In-depth Specifications Drawer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-gray-150">
              
              {/* Technical Specifications */}
              <div className="space-y-3.5 bg-white p-5 rounded-2.5xl border border-gray-150 shadow-xs">
                <h4 className="font-display font-black text-sm text-[#2B2D42] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#FF9F1C]" /> Product Highlights
                </h4>
                <ul className="text-xs text-gray-600 space-y-2.5 font-bold">
                  {product.specs && Object.entries(product.specs).map(([key, value], index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#2EC4B6] shrink-0 mt-0.5" />
                      <span><strong className="text-[#2B2D42]/85">{key}:</strong> {value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Veterinary Wholesome Benefits */}
              <div className="space-y-3.5 bg-[#CBF3F0]/20 p-5 rounded-2.5xl border border-gray-150 shadow-xs">
                <h4 className="font-display font-black text-sm text-[#2B2D42] uppercase tracking-wider flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#2EC4B6] fill-current" /> Veterinary Benefits
                </h4>
                <ul className="text-xs text-gray-600 space-y-2.5 font-bold">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#2EC4B6] rounded-full shrink-0 mt-1.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Final checkout actions */}
            <div className="pt-6 border-t border-gray-150 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="block text-[10px] text-gray-400 font-mono uppercase tracking-wider font-bold">Fulfillment Standard</span>
                <span className="block text-xs text-[#2B2D42] font-semibold">Ready for secure same-day dispatch from Sydney hub</span>
              </div>
              <div className="flex gap-2.5 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="flex-1 sm:flex-initial bg-white border-2 border-gray-200 text-gray-600 font-bold text-xs px-6 py-3.5 rounded-xl hover:bg-gray-100 transition cursor-pointer"
                >
                  Continue Browsing
                </button>
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="flex-1 sm:flex-initial bg-[#FF9F1C] hover:bg-[#e08910] text-white font-black text-xs px-8 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer hover:scale-101"
                >
                  <ShoppingCart className="w-4 h-4" /> Add to Cart Basket
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
