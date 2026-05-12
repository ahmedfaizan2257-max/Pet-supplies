export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  category: 'dogs' | 'cats' | 'birds' | 'fish' | 'reptiles';
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isPremium?: boolean;
  inStock: boolean;
  weightVolume?: string;
  benefits: string[];
  specs?: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  suggestedProducts?: Product[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'select' | 'input' | 'choice';
  options?: { value: string; label: string; icon?: string }[];
  placeholder?: string;
}
