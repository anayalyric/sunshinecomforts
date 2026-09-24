import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Tag, 
  Check, 
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { CartItem } from '../types';
import { ProductVisual } from './ProductVisual';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
  onApplyCoupon: (code: string) => boolean;
  discountAmount: number;
  appliedCoupon: string | null;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onApplyCoupon,
  discountAmount,
  appliedCoupon
}) => {
  if (!isOpen) return null;

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');

  const FREE_SHIPPING_THRESHOLD = 35.0;
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const shippingCost = deliveryMethod === 'express' ? 4.99 : (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 3.99);
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const success = onApplyCoupon(couponCode.trim());
    if (!success) {
      setCouponError('Invalid coupon code. Try COMFORT15 or SUNSHINE10');
    } else {
      setCouponError('');
      setCouponCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/60 backdrop-blur-xs transition-opacity">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Body */}
      <div 
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-700" />
            <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
              Your Basket ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Meter */}
        <div className="bg-amber-50/80 px-5 py-3 border-b border-amber-200/60">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-amber-700" />
              {amountToFreeShipping > 0 ? (
                <span>Add <strong className="text-amber-900">£{amountToFreeShipping.toFixed(2)}</strong> more for FREE UK Delivery</span>
              ) : (
                <span className="text-emerald-800 font-bold">🎉 Congratulations! You have unlocked FREE UK Delivery</span>
              )}
            </span>
            <span className="text-[11px] text-stone-500 font-mono">
              £{subtotal.toFixed(2)} / £{FREE_SHIPPING_THRESHOLD.toFixed(2)}
            </span>
          </div>
          <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 rounded-full ${
                amountToFreeShipping === 0 ? 'bg-emerald-600' : 'bg-amber-600'
              }`}
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-800">Your basket is empty</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Treat yourself to 100% Egyptian cotton bedding, 10cm mattress toppers, or hotel bounce-back pillows.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-full shadow-xs transition-colors cursor-pointer"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div 
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}-${idx}`}
                className="flex gap-3 pb-4 border-b border-stone-100 last:border-b-0"
              >
                {/* Visual Thumbnail */}
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-stone-200">
                  <ProductVisual
                    product={item.product}
                    selectedColor={item.selectedColor}
                    aspectRatio="1:1"
                    showHoverZoom={false}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs sm:text-sm font-semibold text-stone-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                      <span className="font-medium text-stone-700">Size: {item.selectedSize}</span>
                      <span>·</span>
                      <div className="flex items-center gap-1">
                        <span 
                          className="w-2.5 h-2.5 rounded-full border border-stone-300"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <span>{item.selectedColor.name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Item Line Total */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-stone-200 rounded-md bg-stone-50">
                      <button
                        onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                        className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-200 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-xs font-semibold tabular-nums text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-200 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs sm:text-sm font-bold text-stone-900 tabular-nums">
                        £{(item.unitPrice * item.quantity).toFixed(2)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-[10px] text-stone-400 block tabular-nums">
                          £{item.unitPrice.toFixed(2)} each
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Calculations */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50/60 space-y-3">
            
            {/* Coupon Code Input */}
            <form onSubmit={handleCouponSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Discount code (try COMFORT15)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full bg-white text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-hidden focus:border-amber-600 uppercase"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {appliedCoupon && (
              <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded border border-emerald-200">
                <span className="flex items-center gap-1 font-semibold">
                  <Tag className="w-3.5 h-3.5" />
                  Code '{appliedCoupon}' Applied
                </span>
                <span>-£{discountAmount.toFixed(2)}</span>
              </div>
            )}

            {couponError && (
              <p className="text-[11px] text-rose-600">{couponError}</p>
            )}

            {/* Delivery Option Toggle */}
            <div className="text-xs space-y-1">
              <span className="text-stone-500 font-medium">UK Delivery Method:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('standard')}
                  className={`p-2 rounded border text-left text-[11px] transition-colors cursor-pointer ${
                    deliveryMethod === 'standard' ? 'border-amber-600 bg-amber-50/50 font-semibold' : 'border-stone-200 bg-white'
                  }`}
                >
                  <span className="block font-bold">Standard Tracked</span>
                  <span className="text-stone-500">
                    {subtotal >= FREE_SHIPPING_THRESHOLD ? 'FREE (2-3 days)' : '£3.99'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('express')}
                  className={`p-2 rounded border text-left text-[11px] transition-colors cursor-pointer ${
                    deliveryMethod === 'express' ? 'border-amber-600 bg-amber-50/50 font-semibold' : 'border-stone-200 bg-white'
                  }`}
                >
                  <span className="block font-bold">DPD Next Day</span>
                  <span className="text-stone-500">£4.99 (Tomorrow)</span>
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-1.5 pt-2 border-t border-stone-200 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900 tabular-nums">£{subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span className="font-semibold tabular-nums">-£{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Shipping ({deliveryMethod === 'express' ? 'DPD Next Day' : 'Standard'})</span>
                <span className="font-semibold text-stone-900 tabular-nums">
                  {shippingCost === 0 ? 'FREE' : `£${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-bold text-stone-900 pt-1 border-t border-stone-200">
                <span>Total Due (inc. VAT)</span>
                <span className="tabular-nums">£{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Klarna / ClearPay notice */}
            <p className="text-[11px] text-stone-500 text-center">
              Or 3 interest-free installments of <strong className="text-stone-800">£{(finalTotal / 3).toFixed(2)}</strong> with <span className="font-bold text-pink-600">Klarna</span>
            </p>

            {/* Checkout Action Button */}
            <button
              onClick={onCheckout}
              className="w-full py-3.5 px-4 bg-stone-900 hover:bg-amber-800 text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Proceed to UK Checkout</span>
              <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-Bit Encrypted Secure Checkout · 30-Day UK Returns</span>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
