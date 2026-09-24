/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductCard } from './components/ProductCard';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SizeGuideModal } from './components/SizeGuideModal';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TrustpilotSection } from './components/TrustpilotSection';
import { Footer } from './components/Footer';
import { Filter, SlidersHorizontal, CheckCircle, Sparkles } from 'lucide-react';

export default function App() {
  const [products] = useState<Product[]>(PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Cart state with localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sunshine_cart');
      return saved ? JSON.parse(saved) : [
        // Seed 1 item for instant demo appeal
        {
          product: PRODUCTS[0],
          selectedSize: 'Double',
          selectedColor: { name: 'Pristine White', hex: '#FFFFFF' },
          quantity: 1,
          unitPrice: 34.99
        }
      ];
    } catch {
      return [];
    }
  });

  // Wishlist state with localStorage
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('sunshine_wishlist');
      return saved ? JSON.parse(saved) : [PRODUCTS[1]]; // Seed 10cm topper
    } catch {
      return [];
    }
  });

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('COMFORT15');
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save cart & wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sunshine_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('sunshine_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Recalculate discount
  useEffect(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    if (appliedCoupon === 'COMFORT15') {
      setDiscountAmount(subtotal * 0.15);
    } else if (appliedCoupon === 'SUNSHINE10') {
      setDiscountAmount(subtotal * 0.10);
    } else if (appliedCoupon === 'WELCOME5') {
      setDiscountAmount(Math.min(5, subtotal));
    } else {
      setDiscountAmount(0);
    }
  }, [cart, appliedCoupon]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Cart operations
  const handleAddToCart = (
    product: Product,
    sizeName: string,
    color: { name: string; hex: string },
    quantity = 1
  ) => {
    const sizeObj = product.sizes.find(s => s.name === sizeName) || product.sizes[0];
    const unitPrice = product.price + sizeObj.priceModifier;

    setCart(prev => {
      const existingIdx = prev.findIndex(
        item => item.product.id === product.id &&
                item.selectedSize === sizeName &&
                item.selectedColor.name === color.name
      );

      if (existingIdx >= 0) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      } else {
        return [...prev, {
          product,
          selectedSize: sizeName,
          selectedColor: color,
          quantity,
          unitPrice
        }];
      }
    });

    showToast(`Added ${quantity}x "${product.name}" to Basket`);
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    setCart(prev => {
      const next = [...prev];
      if (quantity <= 0) {
        next.splice(index, 1);
      } else {
        next[index].quantity = quantity;
      }
      return next;
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    showToast('Item removed from basket');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleApplyCoupon = (code: string) => {
    const upper = code.toUpperCase().trim();
    if (upper === 'COMFORT15' || upper === 'SUNSHINE10' || upper === 'WELCOME5') {
      setAppliedCoupon(upper);
      showToast(`Coupon '${upper}' applied successfully!`);
      return true;
    }
    return false;
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from saved list`);
        return prev.filter(p => p.id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to Wishlist`);
        return [...prev, product];
      }
    });
  };

  // Filter & Sort
  const filteredProducts = products.filter(p => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false;
    if (inStockOnly && !p.inStock) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      
      {/* 1. Header (Authentic Sunshine Comforts UK header) */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSelectCategory={setActiveCategory}
        activeCategory={activeCategory}
        products={products}
        onSelectProduct={(p) => setQuickViewProduct(p)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* 2. Hero Section (Fresh, modern high-end editorial British luxury redesign) */}
      <HeroSection
        onShopNow={() => {
          const el = document.getElementById('products-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectCategory={setActiveCategory}
        onSelectProduct={(p) => setQuickViewProduct(p)}
        featuredProducts={products}
      />

      {/* 3. Main Product Catalog & Filter Section */}
      <main id="products-section" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Section Title & Subheading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-5 h-px bg-amber-600"></span>
              <span className="text-xs uppercase tracking-widest text-amber-800 font-bold">
                British Sleep Collection
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              {activeCategory === 'all' && 'All Luxury Bedding & Furnishings'}
              {activeCategory === 'bedding' && '100% Egyptian Cotton Duvet Sets'}
              {activeCategory === 'toppers' && 'Deep Baffle Box Mattress Toppers'}
              {activeCategory === 'pillows' && 'Hotel Bounce-Back Luxury Pillows'}
              {activeCategory === 'sheets' && '40cm Extra Deep Fitted Sheets'}
              {activeCategory === 'curtains' && 'Thermal Velvet Curtains & Throws'}
              {activeCategory === 'bath' && '700 GSM Egyptian Cotton Towels'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Showing {filteredProducts.length} authentic British standard products · 30-Night Sleep Trial Included
            </p>
          </div>

          {/* Controls: Filter Categories & Sort dropdown */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* In-Stock Toggle */}
            <label className="flex items-center gap-2 text-xs text-stone-700 bg-white px-3 py-2 rounded-lg border border-stone-200 cursor-pointer shadow-2xs hover:bg-stone-50">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded text-amber-700 focus:ring-amber-500 w-3.5 h-3.5"
              />
              <span className="font-medium">In Stock Only</span>
            </label>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-lg border border-stone-200 shadow-2xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products by"
                className="text-xs text-stone-800 font-medium bg-transparent focus:outline-hidden cursor-pointer"
              >
                <option value="featured">Sort by: Best Sellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-6 mb-2">
          {[
            { id: 'all', label: 'All Products' },
            { id: 'bedding', label: 'Duvet Sets' },
            { id: 'toppers', label: '10cm Mattress Toppers' },
            { id: 'pillows', label: 'Hotel Pillows' },
            { id: 'sheets', label: '40cm Fitted Sheets' },
            { id: 'curtains', label: 'Velvet Curtains' },
            { id: 'bath', label: 'Towels & Bath' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200/80 hover:bg-stone-100 hover:border-stone-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
            <h3 className="font-serif text-xl font-bold text-stone-800">No products match your filter</h3>
            <p className="text-xs text-stone-500">Try changing the category or turning off the in-stock filter.</p>
            <button
              onClick={() => { setActiveCategory('all'); setInStockOnly(false); }}
              className="px-5 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(prod, size, col) => handleAddToCart(prod, size, col, 1)}
                onQuickView={(prod) => setQuickViewProduct(prod)}
                isWishlisted={wishlist.some(p => p.id === product.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        )}

      </main>

      {/* 4. Why Choose Sunshine Comforts (Brand Quality Standard) */}
      <WhyChooseUs />

      {/* 5. Trustpilot 4.9 Verified Reviews Section */}
      <TrustpilotSection />

      {/* 6. Footer (Faithful Sunshine Comforts UK footer with payments, helpline, newsletter) */}
      <Footer
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onSelectCategory={setActiveCategory}
      />

      {/* Modals & Interactive Overlays */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onApplyCoupon={handleApplyCoupon}
        discountAmount={discountAmount}
        appliedCoupon={appliedCoupon}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(prod, size, col) => handleAddToCart(prod, size, col, 1)}
        onQuickView={(prod) => setQuickViewProduct(prod)}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => {
          setQuickViewProduct(null);
          setIsSizeGuideOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        subtotal={cartTotal}
        discount={discountAmount}
        shipping={cartTotal >= 35 ? 0 : 3.99}
        total={Math.max(0, cartTotal - discountAmount + (cartTotal >= 35 ? 0 : 3.99))}
        onClearCart={handleClearCart}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-stone-700 flex items-center gap-2.5 animate-in slide-in-from-bottom duration-300">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
