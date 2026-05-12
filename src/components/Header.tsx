import React from 'react';
import { ShoppingBag, Search, Sparkles, MessageSquareHeart, Award } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onScrollToMatcher: () => void;
  onOpenAssistant: () => void;
  onScrollToProducts: () => void;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
  onScrollToMatcher,
  onOpenAssistant,
  onScrollToProducts
}: HeaderProps) {
  return (
    <header id="app-header" className="sticky top-0 z-40 bg-white text-[#2B2D42] border-b border-gray-100 shadow-md">
      {/* Top Promo Banner from Vibrant Palette */}
      <div id="top-promo-banner" className="bg-[#FF9F1C] text-white text-center text-xs py-2 font-bold tracking-wider flex items-center justify-center gap-2 px-4 shadow-sm">
        <Award className="w-3.5 h-3.5 animate-bounce" />
        <span>G&apos;day! Enjoy FREE DELIVERY across Australia on orders over $49 🐾 SHOP NOW</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo Brand Title (Matches the design HTML closely) */}
          <div className="flex items-center justify-between">
            <button 
              id="brand-logo-btn"
              onClick={() => { onSelectCategory('all'); onScrollToProducts(); }}
              className="flex items-center gap-2.5 group text-left cursor-pointer transition transform hover:scale-102"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FF9F1C] flex items-center justify-center shadow-md text-2xl">
                🐕
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-display font-black tracking-tighter text-[#2B2D42]">
                  PET<span className="text-[#FF9F1C]">SUPERSTORE</span>
                  <span className="text-xs bg-[#2EC4B6] text-white font-sans font-bold px-2 py-0.5 rounded-full ml-1.5 align-middle tracking-normal">AU</span>
                </h1>
                <p className="text-[10px] text-[#2B2D42]/65 tracking-widest uppercase font-mono font-bold leading-none mt-0.5">Revamped Modern Boutique &bull; Aussie Care</p>
              </div>
            </button>

            {/* Mobile Cart Button */}
            <button
              id="mobile-cart-toggle"
              onClick={onOpenCart}
              className="md:hidden relative p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all text-[#2B2D42]"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF9F1C] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full border-2 border-white animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Search bar with Vibrant Palette styling */}
          <div className="flex-1 max-w-md w-full md:mx-6">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4.5 w-4.5 text-gray-400" />
              </span>
              <input
                id="header-product-search"
                type="text"
                placeholder="Search premium treats, custom collars, dog backpacks..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value) onScrollToProducts();
                }}
                className="block w-full pl-10 pr-4 py-2 bg-gray-100 placeholder-gray-500 rounded-full border-2 border-transparent focus:bg-white text-[#2B2D42] focus:border-[#FF9F1C] focus:ring-4 focus:ring-[#FF9F1C]/15 transition-all font-sans text-sm focus:outline-none"
              />
              {searchQuery && (
                <button
                  id="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-[#2B2D42] text-lg font-bold"
                >
                  &times;
                </button>
              )}
            </div>
          </div>

          {/* Premium Callout Actions */}
          <div className="flex items-center justify-between sm:justify-end gap-2.5">
            {/* AI Assistant Hook */}
            <button
              id="nav-ai-assistant"
              onClick={onOpenAssistant}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-[#2EC4B6] text-white text-xs hover:bg-[#25ab9e] transition-all cursor-pointer shadow-md font-bold hover:-translate-y-0.5 duration-150"
            >
              <MessageSquareHeart className="w-4 h-4 text-white" />
              <span>AI Chat Assistant</span>
            </button>

            {/* AI Pet Matcher */}
            <button
              id="nav-ai-matcher"
              onClick={onScrollToMatcher}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-[#FF9F1C] text-white text-xs hover:bg-[#e08910] transition-all cursor-pointer shadow-md font-bold hover:-translate-y-0.5 duration-150"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>AI Companion Quiz</span>
            </button>

            {/* Desktop Cart Button */}
            <button
              id="desktop-cart-toggle"
              onClick={onOpenCart}
              className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#2B2D42] text-white hover:bg-[#3d3f5c] transition-all cursor-pointer shadow-md relative font-bold hover:-translate-y-0.5 duration-150"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>My Cart</span>
              <span className="bg-[#FF9F1C] text-white text-xs font-black px-2 py-0.5 rounded-md">
                {cartCount}
              </span>
            </button>
          </div>

        </div>

        {/* Categories Navigation Bar (Matching the shop categories style) */}
        <nav id="category-navigation" className="mt-4 pt-3.5 border-t border-gray-100 flex gap-2 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                id={`cat-tab-${cat.id}`}
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  onScrollToProducts();
                }}
                className={`px-4.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#FF9F1C] text-white border-[#FF9F1C] shadow-md'
                    : 'bg-white text-[#2B2D42] border-gray-200 hover:border-[#FF9F1C]/40 hover:bg-[#FFFDF7]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.25 rounded-md font-mono ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-[#2B2D42]/60'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
}
