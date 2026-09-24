import React from 'react';
import { Product } from '../types';

interface ProductVisualProps {
  product: Product;
  selectedColor?: { name: string; hex: string; fabricTone?: string };
  aspectRatio?: '4:3' | '16:9' | '1:1';
  className?: string;
  showHoverZoom?: boolean;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  product,
  selectedColor,
  aspectRatio = '4:3',
  className = '',
  showHoverZoom = true
}) => {
  const activeColor = selectedColor || product.colors[0];
  const colorHex = activeColor.hex;
  const isLight = colorHex.toLowerCase() === '#ffffff' || colorHex.toLowerCase() === '#fafafa' || colorHex.toLowerCase() === '#faf8f5' || colorHex.toLowerCase() === '#fdfbf7' || colorHex.toLowerCase() === '#faf9f6';

  const aspectClass =
    aspectRatio === '16:9' ? 'aspect-video' :
    aspectRatio === '1:1' ? 'aspect-square' :
    'aspect-[4/3]';

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden bg-gradient-to-b from-[#F7F5EE] to-[#ECE8DC] flex items-center justify-center p-4 transition-transform duration-500 ${showHoverZoom ? 'group-hover:scale-[1.03]' : ''} ${className}`}
      style={{
        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.02)'
      }}
    >
      {/* Subtle organic linen/weave texture overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-25 pointer-events-none mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id={`noise-${product.id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0.25 0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#noise-${product.id})`} />
      </svg>

      {/* Product-specific dynamic SVG rendering */}
      {renderVisualGraphic(product, colorHex, isLight)}

      {/* Brand watercraft / luxury seal watermark */}
      <div className="absolute bottom-2.5 right-3 text-[10px] tracking-widest uppercase font-serif text-stone-400/80 pointer-events-none select-none">
        Sunshine Comforts · London
      </div>
    </div>
  );
};

