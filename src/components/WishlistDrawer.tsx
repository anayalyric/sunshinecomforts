import React from 'react';
import { X, Trash2, ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  onQuickView
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/60 backdrop-blur-xs transition-opacity">
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
              Saved Favourites ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-400">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-800">Your wishlist is empty</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Save your favourite Egyptian cotton duvet sets and 10cm mattress toppers to review anytime.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-full shadow-xs transition-colors cursor-pointer"
              >
                Browse Best Sellers
              </button>
            </div>
          ) : (
            wishlist.map((product) => (
              <div key={product.id} className="flex gap-3 pb-4 border-b border-stone-100 last:border-b-0">
                <div 
                  onClick={() => { onQuickView(product); onClose(); }}
                  className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-stone-200 cursor-pointer"
                >
                  <ProductVisual
                    product={product}
                    aspectRatio="1:1"
                    showHoverZoom={false}
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 
                        onClick={() => { onQuickView(product); onClose(); }}
                        className="text-xs sm:text-sm font-semibold text-stone-900 hover:text-amber-800 cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveFromWishlist(product)}
                        className="text-stone-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-stone-500 mt-0.5">{product.categoryLabel}</p>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-xs sm:text-sm font-bold text-stone-900 tabular-nums">
                        £{product.price.toFixed(2)}
                      </span>
                      <span className="text-[11px] text-stone-400 line-through tabular-nums">
                        £{product.originalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        onAddToCart(product, product.sizes[0].name, product.colors[0]);
                        onRemoveFromWishlist(product);
                      }}
                      className="w-full py-1.5 px-3 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                      <span>Move to Basket</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {wishlist.length > 0 && (
          <div className="p-4 bg-stone-50 border-t border-stone-200 text-center">
            <button
              onClick={onClose}
              className="text-xs font-medium text-stone-600 hover:text-stone-900 underline"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
