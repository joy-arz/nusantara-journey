/** Fallback products when API is unreachable (server not running, offline, etc.) */

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  origin: string;
  rating: number;
  reviewCount: number;
  inStock: number;
  imageUrl?: string;
}

export const FALLBACK_PRODUCTS: Product[] = [
  { id: 1, name: "Batik Parang Solo", description: "Hand-drawn batik with royal parang pattern.", price: 450000, category: "batik", origin: "Solo", rating: 4.8, reviewCount: 120, inStock: 5, imageUrl: "https://images.unsplash.com/photo-1604973104381-870c92f10343?w=640&q=80" },
  { id: 2, name: "Keris Pamor Madura", description: "Traditional keris with meteorite pamor.", price: 2500000, category: "keris", origin: "Madura", rating: 4.9, reviewCount: 45, inStock: 2, imageUrl: "https://images.unsplash.com/photo-1670179716386-aa1c74a1e05b?w=640&q=80" },
  { id: 3, name: "Silver Filigree Brooch", description: "Kotagede silver filigree jewelry.", price: 380000, category: "jewelry", origin: "Yogyakarta", rating: 4.7, reviewCount: 89, inStock: 8 },
  { id: 4, name: "Wayang Kulit Set", description: "Handcrafted leather shadow puppets.", price: 180000, category: "crafts", origin: "Central Java", rating: 4.6, reviewCount: 56, inStock: 12 },
  { id: 5, name: "Songket Scarf Lombok", description: "Traditional Lombok songket weave.", price: 320000, category: "textiles", origin: "Lombok", rating: 4.5, reviewCount: 34, inStock: 6 },
  { id: 6, name: "Gamelan Kempul", description: "Bronze gamelan kempul gong.", price: 1200000, category: "instruments", origin: "Bali", rating: 4.9, reviewCount: 18, inStock: 3 },
];

export function getFallbackProductById(id: number): Product | undefined {
  return FALLBACK_PRODUCTS.find((p) => p.id === id);
}