function renderVisualGraphic(product: Product, hex: string, isLight: boolean) {
  const strokeColor = isLight ? '#D6D3CD' : 'rgba(255,255,255,0.2)';
  const shadowColor = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.25)';

  switch (product.category) {
    case 'toppers':
      return (
        <svg viewBox="0 0 400 300" className="w-[88%] h-[88%] drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Base mattress silhouette underneath */}
          <path d="M40 180 L200 240 L360 180 L200 120 Z" fill="#E2DDD5" />
          <path d="M40 180 L200 240 L200 270 L40 210 Z" fill="#D3CDBF" />
          <path d="M200 240 L360 180 L360 210 L200 270 Z" fill="#BFB7A5" />

          {/* 10cm Thick Baffle Box Mattress Topper */}
          <g transform="translate(0, -28)">
            {/* Top quilted surface with baffle box chambers */}
            <path
              d="M40 160 Q120 190 200 220 Q280 190 360 160 Q280 130 200 100 Q120 130 40 160 Z"
              fill={hex}
              stroke={strokeColor}
              strokeWidth="1.5"
            />
            {/* Quilted Baffle Box Stitched Grids */}
            <path d="M80 145 Q160 175 240 205" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M120 130 Q200 160 280 190" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M160 115 Q240 145 320 175" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 3" />

            <path d="M120 175 Q200 145 280 115" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M160 190 Q240 160 320 130" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M80 160 Q160 130 240 100" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Quilted indentation tufts */}
            {[
              { x: 160, y: 160 }, { x: 200, y: 145 }, { x: 240, y: 160 },
              { x: 200, y: 175 }, { x: 140, y: 145 }, { x: 260, y: 145 },
              { x: 120, y: 160 }, { x: 280, y: 160 }
            ].map((pt, i) => (
              <circle key={i} cx={pt.x} cy={pt.y} r="3" fill={isLight ? '#C5C0B6' : '#222'} opacity="0.6" />
            ))}

            {/* 10cm Thickness Front Side Wall */}
            <path
              d="M40 160 L200 220 L200 250 L40 190 Z"
              fill={isLight ? '#F0ECE4' : hex}
              filter={isLight ? 'none' : 'brightness(0.85)'}
              stroke={strokeColor}
              strokeWidth="1.5"
            />
            {/* Right Side Wall */}
            <path
              d="M200 220 L360 160 L360 190 L200 250 Z"
              fill={isLight ? '#E3DED4' : hex}
              filter={isLight ? 'none' : 'brightness(0.75)'}
              stroke={strokeColor}
              strokeWidth="1.5"
            />

            {/* Corner Elastic Anchor Straps */}
            <path d="M48 185 L56 220" stroke="#78716C" strokeWidth="6" strokeLinecap="round" />
            <path d="M192 245 L200 270" stroke="#78716C" strokeWidth="6" strokeLinecap="round" />
            <path d="M352 185 L344 220" stroke="#78716C" strokeWidth="6" strokeLinecap="round" />

            {/* 10cm Depth callout indicator */}
            <g transform="translate(32, 175)">
              <line x1="0" y1="0" x2="0" y2="30" stroke="#B45309" strokeWidth="2" />
              <circle cx="0" cy="0" r="2.5" fill="#B45309" />
              <circle cx="0" cy="30" r="2.5" fill="#B45309" />
              <rect x="-38" y="7" width="34" height="16" rx="3" fill="#B45309" />
              <text x="-21" y="19" fill="#FFF" fontSize="9" fontWeight="bold" textAnchor="middle">10cm</text>
            </g>
          </g>
        </svg>
      );

    case 'pillows':
      return (
        <svg viewBox="0 0 400 300" className="w-[85%] h-[85%] drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Back Pillow */}
          <g transform="translate(60, 45) rotate(-6)">
            <rect
              x="20" y="20" width="220" height="140" rx="36"
              fill={hex}
              stroke={strokeColor}
              strokeWidth="2"
              filter="brightness(0.92)"
            />
            {/* Satin piping */}
            <rect
              x="22" y="22" width="216" height="136" rx="34"
              stroke="#D4AF37"
              strokeWidth="1"
              strokeDasharray="2 2"
              opacity="0.8"
            />
            {/* Loft shadow */}
            <ellipse cx="130" cy="90" rx="70" ry="40" fill={shadowColor} opacity="0.4" />
          </g>

          {/* Front Bounce-Back Pillow */}
          <g transform="translate(90, 95) rotate(4)">
            <rect
              x="20" y="20" width="220" height="140" rx="36"
              fill={hex}
              stroke={strokeColor}
              strokeWidth="2"
            />
            {/* Satin Oxford border / Piping */}
            <rect
              x="22" y="22" width="216" height="136" rx="34"
              stroke="#D4AF37"
              strokeWidth="1.5"
              opacity="0.9"
            />
            {/* Soft bounce center depression & highlights */}
            <ellipse cx="130" cy="90" rx="65" ry="38" fill={isLight ? '#FFFFFF' : 'rgba(255,255,255,0.1)'} />
            <path
              d="M70 90 Q130 110 190 90"
              stroke={isLight ? '#E5E0D8' : 'rgba(0,0,0,0.3)'}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Hotel woven label */}
            <rect x="200" y="125" width="24" height="14" rx="2" fill="#FAF5E9" stroke="#C5B07B" strokeWidth="1" />
            <line x1="204" y1="130" x2="220" y2="130" stroke="#927A3A" strokeWidth="1" />
            <line x1="204" y1="134" x2="216" y2="134" stroke="#927A3A" strokeWidth="1" />
          </g>
        </svg>
      );

    case 'curtains':
      return (
        <svg viewBox="0 0 400 300" className="w-[85%] h-[85%] drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Chrome Curtain Pole */}
          <rect x="30" y="35" width="340" height="10" rx="5" fill="url(#metal-pole)" stroke="#9CA3AF" strokeWidth="1" />
          <circle cx="28" cy="40" r="9" fill="#9CA3AF" />
          <circle cx="372" cy="40" r="9" fill="#9CA3AF" />

          <defs>
            <linearGradient id="metal-pole" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E5E7EB" />
              <stop offset="50%" stopColor="#9CA3AF" />
              <stop offset="100%" stopColor="#4B5563" />
            </linearGradient>
            <linearGradient id={`velvet-sheen-${product.id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={hex} />
              <stop offset="25%" stopColor={hex} stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.25" />
              <stop offset="75%" stopColor={hex} stopOpacity="0.9" />
              <stop offset="100%" stopColor={hex} />
            </linearGradient>
          </defs>

          {/* Left Velvet Curtain Panel with Deep Folds */}
          <g transform="translate(60, 42)">
            {/* Eyelet rings */}
            {[10, 35, 60, 85, 110].map((x, idx) => (
              <circle key={idx} cx={x} cy="6" r="6" fill="#D1D5DB" stroke="#4B5563" strokeWidth="2" />
            ))}
            <path
              d="M5 12 Q20 20 35 12 Q50 20 65 12 Q80 20 95 12 Q110 20 125 12 L125 240 Q110 230 95 240 Q80 230 65 240 Q50 230 35 240 Q20 230 5 240 Z"
              fill={hex}
              stroke={strokeColor}
              strokeWidth="1.5"
            />
            {/* Deep vertical velvet drape shadows */}
            <path d="M20 18 L20 232" stroke="rgba(0,0,0,0.3)" strokeWidth="8" strokeLinecap="round" />
            <path d="M50 18 L50 232" stroke="rgba(0,0,0,0.3)" strokeWidth="8" strokeLinecap="round" />
            <path d="M80 18 L80 232" stroke="rgba(0,0,0,0.3)" strokeWidth="8" strokeLinecap="round" />
            <path d="M110 18 L110 232" stroke="rgba(0,0,0,0.3)" strokeWidth="8" strokeLinecap="round" />

            {/* Velvet highlights */}
            <path d="M35 12 L35 238" stroke="rgba(255,255,255,0.25)" strokeWidth="6" strokeLinecap="round" />
            <path d="M65 12 L65 238" stroke="rgba(255,255,255,0.25)" strokeWidth="6" strokeLinecap="round" />
            <path d="M95 12 L95 238" stroke="rgba(255,255,255,0.25)" strokeWidth="6" strokeLinecap="round" />
          </g>

          {/* Right Velvet Curtain Panel */}
          <g transform="translate(215, 42)">
            {[10, 35, 60, 85, 110].map((x, idx) => (
              <circle key={idx} cx={x} cy="6" r="6" fill="#D1D5DB" stroke="#4B5563" strokeWidth="2" />
            ))}
            <path
              d="M5 12 Q20 20 35 12 Q50 20 65 12 Q80 20 95 12 Q110 20 125 12 L125 240 Q110 230 95 240 Q80 230 65 240 Q50 230 35 240 Q20 230 5 240 Z"
              fill={hex}
              stroke={strokeColor}
              strokeWidth="1.5"
            />
            <path d="M20 18 L20 232" stroke="rgba(0,0,0,0.3)" strokeWidth="8" strokeLinecap="round" />
            <path d="M50 18 L50 232" stroke="rgba(0,0,0,0.3)" strokeWidth="8" strokeLinecap="round" />
            <path d="M80 18 L80 232" stroke="rgba(0,0,0,0.3)" strokeWidth="8" strokeLinecap="round" />
            <path d="M110 18 L110 232" stroke="rgba(0,0,0,0.3)" strokeWidth="8" strokeLinecap="round" />

            <path d="M35 12 L35 238" stroke="rgba(255,255,255,0.25)" strokeWidth="6" strokeLinecap="round" />
            <path d="M65 12 L65 238" stroke="rgba(255,255,255,0.25)" strokeWidth="6" strokeLinecap="round" />
            <path d="M95 12 L95 238" stroke="rgba(255,255,255,0.25)" strokeWidth="6" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'bath':
      return (
        <svg viewBox="0 0 400 300" className="w-[85%] h-[85%] drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stacked 6-piece Luxury Egyptian Towel Bale */}
          {/* Bottom Bath Sheet 1 */}
          <g transform="translate(85, 175)">
            <rect x="0" y="0" width="230" height="42" rx="14" fill={hex} stroke={strokeColor} strokeWidth="1.5" />
            <line x1="20" y1="21" x2="210" y2="21" stroke={isLight ? '#DDD6CC' : 'rgba(255,255,255,0.2)'} strokeWidth="2" strokeDasharray="4 2" />
          </g>

          {/* Bath Towel 2 */}
          <g transform="translate(95, 142)">
            <rect x="0" y="0" width="210" height="38" rx="12" fill={hex} stroke={strokeColor} strokeWidth="1.5" filter="brightness(0.97)" />
            <line x1="20" y1="19" x2="190" y2="19" stroke={isLight ? '#DDD6CC' : 'rgba(255,255,255,0.2)'} strokeWidth="2" strokeDasharray="4 2" />
          </g>

          {/* Hand Towel 3 */}
          <g transform="translate(110, 112)">
            <rect x="0" y="0" width="180" height="34" rx="10" fill={hex} stroke={strokeColor} strokeWidth="1.5" filter="brightness(1.02)" />
            <line x1="18" y1="17" x2="162" y2="17" stroke={isLight ? '#DDD6CC' : 'rgba(255,255,255,0.2)'} strokeWidth="1.5" strokeDasharray="4 2" />
          </g>

          {/* Face Towel 4 */}
          <g transform="translate(130, 84)">
            <rect x="0" y="0" width="140" height="30" rx="8" fill={hex} stroke={strokeColor} strokeWidth="1.5" />
            <line x1="15" y1="15" x2="125" y2="15" stroke={isLight ? '#DDD6CC' : 'rgba(255,255,255,0.2)'} strokeWidth="1.5" strokeDasharray="4 2" />
          </g>

          {/* Luxury Silk Satin Gift Ribbon Tied Around The Bale */}
          <path d="M190 75 L190 220" stroke="#C5A059" strokeWidth="12" strokeLinecap="round" />
          <path d="M195 75 L195 220" stroke="#DFBA75" strokeWidth="4" />
          {/* Ribbon Bow on top */}
          <ellipse cx="178" cy="72" rx="14" ry="8" fill="#DFBA75" stroke="#B88A3B" strokeWidth="1" transform="rotate(-20 178 72)" />
          <ellipse cx="212" cy="72" rx="14" ry="8" fill="#DFBA75" stroke="#B88A3B" strokeWidth="1" transform="rotate(20 212 72)" />
          <circle cx="195" cy="74" r="6" fill="#B88A3B" />
        </svg>
      );

    case 'sheets':
      return (
        <svg viewBox="0 0 400 300" className="w-[88%] h-[88%] drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Isometric Deep Fitted Bed Corner */}
          <path d="M50 140 L200 205 L350 140 L200 75 Z" fill={hex} stroke={strokeColor} strokeWidth="1.5" />

          {/* 40cm Extra Deep Skirt Side 1 */}
          <path d="M50 140 L200 205 L200 255 L50 190 Z" fill={hex} filter="brightness(0.9)" stroke={strokeColor} strokeWidth="1.5" />
          {/* 40cm Extra Deep Skirt Side 2 */}
          <path d="M200 205 L350 140 L350 190 L200 255 Z" fill={hex} filter="brightness(0.8)" stroke={strokeColor} strokeWidth="1.5" />

          {/* Reinforced 360 Elastic Band Along Base */}
          <path d="M50 190 L200 255 L350 190" stroke="#78716C" strokeWidth="5" strokeLinecap="round" strokeDasharray="6 3" />

          {/* Corner tuck curve */}
          <path d="M190 205 Q200 215 210 205" stroke={isLight ? '#DDD6CC' : 'rgba(255,255,255,0.3)'} strokeWidth="3" />

          {/* 40cm Extra Deep Badge */}
          <g transform="translate(260, 215)">
            <rect x="0" y="0" width="85" height="28" rx="6" fill="#B45309" />
            <text x="42" y="18" fill="#FFF" fontSize="11" fontWeight="bold" textAnchor="middle">40cm Deep</text>
          </g>
        </svg>
      );

    case 'bedding':
    default:
      return (
        <svg viewBox="0 0 400 300" className="w-[88%] h-[88%] drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Dressed Master Bed with Crisp Egyptian Cotton Duvet */}
          {/* Headboard */}
          <rect x="70" y="45" width="260" height="70" rx="6" fill="#44403C" stroke="#292524" strokeWidth="2" />
          <line x1="200" y1="45" x2="200" y2="115" stroke="#292524" strokeWidth="1.5" />

          {/* 2 Propped Hotel Oxford Pillows */}
          <rect x="85" y="70" width="105" height="60" rx="14" fill={hex} stroke={strokeColor} strokeWidth="1.5" />
          <rect x="90" y="75" width="95" height="50" rx="10" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />

          <rect x="210" y="70" width="105" height="60" rx="14" fill={hex} stroke={strokeColor} strokeWidth="1.5" />
          <rect x="215" y="75" width="95" height="50" rx="10" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />

          {/* Folded Top Sheet Hem / Turnover */}
          <path
            d="M60 120 L340 120 L340 148 L60 148 Z"
            fill={isLight ? '#FFFFFF' : hex}
            stroke={strokeColor}
            strokeWidth="1.5"
            filter="brightness(1.05)"
          />
          <line x1="60" y1="140" x2="340" y2="140" stroke="#C5B07B" strokeWidth="1.5" />

          {/* Main Duvet Quilt with Natural Drapes & Folds */}
          <path
            d="M55 145 L345 145 L355 240 L45 240 Z"
            fill={hex}
            stroke={strokeColor}
            strokeWidth="1.5"
          />

          {/* Subtle sateen sheen reflections */}
          <path d="M100 150 L85 235" stroke="rgba(255,255,255,0.25)" strokeWidth="16" strokeLinecap="round" />
          <path d="M220 150 L205 235" stroke="rgba(255,255,255,0.2)" strokeWidth="12" strokeLinecap="round" />
          <path d="M150 150 L140 235" stroke="rgba(0,0,0,0.1)" strokeWidth="10" strokeLinecap="round" />
          <path d="M280 150 L270 235" stroke="rgba(0,0,0,0.12)" strokeWidth="12" strokeLinecap="round" />

          {/* Folded waffle runner at bed foot */}
          <path
            d="M48 215 L352 215 L355 245 L45 245 Z"
            fill={isLight ? '#DDD0BE' : 'rgba(0,0,0,0.2)'}
            stroke={isLight ? '#C5B6A0' : 'rgba(255,255,255,0.1)'}
            strokeWidth="1"
          />
        </svg>
      );
  }
}
