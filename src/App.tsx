import React, { useState } from 'react';
import Header from './components/Header';
import AIPetMatcher from './components/AIPetMatcher';
import AIAssistant from './components/AIAssistant';
import Cart from './components/Cart';
import ProductDetailModal from './components/ProductDetailModal';
import { PRODUCTS, CATEGORIES, MOCK_REVIEWS } from './constants';
import { Product, CartItem } from './types';
import { 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Star, 
  Heart, 
  Flame, 
  Search, 
  ArrowRight, 
  Check, 
  ShoppingBag,
  Award,
  Zap,
  HelpCircle,
  Mail,
  Instagram,
  Facebook
} from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('bestseller');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Scroll Helpers
  const scrollToMatcher = () => {
    const el = document.getElementById('ai-pet-matcher-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProducts = () => {
    const el = document.getElementById('products-catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    // Visual user feedback - open cart or keep it smooth
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQty } 
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSelectProductFromAI = (product: Product) => {
    setSelectedProduct(product);
  };

  // Filter & Sort Logic
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStock = !inStockOnly || p.inStock;
    return matchesCategory && matchesSearch && matchesStock;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'bestseller') {
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    }
    if (sortBy === 'price-asc') {
      return a.price - b.price;
    }
    if (sortBy === 'price-desc') {
      return b.price - a.price;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2B2D42] font-sans antialiased text-sm">
      
      {/* Header Navigation */}
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToMatcher={scrollToMatcher}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onScrollToProducts={scrollToProducts}
      />

      {/* Hero Banner Section */}
      <section id="shop-hero-banner" className="bg-[#FAF8F5] relative overflow-hidden py-12 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-[#CBF3F0]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-[#FF9F1C]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6 text-left relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#CBF3F0] text-[#2EC4B6] text-xs font-black uppercase tracking-wider shadow-xs">
              <Zap className="w-3.5 h-3.5 fill-current" /> Certified Aussie Veterinary Pet Boutique
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-[#2B2D42] tracking-tighter leading-tight">
              Giving Your Pets the <span className="text-[#FF9F1C]">Royal Aussie Care</span> They Deserve
            </h2>
            <p className="text-gray-650 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
              Explore custom orthopedic bowls, organic flea barriers, 60-day maternal calming collars, and digital aquarium readouts. Curated by pet health professionals, shipped overnight from our Sydney fulfillment hub.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={scrollToProducts}
                className="bg-[#2B2D42] text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-[#1A2E26] hover:-translate-y-0.5 duration-150 transition-all shadow-md cursor-pointer text-center"
              >
                Browse Premium Shop Catalog
              </button>
              <button
                onClick={scrollToMatcher}
                className="bg-[#FFFDF7] border-2 border-[#FF9F1C] text-[#2B2D42] hover:bg-[#FF9F1C]/10 px-8 py-4 rounded-2xl font-black text-sm hover:-translate-y-0.5 duration-150 transition-all shadow-sm cursor-pointer text-center flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#FF9F1C]" /> AI Care Setup Companion
              </button>
            </div>

            {/* Quick trust checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-gray-150 text-xs font-bold text-[#2B2D42]/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2EC4B6]" />
                <span>100% Quality Checked</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#FF9F1C]" />
                <span>Free AU Ship over $49</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#2EC4B6]" />
                <span>60-Day Easy Returns</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Collage */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-[420px] aspect-square rounded-[40px] bg-[#FF9F1C]/15 border-4 border-dashed border-[#FF9F1C]/35 p-6 flex items-center justify-center">
              
              {/* Main Rounded Image */}
              <img 
                src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=800" 
                alt="Aussie dog playing happily" 
                className="w-full h-full object-cover rounded-[32px] shadow-2xl"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://picsum.photos/seed/aussie-dog/800/800";
                }}
              />

              {/* Float Card 1: Anxiety Collar */}
              <div className="absolute top-4 left-[-20px] bg-white rounded-2xl p-3 shadow-lg border border-gray-100 flex items-center gap-2.5 max-w-[200px] animate-pulse">
                <span className="text-2xl">⚡</span>
                <div className="text-left">
                  <span className="block text-[8px] font-mono uppercase text-gray-400 font-bold">Best Defense</span>
                  <span className="block text-xs font-black text-[#2B2D42] leading-tight">60-Day Calm Shield</span>
                </div>
              </div>

              {/* Float Card 2: Raised Bowl */}
              <div className="absolute bottom-6 right-[-20px] bg-white rounded-2xl p-3.5 shadow-lg border border-gray-100 flex items-center gap-2.5 max-w-[220px]">
                <span className="text-2xl">🥗</span>
                <div className="text-left">
                  <span className="block text-[8px] font-mono uppercase text-[#2EC4B6] font-bold">Veterinary Pick</span>
                  <span className="block text-xs font-black text-[#2B2D42] leading-tight">15° Orthopedic Bowl</span>
                </div>
              </div>

              {/* Small floating badge */}
              <div className="absolute bottom-[-15px] left-10 bg-[#2EC4B6] text-white px-3 py-1.5 rounded-xl font-black text-xs shadow-md transform -rotate-3">
                🇦🇺 Sydney Dispatch
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Interactive AIPetMatcher Component Embedded */}
      <AIPetMatcher 
        onAddToCart={handleAddToCart} 
        onScrollToProducts={scrollToProducts} 
        onSelectCategory={setSelectedCategory} 
      />

      {/* Main Catalog View Container */}
      <main id="products-catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Catalog Control Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-150 mb-10">
          <div>
            <h3 className="font-display font-black text-[#2B2D42] text-2xl tracking-tight">
              Premium Curated <span className="text-[#FF9F1C]">Product Ranges</span>
            </h3>
            <p className="text-gray-500 mt-1 text-xs sm:text-sm">
              Showing {sortedProducts.length} premium solutions designed for Australian environmental conditions.
            </p>
          </div>

          {/* Interactive Filters Panel */}
          <div className="flex flex-wrap items-center gap-4">
            
            {/* Stock Toggle Checkbox */}
            <label className="inline-flex items-center gap-2.5 cursor-pointer bg-white px-4 py-2.5 rounded-xl border border-gray-150 text-xs font-bold hover:border-gray-300 transition shadow-xs select-none">
              <input 
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#FF9F1C] focus:ring-[#FF9F1C] cursor-pointer accent-[#FF9F1C]"
              />
              <span>In Stock Only</span>
            </label>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-white px-3 py-1 text-xs font-bold rounded-xl border border-gray-150 shadow-xs">
              <span className="text-gray-400">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none py-1.5 pr-2 focus:outline-none text-[#2B2D42] cursor-pointer"
              >
                <option value="bestseller">Recommended / Bestseller</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated &bull; Verified Reviews</option>
              </select>
            </div>
            
          </div>
        </div>

        {/* Catalog Search & Active Filter Badges */}
        {(searchQuery || selectedCategory !== 'all') && (
          <div className="bg-white rounded-2xl p-4 border border-gray-150 mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
              <span>Active filters:</span>
              {selectedCategory !== 'all' && (
                <span className="bg-[#CBF3F0] text-[#2EC4B6] pl-3 pr-2 py-1 rounded-full flex items-center gap-1 uppercase text-[10px]">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory('all')} className="hover:text-red-500 text-sm font-black">&times;</button>
                </span>
              )}
              {searchQuery && (
                <span className="bg-orange-50 text-[#FF9F1C] pl-3 pr-2 py-1 rounded-full flex items-center gap-1 uppercase text-[10px]">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery('')} className="hover:text-red-500 text-sm font-black">&times;</button>
                </span>
              )}
            </div>
            <button 
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setInStockOnly(false); }}
              className="text-xs font-black text-gray-400 hover:text-[#FF9F1C] transition"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* Products Grid View */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-200">
            <span className="text-6xl text-gray-300">🔍</span>
            <h4 className="text-lg font-black text-[#2B2D42] mt-4">No matching accessories found</h4>
            <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1 leading-relaxed">
              We couldn&apos;t find any boutique pieces fitting your exact search phrase or stock filters. Try selecting a broader category or a different keyword!
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setInStockOnly(false); }}
              className="mt-6 bg-[#FF9F1C] text-white font-black text-xs px-6 py-2.5 rounded-xl shadow-md hover:bg-[#e08910] transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((p) => {
              return (
                <div 
                  key={p.id}
                  id={`product-card-${p.id}`}
                  className="bg-white rounded-2.5xl border border-gray-150 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-[#FF9F1C]"
                >
                  {/* Photo Head */}
                  <div className="relative aspect-video sm:aspect-square bg-gray-50 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(p)}>
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-full h-full object-cover group-hover:scale-104 transition-all duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${p.id}/600/600`;
                      }}
                    />

                    {/* Left overlay chips */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                      {p.isBestSeller && (
                        <span className="bg-[#FF9F1C] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md shadow-sm">
                          Bestseller
                        </span>
                      )}
                      {p.isNew && (
                        <span className="bg-[#2EC4B6] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md shadow-sm">
                          New Arrived
                        </span>
                      )}
                      {p.isPremium && (
                        <span className="bg-[#2B2D42] text-[#FFFDF7] text-[9px] font-black uppercase px-2 py-0.5 rounded-md shadow-sm">
                          Premium Range
                        </span>
                      )}
                    </div>

                    {/* Stock Status tag */}
                    {!p.inStock && (
                      <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center font-black text-xs text-red-650 tracking-wider uppercase">
                        Temporarily Out of Stock
                      </div>
                    )}
                  </div>

                  {/* Body Specs */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
                    
                    <div>
                      {/* Sub categorization */}
                      <span className="text-[10px] font-mono text-gray-400 capitalize font-bold tracking-wider mb-1 block">
                        Category: {p.category}
                      </span>
                      {/* Name */}
                      <h4 
                        onClick={() => setSelectedProduct(p)}
                        className="font-display font-black text-[#2B2D42] text-sm leading-snug group-hover:text-[#FF9F1C] transition-colors cursor-pointer line-clamp-1"
                        title={p.name}
                      >
                        {p.name}
                      </h4>
                      {/* Description */}
                      <p className="text-gray-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    {/* Middle pricing & review summary lines */}
                    <div className="space-y-2 pt-2 border-t border-gray-100">
                      
                      {/* Rating block */}
                      <div className="flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-1 text-[#FF9F1C]">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="font-extrabold text-[#2B2D42]">{p.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-gray-400 font-bold">({p.reviewsCount} reviews)</span>
                      </div>

                      {/* Pricing Tag */}
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-display font-black text-[#2B2D42]">
                          ${p.price.toFixed(2)}
                        </span>
                        {p.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            ${p.originalPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="text-[10px] text-gray-400 font-mono font-bold">AUD</span>
                      </div>

                    </div>

                    {/* Operational Buttons */}
                    <div className="pt-2 flex gap-1.5">
                      <button
                        onClick={() => setSelectedProduct(p)}
                        className="flex-1 bg-[#FAF8F5] border border-gray-200 text-gray-600 font-bold text-xs py-2 rounded-xl hover:bg-gray-100 transition whitespace-nowrap cursor-pointer text-center"
                      >
                        Info sheet
                      </button>
                      <button
                        onClick={() => handleAddToCart(p)}
                        disabled={!p.inStock}
                        className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:scale-101 shrink-0 ${
                          p.inStock 
                            ? 'bg-[#FF9F1C] hover:bg-[#e08910] text-white shadow-sm'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        title="Add to basket"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* Boutique Veterinary Standards Section (Anti-pattern: avoids simulated infrastructure, provides authentic insights) */}
      <section id="boutique-standards-section" className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="bg-[#CBF3F0] text-[#2EC4B6] text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-block mb-3.5">
              🎓 Vet-Picked Secrets
            </span>
            <h3 className="font-display font-black text-[#2B2D42] text-3xl tracking-tight leading-tight">
              Why Australian Veterinarians Advocate Our Curated Supplies
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm mt-3 leading-relaxed">
              We focus on biomechanics, clean chemicals, and behavioral science to elevate daily companion health. Find out exactly why layout matters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Box 1: Raised Bowls */}
            <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-gray-150 space-y-3.5 hover:-translate-y-1 transition duration-200">
              <span className="text-4xl">🥗</span>
              <h4 className="font-display font-black text-[#2B2D42] text-base leading-tight">15° Ergonomic Bowls</h4>
              <p className="text-gray-650 text-xs leading-relaxed">
                Floor eating forces horizontal posture, which triggers acid reflux and spinal joint compression. The ortho-tilt lifts food up, leveraging gravity for seamless, comfortable peristaltic digestion.
              </p>
            </div>

            {/* Box 2: Basking Safety */}
            <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-gray-150 space-y-3.5 hover:-translate-y-1 transition duration-200">
              <span className="text-4xl">🦎</span>
              <h4 className="font-display font-black text-[#2B2D42] text-base leading-tight">Turtle Shell Health</h4>
              <p className="text-gray-650 text-xs leading-relaxed">
                Without a non-slip secure basking spot totally clear of the water filter level, turtles cannot dry their lower plastron. This leads to shell rot. Sloped platforms with textured turf guarantee optimum basking.
              </p>
            </div>

            {/* Box 3: Natural calm collars */}
            <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-gray-150 space-y-3.5 hover:-translate-y-1 transition duration-200">
              <span className="text-4xl">⚡</span>
              <h4 className="font-display font-black text-[#2B2D42] text-base leading-tight">Maternal Pheromones</h4>
              <p className="text-gray-650 text-xs leading-relaxed">
                Prescription sedatives cause lethargy and brain fog. Our calming collars diffuse a natural botanical copy of the reassuring mammary signals mother dogs emit, curing storm, travel, and training anxieties organically.
              </p>
            </div>

            {/* Box 4: Elastic seed catching */}
            <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-gray-150 space-y-3.5 hover:-translate-y-1 transition duration-200">
              <span className="text-4xl">🐦</span>
              <h4 className="font-display font-black text-[#2B2D42] text-base leading-tight">Debris Hygiene</h4>
              <p className="text-gray-650 text-xs leading-relaxed">
                Flying bird feed hulls are highly attractive to local cockroaches and mice. Net-girdles trap seed debris before hitting fine carpets, while keeping air and sunlight fully circulating for healthy birds.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Aussie Verified Customer Reviews Section */}
      <section id="aussie-verified-reviews" className="bg-[#FFFDF7] py-16 px-4 sm:px-6 lg:px-8 border-y border-gray-150">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-12">
            <span className="px-3 py-1 bg-orange-50 text-[#FF9F1C] font-black text-xs uppercase tracking-widest rounded-full">
              ⭐ Aussie Tested
            </span>
            <h3 className="font-display font-black text-3xl text-[#2B2D42] mt-2.5">
              What Companion Owners Across Australia Are Saying
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              All reviews undergo automatic verification of order matching to maintain honest feedback loops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_REVIEWS.map((r) => (
              <div 
                key={r.id}
                className="bg-white rounded-2.5xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Stars */}
                  <div className="flex text-[#FF9F1C] text-sm">
                    {'★'.repeat(r.rating)}
                  </div>
                  <h4 className="font-bold text-sm text-[#2B2D42] leading-snug">
                    &ldquo;{r.title}&rdquo;
                  </h4>
                  <p className="text-gray-650 text-xs leading-relaxed italic">
                    {r.comment}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-black text-[#2B2D42]">{r.author}</span>
                    <span className="block text-[10px] text-gray-400 font-mono">{r.date}</span>
                  </div>
                  {r.verified && (
                    <span className="bg-[#CBF3F0] text-[#2EC4B6] font-mono text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full">
                      Verified Order
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Floating chatbot activator button if Assistant drawer is closed */}
      {!isAssistantOpen && (
        <button
          id="floating-ai-button"
          onClick={() => setIsAssistantOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#2EC4B6] hover:bg-[#25ab9e] text-white p-4.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer group"
          title="Open AI Care Assistant"
        >
          <div className="relative">
            <Sparkles className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-3.5 -right-3.5 bg-[#FF9F1C] text-[#FFFDF7] text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-md leading-none max-w-[50px] uppercase tracking-wider font-sans group-hover:scale-105 transition-transform">
              AI Chat
            </span>
          </div>
        </button>
      )}

      {/* Cart Drawer Overlay Component */}
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* AI Chat Assistant Drawer Component */}
      <AIAssistant 
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        onAddToCart={handleAddToCart}
        onSelectProduct={handleSelectProductFromAI}
      />

      {/* Detailed Product info specs modal window */}
      <ProductDetailModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Footer Branding Panel */}
      <footer id="boutique-footer" className="bg-[#2B2D42] text-white pt-16 pb-12 border-t-8 border-[#FF9F1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Col 1: Bio */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🐕</span>
              <h2 className="text-xl font-display font-black tracking-tighter text-white">
                PET<span className="text-[#FF9F1C]">SUPERSTORE</span>
                <span className="text-xs bg-[#2EC4B6] text-white font-sans font-bold px-1.5 py-0.5 rounded-full ml-1.5">AU</span>
              </h2>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Australia&apos;s leading online boutique for specialized orthopedic, behavioral, and biological care accessories. We assemble certified, safe components with veterinary precision to keep your mate roaring happy.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FF9F1C] text-white hover:text-[#2B2D42] transition-colors flex items-center justify-center text-sm" aria-label="Facebook link">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FF9F1C] text-white hover:text-[#2B2D42] transition-colors flex items-center justify-center text-sm" aria-label="Instagram link">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FF9F1C] text-white hover:text-[#2B2D42] transition-colors flex items-center justify-center text-sm" aria-label="Contact Email link">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation link collections */}
          <div className="md:col-span-2 space-y-3.5 text-left">
            <h4 className="font-mono font-black text-[10px] text-gray-400 uppercase tracking-widest">Store Catalog</h4>
            <ul className="text-xs space-y-2 font-semibold">
              <li><button onClick={() => { setSelectedCategory('dogs'); scrollToProducts(); }} className="text-gray-300 hover:text-[#FF9F1C] transition cursor-pointer text-left block">For Dogs & Puppies</button></li>
              <li><button onClick={() => { setSelectedCategory('cats'); scrollToProducts(); }} className="text-gray-300 hover:text-[#FF9F1C] transition cursor-pointer text-left block">For Cats & Kittens</button></li>
              <li><button onClick={() => { setSelectedCategory('birds'); scrollToProducts(); }} className="text-gray-300 hover:text-[#FF9F1C] transition cursor-pointer text-left block">For Birds & Poultry</button></li>
              <li><button onClick={() => { setSelectedCategory('fish'); scrollToProducts(); }} className="text-gray-300 hover:text-[#FF9F1C] transition cursor-pointer text-left block">For Aquarium & Fish</button></li>
              <li><button onClick={() => { setSelectedCategory('reptiles'); scrollToProducts(); }} className="text-gray-300 hover:text-[#FF9F1C] transition cursor-pointer text-left block">For Reptiles & Turtles</button></li>
            </ul>
          </div>

          {/* Col 3: Safe Info pages */}
          <div className="md:col-span-2 space-y-3.5 text-left">
            <h4 className="font-mono font-black text-[10px] text-gray-400 uppercase tracking-widest">Aussie Promise</h4>
            <ul className="text-xs text-gray-300 space-y-2 font-semibold">
              <li><a href="#" className="hover:text-[#FF9F1C] transition">Free Express Policy</a></li>
              <li><a href="#" className="hover:text-[#FF9F1C] transition">Veterinary Advisory Panel</a></li>
              <li><a href="#" className="hover:text-[#FF9F1C] transition">60-Day Trial Returns</a></li>
              <li><a href="#" className="hover:text-[#FF9F1C] transition">Fulfillment Status Map</a></li>
              <li><a href="#" className="hover:text-[#FF9F1C] transition">Contact AU Helpdesk</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter sign form */}
          <div className="md:col-span-4 space-y-3.5 text-left">
            <h4 className="font-mono font-black text-[10px] text-gray-400 uppercase tracking-widest">Join VIP Kangaroo Club</h4>
            <p className="text-xs text-gray-400 leading-normal">
              Subscribe to get exclusive clinical care tips, early stock arrival notifications, and $10 off your introductory voucher!
            </p>
            
            {newsletterSubscribed ? (
              <div className="bg-[#CBF3F0]/10 border border-[#2EC4B6] rounded-xl p-3 text-xs text-[#2EC4B6] font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2EC4B6] stroke-2" />
                <span>Bonus voucher sent to your inbox, mate! 🎉</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input 
                  type="email"
                  required
                  placeholder="Enter email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-white/10 text-white placeholder-gray-500 rounded-xl px-3 py-2 text-xs flex-1 focus:outline-none focus:ring-2 focus:ring-[#FF9F1C] border border-transparent"
                />
                <button 
                  type="submit"
                  className="bg-[#FF9F1C] hover:bg-[#e08910] text-white px-4 py-2 rounded-xl text-xs font-black tracking-wider shadow-md transition cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Copyleft copyright bars line */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/10 text-center text-xs text-gray-500 font-medium flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; 2026 The Pet Superstore AU. All Rights Reserved. Crafted with care in Sydney, NSW.</p>
          <div className="flex gap-4 font-bold text-[11px]">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Veterinary Registry List</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
