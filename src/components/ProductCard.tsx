import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }) => void;
  onQuickView: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  isWishlisted,
  onToggleWishlist
}) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isAdded, setIsAdded] = useState(false);

  const calculatedPrice = product.price + selectedSize.priceModifier;
  const calculatedOriginalPrice = product.originalPrice + selectedSize.priceModifier;
  const discountPercentage = Math.round(
    ((calculatedOriginalPrice - calculatedPrice) / calculatedOriginalPrice) * 100
  );

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize.name, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="group relative bg-white rounded-xl border border-stone-200/90 hover:border-amber-400/80 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* 1. Imagery Container (65-75% visual prominence) */}
      <div className="relative overflow-hidden bg-[#FAF8F5]">
        
        {/* Textile Visual Renderer */}
        <ProductVisual
          product={product}
          selectedColor={selectedColor}
          aspectRatio="4:3"
          showHoverZoom={true}
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {product.tag ? (
            <span className="bg-stone-900/90 text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded shadow-xs">
              {product.tag}
            </span>
          ) : (
            <span />
          )}

          {discountPercentage > 0 && (
            <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
              Save {discountPercentage}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-xs transition-colors shadow-xs ${
            isWishlisted 
              ? 'bg-rose-50 text-rose-600' 
              : 'bg-white/80 hover:bg-white text-stone-600 hover:text-stone-900'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
        </button>

        {/* Quick View Hover Button (Desktop) */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full bg-white/95 hover:bg-white text-stone-900 py-2 rounded-lg text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-stone-600" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* 2. Product Details & Interactive Controls */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Category & Star Rating */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span className="uppercase tracking-wider text-[11px] font-medium text-amber-800">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span className="font-semibold text-stone-900 text-[11px]">{product.rating}</span>
              <span className="text-stone-400 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </div>

        {/* Fabric Spec Callout */}
        <div className="text-[11px] text-stone-500 line-clamp-1 border-t border-stone-100 pt-2">
          <span className="font-medium text-stone-700">{product.fabricSpec.threadCountOrGsm}</span>
          <span className="mx-1.5 text-stone-300">·</span>
          <span>{product.fabricSpec.material}</span>
        </div>

        {/* Interactive Color Swatches */}
        {product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 pt-1" onClick={(e) => e.stopPropagation()}>
            <span className="text-[10px] text-stone-400 mr-1">Colour:</span>
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c)}
                title={c.name}
                className={`w-4 h-4 rounded-full transition-transform ${c.bgClass} ${
                  selectedColor.name === c.name 
                    ? 'ring-2 ring-amber-600 scale-110 shadow-xs' 
                    : 'opacity-80 hover:opacity-100 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
            <span className="text-[10px] text-stone-600 truncate ml-1 font-medium">
              {selectedColor.name}
            </span>
          </div>
        )}

        {/* Interactive Size Selector */}
        {product.sizes.length > 1 && (
          <div className="flex flex-wrap items-center gap-1 pt-0.5" onClick={(e) => e.stopPropagation()}>
            {product.sizes.map((s) => (
              <button
                key={s.name}
                onClick={() => setSelectedSize(s)}
                className={`px-2 py-0.5 text-[10px] font-medium rounded transition-colors ${
                  selectedSize.name === s.name
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        )}

        {/* Pricing & Add to Bag CTA */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-stone-900 tabular-nums">
                £{calculatedPrice.toFixed(2)}
              </span>
              {calculatedOriginalPrice > calculatedPrice && (
                <span className="text-xs text-stone-400 line-through tabular-nums">
                  £{calculatedOriginalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-stone-500 block">
              Free UK delivery eligible
            </span>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            disabled={isAdded}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
              isAdded
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-stone-900 hover:bg-amber-800 text-white shadow-xs hover:shadow-md'
            }`}
            aria-label={`Add ${product.name} to bag`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
