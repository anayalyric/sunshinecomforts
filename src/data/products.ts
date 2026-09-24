import { Product, Review } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'sc-egyptian-duvet-set',
    name: '100% Egyptian Cotton 600 Thread Count Duvet Cover Set',
    category: 'bedding',
    categoryLabel: 'Bedding Sets',
    price: 34.99,
    originalPrice: 59.99,
    rating: 4.9,
    reviewsCount: 1842,
    tag: 'Best Seller',
    description: 'Immerse yourself in authentic five-star hotel luxury. Crafted from 100% long-staple Egyptian cotton with a silky sateen finish, our 600 thread count duvet set delivers cloud-like softness, natural breathability, and enduring crisp elegance wash after wash.',
    features: [
      '100% Pure Egyptian Long-Staple Cotton',
      'Silky smooth 600 thread count sateen weave',
      'Includes 1 duvet cover + 2 Oxford style pillowcases (1 with Single)',
      'Hidden non-scratch button closure & interior corner ties',
      'Hypoallergenic & OEKO-TEX® Standard 100 certified'
    ],
    sizes: [
      { name: 'Single', dimension: '135 x 200 cm', priceModifier: -5 },
      { name: 'Double', dimension: '200 x 200 cm', priceModifier: 0 },
      { name: 'King', dimension: '230 x 220 cm', priceModifier: 6 },
      { name: 'Super King', dimension: '260 x 220 cm', priceModifier: 12 }
    ],
    colors: [
      { name: 'Pristine White', hex: '#FFFFFF', bgClass: 'bg-white border-stone-300', fabricTone: '#FAF8F5' },
      { name: 'Charcoal Slate', hex: '#374151', bgClass: 'bg-stone-700', fabricTone: '#3A3F45' },
      { name: 'Sage Green', hex: '#879883', bgClass: 'bg-[#879883]', fabricTone: '#82947E' },
      { name: 'Midnight Navy', hex: '#1E293B', bgClass: 'bg-slate-900', fabricTone: '#1F2937' },
      { name: 'Blush Champagne', hex: '#EAD5C8', bgClass: 'bg-[#EAD5C8]', fabricTone: '#E4CFB8' }
    ],
    fabricSpec: {
      material: '100% Long-Staple Combed Egyptian Cotton',
      threadCountOrGsm: '600 Thread Count Sateen Weave',
      certifications: ['OEKO-TEX® Standard 100', 'Egyptian Cotton Gold Seal'],
      careInstructions: 'Machine washable at 40°C. Tumble dry on low heat. Easy iron while slightly damp.'
    },
    inStock: true,
    isBestSeller: true
  },
  {
    id: 'sc-baffle-mattress-topper',
    name: '10cm Extra Deep Baffle Box Quilted Mattress Topper',
    category: 'toppers',
    categoryLabel: 'Mattress Toppers',
    price: 39.99,
    originalPrice: 69.99,
    rating: 4.95,
    reviewsCount: 2310,
    tag: 'Customer Favourite',
    description: 'Transform your existing mattress into a cloud of rejuvenating comfort. Featuring an immense 10cm depth with 1000 GSM virgin hollowfibre filling and stitched baffle-box chambers that prevent filling shift, waking up refreshed has never felt this effortless.',
    features: [
      'Extra deep 10cm (4 inch) hotel-grade dual layer depth',
      '1000 GSM ultra-plush anti-allergy cluster fibre filling',
      'True Baffle Box construction eliminates cold and flat spots',
      'Heavy-duty elasticated corner anchor straps fit mattresses up to 40cm deep',
      'Breathable microfibre peach-skin cover'
    ],
    sizes: [
      { name: 'Single', dimension: '90 x 190 cm', priceModifier: -6 },
      { name: 'Double', dimension: '135 x 190 cm', priceModifier: 0 },
      { name: 'King', dimension: '150 x 200 cm', priceModifier: 7 },
      { name: 'Super King', dimension: '180 x 200 cm', priceModifier: 14 }
    ],
    colors: [
      { name: 'Hotel Crisp White', hex: '#FAFAF9', bgClass: 'bg-stone-50 border-stone-300', fabricTone: '#F5F5F0' }
    ],
    fabricSpec: {
      material: 'Brushed Microfibre Peachskin with 1000 GSM Hollowfibre',
      threadCountOrGsm: '1000 GSM Filling Density',
      certifications: ['OEKO-TEX® Certified', 'Hypoallergenic British Standard'],
      careInstructions: 'Machine wash on gentle cycle with mild detergent. Air dry thoroughly or low heat tumble.'
    },
    inStock: true,
    isBestSeller: true
  },
  {
    id: 'sc-hotel-bounceback-pillows',
    name: 'Luxury Bounce-Back Hotel Quality Pillow Pair (Pack of 2)',
    category: 'pillows',
    categoryLabel: 'Pillows',
    price: 19.99,
    originalPrice: 34.99,
    rating: 4.88,
    reviewsCount: 1420,
    tag: '2-Pack Value',
    description: 'Say goodbye to flat, lifeless pillows. Our British-filled Bounce Back pillows feature spiral-crimped resilient hollowfibres that actively reshape to cradle your neck, spine, and head in perfect alignment whether you sleep on your back, side, or stomach.',
    features: [
      'Pack of 2 premium luxury medium-firm hotel standard pillows',
      'High-resilience spiral hollowfibre bounces back every single morning',
      'Embossed microfibre cover with elegant satin piped edges',
      'Anti-dust mite, anti-microbial & hypoallergenic',
      'Standard UK pillow dimensions: 48 x 74 cm'
    ],
    sizes: [
      { name: 'Standard Pair (2 Pack)', dimension: '48 x 74 cm (x2)', priceModifier: 0 },
      { name: 'Family Pack (4 Pack)', dimension: '48 x 74 cm (x4)', priceModifier: 14 }
    ],
    colors: [
      { name: 'Bright Hotel White', hex: '#FFFFFF', bgClass: 'bg-white border-stone-300', fabricTone: '#FAFAFA' }
    ],
    fabricSpec: {
      material: '100% Breathable Microfibre casing with Spiral Bound Filling',
      threadCountOrGsm: '850g per pillow fill weight',
      certifications: ['OEKO-TEX® Standard 100', 'BS 5852 Fire Safety Compliant'],
      careInstructions: 'Fully machine washable at 40°C. Reshape while damp and tumble dry low.'
    },
    inStock: true,
    isBestSeller: true
  },
  {
    id: 'sc-extra-deep-fitted-sheet',
    name: '40cm Extra Deep Fitted Bed Sheet 100% Non-Iron',
    category: 'sheets',
    categoryLabel: 'Fitted Sheets',
    price: 13.99,
    originalPrice: 22.99,
    rating: 4.85,
    reviewsCount: 975,
    tag: 'Non-Iron',
    description: 'Tired of fitted sheets that pop off the corners? Our 40cm extra deep skirt easily tucks securely under thick mattresses, toppers, and protectors with heavy-duty 360-degree all-around elastic. Ultra-soft brushed finish that resists wrinkling and fading.',
    features: [
      'Generous 40cm (16 inch) extra deep wall fits even the thickest mattresses',
      '360° reinforced elasticated hem keeps sheet anchored securely',
      'Super-soft brushed microfibre with anti-pilling yarn',
      'Non-iron and wrinkle-resistant for low-maintenance beauty',
      'Fade-resistant reactive dyes preserve vivid colour'
    ],
    sizes: [
      { name: 'Single', dimension: '90 x 190 + 40 cm', priceModifier: -3 },
      { name: 'Double', dimension: '135 x 190 + 40 cm', priceModifier: 0 },
      { name: 'King', dimension: '150 x 200 + 40 cm', priceModifier: 3 },
      { name: 'Super King', dimension: '180 x 200 + 40 cm', priceModifier: 6 }
    ],
    colors: [
      { name: 'Ivory Cream', hex: '#FDFBF7', bgClass: 'bg-[#FDFBF7] border-stone-300', fabricTone: '#F8F6F0' },
      { name: 'Charcoal Grey', hex: '#374151', bgClass: 'bg-stone-700', fabricTone: '#374151' },
      { name: 'Silver Mist', hex: '#D1D5DB', bgClass: 'bg-slate-300', fabricTone: '#D5D9DF' },
      { name: 'Navy Blue', hex: '#1E293B', bgClass: 'bg-slate-800', fabricTone: '#1E293B' },
      { name: 'Duck Egg Blue', hex: '#A8C5C8', bgClass: 'bg-[#A8C5C8]', fabricTone: '#9EBEC1' }
    ],
    fabricSpec: {
      material: '100% High-Density Brushed Microfibre',
      threadCountOrGsm: '120 GSM Silky Peach Finish',
      certifications: ['OEKO-TEX® Standard 100'],
      careInstructions: 'Machine washable at 30°C. Quick drying, no ironing required.'
    },
    inStock: true
  },
  {
    id: 'sc-velvet-blackout-curtains',
    name: 'Thermal Insulated Heavy Velvet Eyelet Blackout Curtains (Pair)',
    category: 'curtains',
    categoryLabel: 'Curtains & Throws',
    price: 42.99,
    originalPrice: 69.99,
    rating: 4.92,
    reviewsCount: 864,
    tag: 'Energy Saving',
    description: 'Enhance your room with sumptuous tactile warmth. Woven with triple-weave thermal blackout technology, these heavy crushed velvet ring-top curtains block 95%+ of light, reduce street noise, and insulate against winter draughts to lower home heating costs.',
    features: [
      'Complete pair of 2 lined heavy velvet curtains',
      '95%+ Blackout light blocking with sound dampening thermal backing',
      '40mm rust-resistant silver chrome eyelet rings fit standard poles',
      'Sumptuous velvet drape with rich light-reflecting sheen',
      'Thermal regulation saves winter heating and summer cooling'
    ],
    sizes: [
      { name: '66" x 72" (168x183cm)', dimension: '168 x 183 cm per panel', priceModifier: 0 },
      { name: '66" x 90" (168x228cm)', dimension: '168 x 228 cm per panel', priceModifier: 8 },
      { name: '90" x 90" (228x228cm)', dimension: '228 x 228 cm per panel', priceModifier: 16 }
    ],
    colors: [
      { name: 'Silver Charcoal', hex: '#4B5563', bgClass: 'bg-stone-600', fabricTone: '#4B5563' },
      { name: 'Champagne Gold', hex: '#D4AF37', bgClass: 'bg-[#D4AF37]', fabricTone: '#CBB26B' },
      { name: 'Forest Emerald', hex: '#164E63', bgClass: 'bg-[#1e463a]', fabricTone: '#1e463a' },
      { name: 'Plum Berry', hex: '#581C87', bgClass: 'bg-[#581C87]', fabricTone: '#4C1D95' }
    ],
    fabricSpec: {
      material: '100% Heavyweight Polyester Velvet with Triple-Weave Blackout Yarn',
      threadCountOrGsm: '330 GSM Heavy Fabric Weight',
      certifications: ['Thermal Shield Efficiency Certified'],
      careInstructions: 'Dry clean recommended or gentle hand-wash at 30°C. Steam iron on reverse on low.'
    },
    inStock: true
  },
  {
    id: 'sc-egyptian-towel-bale',
    name: '700 GSM 100% Egyptian Cotton 6-Piece Luxury Towel Bale Set',
    category: 'bath',
    categoryLabel: 'Towels & Bath',
    price: 26.99,
    originalPrice: 44.99,
    rating: 4.89,
    reviewsCount: 1120,
    tag: 'Pure Cotton',
    description: 'Bring the spa home with ultra-plush 700 GSM combed Egyptian cotton towels. Exceptionally thick, thirsty, and gentle against the skin with double-stitched hems for years of durable softness that stays fluffy wash after wash.',
    features: [
      'Complete 6-Piece Set: 2 Bath Towels, 2 Hand Towels, 2 Face Cloths',
      'Ultra-dense 700 GSM weight provides maximum absorbency',
      'Ring-spun Egyptian combed cotton loops prevent snagging',
      'Subtle ribbed woven border detail for hotel-style presentation',
      'Zero linting after initial pre-wash'
    ],
    sizes: [
      { name: '6-Piece Set', dimension: 'Bath (70x120cm), Hand (50x85cm), Face (30x30cm)', priceModifier: 0 },
      { name: '10-Piece Luxury Set', dimension: 'Includes 2 Extra Bath Sheets (90x145cm)', priceModifier: 18 }
    ],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF', bgClass: 'bg-white border-stone-300', fabricTone: '#FFFFFF' },
      { name: 'Slate Anthracite', hex: '#374151', bgClass: 'bg-stone-700', fabricTone: '#374151' },
      { name: 'Spa Sage', hex: '#94A3B8', bgClass: 'bg-[#98A89E]', fabricTone: '#98A89E' },
      { name: 'Mocha Taupe', hex: '#A89F91', bgClass: 'bg-[#A89F91]', fabricTone: '#A89F91' }
    ],
    fabricSpec: {
      material: '100% Combed Long-Staple Egyptian Cotton',
      threadCountOrGsm: '700 GSM Heavyweight Density',
      certifications: ['OEKO-TEX® Standard 100'],
      careInstructions: 'Machine wash at 40°C. Avoid fabric softener to maintain peak water absorption.'
    },
    inStock: true
  },
  {
    id: 'sc-goose-feather-duvet',
    name: 'All Seasons 13.5 Tog Goose Feather & Down Luxury Duvet',
    category: 'bedding',
    categoryLabel: 'Duvets',
    price: 49.99,
    originalPrice: 89.99,
    rating: 4.94,
    reviewsCount: 1650,
    tag: 'Winter Warmth',
    description: 'Wrap yourself in natural, weightless warmth. Filled with 85% white goose feather and 15% luxury down encased in a 100% down-proof 233 thread count cotton cambric shell with pocket-box stitching to prevent cold spots.',
    features: [
      '13.5 Tog ideal for British Autumn, Winter, and cooler evenings',
      '85% White Goose Feather & 15% High-Loft Natural Down',
      '233 Thread Count 100% Cotton cambric shell with piped edging',
      'Cassette box construction ensures even heat distribution throughout',
      'Ethically sourced certified under Responsible Down Standard (RDS)'
    ],
    sizes: [
      { name: 'Single', dimension: '135 x 200 cm', priceModifier: -8 },
      { name: 'Double', dimension: '200 x 200 cm', priceModifier: 0 },
      { name: 'King', dimension: '230 x 220 cm', priceModifier: 10 },
      { name: 'Super King', dimension: '260 x 220 cm', priceModifier: 20 }
    ],
    colors: [
      { name: 'Natural Crisp White', hex: '#FAF9F5', bgClass: 'bg-stone-50 border-stone-300', fabricTone: '#F7F6F2' }
    ],
    fabricSpec: {
      material: '85% Goose Feather / 15% Goose Down in 100% Cotton Shell',
      threadCountOrGsm: '13.5 Tog British Rating (233 TC Shell)',
      certifications: ['RDS Responsible Down Standard', 'OEKO-TEX® Standard 100', 'BS 1425 Feathers'],
      careInstructions: 'Professional laundering or gentle wool wash at 30°C. Thoroughly tumble dry.'
    },
    inStock: true,
    isBestSeller: true
  },
  {
    id: 'sc-waterproof-mattress-protector',
    name: 'Quilted Waterproof Breathable Noiseless Mattress Protector',
    category: 'toppers',
    categoryLabel: 'Protectors',
    price: 16.99,
    originalPrice: 28.99,
    rating: 4.87,
    reviewsCount: 780,
    tag: '100% Waterproof',
    description: 'Total mattress defence without the annoying crinkle sound. Features a soft diamond-quilted microfibre sleep surface bonded with a high-tech breathable polyurethane waterproof membrane that blocks spills, dust mites, perspiration, and stains.',
    features: [
      '100% Waterproof TPU membrane backing — whisper quiet & crinkle-free',
      'Diamond quilted microfibre top layer with 150 GSM plush padding',
      'Extra deep 38cm knitted stretch skirt fits snugly around your mattress',
      'Protects against spills, allergens, bed bugs, and everyday wear',
      'Machine washable up to 60°C for hospital-grade hygiene'
    ],
    sizes: [
      { name: 'Single', dimension: '90 x 190 + 38 cm', priceModifier: -3 },
      { name: 'Double', dimension: '135 x 190 + 38 cm', priceModifier: 0 },
      { name: 'King', dimension: '150 x 200 + 38 cm', priceModifier: 4 },
      { name: 'Super King', dimension: '180 x 200 + 38 cm', priceModifier: 7 }
    ],
    colors: [
      { name: 'Medical Clean White', hex: '#FFFFFF', bgClass: 'bg-white border-stone-300', fabricTone: '#FFFFFF' }
    ],
    fabricSpec: {
      material: 'Microfibre Quilted Top + TPU Polyurethane Waterproof Barrier',
      threadCountOrGsm: '150 GSM Quilted Loft',
      certifications: ['OEKO-TEX® Class 1 (Safe for babies)', 'Anti-Allergy Approved'],
      careInstructions: 'Machine wash at 40-60°C. Do not bleach or iron. Tumble dry on low heat.'
    },
    inStock: true
  },
  {
    id: 'sc-waffle-throw-blanket',
    name: 'Waffle Weave 100% Pure Organic Cotton Throw Blanket',
    category: 'curtains',
    categoryLabel: 'Curtains & Throws',
    price: 24.99,
    originalPrice: 39.99,
    rating: 4.91,
    reviewsCount: 630,
    tag: 'New Season',
    description: 'Drape comfort across your bed or sofa. Woven from 100% pre-washed natural cotton with an airy deep honeycomb waffle pattern that traps warmth in winter while remaining refreshingly breathable on warm summer evenings.',
    features: [
      '100% Pure Natural Organic Cotton with textured honeycomb weave',
      'Pre-washed stone wash treatment gives immediate lived-in softness',
      'Versatile decorative accent for sofas, armchairs, and bed ends',
      'Self-hemmed clean tailored borders with reinforced corners',
      'Lightweight yet cosy — perfect for year-round lounging'
    ],
    sizes: [
      { name: 'Medium (150 x 200 cm)', dimension: '150 x 200 cm', priceModifier: 0 },
      { name: 'Extra Large (220 x 240 cm)', dimension: '220 x 240 cm', priceModifier: 10 }
    ],
    colors: [
      { name: 'Oatmeal Natural', hex: '#DDD0BE', bgClass: 'bg-[#DDD0BE]', fabricTone: '#DDD0BE' },
      { name: 'Sage Leaf', hex: '#879883', bgClass: 'bg-[#879883]', fabricTone: '#879883' },
      { name: 'Charcoal Grey', hex: '#4B5563', bgClass: 'bg-stone-600', fabricTone: '#4B5563' },
      { name: 'Rust Terracotta', hex: '#C06C47', bgClass: 'bg-[#C06C47]', fabricTone: '#C06C47' }
    ],
    fabricSpec: {
      material: '100% Pure Long-Staple Cotton',
      threadCountOrGsm: '400 GSM Honeycomb Waffle Weave',
      certifications: ['GOTS Certified Organic Cotton', 'OEKO-TEX® Standard 100'],
      careInstructions: 'Machine wash cold at 30°C. Gentle cycle. Lay flat or tumble dry low.'
    },
    inStock: true
  },
  {
    id: 'sc-mulberry-silk-pillowcase',
    name: '100% Pure Mulberry Silk 22 Momme Pillowcase with Hidden Zip',
    category: 'pillows',
    categoryLabel: 'Pillows',
    price: 21.99,
    originalPrice: 38.00,
    rating: 4.96,
    reviewsCount: 1540,
    tag: 'Beauty Secret',
    description: 'The dermatologist and hair stylist approved secret to waking up radiant. Grade 6A pure mulberry silk reduces friction by 43%, eliminating sleep creases, bed-head frizz, hair breakage, and helping your nighttime skincare creams stay on your skin.',
    features: [
      '100% Pure Mulberry Silk (Highest Grade 6A, 22 Momme density)',
      'Natural amino acids keep skin hydrated and reduce wrinkle formation',
      'Smooth friction-free surface eliminates frizz and tangled hair',
      'Concealed invisible side zipper keeps pillow securely tucked',
      'Naturally temperature-regulating — cool side all night long'
    ],
    sizes: [
      { name: 'Standard UK (50 x 75 cm)', dimension: '50 x 75 cm', priceModifier: 0 },
      { name: 'Super King (50 x 90 cm)', dimension: '50 x 90 cm', priceModifier: 6 }
    ],
    colors: [
      { name: 'Pearl Ivory', hex: '#FAF9F6', bgClass: 'bg-stone-50 border-stone-300', fabricTone: '#FAF9F6' },
      { name: 'Rose Gold Pink', hex: '#E8C5BE', bgClass: 'bg-[#E8C5BE]', fabricTone: '#E8C5BE' },
      { name: 'Silver Grey', hex: '#CBD5E1', bgClass: 'bg-slate-300', fabricTone: '#CBD5E1' },
      { name: 'Midnight Onyx', hex: '#18181B', bgClass: 'bg-zinc-900', fabricTone: '#18181B' }
    ],
    fabricSpec: {
      material: '100% Pure Mulberry Silk (Grade 6A)',
      threadCountOrGsm: '22 Momme Luxury Weight',
      certifications: ['OEKO-TEX® Standard 100 Non-Toxic', 'Zero Harmful Dyes'],
      careInstructions: 'Hand wash or delicate machine wash with silk detergent in laundry bag at 30°C.'
    },
    inStock: true,
    isBestSeller: true
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Eleanor H.',
    location: 'Cotswolds, UK',
    rating: 5,
    date: '2 days ago',
    title: 'Genuinely hotel quality — transformed our master bedroom',
    comment: 'I was hesitant to buy bedding online without touching it first, but Sunshine Comforts exceeded every expectation. The 600 thread count Egyptian cotton feels so silky and cool. It washed beautifully with no shrinkage. Client service was prompt when I asked about sizing.',
    verified: true,
    productName: '100% Egyptian Cotton 600 Thread Count Duvet Set'
  },
  {
    id: 'rev-2',
    author: 'James R.',
    location: 'Surrey, UK',
    rating: 5,
    date: '1 week ago',
    title: 'The 10cm mattress topper saved my back!',
    comment: 'We have a firm mattress that was causing morning stiffness. Adding this 10cm topper feels like sleeping on a cloud. The baffle box keeps the filling evenly spaced. Fast DPD delivery within 24 hours too. Highly recommend to everyone in the UK.',
    verified: true,
    productName: '10cm Extra Deep Baffle Box Quilted Mattress Topper'
  },
  {
    id: 'rev-3',
    author: 'Sophie M.',
    location: 'Edinburgh, UK',
    rating: 5,
    date: '2 weeks ago',
    title: 'Bounce back pillows that actually bounce back',
    comment: 'I usually have to replace cheap pillows every few months because they go clumpy. These Sunshine Comforts hotel pillows hold their shape night after night. Outstanding quality for the price and beautifully piped.',
    verified: true,
    productName: 'Luxury Bounce-Back Hotel Quality Pillow Pair'
  },
  {
    id: 'rev-4',
    author: 'Alistair B.',
    location: 'Manchester, UK',
    rating: 5,
    date: '3 weeks ago',
    title: 'Extra deep sheets that actually stay tucked in',
    comment: 'Finally a fitted sheet that fits our 35cm deep mattress with topper without coming loose in the night! The 40cm pocket is generous and the material is soft right out of the packaging.',
    verified: true,
    productName: '40cm Extra Deep Fitted Bed Sheet 100% Non-Iron'
  }
];

export const UK_SIZE_GUIDE = [
  { type: 'Single Bed', mattress: '90 x 190 cm (3\'0" x 6\'3")', duvet: '135 x 200 cm', fittedSheet: '90 x 190 + 40 cm', topper: '90 x 190 cm' },
  { type: 'Double Bed', mattress: '135 x 190 cm (4\'6" x 6\'3")', duvet: '200 x 200 cm', fittedSheet: '135 x 190 + 40 cm', topper: '135 x 190 cm' },
  { type: 'King Size Bed', mattress: '150 x 200 cm (5\'0" x 6\'6")', duvet: '230 x 220 cm', fittedSheet: '150 x 200 + 40 cm', topper: '150 x 200 cm' },
  { type: 'Super King Bed', mattress: '180 x 200 cm (6\'0" x 6\'6")', duvet: '260 x 220 cm', fittedSheet: '180 x 200 + 40 cm', topper: '180 x 200 cm' },
  { type: 'Standard Pillowcase', mattress: '—', duvet: '—', fittedSheet: '—', topper: '48 x 74 cm (Oxford & Housewife)' },
];
