import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Phone, 
  HelpCircle, 
  Truck, 
  Menu, 
  X, 
  ChevronDown,
  Star,
  Sparkles
} from 'lucide-react';
import { Product } from '../types';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSelectCategory: (category: string) => void;
  activeCategory: string;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onOpenSizeGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSelectCategory,
  activeCategory,
  products,
  onSelectProduct,
  onOpenSizeGuide
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const searchResults = searchQuery.trim().length > 1
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navCategories = [
    { id: 'all', label: 'All Collections' },
    { id: 'bedding', label: 'Bedding Sets' },
    { id: 'toppers', label: 'Mattress Toppers' },
    { id: 'pillows', label: 'Luxury Pillows' },
    { id: 'sheets', label: 'Fitted Sheets' },
    { id: 'curtains', label: 'Curtains & Throws' },
    { id: 'bath', label: 'Towels & Bath' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-xs border-b border-stone-200">
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#1C1917] text-stone-200 text-xs py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center justify-center gap-3">
            <span className="flex items-center gap-1.5 font-medium text-amber-300">
              <Truck className="w-3.5 h-3.5" />
              <span>FREE UK Delivery over £35</span>
            </span>
            <span className="hidden md:inline text-stone-500">·</span>
            <span className="hidden md:inline text-stone-300">Order by 2pm for Same Day Dispatch</span>
          </div>

          <div className="flex items-center justify-center gap-4 text-[11px] text-stone-300">
            <div className="flex items-center gap-1">
              <span className="text-amber-400 flex items-center">
                {'★'.repeat(5)}
              </span>
              <span className="font-semibold text-white">4.9/5</span>
              <span className="text-stone-400 hidden sm:inline">Trustpilot (12k+ Reviews)</span>
            </div>
            <span className="text-stone-600 hidden sm:inline">|</span>
            <button 
              onClick={onOpenSizeGuide}
              className="hover:text-amber-300 transition-colors hidden sm:inline cursor-pointer"
            >
              UK Size Guide
            </button>
            <span className="text-stone-600 hidden sm:inline">|</span>
            <span className="text-stone-300 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              UK Support: 0800 321 8920
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Brand Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -ml-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo - Sunshine Comforts */}
          <div 
            onClick={() => { onSelectCategory('all'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
          >
            {/* Sunburst emblem */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-400/40 text-amber-600 group-hover:scale-105 group-hover:bg-amber-500/20 transition-all duration-300">
              <Sparkles className="w-5 h-5 text-amber-600 fill-amber-400/30" />
            </div>

            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl lg:text-[26px] tracking-tight font-bold text-stone-900 leading-none group-hover:text-amber-800 transition-colors">
                SUNSHINE <span className="font-normal italic text-amber-700">COMFORTS</span>
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-stone-500 font-medium">
                British Luxury Bedding · London
              </span>
            </div>
          </div>

          {/* Search Bar - Live filter with results dropdown */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-md mx-6 relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search duvet covers, 10cm mattress toppers, pillows..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full bg-stone-100/80 hover:bg-stone-100 focus:bg-white text-stone-900 text-xs sm:text-sm pl-9 pr-8 py-2.5 rounded-full border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all outline-hidden"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600 text-xs"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Live Search Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 overflow-hidden">
                <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-stone-400 border-b border-stone-100">
                  Products Found ({searchResults.length})
                </div>
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      setIsSearchFocused(false);
                      setSearchQuery('');
                    }}
                    className="w-full px-3 py-2.5 flex items-center justify-between hover:bg-amber-50/60 transition-colors text-left group"
                  >
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-stone-900 group-hover:text-amber-800 line-clamp-1">
                        {product.name}
                      </p>
                      <p className="text-[11px] text-stone-500">{product.categoryLabel}</p>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <span className="text-xs font-semibold text-stone-900">£{product.price.toFixed(2)}</span>
                      <span className="text-[10px] text-stone-400 line-through block">£{product.originalPrice.toFixed(2)}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Icons: Help, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Quick Currency indicator */}
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-stone-600 bg-stone-100 rounded-md border border-stone-200">
              <span className="font-semibold text-stone-900">GBP (£)</span>
              <span className="text-[10px] text-stone-400">UK</span>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 text-stone-700 hover:text-amber-700 hover:bg-amber-50/50 rounded-full transition-colors cursor-pointer"
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2.5 bg-stone-900 hover:bg-stone-800 text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group"
              aria-label="View Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:rotate-6 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-amber-500 text-stone-950 text-[10px] font-extrabold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-none">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">Cart</span>
                <span className="text-xs font-bold text-white tabular-nums">
                  £{cartTotal.toFixed(2)}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 md:hidden relative">
          <input
            type="text"
            placeholder="Search luxury bedding, toppers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-100 text-stone-900 text-xs pl-8 pr-4 py-2 rounded-lg border border-stone-200 focus:outline-hidden focus:border-amber-500"
          />
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* 3. Category Navigation Strip */}
      <nav className="border-t border-stone-200/80 bg-stone-50/70 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-2">
            <div className="flex items-center gap-1 sm:gap-2">
              {navCategories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      const el = document.getElementById('products-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-stone-900 text-white shadow-xs' 
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Special seasonal discount callout in nav */}
            <div className="flex items-center gap-2 pl-4 text-xs font-semibold text-amber-800 shrink-0">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>Autumn Sale: Extra 15% Off with code <span className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-mono font-bold">COMFORT15</span></span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-xs bg-white h-full shadow-2xl p-5 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <span className="font-serif text-lg font-bold text-stone-900">SUNSHINE COMFORTS</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 flex flex-col gap-1">
                <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider px-3 mb-1">
                  Shop Categories
                </p>
                {navCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setMobileMenuOpen(false);
                      const el = document.getElementById('products-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full text-left px-3 py-2.5 text-sm rounded-lg font-medium transition-colors ${
                      activeCategory === cat.id 
                        ? 'bg-amber-50 text-amber-900 font-semibold' 
                        : 'text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-stone-200 text-xs text-stone-500 space-y-2">
              <button 
                onClick={() => { onOpenSizeGuide(); setMobileMenuOpen(false); }}
                className="w-full text-left py-1 text-stone-800 font-medium hover:text-amber-700"
              >
                📐 UK Bedding Size Guide
              </button>
              <p>📞 UK Freephone: 0800 321 8920</p>
              <p>✉️ support@sunshinecomforts.co.uk</p>
              <p className="text-[11px] text-stone-400">© 2026 Sunshine Comforts UK Ltd</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
