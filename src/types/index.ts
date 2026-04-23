export type Lang = 'pl' | 'en';
export type Currency = 'PLN' | 'GBP';
export type ProductFormat = 'vial' | 'pen' | 'capsule' | 'spray';
export type ProductCategory = 'healing' | 'anti-aging' | 'metabolic' | 'growth-hormone' | 'cognitive' | 'melanogenesis' | 'mitochondrial' | 'cosmeceutical' | 'weight-loss' | 'blend' | 'combo' | 'accessory';
export type OrderStatus = 'new' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
export type ShippingRegion = 'pl' | 'uk';

export interface Product {
  id: string;
  slug: string;
  name_pl: string;
  name_en: string;
  description_pl: string;
  description_en: string;
  short_pl: string;
  short_en: string;
  price_pln: number; // in grosze (11900 = 119.00 PLN)
  price_gbp: number; // in pence (2499 = 24.99 GBP)
  stock_pl: number;
  stock_uk: number;
  category: ProductCategory;
  format: ProductFormat;
  dosage: string;
  image?: string;
  gallery?: string[];
  coa?: string;
  disclaimer: boolean;
  protocol?: {
    reconstitution: string;
    concentration: string;
    typicalDose: string;
    timing: string;
    frequency: string;
    cycleLength: string;
    stackNotes?: string;
    storage: string;
  };
  featured: boolean;
  order: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: { productId: string; name: string; quantity: number; price: number }[];
  total: number;
  currency: Currency;
  status: OrderStatus;
  region: ShippingRegion;
  shipping: {
    name: string;
    email: string;
    phone?: string;
    lockerId?: string;
    lockerName?: string;
  };
  stripeSessionId?: string;
  trackingNumber?: string;
  createdAt: string;
}
