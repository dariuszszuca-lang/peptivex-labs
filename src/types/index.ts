export type Lang = 'pl' | 'en' | 'es';
export type Currency = 'PLN' | 'GBP' | 'EUR';
export type ProductFormat = 'vial' | 'pen' | 'capsule' | 'spray';
export type ProductCategory = 'healing' | 'anti-aging' | 'metabolic' | 'growth-hormone' | 'cognitive' | 'melanogenesis' | 'mitochondrial' | 'cosmeceutical' | 'weight-loss' | 'blend' | 'combo' | 'accessory';
export type OrderStatus = 'new' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
export type ShippingRegion = 'pl' | 'uk' | 'es';

export interface Product {
  id: string;
  slug: string;
  name_pl: string;
  name_en: string;
  name_es?: string;
  description_pl: string;
  description_en: string;
  description_es?: string;
  short_pl: string;
  short_en: string;
  short_es?: string;
  price_pln: number; // in grosze (11900 = 119.00 PLN)
  price_gbp: number; // in pence (2499 = 24.99 GBP)
  price_eur?: number; // in cents (2899 = 28.99 EUR)
  stock_pl: number;
  stock_uk: number;
  stock_es?: number;
  category: ProductCategory;
  format: ProductFormat;
  dosage: string;
  image?: string;
  gallery?: string[];
  coa?: string; // fallback / legacy (gdy brak wersji jezykowej)
  coa_pl?: string;
  coa_en?: string;
  coa_es?: string;
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
  pen_kit?: {
    cartridge_1x_gbp: number; // in pence (10000 = £100.00)
    cartridge_2x_gbp: number;
    cartridge_3x_gbp: number;
    cartridge_1x_pln?: number; // in grosze (50000 = 500.00 PLN)
    cartridge_2x_pln?: number;
    cartridge_3x_pln?: number;
    cartridge_1x_eur?: number; // in cents
    cartridge_2x_eur?: number;
    cartridge_3x_eur?: number;
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
