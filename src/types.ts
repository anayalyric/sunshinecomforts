export interface Product {
  id: string;
  name: string;
  category: 'bedding' | 'toppers' | 'pillows' | 'sheets' | 'curtains' | 'bath';
  categoryLabel: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  tag?: string;
  description: string;
  features: string[];
  sizes: { name: string; dimension: string; priceModifier: number }[];
  colors: { name: string; hex: string; bgClass: string; fabricTone: string }[];
  fabricSpec: {
    material: string;
    threadCountOrGsm: string;
    certifications: string[];
    careInstructions: string;
  };
  inStock: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
  quantity: number;
  unitPrice: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  productName: string;
}
