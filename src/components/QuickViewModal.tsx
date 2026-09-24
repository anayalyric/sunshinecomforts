import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Check, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Clock, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }, quantity: number) => void;
  onOpenSizeGuide: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenSizeGuide
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'delivery'>('details');
  const [isAdded, setIsAdded] = useState(false);

  const calculatedUnitPrice = product.price + selectedSize.priceModifier;
  const originalUnitPrice = product.originalPrice + selectedSize.priceModifier;
  const totalPrice = calculatedUnitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(product, selectedSize.name, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
      {/* Modal Card */}
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-stone-900 bg-white/80 hover:bg-white rounded-full transition-colors shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Visual Showcase */}
          <div className="md:col-span-6 bg-[#FAF8F5] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
            <div className="relative rounded-xl overflow-hidden shadow-inner border border-stone-200/80">
              <ProductVisual
                product={product}
                selectedColor={selectedColor}
                aspectRatio="4:3"
                showHoverZoom={false}
              />
              {product.tag && (
                <div className="absolute top-3 left-3 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                  {product.tag}
                </div>
              )}
            </div>

            {/* Quick Guarantees bar */}
            <div className="mt-6 pt-4 border-t border-stone-200/80 grid grid-cols-2 gap-3 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>UK Next-Day Delivery Available</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-amber-700 shrink-0" />
                <span>30-Night Risk-Free Sleep Trial</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>OEKO-TEX® Non-Toxic Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                <span>100% British Quality Control</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            {/* Header info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-wider font-semibold text-amber-800">
                  {product.categoryLabel}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span className="font-bold text-stone-900">{product.rating}</span>
                  <span className="text-stone-400">({product.reviewsCount} customer reviews)</span>
                </div>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                {product.name}
              </h2>

              {/* Price display */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
                  £{calculatedUnitPrice.toFixed(2)}
                </span>
                {originalUnitPrice > calculatedUnitPrice && (
                  <span className="text-base text-stone-400 line-through tabular-nums">
                    £{originalUnitPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Save £{(originalUnitPrice - calculatedUnitPrice).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-700">
                    Selected Colour: <span className="font-bold text-stone-900">{selectedColor.name}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`group relative p-0.5 rounded-full transition-all cursor-pointer ${
                        selectedColor.name === c.name ? 'ring-2 ring-amber-600 scale-110' : 'hover:scale-105'
                      }`}
                      title={c.name}
                    >
                      <span
                        className={`block w-6 h-6 rounded-full border border-stone-300 shadow-xs`}
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-700">
                  Select UK Size: <span className="font-bold text-stone-900">{selectedSize.name}</span>
                </span>
                <button
                  onClick={onOpenSizeGuide}
                  className="text-amber-800 hover:text-amber-900 underline font-medium cursor-pointer"
                >
                  UK Size Chart
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setSelectedSize(s)}
                    className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                      selectedSize.name === s.name
                        ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 bg-white text-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{s.name}</span>
                      {s.priceModifier !== 0 && (
                        <span className={`text-[10px] ${selectedSize.name === s.name ? 'text-amber-300' : 'text-stone-500'}`}>
                          {s.priceModifier > 0 ? `+£${s.priceModifier}` : `-£${Math.abs(s.priceModifier)}`}
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] block mt-0.5 ${selectedSize.name === s.name ? 'text-stone-300' : 'text-stone-400'}`}>
                      {s.dimension}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart Controls */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-stone-600 hover:bg-stone-100 font-bold transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-semibold text-stone-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-stone-600 hover:bg-stone-100 font-bold transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add Button */}
                <button
                  onClick={handleAdd}
                  disabled={isAdded}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-900 hover:bg-amber-800 text-white hover:shadow-lg'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-amber-300" />
                      <span>Add to Basket · £{totalPrice.toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Delivery Urgency */}
              <div className="flex items-center gap-2 text-xs text-stone-600 bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/60">
                <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  Order in the next <strong className="text-stone-900">3 hrs 42 mins</strong> for delivery tomorrow via DPD UK!
                </span>
              </div>
            </div>

            {/* Tabs: Details / Specs */}
            <div className="pt-2 border-t border-stone-200">
              <div className="flex items-center gap-4 text-xs font-semibold border-b border-stone-100 pb-2">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-1 transition-colors cursor-pointer ${
                    activeTab === 'details' ? 'text-amber-800 border-b-2 border-amber-800' : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Description & Features
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-1 transition-colors cursor-pointer ${
                    activeTab === 'specs' ? 'text-amber-800 border-b-2 border-amber-800' : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Fabric & Care Guide
                </button>
              </div>

              <div className="pt-3 text-xs text-stone-600 leading-relaxed min-h-[90px]">
                {activeTab === 'details' && (
                  <div className="space-y-2">
                    <p>{product.description}</p>
                    <ul className="space-y-1 pt-1">
                      {product.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="space-y-2">
                    <p><strong className="text-stone-900">Material:</strong> {product.fabricSpec.material}</p>
                    <p><strong className="text-stone-900">Specification:</strong> {product.fabricSpec.threadCountOrGsm}</p>
                    <p><strong className="text-stone-900">Care:</strong> {product.fabricSpec.careInstructions}</p>
                    <p><strong className="text-stone-900">Certifications:</strong> {product.fabricSpec.certifications.join(', ')}</p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
