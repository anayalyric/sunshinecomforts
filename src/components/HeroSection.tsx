import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, ShieldCheck, Truck, RotateCcw, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { Product } from '../types';

interface HeroSectionProps {
  onShopNow: () => void;
  onSelectCategory: (category: string) => void;
  onSelectProduct: (product: Product) => void;
  featuredProducts: Product[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopNow,
  onSelectCategory,
  onSelectProduct,
  featuredProducts
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      kicker: 'The British Sleep Sanctuary',
      title: 'Sleep Like Royalty in Pure Egyptian Cotton',
      subtitle: 'Experience 5-star hotel luxury at home with our silky 600 thread count bedding and cloud-soft 10cm baffle-box mattress toppers.',
      ctaText: 'Shop Bedding Collection',
      secondaryCta: 'Explore 10cm Toppers',
      targetCategory: 'bedding',
      secondaryCategory: 'toppers',
      badge: 'Autumn / Winter 2026 Collection',
      tagline: 'OEKO-TEX® Standard 100 Certified',
      accentColor: 'from-amber-900/90 via-stone-900/80 to-stone-950/95',
      ambientBg: 'bg-[#F2ECE1]',
      highlightPill: 'Up to 50% Off Selected Bedding'
    },
    {
      kicker: 'Transform Your Existing Mattress',
      title: 'Rejuvenate Your Sleep with a 10cm Cloud Layer',
      subtitle: 'Wake up pain-free. Our best-selling baffle box mattress topper cushions pressure points and turns any firm mattress into a plush cloud.',
      ctaText: 'Shop Mattress Toppers',
      secondaryCta: 'View Bounce-Back Pillows',
      targetCategory: 'toppers',
      secondaryCategory: 'pillows',
      badge: 'Over 45,000 UK Units Sold',
      tagline: '30-Night Risk-Free Sleep Trial',
      accentColor: 'from-stone-900/90 via-stone-900/80 to-stone-950/95',
      ambientBg: 'bg-[#EAE5DA]',
      highlightPill: 'Rated 4.95/5 by 2,300+ Verified Buyers'
    }
  ];

  // Auto-slide transition every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const current = slides[activeSlide];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE6] to-[#FAF8F5] border-b border-stone-200">
      
      {/* Decorative architectural background mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-200/50 blur-3xl"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-amber-100/60 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Trust badge with ratings */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-stone-200/80 shadow-xs text-xs">
              <span className="flex text-amber-500 text-xs">
                {'★'.repeat(5)}
              </span>
              <span className="font-semibold text-stone-900">4.9 / 5.0</span>
              <span className="text-stone-400">·</span>
              <span className="text-stone-600 font-medium">12,000+ Happy UK Sleepers</span>
            </div>

            {/* Campaign headline with smooth animation */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-px bg-amber-600"></span>
                <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-amber-800">
                  {current.kicker}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[54px] leading-[1.12] font-bold text-stone-900 tracking-tight text-balance">
                {current.title}
              </h1>

              <p className="text-stone-600 text-base sm:text-lg max-w-xl leading-relaxed pt-1">
                {current.subtitle}
              </p>
            </div>

            {/* Call to action buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => {
                  onSelectCategory(current.targetCategory);
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 group cursor-pointer"
              >
                <span>{current.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-400" />
              </button>

              <button
                onClick={() => {
                  onSelectCategory(current.secondaryCategory);
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-3.5 bg-white hover:bg-stone-100 text-stone-800 font-medium text-sm rounded-full border border-stone-300 shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer"
              >
                {current.secondaryCta}
              </button>
            </div>

            {/* Key British Heritage & Trust Indicators */}
            <div className="pt-4 grid grid-cols-3 gap-2 sm:gap-4 border-t border-stone-200/80 max-w-lg">
              <div className="flex items-center gap-2 text-xs text-stone-700">
                <Truck className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="font-medium">Free UK Delivery &gt; £35</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-700">
                <RotateCcw className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="font-medium">30-Night Sleep Trial</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-700">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="font-medium">OEKO-TEX® Safe</span>
              </div>
            </div>

            {/* Slide switcher dots */}
            <div className="flex items-center gap-2 pt-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeSlide === idx ? 'w-8 bg-stone-900' : 'w-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
              <span className="text-[11px] text-stone-400 ml-2 font-mono">
                0{activeSlide + 1} / 0{slides.length}
              </span>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Showcase Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200/90 bg-white">
                
                {/* Visual Header Banner */}
                <div className="relative h-64 sm:h-72 bg-gradient-to-br from-[#EFE9DC] to-[#DDD4C0] flex items-center justify-center p-6 overflow-hidden">
                  
                  {/* Subtle warm sun ray effect */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/60 via-transparent to-transparent"></div>
                  
                  {/* High fidelity SVG of dressed luxury bed */}
                  <svg viewBox="0 0 400 280" className="w-full h-full drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Headboard */}
                    <rect x="60" y="30" width="280" height="75" rx="8" fill="#3E3835" stroke="#2B2623" strokeWidth="2" />
                    <line x1="200" y1="30" x2="200" y2="105" stroke="#2B2623" strokeWidth="2" />
                    
                    {/* Two crisp Oxford Pillows */}
                    <rect x="75" y="55" width="115" height="65" rx="16" fill="#FFFFFF" stroke="#E2DDD5" strokeWidth="2" />
                    <rect x="80" y="60" width="105" height="55" rx="12" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />

                    <rect x="210" y="55" width="115" height="65" rx="16" fill="#FFFFFF" stroke="#E2DDD5" strokeWidth="2" />
                    <rect x="215" y="60" width="105" height="55" rx="12" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />

                    {/* Turn-down top sheet */}
                    <path d="M50 110 L350 110 L350 135 L50 135 Z" fill="#FBFBF9" stroke="#E2DDD5" strokeWidth="1.5" />
                    <line x1="50" y1="128" x2="350" y2="128" stroke="#D4AF37" strokeWidth="1.5" />

                    {/* Quilted Baffle Box Topper / Duvet Cover with realistic drape */}
                    <path d="M45 130 L355 130 L365 240 L35 240 Z" fill="#FAF8F5" stroke="#DCD6CA" strokeWidth="1.5" />
                    
                    {/* Quilted diamond stitching */}
                    <path d="M85 130 L220 240" stroke="#E3DDD2" strokeWidth="1.5" strokeDasharray="4 3" />
                    <path d="M150 130 L285 240" stroke="#E3DDD2" strokeWidth="1.5" strokeDasharray="4 3" />
                    <path d="M215 130 L350 240" stroke="#E3DDD2" strokeWidth="1.5" strokeDasharray="4 3" />

                    <path d="M215 130 L80 240" stroke="#E3DDD2" strokeWidth="1.5" strokeDasharray="4 3" />
                    <path d="M280 130 L145 240" stroke="#E3DDD2" strokeWidth="1.5" strokeDasharray="4 3" />
                    <path d="M345 130 L210 240" stroke="#E3DDD2" strokeWidth="1.5" strokeDasharray="4 3" />

                    {/* Plush folded honeycomb throw blanket draped across bottom */}
                    <path d="M38 200 L362 200 L365 245 L35 245 Z" fill="#CBB69B" stroke="#B39E83" strokeWidth="1.5" />
                    <line x1="40" y1="215" x2="360" y2="215" stroke="#B39E83" strokeWidth="1.5" strokeDasharray="5 3" />
                  </svg>

                  {/* Corner Ribbon / Stamp */}
                  <div className="absolute top-3 left-3 bg-amber-700 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-xs">
                    British Hotel Grade
                  </div>
                </div>

                {/* Showcase Product Details & Interactive Quick Add */}
                <div className="p-5 sm:p-6 bg-white space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-amber-800 font-semibold tracking-wider uppercase text-[11px]">
                      Customer Choice Award 2026
                    </span>
                    <span className="text-emerald-700 font-medium flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      In Stock for Next Day UK Dispatch
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                    100% Egyptian Cotton Duvet Set + 10cm Topper Bundle
                  </h3>

                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-stone-900 tabular-nums">£34.99</span>
                    <span className="text-sm text-stone-400 line-through tabular-nums">£59.99</span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Save 42% Today
                    </span>
                  </div>

                  {/* Available sizes picker preview */}
                  <div className="pt-1 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-stone-600 font-medium">
                      <span>UK Sizes:</span>
                      <span className="bg-stone-100 px-1.5 py-0.5 rounded text-[11px]">Single</span>
                      <span className="bg-stone-100 px-1.5 py-0.5 rounded text-[11px]">Double</span>
                      <span className="bg-stone-900 text-white px-1.5 py-0.5 rounded text-[11px] font-semibold">King</span>
                      <span className="bg-stone-100 px-1.5 py-0.5 rounded text-[11px]">Super King</span>
                    </div>

                    <button
                      onClick={() => {
                        const product = featuredProducts[0];
                        if (product) onSelectProduct(product);
                      }}
                      className="text-xs font-semibold text-amber-800 hover:text-amber-900 underline flex items-center gap-1 cursor-pointer"
                    >
                      Quick View <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Floating Satisfaction Seal */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white p-3 rounded-xl shadow-lg border border-stone-200 items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900">30-Night Sleep Trial</p>
                  <p className="text-[11px] text-stone-500">Love it or full refund guaranteed</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Quick-Jump Visual Category Strip right under Hero */}
        <div className="mt-12 pt-8 border-t border-stone-200/90">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-4 text-center sm:text-left">
            Explore Sunshine Comforts Essentials
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { id: 'bedding', name: 'Duvet Sets', priceFrom: '£34.99', count: '100% Egyptian Cotton' },
              { id: 'toppers', name: '10cm Toppers', priceFrom: '£39.99', count: 'Deep Baffle Box' },
              { id: 'pillows', name: 'Hotel Pillows', priceFrom: '£19.99', count: 'Bounce-Back 2pk' },
              { id: 'sheets', name: '40cm Fitted Sheets', priceFrom: '£13.99', count: 'Extra Deep Elastic' },
              { id: 'curtains', name: 'Velvet Curtains', priceFrom: '£42.99', count: 'Thermal Blackout' },
              { id: 'bath', name: '700 GSM Towels', priceFrom: '£26.99', count: '6-Piece Pure Bale' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectCategory(item.id);
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white/80 hover:bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-2xs hover:shadow-md transition-all duration-200 text-left group cursor-pointer"
              >
                <p className="text-xs font-semibold text-stone-900 group-hover:text-amber-800 transition-colors">
                  {item.name}
                </p>
                <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">{item.count}</p>
                <p className="text-xs font-bold text-amber-700 mt-1">From {item.priceFrom}</p>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
